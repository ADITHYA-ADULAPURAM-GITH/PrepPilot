import mongoose from "mongoose";

const problemProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemBank",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["assigned", "in-progress", "solved"],
        message: "Status must be assigned, in-progress, or solved",
      },
      default: "assigned",
    },
    attemptsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastAttemptAt: {
      type: Date,
      default: null,
    },
    nextReviewAt: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    // Deliberately loose — the mastery formula is not designed yet
    // (handoff section 12). Do not hardcode a shape here prematurely.
    masteryEvidence: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

problemProgressSchema.index({ user: 1, problem: 1 }, { unique: true });
problemProgressSchema.index({ user: 1, status: 1 });

export const ProblemProgress = mongoose.model("ProblemProgress", problemProgressSchema);