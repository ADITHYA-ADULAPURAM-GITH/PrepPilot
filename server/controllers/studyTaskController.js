import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { studyTaskService } from "../services/studyTaskService.js";

export const listStudyTasks = asyncHandler(async (req, res) => {
  const { tasks, pagination } = await studyTaskService.list(req.user._id, req.query);
  res.status(200).json(new ApiResponse(200, { tasks, pagination }, "OK"));
});

export const getStudyTask = asyncHandler(async (req, res) => {
  const task = await studyTaskService.getById(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, { task }, "OK"));
});

export const createStudyTask = asyncHandler(async (req, res) => {
  const task = await studyTaskService.create(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, { task }, "Task created"));
});

export const updateStudyTask = asyncHandler(async (req, res) => {
  const task = await studyTaskService.update(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { task }, "Task updated"));
});

export const deleteStudyTask = asyncHandler(async (req, res) => {
  await studyTaskService.remove(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Task deleted"));
});