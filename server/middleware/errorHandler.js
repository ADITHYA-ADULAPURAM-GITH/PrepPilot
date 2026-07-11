import { env } from "../config/env.js";
import { ApiError } from "../utils/apiResponse.js";

export function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let error = err;

  if (!(error instanceof ApiError)) {
    // Mongoose duplicate key
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      error = new ApiError(409, `An account with this ${field} already exists`);
    }
    // Mongoose validation error
    else if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => ({ field: e.path, message: e.message }));
      error = new ApiError(400, "Validation failed", errors);
    }
    // JWT errors
    else if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      error = new ApiError(401, "Invalid or expired session. Please sign in again.");
    } else {
      error = new ApiError(error.statusCode || 500, error.message || "Internal server error");
    }
  }

  if (error.statusCode >= 500) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl} —`, err);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors || [],
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
