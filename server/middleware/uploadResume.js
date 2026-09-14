import multer from "multer";
import path from "path";
import { ApiError } from "../utils/apiResponse.js";

const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
]);

function fileFilter(req, file, cb) {
  const extension = path.extname(file.originalname || "").toLowerCase();

  const validExtension = ALLOWED_EXTENSIONS.has(extension);
  const validMimeType =
    ALLOWED_MIME_TYPES.has(file.mimetype) ||
    !file.mimetype;

  if (!validExtension || !validMimeType) {
    return cb(
      new ApiError(
        400,
        "Only PDF, DOC, or DOCX files are allowed"
      )
    );
  }

  cb(null, true);
}

export const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("resume");