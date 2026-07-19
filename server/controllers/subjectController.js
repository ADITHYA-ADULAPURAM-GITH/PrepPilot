import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { subjectService } from "../services/subjectService.js";

export const listSubjects = asyncHandler(async (req, res) => {
  const subjects = await subjectService.listWithProgress(req.user._id);
  res.status(200).json(new ApiResponse(200, { subjects }, "OK"));
});

export const getSubjectAnalytics = asyncHandler(async (req, res) => {
  const analytics = await subjectService.getOverallAnalytics(req.user._id);
  res.status(200).json(new ApiResponse(200, analytics, "OK"));
});

export const getSubjectTopics = asyncHandler(async (req, res) => {
  const data = await subjectService.getSubjectDetail(req.user._id, req.params.subjectId);
  res.status(200).json(new ApiResponse(200, data, "OK"));
});

export const updateTopicProgress = asyncHandler(async (req, res) => {
  const progress = await subjectService.upsertProgress(
    req.user._id,
    req.params.subjectId,
    req.params.topicId,
    req.body
  );
  res.status(200).json(new ApiResponse(200, { progress }, "Progress updated"));
});

export const getSubjectStats = asyncHandler(async (req, res) => {
  const stats = await subjectService.getStats(req.user._id);
  res.status(200).json(new ApiResponse(200, stats, "OK"));
});