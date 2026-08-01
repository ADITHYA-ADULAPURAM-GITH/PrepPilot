import multer from "multer";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/apiResponse.js";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "resumes");

// multer does not create destination directories on its own — without
// this, the first upload attempt fails with ENOENT.
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // userId + timestamp avoids collisions and avoids trusting the
    // original filename as a path component (traversal risk).
    const ext = path.extname(file.originalname);
    cb(null, `${req.user._id}-${Date.now()}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(new ApiError(400, "Only PDF or Word documents are allowed"));
  }
  cb(null, true);
}

export const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB — adjust if you need larger resumes
}).single("resume"); // frontend must send the field name "resume"