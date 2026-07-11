import { Router } from "express";
import authRoutes from "./authRoutes.js";
import problemRoutes from "./problemRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/problems", problemRoutes);
// Future domains mount here: router.use("/dsa", dsaRoutes); etc.

export default router;
