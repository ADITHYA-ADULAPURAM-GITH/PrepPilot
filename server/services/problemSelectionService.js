import { ProblemBank } from "../models/ProblemBank.js";
import { ProblemProgress } from "../models/ProblemProgress.js";

// Deterministic selection: filtered query + assignment. No AI, no
// ranking — that's explicitly out of scope for Phase 1.
export async function selectAndAssign(userId, { topics, difficulty, count, source }) {
  const alreadyAssigned = await ProblemProgress.find({ user: userId }).distinct("problem");

  const filter = {
    isActive: true,
    _id: { $nin: alreadyAssigned },
  };
  if (topics?.length) filter.topics = { $in: topics };
  if (difficulty) filter.difficulty = difficulty;
  if (source) filter.source = source;

  const selected = await ProblemBank.find(filter).limit(count);
  if (selected.length === 0) return { assigned: [] };

  const progressDocs = selected.map((problem) => ({
    user: userId,
    problem: problem._id,
    status: "assigned",
  }));

  try {
    await ProblemProgress.insertMany(progressDocs, { ordered: false });
  } catch (err) {
    // Tolerate a duplicate-key race (two concurrent /select calls
    // hitting the same problem) rather than surfacing it as a 500 —
    // the unique (user, problem) index is the actual guard here.
    if (err.code !== 11000 && !err.writeErrors) throw err;
  }

  return { assigned: selected };
}