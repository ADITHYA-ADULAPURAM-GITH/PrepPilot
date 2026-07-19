import { Router } from "express";
import authRoutes from "./authRoutes.js";
import problemRoutes from "./problemRoutes.js";
import subjectRoutes from "./subjectRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/problems", problemRoutes);
router.use("/subjects", subjectRoutes);
// Future domains mount here: router.use("/companies", companyRoutes); etc.

export default router;