import mongoose from "mongoose";

// v1 assumption: single-select MCQ only. No multi-select, no
// fill-in-the-blank, no code-execution questions. Flagged explicitly
// below — this is the single biggest scope decision baked into this
// model and it's not stated anywhere in your v1 requirements.
const questionSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MockTest",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["mcq"],
      default: "mcq",
    },
    questionText: {
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
      // Shown during post-submission review. Optional because not
      // every seeded question will have one written yet.
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

questionSchema.index({ test: 1, order: 1 });

export const Question = mongoose.model("Question", questionSchema);