import mongoose from "mongoose";

const mentorMessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, _id: false }
);


const mentorConversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    messages: {
      type: [mentorMessageSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const MentorConversation = mongoose.model("MentorConversation", mentorConversationSchema);