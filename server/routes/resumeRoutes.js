import { Router } from "express";
import * as resumeController from "../controllers/resumeController.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadResume as uploadResumeMiddleware } from "../middleware/uploadResume.js";

const router = Router();

router.use(requireAuth);

router.get("/", resumeController.getResume);
router.get("/download", resumeController.downloadResume);
router.post("/", uploadResumeMiddleware, resumeController.uploadResume);
router.delete("/", resumeController.deleteResume);

export default router;