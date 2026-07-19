import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Topic title is required"],
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    order: {
      // Position within the subject's topic list (CPU Scheduling
      // before Deadlocks, etc.) — a field, not array index, so topics
      // can be reordered or inserted without shifting unrelated data.
      type: Number,
      default: 0,
    },

    // Deliberately not implemented in this step, but this is where
    // each future addition slots in as a plain new field — no
    // restructuring needed, since UserTopicProgress only ever
    // references topic._id and doesn't care what else lives here:
    //   difficulty: { type: String, enum: [...] }
    //   companyTags: [{ type: String }]
    //   estimatedMinutes: Number
    //   resources: [{ type: ObjectId, ref: "Resource" }]  (own collection,
    //     since a resource - a YouTube link, article, PDF - can reasonably
    //     be shared across topics/subjects)
    //   interviewQuestions: [{ type: ObjectId, ref: "InterviewQuestion" }]
    //   revisionFrequencyDays: Number
  },
  { timestamps: true }
);

// A topic's slug only needs to be unique within its subject (e.g. two
// different subjects could each reasonably have a topic that slugifies
// the same way), not globally.
topicSchema.index({ subject: 1, slug: 1 }, { unique: true });
topicSchema.index({ subject: 1, order: 1 });

export const Topic = mongoose.model("Topic", topicSchema);