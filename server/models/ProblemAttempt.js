import mongoose from "mongoose";

const problemAttemptSchema = new mongoose.Schema(
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
    progress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemProgress",
      required: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      maxlength: 20000,
    },
    result: {
      type: String,
      enum: [
        "Accepted",
        "WrongAnswer",
        "CompilationError",
        "RuntimeError",
        "TimeLimitExceeded",
        "MemoryLimitExceeded",
      ],
      required: true,
    },
    runtimeMs: { type: Number, default: null },
    memoryKb: { type: Number, default: null },
    attemptNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

problemAttemptSchema.index({ user: 1, problem: 1, submittedAt: -1 });

export const ProblemAttempt = mongoose.model("ProblemAttempt", problemAttemptSchema);