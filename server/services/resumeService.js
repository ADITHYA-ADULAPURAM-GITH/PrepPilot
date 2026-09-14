import { Resume } from "../models/Resume.js";
import { ApiError } from "../utils/apiResponse.js";
import { resumeAnalysisService } from "./resumeAnalysisService.js";

export const resumeService = {
  async getByUser(userId) {
    // fileData is select: false by default, so this stays lightweight —
    // callers that need bytes ask for them explicitly.
    return Resume.findOne({ user: userId });
  },

  // Handles both "Upload" and "Replace" — there is one resume per user
  // (enforced by the schema's unique index), so a second upload is
  // always a replace. The new bytes simply overwrite fileData on the
  // same document (or a new document is created on first upload).
  async upsert(userId, file) {
    const existing = await Resume.findOne({ user: userId });

    if (existing) {
      existing.fileName = file.originalname;
      existing.fileData = file.buffer;
      existing.fileSize = file.size;
      existing.mimeType = file.mimetype;
      await existing.save();

      // The old bytes are gone — any analysis tied to them now
      // describes a file that no longer exists, so it's invalidated
      // rather than left around to look current in the UI.
      await resumeAnalysisService.invalidateForUser(userId);

      return existing;
    }

    return Resume.create({
      user: userId,
      fileName: file.originalname,
      fileData: file.buffer,
      fileSize: file.size,
      mimeType: file.mimetype,
    });
  },

  async remove(userId) {
    const resume = await Resume.findOne({ user: userId });
    if (!resume) {
      throw new ApiError(404, "No resume found to delete");
    }
    await resume.deleteOne();
    await resumeAnalysisService.invalidateForUser(userId);
  },

  // Explicitly re-fetches with fileData included (it's select: false by
  // default) and confirms the bytes are actually present before handing
  // them back — the same integrity guarantee the old fs.existsSync
  // check gave, just against the Mongo field instead of local disk.
  async getForDownload(userId) {
    const resume = await Resume.findOne({ user: userId }).select("+fileData");
    if (!resume) {
      throw new ApiError(404, "No resume uploaded yet");
    }
    if (!resume.fileData || resume.fileData.length === 0) {
      // Doc exists but bytes are missing — a data-integrity gap, not a
      // normal 404. Surfaced the same way for now since v1 has no
      // admin/repair tooling to do anything else with it.
      throw new ApiError(404, "Resume file is missing on the server");
    }
    return { fileData: resume.fileData, fileName: resume.fileName, mimeType: resume.mimeType };
  },
};