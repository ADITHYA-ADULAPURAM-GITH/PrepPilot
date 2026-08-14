import { analyticsService } from "./analyticsService.js";
import { MentorConversation } from "../models/MentorConversation.js";
import { TestAttempt } from "../models/TestAttempt.js";
import { generateMentorReply } from "./geminiClient.js";

const MAX_HISTORY_MESSAGES = 20;

async function getMockTestPerformance(userId) {
  const attempts = await TestAttempt.find({
    user: userId,
    status: { $in: ["submitted", "auto-submitted"] },
  })
    .populate({ path: "test", select: "category" })
    .select("test score totalQuestions");

  const byCategory = {};
  for (const attempt of attempts) {
    const category = attempt.test?.category;
    if (!category) continue;
    if (!byCategory[category]) {
      byCategory[category] = { attempts: 0, totalScore: 0, totalQuestions: 0 };
    }
    byCategory[category].attempts += 1;
    byCategory[category].totalScore += attempt.score;
    byCategory[category].totalQuestions += attempt.totalQuestions;
  }

  return Object.fromEntries(
    Object.entries(byCategory).map(([category, agg]) => [
      category,
      {
        attempts: agg.attempts,
        averageScorePercentage: agg.totalQuestions
          ? Math.round((agg.totalScore / agg.totalQuestions) * 100)
          : 0,
      },
    ])
  );
}

async function buildUserContext(userId) {
  const [overview, mockTestPerformance] = await Promise.all([
    analyticsService.getOverview(userId),
    getMockTestPerformance(userId),
  ]);

  // Deliberately excludes: Mock Interviews / Projects (frontend-only
  // mock data, not real), Companies (catalog, not personal).
  return {
    dsa: overview.dsa,
    csSubjects: overview.csSubjects,
    resume: overview.resume,
    studyPlanner: overview.studyPlanner,
    mockTestPerformance,
  };
}

function buildSystemPrompt(context) {
  return `You are the PrepPilot Mentor — a placement-preparation mentor, analyst, and interview-prep assistant for a college student using the PrepPilot platform.

You are NOT a general-purpose chatbot. Only discuss placement preparation: DSA, CS subjects, mock tests, study planning, resumes, and interview readiness.

Ground every answer in the student's actual PrepPilot data below. Never invent progress, scores, or activity that isn't in this data. If something isn't tracked (e.g. resume content quality, mock interviews, projects), say so plainly instead of guessing.

HOW TO USE THE DATA — read this before every reply:
- Identity or small-talk questions ("who are you", "hi", "what can you do") get a short direct answer. Do NOT recite any statistics.
- Progress/readiness questions ("how am I doing", "am I ready") should reference the specific relevant numbers only — not the entire dataset. Pick the 2-4 data points that actually answer the question.
- Weakness/diagnostic questions ("why am I weak in X") should reference only the data related to X, not unrelated categories.
- Planning questions ("what should I study today", "give me a study plan") should use the data to justify recommendations, not restate it as a report.
- Never repeat a statistic you already stated earlier in this conversation unless the user is asking about it again specifically.
- Default to the shortest response that fully answers the question. Expand only when the question is broad (e.g. "am I ready for placements?").

CURRENT USER DATA (JSON):
${JSON.stringify(context, null, 2)}

Be direct and specific. Use markdown formatting (bold, bullet lists, numbered lists) where it genuinely improves readability — not by default on every response.`;
}

async function getOrCreateConversation(userId) {
  let conversation = await MentorConversation.findOne({ user: userId });
  if (!conversation) {
    conversation = await MentorConversation.create({ user: userId, messages: [] });
  }
  return conversation;
}

export const mentorService = {
  async getConversation(userId) {
    const conversation = await getOrCreateConversation(userId);
    return conversation.messages;
  },

  async sendMessage(userId, userMessage) {
    const conversation = await getOrCreateConversation(userId);
    const context = await buildUserContext(userId);
    const systemPrompt = buildSystemPrompt(context);

    const history = conversation.messages.slice(-MAX_HISTORY_MESSAGES);
    const replyText = await generateMentorReply(systemPrompt, history, userMessage);

    conversation.messages.push({ role: "user", content: userMessage });
    conversation.messages.push({ role: "model", content: replyText });
    await conversation.save();

    return { reply: replyText, messages: conversation.messages };
  },
};