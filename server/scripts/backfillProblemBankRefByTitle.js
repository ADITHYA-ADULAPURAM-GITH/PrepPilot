/**
 * Safe, repeatable, automated linking of tracker Problem docs to
 * ProblemBank docs by NORMALIZED TITLE MATCH.
 *
 * This is a legacy-only fallback for existing rows created before
 * Problem.externalId existed. It never overwrites data, never guesses
 * on ambiguity, and is safe to run any number of times.
 *
 * Normalization: trim -> lowercase -> collapse repeated whitespace.
 *
 * A Problem is linked ONLY if:
 *   - problemBankRef is currently null (never overwrites an existing ref)
 *   - exactly ONE active ProblemBank doc has the same normalized title
 *
 * Every other case is skipped and logged:
 *   - ALREADY LINKED     -> problemBankRef already set, left untouched
 *   - NO MATCH            -> no ProblemBank doc has a matching normalized title
 *   - AMBIGUOUS           -> 2+ ProblemBank docs share the same normalized title
 *
 * This script:
 *   - never deletes or recreates Problem documents
 *   - never creates ProblemBank documents
 *   - never touches ProblemProgress or ProblemAttempt
 *   - never overwrites an existing problemBankRef
 *
 * Run once, or as many times as needed, from the server directory:
 *   node scripts/backfillProblemBankRefByTitle.js
 */
import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Problem } from "../models/Problem.js";
import { ProblemBank } from "../models/ProblemBank.js";

function normalizeTitle(title) {
  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

async function run() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB for title-based backfill...");

  const bankProblems = await ProblemBank.find({ isActive: true }, "_id title");

  // Group ProblemBank docs by normalized title so ambiguity is detectable.
  const byNormalizedTitle = new Map();
  for (const bp of bankProblems) {
    const key = normalizeTitle(bp.title);
    if (!byNormalizedTitle.has(key)) byNormalizedTitle.set(key, []);
    byNormalizedTitle.get(key).push(bp);
  }

  const trackerProblems = await Problem.find({});

  let linked = 0;
  let alreadyLinked = 0;
  let noMatch = 0;
  let ambiguous = 0;

  for (const problem of trackerProblems) {
    if (problem.problemBankRef) {
      alreadyLinked += 1;
      console.log(`SKIP (already linked): "${problem.title}" (${problem._id}) -> ${problem.problemBankRef}`);
      continue;
    }

    const key = normalizeTitle(problem.title);
    const candidates = byNormalizedTitle.get(key) || [];

    if (candidates.length === 0) {
      noMatch += 1;
      console.log(`SKIP (no match): "${problem.title}" (${problem._id})`);
      continue;
    }

    if (candidates.length > 1) {
      ambiguous += 1;
      const candidateList = candidates.map((c) => `${c.title} [${c._id}]`).join(", ");
      console.log(`SKIP (ambiguous, ${candidates.length} candidates): "${problem.title}" (${problem._id}) -> ${candidateList}`);
      continue;
    }

    const match = candidates[0];
    problem.problemBankRef = match._id;
    await problem.save();
    linked += 1;
    console.log(`LINKED: "${problem.title}" (${problem._id}) -> ProblemBank "${match.title}" (${match._id})`);
  }

  console.log(
    `\nDone. Linked: ${linked}, Already linked: ${alreadyLinked}, No match: ${noMatch}, Ambiguous: ${ambiguous}`
  );

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Title-based backfill failed:", err);
  process.exit(1);
});