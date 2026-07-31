import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      unique: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    logoUrl: {
      type: String,
      trim: true,
      default: null,
    },
    website: {
      type: String,
      trim: true,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    eligibilityCriteria: {
      // Freeform text for now (e.g. "CGPA 7+, no active backlogs,
      // CSE/IT/ECE only") rather than a structured schema — there's no
      // confirmed need yet to query/filter by eligibility, so a rigid
      // shape would be premature.
      type: String,
      trim: true,
      default: "",
    },
    importantTopics: {
      // Freeform strings, deliberately NOT a ref into CS Subjects'
      // Topic collection — a topic a company asks about in interviews
      // isn't the same concept as a curriculum topic, and linking the
      // two modules isn't needed for anything built so far.
      type: [String],
      default: [],
    },
    interviewRounds: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

companySchema.index({ name: "text" });
companySchema.index({ tags: 1 });

export const Company = mongoose.model("Company", companySchema);