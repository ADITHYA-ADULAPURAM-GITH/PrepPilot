import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { resumeAnalysisService } from "../services/resumeAnalysisService.js";

export const getAnalysis = asyncHandler(async (req, res) => {
  const analysis = await resumeAnalysisService.getByUser(req.user._id);
  res.status(200).json(new ApiResponse(200, { analysis }, "OK"));
});

export const runAnalysis = asyncHandler(async (req, res) => {
  const { jdText } = req.body || {};
  const analysis = await resumeAnalysisService.analyze(req.user._id, jdText);
  res.status(200).json(new ApiResponse(200, { analysis }, "Analysis complete"));
});

export const matchJd = asyncHandler(async (req, res) => {
  const { jdText } = req.body || {};
  const jdMatch = await resumeAnalysisService.matchJd(req.user._id, jdText);
  res.status(200).json(new ApiResponse(200, { jdMatch }, "OK"));
});

export const improveBullet = asyncHandler(async (req, res) => {
  const { bullet } = req.body || {};
  const suggestion = await resumeAnalysisService.improveBullet(bullet);
  res.status(200).json(new ApiResponse(200, { suggestion }, "OK"));
});
