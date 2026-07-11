import { Problem } from "../models/Problem.js";
import { ApiError } from "../utils/apiResponse.js";

const SORT_MAP = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  title: { title: 1 },
  difficulty: { difficulty: 1 },
};

const DSA_READINESS_TARGET = 150;

export const problemService = {
  async list(userId, query) {
    const { search, topic, difficulty, status, sort, page, limit } = query;

    const filter = { user: userId };
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (status) filter.status = status;
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [problems, total] = await Promise.all([
      Problem.find(filter).sort(SORT_MAP[sort]).skip(skip).limit(limit),
      Problem.countDocuments(filter),
    ]);

    return {
      problems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  },

  async getById(userId, id) {
    const problem = await Problem.findOne({ _id: id, user: userId });
    if (!problem) {
      throw new ApiError(404, "Problem not found");
    }
    return problem;
  },

  async create(userId, data) {
    const payload = { ...data, user: userId };
    if (!payload.problemUrl) delete payload.problemUrl;
    return Problem.create(payload);
  },

  async update(userId, id, data) {
    const problem = await Problem.findOne({ _id: id, user: userId });
    if (!problem) {
      throw new ApiError(404, "Problem not found");
    }

    if (data.status && data.status !== problem.status) {
      if (data.status === "Solved" && !problem.dateSolved) {
        problem.dateSolved = new Date();
      }
      if (data.status === "Todo") {
        problem.dateSolved = null;
      }
    }

    if (
      typeof data.revisionCount === "number" &&
      data.revisionCount > problem.revisionCount
    ) {
      problem.lastRevised = new Date();
    }

    Object.assign(problem, data);
    if (data.problemUrl === "") problem.problemUrl = null;

    await problem.save();
    return problem;
  },

  async remove(userId, id) {
    const result = await Problem.findOneAndDelete({ _id: id, user: userId });
    if (!result) {
      throw new ApiError(404, "Problem not found");
    }
  },

  async getStats(userId) {
    const [totalCount, solvedCount, recentSolved] = await Promise.all([
      Problem.countDocuments({ user: userId }),
      Problem.countDocuments({ user: userId, status: "Solved" }),
      Problem.find({ user: userId, status: "Solved" })
        .sort({ dateSolved: -1 })
        .limit(5)
        .select("title difficulty dateSolved"),
    ]);

    const readinessScore = Math.min(100, Math.round((solvedCount / DSA_READINESS_TARGET) * 100));

    return { totalCount, solvedCount, readinessScore, recentSolved };
  },
};