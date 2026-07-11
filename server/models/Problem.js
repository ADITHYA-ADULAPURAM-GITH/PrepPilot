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
  },
  { timestamps: true }
);

problemSchema.index({ user: 1, createdAt: -1 });
problemSchema.index({ user: 1, topic: 1 });
problemSchema.index({ user: 1, difficulty: 1 });
problemSchema.index({ user: 1, status: 1 });

export const Problem = mongoose.model("Problem", problemSchema);