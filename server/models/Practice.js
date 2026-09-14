import mongoose from "mongoose";

// Embedded, not a separate collection — unlike Question (which belongs
// to a MockTest and is scored via TestAttempt), a practice MCQ has no
// gating, no attempt record, and no independent lifecycle of its own.
// It only ever exists as part of its parent Practice item, so it's
// modeled the same way ProblemBank embeds its exampleSchema.
const practiceQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
      maxlength: 1000,
    },
    options: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 2 && arr.length <= 6,
        message: "A question must have between 2 and 6 options",
      },
      required: true,
    },
    correctOptionIndex: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0 && value < this.options.length;
        },
        message: "correctOptionIndex must reference an existing option",
      },
    },
    explanation: {
      // Shown immediately after the user answers, regardless of
      // correct/incorrect — this is the "immediate feedback" part of
      // practice, so unlike Question.explanation (optional, shown only
      // in post-submission review) this is expected to be populated.
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
  },
  { _id: false }
);

const practiceSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 150,
    },
    questions: {
      type: [practiceQuestionSchema],
      default: [],
    },
    order: {
      // Display order within the topic's practice list, same convention
      // as Resource.order / Topic.order.
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

practiceSchema.index({ topic: 1, order: 1 });

export const Practice = mongoose.model("Practice", practiceSchema);