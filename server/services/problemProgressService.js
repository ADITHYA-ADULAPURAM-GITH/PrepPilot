import { ProblemProgress } from "../models/ProblemProgress.js";
import { ProblemAttempt } from "../models/ProblemAttempt.js";
import { ProblemBank } from "../models/ProblemBank.js";
import { ApiError } from "../utils/apiResponse.js";
import { runVisible, runAll, Judge0TimeoutError, Judge0UnavailableError } from "./executionService.js";

const DEFAULT_LIMIT = 20;

async function findOwnedProgress(userId, problemId) {
  const progress = await ProblemProgress.findOne({ user: userId, problem: problemId });
  if (!progress) throw new ApiError(404, "Problem not found or not assigned to you");
  return progress;
}

// Auto-creates ProblemProgress on first workspace open. Never mutates an
// existing doc ($setOnInsert only touches insert-time fields). Race-safe:
// if two concurrent "open workspace" calls both attempt the upsert, the
// unique (user, problem) index lets only one insert win; the loser catches
// the duplicate-key error and re-reads instead of failing — same pattern
// already used in problemSelectionService.js for concurrent /select calls.
async function getOrCreateProgress(userId, problemId) {
  try {
    return await ProblemProgress.findOneAndUpdate(
      { user: userId, problem: problemId },
      { $setOnInsert: { user: userId, problem: problemId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    if (err.code === 11000) {
      const existing = await ProblemProgress.findOne({ user: userId, problem: problemId });
      if (existing) return existing;
    }
    throw err;
  }
}

function handleExecutionError(err) {
  if (err instanceof Judge0TimeoutError || err instanceof Judge0UnavailableError) {
    throw new ApiError(503, "Execution service is currently unavailable");
  }
  throw err;
}

export const problemProgressService = {
  async list(userId, { status, page = 1, limit = DEFAULT_LIMIT } = {}) {
    const filter = { user: userId };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const [progress, total] = await Promise.all([
      ProblemProgress.find(filter)
        .populate("problem", "title difficulty topics")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      ProblemProgress.countDocuments(filter),
    ]);

    return { progress, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  },

  async getStats(userId) {
    const rows = await ProblemProgress.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const stats = { assigned: 0, "in-progress": 0, solved: 0 };
    rows.forEach((r) => { stats[r._id] = r.count; });
    return stats;
  },

  async update(userId, progressId, updates) {
    const progress = await ProblemProgress.findOneAndUpdate(
      { _id: progressId, user: userId },
      updates,
      { new: true, runValidators: true }
    );
    if (!progress) throw new ApiError(404, "Progress record not found");
    return progress;
  },

  async getWorkspace(userId, problemId) {
    const problem = await ProblemBank.findById(problemId);
    if (!problem) throw new ApiError(404, "Problem not found");

    await getOrCreateProgress(userId, problemId);

    return {
      problem: {
        id: problem._id,
        title: problem.title,
        statement: problem.description,
        examples: problem.examples,
        constraints: problem.constraints,
        topics: problem.topics,
        patterns: problem.patterns,
        difficulty: problem.difficulty,
        starterCode: problem.starterCode,
        supportedLanguages: problem.supportedLanguages,
        entryPoint: problem.entryPoint,
      },
    };
  },

  async runProblem(userId, problemId, { language, code }) {
    await findOwnedProgress(userId, problemId);

    try {
      return await runVisible({ problemId, language, code });
    } catch (err) {
      handleExecutionError(err);
    }
  },

  async recordAttempt(userId, problemId, { language, code }) {
    const progress = await findOwnedProgress(userId, problemId);

    let result;
    try {
      result = await runAll({ problemId, language, code });
    } catch (err) {
      handleExecutionError(err);
    }

    const updatedProgress = await ProblemProgress.findOneAndUpdate(
      { _id: progress._id },
      { $inc: { attemptsCount: 1 }, $set: { lastAttemptAt: new Date() } },
      { new: true }
    );

    const attemptNumber = updatedProgress.attemptsCount;

    await ProblemAttempt.create({
      user: userId,
      problem: problemId,
      progress: progress._id,
      language,
      code,
      result: result.overallResult,
      runtimeMs: result.runtimeMs,
      memoryKb: result.memoryKb,
      attemptNumber,
    });

    let nextStatus = updatedProgress.status;
    if (result.overallResult === "Accepted") {
      nextStatus = "solved";
    } else if (updatedProgress.status === "assigned") {
      nextStatus = "in-progress";
    }

    if (nextStatus !== updatedProgress.status) {
      await ProblemProgress.updateOne({ _id: progress._id }, { $set: { status: nextStatus } });
    }

    return {
      overallResult: result.overallResult,
      passedCount: result.passedCount,
      totalCount: result.totalCount,
      attemptNumber,
      runtimeMs: result.runtimeMs,
      memoryKb: result.memoryKb,
      visibleFailures: result.visibleFailures,
    };
  },

  async listAttempts(userId, problemId) {
    await findOwnedProgress(userId, problemId);

    const attempts = await ProblemAttempt.find({ user: userId, problem: problemId }).sort({ submittedAt: -1 });

    return attempts.map((attempt) => ({
      id: attempt._id,
      language: attempt.language,
      code: attempt.code,
      result: attempt.result,
      runtimeMs: attempt.runtimeMs,
      memoryKb: attempt.memoryKb,
      attemptNumber: attempt.attemptNumber,
      submittedAt: attempt.submittedAt,
    }));
  },
};