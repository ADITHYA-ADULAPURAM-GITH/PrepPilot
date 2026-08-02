import mongoose from "mongoose";

const mockTestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },
    category: {
      type: String,
      enum: ["Aptitude", "SQL", "Python", "DSA", "Company-specific"],
      required: true,
    },
    // Only meaningful when category is "Company-specific" — not a ref
    // into the Company collection, deliberately: same reasoning as
    // Company.importantTopics staying freeform (see companyModel.js
    // comment) — no confirmed need yet to join the two collections.
    companyName: {
      type: String,
      trim: true,
      default: null,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    // Denormalized count, kept in sync by the service layer whenever
    // questions are added/removed — avoids a Question.countDocuments()
    // call every time the test list is rendered.
    totalQuestions: {
      type: Number,
      default: 0,
    },
    isActive: {
      // Lets a test be retired/hidden from the catalog without deleting
      // it or orphaning historical TestAttempt records that reference it.
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

mockTestSchema.index({ category: 1, difficulty: 1 });

export const MockTest = mongoose.model("MockTest", mockTestSchema);