import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccessToken(userId) {
  return jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY,
  });
}

export function signRefreshToken(userId, rememberMe = true) {
  const expiresIn = rememberMe ? env.JWT_REFRESH_EXPIRY_LONG : env.JWT_REFRESH_EXPIRY_SHORT;
  return jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, { expiresIn });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}

/** ms lifetime for the refresh cookie's maxAge, matching the token's own expiry */
export function refreshCookieMaxAge(rememberMe = true) {
  const days = rememberMe ? 30 : 1;
  return days * 24 * 60 * 60 * 1000;
}
