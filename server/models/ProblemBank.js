import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    input: { type: String, trim: true },
    output: { type: String, trim: true },
    explanation: { type: String, trim: true },
  },
  { _id: false }
);

const problemBankSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 5000,
    },
    difficulty: {
      type: String,
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard",
      },
      required: [true, "Difficulty is required"],
    },
    topics: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one topic is required",
      },
    },
    patterns: {
      type: [String],
      default: [],
    },
    examples: {
      type: [exampleSchema],
      default: [],
    },
    constraints: {
      type: [String],
      default: [],
    },
    starterCode: {
      javascript: { type: String, default: "" },
      python: { type: String, default: "" },
    },
    entryPoint: {
      javascript: { type: String, required: true },
      python: { type: String, required: true },
    },
    supportedLanguages: {
      type: [String],
      default: ["javascript", "python"],
    },
    source: {
      type: String,
      trim: true,
      required: true,
      default: "internal",
    },
    externalId: {
      type: String,
      trim: true,
      default: null,
    },
    externalUrl: {
      type: String,
      trim: true,
      default: null,
      match: [/^https?:\/\/.+/, "Enter a valid URL"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Only enforced when externalId is actually a string — internal/manual
// problems with no externalId are exempt (partial index avoids treating
// every null as a collision).
problemBankSchema.index(
  { source: 1, externalId: 1 },
  { unique: true, partialFilterExpression: { externalId: { $type: "string" } } }
);
problemBankSchema.index({ topics: 1, difficulty: 1, isActive: 1 });

export const ProblemBank = mongoose.model("ProblemBank", problemBankSchema);