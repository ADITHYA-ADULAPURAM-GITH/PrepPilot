/**
 * Safe, repeatable sync: ensures every active ProblemBank (global catalog)
 * problem has a corresponding tracker Problem document for every existing
 * User, and that problemUrl is populated from ProblemBank.externalUrl
 * wherever it's missing.
 *
 * Architecture respected:
 *   ProblemBank      = global problem catalog (untouched by this script)
 *   Problem          = per-user tracker entry
 *   ProblemProgress  = per-user solving state (NOT touched here)
 *   ProblemAttempt   = per-user submission history (NOT touched here)
 *
 * PHASE 1 — create/link (unchanged logic from prior run, now also seeds
 * problemUrl on newly created Problems):
 *   For every (user, ProblemBank problem) pair, in ProblemBank order:
 *     1. If a Problem with that user + problemBankRef already exists -> skip (ALREADY LINKED).
 *     2. Else, look for that user's remaining UNCLAIMED Problem(s) with the
 *        same normalized title (trim + lowercase + collapse whitespace):
 *          - exactly one match -> link it (set problemBankRef only —
 *            existing problemUrl values on matched rows are left as-is
 *            here; PHASE 2 handles filling in missing ones safely) (LINKED EXISTING)
 *          - zero matches -> create a new Problem, copying
 *            ProblemBank.externalUrl into Problem.problemUrl (CREATED)
 *          - 2+ matches -> skip and log (AMBIGUOUS)
 *
 * PHASE 2 — problemUrl backfill (new):
 *   For every Problem with a non-null problemBankRef:
 *     - If problemUrl is null/empty AND the referenced ProblemBank has a
 *       non-empty externalUrl -> copy it in.
 *     - NEVER overwrite a non-empty problemUrl.
 *   Runs after Phase 1 in the same execution, so newly linked/created rows
 *   are covered by the same command.
 *
 * Guarantees (both phases):
 *   - Never overwrites a non-null problemBankRef, even within one run.
 *   - Never overwrites a non-empty problemUrl.
 *   - Never deletes a Problem document.
 *   - Never modifies ProblemBank.
 *   - Never creates ProblemProgress or ProblemAttempt.
 *   - Idempotent: re-running does nothing further to already-synced rows.
 *
 * Run once, or as many times as needed, from the server directory:
 *   node scripts/syncProblemBankToTracker.js
 */
import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Problem } from "../models/Problem.js";
import { ProblemBank } from "../models/ProblemBank.js";
import { User } from "../models/User.js";

