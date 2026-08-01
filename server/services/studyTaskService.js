import { StudyTask } from "../models/StudyTask.js";
import { ApiError } from "../utils/apiResponse.js";

export const studyTaskService = {
  async list(userId, query) {
    const { category, priority, isCompleted, page, limit } = query;

    const filter = { user: userId };
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (isCompleted !== undefined) filter.isCompleted = isCompleted;

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      StudyTask.find(filter).sort({ dueDate: 1 }).skip(skip).limit(limit),
      StudyTask.countDocuments(filter),
    ]);

    return {
      tasks,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  },

  async getById(userId, taskId) {
    const task = await StudyTask.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new ApiError(404, "Study task not found");
    }
    return task;
  },

  async create(userId, payload) {
    return StudyTask.create({ ...payload, user: userId });
  },

  async update(userId, taskId, payload) {
    const task = await StudyTask.findOneAndUpdate(
      { _id: taskId, user: userId },
      payload,
      { new: true, runValidators: true }
    );
    if (!task) {
      throw new ApiError(404, "Study task not found");
    }
    return task;
  },

  async remove(userId, taskId) {
    const task = await StudyTask.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      throw new ApiError(404, "Study task not found");
    }
  },
};