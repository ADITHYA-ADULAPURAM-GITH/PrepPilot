import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as mentorController from "../controllers/mentorController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

// Protects the shared free-tier Gemini quota from a single chatty user —
// deliberately conservative given free-tier limits are low and unpublished
// per-project. Tune once real usage is observed.
const mentorLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many messages. Please slow down." },
});

router.get("/conversation", mentorController.getConversation);
router.post("/chat", mentorLimiter, mentorController.sendMessage);

export default router;