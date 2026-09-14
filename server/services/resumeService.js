import { Resume } from "../models/Resume.js";
import { ApiError } from "../utils/apiResponse.js";
import { resumeAnalysisService } from "./resumeAnalysisService.js";

function toResumeMetadata(resume) {
  return {
    _id: resume._id,
    user: resume.user,
    fileName: resume.fileName,
    fileSize: resume.fileSize,
    mimeType: resume.mimeType,
    createdAt: resume.createdAt,
    updatedAt: resume.updatedAt,
  };
}

export const resumeService = {
  async getByUser(userId) {
    return Resume.findOne({ user: userId }).lean();
  },

  async upsert(userId, file) {
    if (!file || !file.buffer || file.buffer.length === 0) {
      throw new ApiError(400, "Uploaded file is empty");
    }

    const existing = await Resume.findOne({ user: userId });

    if (existing) {
      existing.fileName = file.originalname;
      existing.fileData = file.buffer;
      existing.fileSize = file.size;
      existing.mimeType = file.mimetype;

      await existing.save();

      await resumeAnalysisService.invalidateForUser(userId);

      return toResumeMetadata(existing);
    }

    const resume = await Resume.create({
      user: userId,
      fileName: file.originalname,
      fileData: file.buffer,
      fileSize: file.size,
      mimeType: file.mimetype,
    });

    return toResumeMetadata(resume);
  },

  async remove(userId) {
    const resume = await Resume.findOne({ user: userId });

    if (!resume) {
      throw new ApiError(404, "No resume found to delete");
    }

    await resume.deleteOne();
    await resumeAnalysisService.invalidateForUser(userId);
  },

  async getForDownload(userId) {
    const resume = await Resume.findOne({ user: userId })
      .select("+fileData")
      .lean();

    if (!resume) {
      throw new ApiError(404, "No resume uploaded yet");
    }

    if (!resume.fileData || resume.fileData.length === 0) {
      throw new ApiError(404, "Resume file is missing on the server");
    }

    return {
      fileData: resume.fileData,
      fileName: resume.fileName,
      mimeType: resume.mimeType,
    };
  },
};