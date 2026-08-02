import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedOptionIndex: {
      // null, not omitted, when the user never answered this question
      // before submit/auto-submit — needed to distinguish "skipped"
      // from "answered option 0" during review.
      type: Number,
      default: null,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const testAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MockTest",
      required: true,
      index: true,
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
    score: {
      // Count of correct answers. No negative marking, no partial
      // credit in v1 — not stated in your requirements, flagged below.
      type: Number,
      default: 0,
    },
    totalQuestions: {
      // Snapshotted at submit time from the test's question count.
      // Deliberately NOT a live reference to MockTest.totalQuestions —
      // if a test's question set changes after this attempt, historical
      // attempts must still show the score against what was actually
      // taken, not today's version of the test.
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "submitted", "auto-submitted"],
      default: "in-progress",
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

testAttemptSchema.index({ user: 1, test: 1, createdAt: -1 });

export const TestAttempt = mongoose.model("TestAttempt", testAttemptSchema);