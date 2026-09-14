import mongoose from "mongoose";


const bulletSuggestionSchema = new mongoose.Schema(
  {
    original: { type: String, required: true },
    improved: { type: String, required: true },
    reason: { type: String, required: true },
  },
  { _id: false }
);

const topFixSchema = new mongoose.Schema(
  {
    severity: { type: String, enum: ["high", "medium", "low"], default: "medium" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    why: { type: String, required: true },
  },
  { _id: false }
);

const jdMatchSchema = new mongoose.Schema(
  {
    available: { type: Boolean, default: false },
    percentage: { type: Number, default: null },
    matchedSkills: { type: [String], default: [] },
    missingSkills: { type: [String], default: [] },
    missingKeywords: { type: [String], default: [] },
    notes: { type: [String], default: [] },
  },
  { _id: false }
);

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // Ties this analysis to the specific Resume it was run against.
    // resumeService deletes this doc whenever the linked Resume is
    // replaced or removed, so an analysis can never outlive the file
    // it describes.
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },

    score: { type: Number, required: true, min: 0, max: 100 },
    health: { type: String, enum: ["Needs Work", "Fair", "Good", "Strong"], required: true },

    // Deterministic sub-scores (sections/contactEducation/formatting/
    // impact/keywordMatch) are computed purely from resumeScoringService.
    // skills/experienceProjects are a blend of that deterministic
    // baseline with Gemini's qualitative rating — see
    // resumeAnalysisService.blendQualitative for the exact formula.
    breakdown: {
      sections: { type: Number, required: true },
      keywordMatch: { type: Number, required: true },
      skills: { type: Number, required: true },
      experienceProjects: { type: Number, required: true },
      impact: { type: Number, required: true },
      formatting: { type: Number, required: true },
      contactEducation: { type: Number, required: true },
    },

    sectionsPresent: {
      contact: { type: Boolean, default: false },
      summary: { type: Boolean, default: false },
      education: { type: Boolean, default: false },
      skills: { type: Boolean, default: false },
      experience: { type: Boolean, default: false },
      projects: { type: Boolean, default: false },
      certifications: { type: Boolean, default: false },
      achievements: { type: Boolean, default: false },
    },

    strengths: { type: [String], default: [] },
    issues: { type: [String], default: [] },
    topFixes: { type: [topFixSchema], default: [] },
    bulletSuggestions: { type: [bulletSuggestionSchema], default: [] },

    keywords: {
      found: { type: [String], default: [] },
      missing: { type: [String], default: [] },
    },

    // Result of the most recent JD match run as part of analyze(). The
    // standalone /jd-match endpoint does NOT persist here — it returns
    // its result directly to the caller (JD text is never stored).
    jdMatch: { type: jdMatchSchema, default: () => ({ available: false }) },

    confidence: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  },
  { timestamps: true }
);

export const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
