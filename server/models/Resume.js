import mongoose from "mongoose";

// v1 scope: one active resume per user, no version history.
// "Replace" means the existing file + doc get overwritten, not a new
// version appended — Version Management is explicitly future scope.
const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // enforces one resume per user at the DB level
      index: true,
    },
    fileName: {
      // original filename as uploaded, shown to the user in the UI
      type: String,
      required: true,
      trim: true,
    },
    filePath: {
      // path relative to server root, e.g. "uploads/resumes/<generatedName>.pdf"
      // stored relative (not absolute) so it survives moving the project directory
      type: String,
      required: true,
    },
    fileSize: {
      // bytes, as reported by multer
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt doubles as "Upload Date"; updatedAt reflects last replace
);

export const Resume = mongoose.model("Resume", resumeSchema);