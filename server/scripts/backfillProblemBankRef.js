
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