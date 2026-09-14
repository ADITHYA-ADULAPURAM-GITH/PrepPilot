import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { problemProgressService } from "../services/problemProgressService.js";

export const listProgress = asyncHandler(async (req, res) => {
  const { progress, pagination } = await problemProgressService.list(req.user._id, req.query);
  res.status(200).json(new ApiResponse(200, { progress, pagination }, "OK"));
});

export const getProgressStats = asyncHandler(async (req, res) => {
  const stats = await problemProgressService.getStats(req.user._id);
  res.status(200).json(new ApiResponse(200, stats, "OK"));
});

export const updateProgress = asyncHandler(async (req, res) => {
  const progress = await problemProgressService.update(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { progress }, "Progress updated"));
});

export const getWorkspace = asyncHandler(async (req, res) => {
  const workspace = await problemProgressService.getWorkspace(req.user._id, req.params.problemId);
  res.status(200).json(new ApiResponse(200, workspace, "OK"));
});

export const runCode = asyncHandler(async (req, res) => {
  const result = await problemProgressService.runProblem(req.user._id, req.params.problemId, req.body);
  res.status(200).json(new ApiResponse(200, result, "Run complete"));
});

export const submitCode = asyncHandler(async (req, res) => {
  const result = await problemProgressService.recordAttempt(req.user._id, req.params.problemId, req.body);
  res.status(201).json(new ApiResponse(201, result, "Submission recorded"));
});

export const listAttempts = asyncHandler(async (req, res) => {
  const attempts = await problemProgressService.listAttempts(req.user._id, req.params.problemId);
  res.status(200).json(new ApiResponse(200, { attempts }, "OK"));
});