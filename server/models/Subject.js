import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      unique: true,
      maxlength: 80,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    icon: {
      // lucide-react icon name (e.g. "Cpu", "Database") used by the
      // Subject Dashboard cards — kept as a string, not an enum, so
      // new icons don't require a schema change.
      type: String,
      trim: true,
      default: null,
    },
    order: {
      // Display order on the Subject Dashboard. A plain number rather
      // than relying on array position, so subjects can be reordered
      // via a single field update instead of touching the whole catalog.
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// This schema intentionally holds only what identifies and displays a
// subject. Anything describing depth of coverage (topics, difficulty,
// resources, etc.) belongs on Topic below, and anything describing a
// specific user's progress belongs on UserTopicProgress (Step 2) — not
// here — so this catalog stays shared and untouched by per-user data.

export const Subject = mongoose.model("Subject", subjectSchema);
