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

// Sends the bytes straight from the Mongo document instead of
// res.download() (which requires a local file path — no longer
// applicable, since resumes no longer live on disk).
export const downloadResume = asyncHandler(async (req, res) => {
  const { fileData, fileName, mimeType } = await resumeService.getForDownload(req.user._id);
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", mimeType || "application/octet-stream");
  res.send(fileData);
});