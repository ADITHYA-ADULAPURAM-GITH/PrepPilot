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
