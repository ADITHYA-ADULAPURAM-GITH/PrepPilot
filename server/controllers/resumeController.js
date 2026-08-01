import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse, ApiError } from "../utils/apiResponse.js";
import { resumeService } from "../services/resumeService.js";

export const getResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.getByUser(req.user._id);
  res.status(200).json(new ApiResponse(200, { resume }, "OK"));
});

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }
  const resume = await resumeService.upsert(req.user._id, req.file);
  res.status(200).json(new ApiResponse(200, { resume }, "Resume saved"));
});

export const deleteResume = asyncHandler(async (req, res) => {
  await resumeService.remove(req.user._id);
  res.status(200).json(new ApiResponse(200, null, "Resume deleted"));
});

export const downloadResume = asyncHandler(async (req, res) => {
  const { absolutePath, fileName } = await resumeService.getForDownload(req.user._id);
  res.download(absolutePath, fileName);
});