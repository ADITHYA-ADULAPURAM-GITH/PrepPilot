import { Resume } from "../models/Resume.js";
import { ResumeAnalysis } from "../models/ResumeAnalysis.js";
import { ApiError } from "../utils/apiResponse.js";
import { extractResumeText, detectSections, extractBulletLines } from "./resumeParsingService.js";
import { computeDeterministicScore, scoreToHealth } from "./resumeScoringService.js";
import {
  generateResumeAnalysis,
  generateJdMatch,
  improveBullet as geminiImproveBullet,
} from "./geminiClient.js";

const MAX_JD_LENGTH = 8000;
const MAX_BULLET_LENGTH = 500;

function clampRating(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return 50;
  return Math.max(0, Math.min(100, n));
}

/**
 * Blends the deterministic baseline for a category with Gemini's
 * qualitative 0-100 rating for that category, weighted evenly and
 * capped to the category's max points. This is the ONLY place
 * deterministic and LLM-derived numbers are combined — resumeScoringService
 * stays pure/deterministic, geminiClient stays a thin API wrapper.
 */
function blendQualitative(deterministicPoints, maxPoints, qualitativeRating0to100) {
  const qualitativePoints = (clampRating(qualitativeRating0to100) / 100) * maxPoints;
  const blended = deterministicPoints * 0.5 + qualitativePoints * 0.5;
  return Math.round(Math.max(0, Math.min(maxPoints, blended)));
}

export const resumeAnalysisService = {
  async getByUser(userId) {
    return ResumeAnalysis.findOne({ user: userId });
  },

  /**
   * Explicitly user-triggered. Re-extracts text from the resume file
   * already on disk (never persisted), runs deterministic scoring,
   * calls Gemini for qualitative judgment, blends the two, and upserts
   * the single ResumeAnalysis doc for this user.
   */
  async analyze(userId, jdText) {
    const resume = await Resume.findOne({ user: userId });
    if (!resume) {
      throw new ApiError(404, "Upload a resume before running an analysis.");
    }

    const trimmedJd = jdText && jdText.trim() ? jdText.trim().slice(0, MAX_JD_LENGTH) : null;

    const resumeText = await extractResumeText(resume);
    const { sectionsPresent, contactDetails } = detectSections(resumeText);
    const bulletLines = extractBulletLines(resumeText);

    const deterministic = computeDeterministicScore({
      text: resumeText,
      sectionsPresent,
      contactDetails,
      bulletLines,
      jdText: trimmedJd,
    });

    const qualitative = await generateResumeAnalysis(resumeText);

    const finalBreakdown = {
      sections: deterministic.breakdown.sections,
      contactEducation: deterministic.breakdown.contactEducation,
      formatting: deterministic.breakdown.formatting,
      impact: deterministic.breakdown.impact,
      keywordMatch: deterministic.breakdown.keywordMatch,
      skills: blendQualitative(deterministic.breakdown.skills, 15, qualitative?.qualitativeRatings?.skills),
      experienceProjects: blendQualitative(
        deterministic.breakdown.experienceProjects,
        15,
        qualitative?.qualitativeRatings?.experienceProjects
      ),
    };

    const score = Math.min(100, Object.values(finalBreakdown).reduce((a, b) => a + b, 0));

    let jdMatch = {
      available: false,
      percentage: null,
      matchedSkills: [],
      missingSkills: [],
      missingKeywords: [],
      notes: [],
    };

    if (trimmedJd) {
      const jdResult = await generateJdMatch(resumeText, trimmedJd);
      jdMatch = {
        available: true,
        percentage: clampRating(jdResult?.percentage),
        matchedSkills: jdResult?.matchedSkills || [],
        missingSkills: jdResult?.missingSkills || [],
        missingKeywords: jdResult?.missingKeywords || deterministic.missingKeywords || [],
        notes: jdResult?.notes || [],
      };
    }

    const analysisDoc = await ResumeAnalysis.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        resume: resume._id,
        score,
        health: scoreToHealth(score),
        breakdown: finalBreakdown,
        sectionsPresent,
        strengths: qualitative?.strengths || [],
        issues: qualitative?.issues || [],
        topFixes: qualitative?.topFixes || [],
        bulletSuggestions: qualitative?.bulletSuggestions || [],
        keywords: {
          found: qualitative?.keywordsFound || [],
          missing: deterministic.missingKeywords || [],
        },
        jdMatch,
        confidence: qualitative?.confidence || "medium",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return analysisDoc;
  },

  /** Standalone JD match — returned directly, never persisted (JD text is never stored). */
  async matchJd(userId, jdText) {
    if (!jdText || !jdText.trim()) {
      throw new ApiError(400, "Paste a job description to match against.");
    }
    const resume = await Resume.findOne({ user: userId });
    if (!resume) {
      throw new ApiError(404, "Upload a resume before matching against a job description.");
    }

    const trimmedJd = jdText.trim().slice(0, MAX_JD_LENGTH);
    const resumeText = await extractResumeText(resume);
    const jdResult = await generateJdMatch(resumeText, trimmedJd);

    return {
      available: true,
      percentage: clampRating(jdResult?.percentage),
      matchedSkills: jdResult?.matchedSkills || [],
      missingSkills: jdResult?.missingSkills || [],
      missingKeywords: jdResult?.missingKeywords || [],
      notes: jdResult?.notes || [],
    };
  },

  /** Standalone bullet improver — works even without an uploaded resume. */
  async improveBullet(bulletText) {
    if (!bulletText || !bulletText.trim()) {
      throw new ApiError(400, "Paste a bullet point to improve.");
    }
    if (bulletText.length > MAX_BULLET_LENGTH) {
      throw new ApiError(400, "That bullet is too long — try pasting a single line.");
    }
    return geminiImproveBullet(bulletText.trim());
  },

  /**
   * Called by resumeService whenever the underlying Resume is replaced
   * or removed, so an analysis can never describe a file that no longer
   * exists or has changed.
   */
  async invalidateForUser(userId) {
    await ResumeAnalysis.deleteOne({ user: userId });
  },
};
