import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    platform: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "LeetCode",
    },
    problemUrl: {
      type: String,
      trim: true,
      default: null,
      match: [/^https?:\/\/.+/, "Enter a valid URL"],
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
      maxlength: 60,
    },
    difficulty: {
      type: String,
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard",
      },
      required: [true, "Difficulty is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["Todo", "Solved"],
        message: "Status must be Todo or Solved",
      },
      default: "Todo",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    revisionCount: {
      type: Number,
      default: 0,
      min: [0, "Revision count can't be negative"],
    },
    lastRevised: {
      type: Date,
      default: null,
    },
    dateSolved: {
      type: Date,
      default: null,
    },
    // Explicit, optional link to the corresponding ProblemBank problem.
    // Null means this tracker problem has no matching workspace problem yet —
    // the tracker continues to function normally for it (no Solve action).
    problemBankRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemBank",
      default: null,
      index: true,
    },
    // Optional stable natural key mirroring ProblemBank.externalId.
    // Not required — legacy rows and rows with no known external source
    // stay null indefinitely. Once populated (going forward, or via a
    // deliberate backfill), it allows exact-match linking to ProblemBank
    // without relying on title text at all. Not unique here: multiple
    // users' tracker rows may legitimately reference the same external
    // problem via the same externalId.
    externalId: {
      type: String,
      trim: true,
      default: null,
      maxlength: 120,
      index: true,
    },
  },
  { timestamps: true }
);

problemSchema.index({ user: 1, createdAt: -1 });
problemSchema.index({ user: 1, topic: 1 });
problemSchema.index({ user: 1, difficulty: 1 });
problemSchema.index({ user: 1, status: 1 });

export const Problem = mongoose.model("Problem", problemSchema);