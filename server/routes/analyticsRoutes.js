import { Router } from "express";
import * as analyticsController from "../controllers/analyticsController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/overview", analyticsController.getOverview);
router.get("/next-activity", analyticsController.getNextActivity);

export default router;