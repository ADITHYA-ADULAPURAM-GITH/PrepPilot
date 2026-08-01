import fs from "fs";
import path from "path";
import { Resume } from "../models/Resume.js";
import { ApiError } from "../utils/apiResponse.js";

function deleteFileIfExists(relativeFilePath) {
  const absolutePath = path.join(process.cwd(), relativeFilePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

export const resumeService = {
  async getByUser(userId) {
    return Resume.findOne({ user: userId });
  },

  // Handles both "Upload" and "Replace" — there is one resume per user
  // (enforced by the schema's unique index), so a second upload is
  // always a replace. Multer has already written the new file to disk
  // by the time this runs; this just deletes the old file and either
  // updates the existing doc or creates the first one.
  async upsert(userId, file) {
    const existing = await Resume.findOne({ user: userId });
    const relativePath = path.relative(process.cwd(), file.path);

    if (existing) {
      deleteFileIfExists(existing.filePath);
      existing.fileName = file.originalname;
      existing.filePath = relativePath;
      existing.fileSize = file.size;
      existing.mimeType = file.mimetype;
      await existing.save();
      return existing;
    }

    return Resume.create({
      user: userId,
      fileName: file.originalname,
      filePath: relativePath,
      fileSize: file.size,
      mimeType: file.mimetype,
    });
  },

  async remove(userId) {
    const resume = await Resume.findOne({ user: userId });
    if (!resume) {
      throw new ApiError(404, "No resume found to delete");
    }
    deleteFileIfExists(resume.filePath);
    await resume.deleteOne();
  },

  async getForDownload(userId) {
    const resume = await Resume.findOne({ user: userId });
    if (!resume) {
      throw new ApiError(404, "No resume uploaded yet");
    }
    const absolutePath = path.join(process.cwd(), resume.filePath);
    if (!fs.existsSync(absolutePath)) {
      // Doc exists but file is gone from disk — a data-integrity gap,
      // not a normal 404. Surfaced the same way for now since v1 has
      // no admin/repair tooling to do anything else with it.
      throw new ApiError(404, "Resume file is missing on the server");
    }
    return { absolutePath, fileName: resume.fileName };
  },
};