import mongoose from "mongoose";

const userTopicProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subject: {
      // Denormalized from the topic being tracked, purely for read
      // performance: computing per-subject progress (Subject Dashboard
      // cards, overall stats) would otherwise require a lookup through
      // Topic for every progress record. Written once at creation from
      // the topic's own subject field; never changes afterward, since
      // a topic doesn't move between subjects.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    important: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    lastRevised: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// One progress record per user per topic — enforced at the DB level,
// not just in application logic.
userTopicProgressSchema.index({ user: 1, topic: 1 }, { unique: true });
userTopicProgressSchema.index({ user: 1, subject: 1 });

export const UserTopicProgress = mongoose.model("UserTopicProgress", userTopicProgressSchema);