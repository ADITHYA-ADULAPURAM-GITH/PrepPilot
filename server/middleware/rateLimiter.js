import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/apiResponse.js";

const handler = (req, res, next) => next(new ApiError(429, "Too many attempts. Try again in a few minutes."));

// Tighter limit on credential-guessing-prone routes.
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

// Even tighter on the endpoint that triggers an email send.
export const forgotPasswordRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

// Resume analysis / JD match / bullet improver each trigger a Gemini
// call — capped independently to bound AI cost and abuse, while still
// allowing reasonable iterative use (re-analyzing after edits, trying a
// few different bullets).
export const resumeAnalysisRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
