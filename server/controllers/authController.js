import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { authService } from "../services/authService.js";
import { refreshCookieMaxAge } from "../utils/jwt.js";
import { env } from "../config/env.js";

const REFRESH_COOKIE_NAME = "refreshToken";

const cookieOptions = (rememberMe = true) => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: refreshCookieMaxAge(rememberMe),
  path: "/api/v1/auth",
});

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body);

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, cookieOptions(true));
  res.status(201).json(new ApiResponse(201, { user, accessToken }, "Account created"));
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken, rememberMe } = await authService.login(req.body);

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, cookieOptions(rememberMe));
  res.status(200).json(new ApiResponse(200, { user, accessToken }, "Signed in"));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  const { accessToken, user } = await authService.rotateRefreshToken(token);

  res.status(200).json(new ApiResponse(200, { accessToken, user }, "Session refreshed"));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/v1/auth" });
  res.status(200).json(new ApiResponse(200, null, "Signed out"));
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user.toSafeObject() }, "OK"));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const rawToken = await authService.requestPasswordReset(req.body.email);

  if (rawToken) {
    const resetUrl = `${env.CLIENT_URL}/reset-password/${rawToken}`;
    // TODO: wire up a real transactional email provider (e.g. Resend, SES).
    // Logging for now so the flow is testable end-to-end in development.
    console.log(`[password reset] ${req.body.email} → ${resetUrl}`);
  }

  // Same response whether or not the account exists — prevents email enumeration.
  res.status(200).json(new ApiResponse(200, null, "If that email exists, a reset link has been sent"));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const user = await authService.resetPassword(req.params.token, req.body.password);
  res.status(200).json(new ApiResponse(200, { user }, "Password reset. Please sign in again."));
});
