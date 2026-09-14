import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"],
    },
    password: {
      type: String,
      // Required only for accounts originally created via email/password.
      // Google-only accounts (authProvider: "google") never receive a
      // password and must be able to save without one. A linked account
      // (local origin + googleId added later) keeps authProvider "local"
      // and therefore keeps this required — but it already has a password
      // at that point, so this never blocks it from using either login method.
      required: function () {
        return this.authProvider === "local";
      },
      minlength: 8,
      select: false, // never returned by default on find queries
    },
    authProvider: {
      // Records how the account was ORIGINALLY created. Never changed
      // during Google account-linking — linking only adds googleId to
      // an existing local account, it does not convert authProvider.
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      // Google's stable per-user subject identifier ("sub" claim).
      // No `default` on purpose: local-only accounts must have this
      // field genuinely ABSENT, not present-with-value-null. A sparse
      // unique index only excludes documents where the field doesn't
      // exist at all — an explicit `null` still counts as "has the
      // field" and would collide across every local-only account.
      type: String,
      select: false,
      unique: true,
      sparse: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    refreshTokenVersion: {
      // bumped on logout/password-change to invalidate all outstanding refresh tokens
      type: Number,
      default: 0,
      select: false,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
      mentor: {
      name: {
        type: String,
        trim: true,
        maxlength: 40,
        default: null,
      },
      avatar: {
        type: String,
        enum: ["male", "female"],
        default: null,
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  if (!this.password) return; // Google-only accounts may have no password to hash

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  if (!this.password) return Promise.resolve(false); // Google-only account has no password to match
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatarUrl: this.avatarUrl,
    role: this.role,
    isEmailVerified: this.isEmailVerified,
    authProvider: this.authProvider,
    createdAt: this.createdAt,
    mentor: this.mentor,
  };
};

export const User = mongoose.model("User", userSchema);