import { Router } from "express";
import authRoutes from "./authRoutes.js";
import problemRoutes from "./problemRoutes.js";
import subjectRoutes from "./subjectRoutes.js";
import companyRoutes from "./companyRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/problems", problemRoutes);
router.use("/subjects", subjectRoutes);
router.use("/companies", companyRoutes);
// Future domains mount here: router.use("/mocktests", mockTestRoutes); etc.

export default router;