// Fully deterministic scoring — no LLM calls, no network calls. Every
// number here is reproducible from the same resume/JD text every time.
// Gemini's qualitative ratings are blended in separately by
// resumeAnalysisService, never inside this file.

const IMPACT_NUMBER_REGEX = /\d+(\.\d+)?%|\b\d{2,}\+?\b|\$\d+|\b\d+x\b/i;
const WEAK_VERBS_REGEX = /\b(responsible for|worked on|helped with|involved in|assisted)\b/i;
const STRONG_VERB_REGEX =
  /^(built|developed|designed|implemented|led|created|architected|optimized|automated|reduced|increased|launched|shipped|improved|migrated|refactored|deployed|engineered)\b/i;

function scoreSections(sectionsPresent) {
  const required = ["contact", "education", "skills", "experience"];
  const optional = ["summary", "projects", "certifications", "achievements"];

  const requiredHit = required.filter((k) => sectionsPresent[k]).length;
  const optionalHit = optional.filter((k) => sectionsPresent[k]).length;

  const requiredScore = (requiredHit / required.length) * 15;
  const optionalScore = (optionalHit / optional.length) * 5;
  return Math.round(requiredScore + optionalScore);
}

function scoreContactEducation(contactDetails, sectionsPresent) {
  let points = 0;
  if (contactDetails.hasEmail) points += 3;
  if (contactDetails.hasPhone) points += 2;
  if (contactDetails.hasLinkedIn || contactDetails.hasGithub) points += 2;
  if (sectionsPresent.education) points += 3;
  return Math.min(points, 10);
}

function scoreFormatting(text, bulletLines) {
  let points = 10;
  const lineCount = text.split("\n").length;

  // Long unbroken paragraphs (few line breaks relative to length) tend
  // to read poorly for ATS parsers.
  if (lineCount < 15 && text.length > 1500) points -= 3;

  // No bullet points at all is a common ATS-parsing complaint.
  if (bulletLines.length === 0) points -= 3;

  // Very short resumes usually mean missing content, not just terseness.
  if (text.length < 800) points -= 2;

  // High ratio of unusual characters is a rough proxy for tables/columns
  // that often break ATS text extraction — not a real layout parser.
  const specialCharRatio = (text.match(/[^\w\s.,\-()/@:%+]/g) || []).length / text.length;
  if (specialCharRatio > 0.05) points -= 2;

  return Math.max(points, 0);
}

function scoreImpact(bulletLines) {
  if (bulletLines.length === 0) return 0;
  const withNumbers = bulletLines.filter((b) => IMPACT_NUMBER_REGEX.test(b)).length;
  return Math.round((withNumbers / bulletLines.length) * 10);
}

function scoreSkillsBaseline(sectionsPresent, text) {
  if (!sectionsPresent.skills) return 0;
  const skillsBlockMatch = text.match(/skills[\s\S]{0,600}/i);
  if (!skillsBlockMatch) return 6; // header found, nothing to count
  const tokenCount = skillsBlockMatch[0]
    .split(/[,|•\n]/)
    .map((t) => t.trim())
    .filter(Boolean).length;
  return Math.min(6 + Math.floor(tokenCount / 3), 15);
}

function scoreExperienceProjectsBaseline(sectionsPresent, bulletLines) {
  let points = 0;
  if (sectionsPresent.experience) points += 6;
  if (sectionsPresent.projects) points += 4;

  const strongVerbBullets = bulletLines.filter((b) => STRONG_VERB_REGEX.test(b)).length;
  const weakBullets = bulletLines.filter((b) => WEAK_VERBS_REGEX.test(b)).length;
  points += Math.min(strongVerbBullets, 5);
  points -= Math.min(weakBullets, 3);

  return Math.max(Math.min(points, 15), 0);
}

function extractKeywordCandidates(text) {
  const words = text.toLowerCase().match(/[a-z][a-z0-9+.#-]{1,}/g) || [];
  return [...new Set(words)].filter((w) => w.length > 2);
}

function scoreKeywordMatch(resumeText, jdText) {
  if (!jdText) return { score: null, matchedKeywords: [], missingKeywords: [] };

  const resumeTokens = new Set(extractKeywordCandidates(resumeText));
  const jdTokens = extractKeywordCandidates(jdText).slice(0, 60);

  const matched = jdTokens.filter((t) => resumeTokens.has(t));
  const missing = jdTokens.filter((t) => !resumeTokens.has(t));
  const ratio = jdTokens.length ? matched.length / jdTokens.length : 0;

  return {
    score: Math.round(ratio * 20),
    matchedKeywords: matched,
    missingKeywords: missing,
  };
}

/**
 * Computes the full deterministic breakdown out of 100. When no JD is
 * provided, the 20 JD-match points are redistributed proportionally
 * across the other six categories rather than dropped or faked, so the
 * total still scales sensibly to /100.
 */
export function computeDeterministicScore({ text, sectionsPresent, contactDetails, bulletLines, jdText }) {
  const sections = scoreSections(sectionsPresent);
  const contactEducation = scoreContactEducation(contactDetails, sectionsPresent);
  const formatting = scoreFormatting(text, bulletLines);
  const impact = scoreImpact(bulletLines);
  const skills = scoreSkillsBaseline(sectionsPresent, text);
  const experienceProjects = scoreExperienceProjectsBaseline(sectionsPresent, bulletLines);
  const keywordResult = scoreKeywordMatch(text, jdText);

  let breakdown = { sections, contactEducation, formatting, impact, skills, experienceProjects };
  let keywordMatch;

  if (keywordResult.score === null) {
    const REDISTRIBUTE_FACTOR = 20 / 80; // spread the unused 20 pts across the 80-pt remainder
    breakdown = {
      sections: Math.round(sections * (1 + REDISTRIBUTE_FACTOR)),
      contactEducation: Math.round(contactEducation * (1 + REDISTRIBUTE_FACTOR)),
      formatting: Math.round(formatting * (1 + REDISTRIBUTE_FACTOR)),
      impact: Math.round(impact * (1 + REDISTRIBUTE_FACTOR)),
      skills: Math.round(skills * (1 + REDISTRIBUTE_FACTOR)),
      experienceProjects: Math.round(experienceProjects * (1 + REDISTRIBUTE_FACTOR)),
    };
    keywordMatch = 0;
  } else {
    keywordMatch = keywordResult.score;
  }

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0) + keywordMatch;

  return {
    breakdown: { ...breakdown, keywordMatch },
    total: Math.min(total, 100),
    jdAvailable: keywordResult.score !== null,
    matchedKeywords: keywordResult.matchedKeywords,
    missingKeywords: keywordResult.missingKeywords,
  };
}

export function scoreToHealth(score) {
  if (score >= 85) return "Strong";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Needs Work";
}
