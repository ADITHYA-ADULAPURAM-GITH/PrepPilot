import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiResponse.js";

// Lazily initialized — a missing/invalid key should only break the
// mentor feature, not crash the whole API at boot (env.js REQUIRED_VARS
// deliberately does not include GEMINI_API_KEY).
let client = null;

function getClient() {
  if (!env.GEMINI_API_KEY) {
    throw new ApiError(503, "Mentor AI is not configured. Missing GEMINI_API_KEY.");
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  }
  return client;
}

const MODEL_NAME = "gemini-3.5-flash-lite";

/**
 * @param {string} systemPrompt - structured user context + mentor persona instructions
 * @param {{role: "user"|"model", content: string}[]} history - prior turns, oldest first
 * @param {string} userMessage - the new message to answer
 * @returns {Promise<string>} the model's reply text
 */
export async function generateMentorReply(systemPrompt, history, userMessage) {
  const ai = getClient();

  const contents = [
    ...history.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    // NOTE: @google/genai v2 exposes `.text` as a property, not a
    // method — this differs from the deprecated SDK's `.text()` call.
    const text = response.text;
    if (!text) {
      throw new ApiError(502, "Mentor AI returned an empty response. Please try again.");
    }
    return text;
  } catch (err) {
    if (err instanceof ApiError) throw err;

    // Word-boundary match on actual rate-limit phrasing only. The
    // previous /quota|rate/i regex false-matched "generateContent"
    // (contains "rate" as a substring) and mislabeled unrelated 404s
    // as 429s. Confirmed via full error logging on 2026-08-14.
    const isRateLimited =
      err?.status === 429 ||
      /\b(quota exceeded|rate limit|resource_exhausted)\b/i.test(err?.message || "");

    if (isRateLimited) {
      throw new ApiError(429, "Mentor AI is a bit busy right now. Please try again in a moment.");
    }

    throw new ApiError(502, "Mentor AI couldn't generate a response. Please try again.");
  }
}