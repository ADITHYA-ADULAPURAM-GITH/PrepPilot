import crypto from "crypto";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiResponse.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

export const authService = {
  async register({ name, email, password }) {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new ApiError(409, "An account with this email already exists");
    }

    const user = await User.create({ name, email, password });

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString(), true);

    return { user: user.toSafeObject(), accessToken, refreshToken };
  },

  async login({ email, password, rememberMe }) {
    const user = await User.findOne({ email }).select("+password +refreshTokenVersion");
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString(), rememberMe);

    return { user: user.toSafeObject(), accessToken, refreshToken, rememberMe };
  },

  async rotateRefreshToken(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(401, "Session expired. Please sign in again.");
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiError(401, "Session expired. Please sign in again.");
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      throw new ApiError(401, "Account no longer exists");
    }

    const accessToken = signAccessToken(user._id.toString());
    return { accessToken, user: user.toSafeObject() };
  },

  async requestPasswordReset(email) {
    const user = await User.findOne({ email });
    // Deliberately don't throw if user isn't found — the controller
    // always responds with the same generic message so this endpoint
    // can't be used to enumerate registered emails.
    if (!user) return null;

    const rawToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    return rawToken; // caller (controller/service) is responsible for emailing this
  },

  async resetPassword(rawToken, newPassword) {
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select("+passwordResetToken +passwordResetExpires +refreshTokenVersion");

    if (!user) {
      throw new ApiError(400, "Reset link is invalid or has expired");
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokenVersion += 1; // invalidate any outstanding refresh tokens
    await user.save();

    return user.toSafeObject();
  },
};
