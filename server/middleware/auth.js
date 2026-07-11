import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiResponse.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authenticated");
  }

  const token = authHeader.split(" ")[1];

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, "Invalid or expired session. Please sign in again.");
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new ApiError(401, "Account no longer exists");
  }

  req.user = user;
  next();
});

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, "You don't have permission to do this"));
  }
  next();
};
