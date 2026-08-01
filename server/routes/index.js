import { Router } from "express";
import authRoutes from "./authRoutes.js";
import problemRoutes from "./problemRoutes.js";
import subjectRoutes from "./subjectRoutes.js";
import companyRoutes from "./companyRoutes.js";
import resumeRoutes from "./resumeRoutes.js";
import studyTaskRoutes from "./studyTaskRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/problems", problemRoutes);
router.use("/subjects", subjectRoutes);
router.use("/companies", companyRoutes);
router.use("/resume", resumeRoutes);
router.use("/study-tasks", studyTaskRoutes);
router.use("/analytics", analyticsRoutes);
// Future domains mount here: router.use("/mocktests", mockTestRoutes); etc.

export default router;