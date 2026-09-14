import path from "path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { Resume } from "../models/Resume.js";
import { ApiError } from "../utils/apiResponse.js";

// Deterministic-only module: text extraction and structural detection.
// No Gemini calls happen here — see resumeAnalysisService for where
// deterministic output and LLM output are combined.

const SECTION_PATTERNS = {
  summary: /\b(summary|objective|profile)\b/i,
  education: /\b(education|academic background)\b/i,
  skills: /\b(skills|technical skills|technologies)\b/i,
  experience: /\b(experience|work experience|employment history|internship)\b/i,
  projects: /\b(projects|personal projects|academic projects)\b/i,
  certifications: /\b(certifications?|licenses?)\b/i,
  achievements: /\b(achievements|awards|honors)\b/i,
};

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;
const LINKEDIN_REGEX = /linkedin\.com\/in\/[a-zA-Z0-9-]+/i;
const GITHUB_REGEX = /github\.com\/[a-zA-Z0-9-]+/i;

const EXTRACT_TIMEOUT_MS = 15000;

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new ApiError(422, message)), ms)),
  ]);
}

async function extractFromPdfBuffer(buffer) {
  // pdf-parse v2 (2.x) replaced the v1 callable default export with a
  // named PDFParse class: construct it with the buffer, call getText(),
  // then destroy() to release the underlying worker/document resources.
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await withTimeout(
      parser.getText(),
      EXTRACT_TIMEOUT_MS,
      "This PDF took too long to read. It may be corrupted or scanned as images."
    );
    return result.text || "";
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      422,
      "Couldn't read this PDF. It may be corrupted, password-protected, or scanned as images."
    );
  } finally {
    await parser.destroy();
  }
}

async function extractFromDocxBuffer(buffer) {
  try {
    const result = await withTimeout(
      mammoth.extractRawText({ buffer }),
      EXTRACT_TIMEOUT_MS,
      "This Word document took too long to read. It may be corrupted."
    );
    return result.value || "";
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(422, "Couldn't read this Word document. It may be corrupted.");
  }
}

/**
 * Extracts raw text from the resume file stored on the Resume document
 * (fileData is select: false, so it's re-fetched here explicitly).
 * The returned string is transient — callers must use it in-memory for
 * the current request only and must NOT persist it anywhere.
 */
export async function extractResumeText(resume) {
  const withBytes = await Resume.findById(resume._id).select("+fileData");
  if (!withBytes || !withBytes.fileData || withBytes.fileData.length === 0) {
    throw new ApiError(404, "Resume file is missing on the server");
  }
  const buffer = withBytes.fileData;

  const ext = path.extname(resume.fileName || "").toLowerCase();
  let text;

  if (resume.mimeType === "application/pdf" || ext === ".pdf") {
    text = await extractFromPdfBuffer(buffer);
  } else if (
    resume.mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    ext === ".docx"
  ) {
    text = await extractFromDocxBuffer(buffer);
  } else if (resume.mimeType === "application/msword" || ext === ".doc") {
    // Legacy binary .doc isn't reliably parseable by mammoth (docx-only).
    throw new ApiError(
      422,
      "Legacy .doc files aren't supported for analysis yet. Please re-upload as PDF or .docx."
    );
  } else {
    throw new ApiError(422, "Unsupported file type for analysis.");
  }

  const cleaned = text.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").trim();
  if (!cleaned || cleaned.length < 50) {
    throw new ApiError(
      422,
      "Couldn't extract meaningful text from this file. It may be a scanned image or empty."
    );
  }
  return cleaned;
}

/** Deterministic section/contact-info detection — never trust the LLM for this. */
export function detectSections(text) {
  const sectionsPresent = {
    contact: EMAIL_REGEX.test(text) || PHONE_REGEX.test(text),
    summary: SECTION_PATTERNS.summary.test(text),
    education: SECTION_PATTERNS.education.test(text),
    skills: SECTION_PATTERNS.skills.test(text),
    experience: SECTION_PATTERNS.experience.test(text),
    projects: SECTION_PATTERNS.projects.test(text),
    certifications: SECTION_PATTERNS.certifications.test(text),
    achievements: SECTION_PATTERNS.achievements.test(text),
  };

  const contactDetails = {
    hasEmail: EMAIL_REGEX.test(text),
    hasPhone: PHONE_REGEX.test(text),
    hasLinkedIn: LINKEDIN_REGEX.test(text),
    hasGithub: GITHUB_REGEX.test(text),
  };

  return { sectionsPresent, contactDetails };
}

/** Rough bullet-line extraction, used for impact/formatting/quality checks. */
export function extractBulletLines(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^([•\-*▪◦]|\d+\.)\s+/.test(l))
    .map((l) => l.replace(/^([•\-*▪◦]|\d+\.)\s+/, "").trim())
    .filter((l) => l.length > 0);
}