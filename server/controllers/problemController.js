import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { problemService } from "../services/problemService.js";

export const listProblems = asyncHandler(async (req, res) => {
  const { problems, pagination } = await problemService.list(req.user._id, req.query);
  res.status(200).json(new ApiResponse(200, { problems, pagination }, "OK"));
});

export const getProblem = asyncHandler(async (req, res) => {
  const problem = await problemService.getById(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, { problem }, "OK"));
});

export const createProblem = asyncHandler(async (req, res) => {
  const problem = await problemService.create(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, { problem }, "Problem added"));
});

export const updateProblem = asyncHandler(async (req, res) => {
  const problem = await problemService.update(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { problem }, "Problem updated"));
});

export const deleteProblem = asyncHandler(async (req, res) => {
  await problemService.remove(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Problem deleted"));
});

export const getProblemStats = asyncHandler(async (req, res) => {
  const stats = await problemService.getStats(req.user._id);
  res.status(200).json(new ApiResponse(200, stats, "OK"));
});