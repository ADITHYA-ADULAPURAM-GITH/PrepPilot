import mongoose from "mongoose";

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
    fileData: {
      // raw file bytes
      type: Buffer,
      required: true,
      select: false, // never loaded on normal finds; opt in explicitly where the bytes are actually needed
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