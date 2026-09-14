import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemBank",
      required: true,
      index: true,
    },
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

testCaseSchema.index({ problem: 1, order: 1 });

export const TestCase = mongoose.model("TestCase", testCaseSchema);