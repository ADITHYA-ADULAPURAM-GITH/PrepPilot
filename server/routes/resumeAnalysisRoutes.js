import { Router } from "express";
import * as resumeAnalysisController from "../controllers/resumeAnalysisController.js";
import { requireAuth } from "../middleware/auth.js";
import { resumeAnalysisRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.use(requireAuth);

// Mounted at the same "/resume" prefix as the existing resumeRoutes
// (see routes/index.js) — paths here ("/analysis", "/jd-match",
// "/bullet-improve") don't collide with resumeRoutes' "/" and "/download".
router.get("/analysis", resumeAnalysisController.getAnalysis);
router.post("/analysis", resumeAnalysisRateLimiter, resumeAnalysisController.runAnalysis);
router.post("/jd-match", resumeAnalysisRateLimiter, resumeAnalysisController.matchJd);
router.post("/bullet-improve", resumeAnalysisRateLimiter, resumeAnalysisController.improveBullet);

export default router;