function normalizeTitle(title) {
  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

// Removes a specific Problem document (by _id) from a normalized-title
// candidate map, so it can never be matched again in this run.
function claimCandidate(candidateMap, normalizedKey, problemId) {
  const bucket = candidateMap.get(normalizedKey);
  if (!bucket) return;
  const remaining = bucket.filter((p) => String(p._id) !== String(problemId));
  if (remaining.length > 0) {
    candidateMap.set(normalizedKey, remaining);
  } else {
    candidateMap.delete(normalizedKey);
  }
}

async function syncCreateAndLink(users, bankProblems) {
  let created = 0;
  let linkedExisting = 0;
  let alreadyLinked = 0;
  let ambiguous = 0;
  let skipped = 0;

  for (const user of users) {
    const userProblems = await Problem.find({ user: user._id });

    const linkedBankIds = new Set(
      userProblems.filter((p) => p.problemBankRef).map((p) => String(p.problemBankRef))
    );

    const unlinkedByNormalizedTitle = new Map();
    for (const p of userProblems) {
      if (p.problemBankRef) continue;
      const key = normalizeTitle(p.title);
      if (!unlinkedByNormalizedTitle.has(key)) unlinkedByNormalizedTitle.set(key, []);
      unlinkedByNormalizedTitle.get(key).push(p);
    }

    for (const bankProblem of bankProblems) {
      if (linkedBankIds.has(String(bankProblem._id))) {
        alreadyLinked += 1;
        continue;
      }

      const key = normalizeTitle(bankProblem.title);
      const candidates = unlinkedByNormalizedTitle.get(key) || [];

      if (candidates.length === 1) {
        const match = candidates[0];
        match.problemBankRef = bankProblem._id;
        await match.save();

        claimCandidate(unlinkedByNormalizedTitle, key, match._id);
        linkedBankIds.add(String(bankProblem._id));

        linkedExisting += 1;
        console.log(
          `LINKED EXISTING: user=${user._id} "${match.title}" (${match._id}) -> ProblemBank "${bankProblem.title}" (${bankProblem._id})`
        );
        continue;
      }

      if (candidates.length > 1) {
        ambiguous += 1;
        console.log(
          `SKIP (ambiguous, ${candidates.length} candidates): user=${user._id} title="${bankProblem.title}"`
        );
        continue;
      }

      const primaryTopic = Array.isArray(bankProblem.topics) && bankProblem.topics.length > 0
        ? bankProblem.topics[0]
        : null;

      if (!primaryTopic) {
        skipped += 1;
        console.log(
          `SKIP (no topic available to satisfy required field): ProblemBank "${bankProblem.title}" (${bankProblem._id})`
        );
        continue;
      }

      const newProblem = await Problem.create({
        user: user._id,
        title: bankProblem.title,
        topic: primaryTopic,
        difficulty: bankProblem.difficulty,
        problemBankRef: bankProblem._id,
        problemUrl: isNonEmptyString(bankProblem.externalUrl) ? bankProblem.externalUrl : null,
      });

      linkedBankIds.add(String(bankProblem._id));

      created += 1;
      console.log(
        `CREATED: user=${user._id} "${newProblem.title}" (${newProblem._id}) -> ProblemBank (${bankProblem._id})`
      );
    }
  }

  return { created, linkedExisting, alreadyLinked, ambiguous, skipped };
}

// Phase 2: fill in problemUrl for any already-linked Problem that's
// missing it, sourced from its ProblemBank.externalUrl. Never touches a
// Problem that already has a non-empty problemUrl.
async function backfillProblemUrls(bankProblems) {
  const bankById = new Map(bankProblems.map((bp) => [String(bp._id), bp]));

  const linkedProblems = await Problem.find({ problemBankRef: { $ne: null } });

  let urlsBackfilled = 0;
  let urlSkippedNoSource = 0;
  let urlAlreadySet = 0;

  for (const problem of linkedProblems) {
    if (isNonEmptyString(problem.problemUrl)) {
      urlAlreadySet += 1;
      continue;
    }

    const bankProblem = bankById.get(String(problem.problemBankRef));
    if (!bankProblem || !isNonEmptyString(bankProblem.externalUrl)) {
      urlSkippedNoSource += 1;
      continue;
    }

    problem.problemUrl = bankProblem.externalUrl;
    await problem.save();
    urlsBackfilled += 1;
    console.log(
      `URL BACKFILLED: user=${problem.user} "${problem.title}" (${problem._id}) -> ${bankProblem.externalUrl}`
    );
  }

  return { urlsBackfilled, urlSkippedNoSource, urlAlreadySet };
}

async function run() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for ProblemBank -> Tracker sync...");

  const bankProblems = await ProblemBank.find({ isActive: true });
  const users = await User.find({}, "_id");

  console.log(`Active ProblemBank problems: ${bankProblems.length}`);
  console.log(`Existing users: ${users.length}`);

  const { created, linkedExisting, alreadyLinked, ambiguous, skipped } =
    await syncCreateAndLink(users, bankProblems);

  const { urlsBackfilled, urlSkippedNoSource, urlAlreadySet } =
    await backfillProblemUrls(bankProblems);

  console.log(
    `\nSummary:\nCreated: ${created}\nLinked existing: ${linkedExisting}\nAlready linked: ${alreadyLinked}\nAmbiguous: ${ambiguous}\nSkipped: ${skipped}\n` +
    `\nURL backfill:\nBackfilled: ${urlsBackfilled}\nAlready set: ${urlAlreadySet}\nSkipped (no source URL): ${urlSkippedNoSource}`
  );

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("ProblemBank -> Tracker sync failed:", err);
  process.exit(1);
});