import { Router } from "express";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
// Future domains mount here: router.use("/dsa", dsaRoutes); etc.

export default router;
