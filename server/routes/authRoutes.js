import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import { authRateLimiter, forgotPasswordRateLimiter } from "../middleware/rateLimiter.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/authValidator.js";

const router = Router();

router.post("/register", authRateLimiter, validate(registerSchema), authController.register);
router.post("/login", authRateLimiter, validate(loginSchema), authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.getMe);
router.post(
  "/forgot-password",
  forgotPasswordRateLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);
router.post("/reset-password/:token", validate(resetPasswordSchema), authController.resetPassword);

export default router;
