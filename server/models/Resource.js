import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: ["article", "notes", "video", "link"],
        message: "Type must be article, notes, video, or link",
      },
      required: [true, "Type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 150,
    },
    body: {
      // The actual in-app content (markdown/plain text) — this is what
      // makes a Resource real study material inside PrepPilot rather
      // than just a pointer out to somewhere else. Not required at the
      // schema level so a "link"-type resource can rely on url alone,
      // but article/notes/video resources are expected to populate it.
      type: String,
      trim: true,
      default: "",
    },
    url: {
      // Optional external reference (e.g. a video link, a further-reading
      // link) — supplementary to body, never a substitute for it.
      type: String,
      trim: true,
      default: null,
      match: [/^https?:\/\/.+/, "Enter a valid URL"],
    },
    order: {
      // Display order within the topic's resource list, same convention
      // as Topic.order and Subject.order — a field, not array position,
      // so resources can be reordered/inserted without shifting others.
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

resourceSchema.index({ topic: 1, order: 1 });

export const Resource = mongoose.model("Resource", resourceSchema);