import { ProblemBank } from "../models/ProblemBank.js";
import { ApiError } from "../utils/apiResponse.js";

const DEFAULT_LIMIT = 20;

export const problemBankService = {
  async list({ topic, difficulty, source, page = 1, limit = DEFAULT_LIMIT } = {}) {
    const filter = { isActive: true };
    if (topic) filter.topics = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (source) filter.source = source;

    const skip = (page - 1) * limit;
    const [problems, total] = await Promise.all([
      ProblemBank.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProblemBank.countDocuments(filter),
    ]);

    return {
      problems,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  },

  async getById(id) {
    const problem = await ProblemBank.findOne({ _id: id, isActive: true });
    if (!problem) throw new ApiError(404, "Problem not found");
    return problem;
  },
};