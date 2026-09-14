import multer from "multer";
import { ApiError } from "../utils/apiResponse.js";



const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(new ApiError(400, "Only PDF or Word documents are allowed"));
  }
  cb(null, true);
}

export const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB — adjust if you need larger resumes
}).single("resume"); // frontend must send the field name "resume"