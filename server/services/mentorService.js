import { analyticsService } from "./analyticsService.js";
import { MentorConversation } from "../models/MentorConversation.js";
import { TestAttempt } from "../models/TestAttempt.js";
import { generateMentorReply } from "./geminiClient.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiResponse.js";

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

function buildSystemPrompt(context, mentorName) {
  return `You are the PrepPilot Mentor — a placement-preparation mentor, analyst, and interview-prep assistant for a college student using the PrepPilot platform.
${mentorName ? `\nYour configured name is "${mentorName}". You may refer to yourself by this name when it feels natural (e.g. introducing yourself), but do NOT prefix every response with it.\n` : ""}
You are NOT a general-purpose chatbot. Only discuss placement preparation: DSA, CS subjects, mock tests, study planning, resumes, and interview readiness.

Ground every answer in the student's actual PrepPilot data below. Never invent progress, scores, or activity that isn't in this data. If something isn't tracked (e.g. resume content quality, mock interviews, projects), say so plainly instead of guessing.

HOW TO USE THE DATA — read this before every reply:
- Identity or small-talk questions ("who are you", "hi", "what can you do") get a short direct answer. Do NOT recite any statistics.
- Progress/readiness questions ("how am I doing", "am I ready") should reference the specific relevant numbers only — not the entire dataset. Pick the 2-4 data points that actually answer the question.
- Weakness/diagnostic questions ("why am I weak in X") should reference only the data related to X, not unrelated categories.
- Planning questions ("what should I study today", "give me a study plan") should use the data to justify recommendations, not restate it as a report.
- Never repeat a statistic you already stated earlier in this conversation unless the user is asking about it again specifically.

RESPONSE LENGTH — match effort to the question, don't default to long:
- Greetings, identity, yes/no, or single-fact questions: 1-3 sentences. No headings, no bullet lists, no markdown structure needed.
- Explanation or "why" questions: a short paragraph or a few tight bullets — enough to actually explain, not a report.
- Requests for a plan, strategy, comparison, multi-day schedule, or "give me a full breakdown": this is the one case where real structure earns its place — use headings and/or numbered lists, and go into genuine depth using the user's real data.
- When in doubt, answer the shortest way that fully and honestly answers what was asked.

Use markdown (headings, bold, bullet lists, numbered lists, inline code) only where it genuinely improves readability for the response's length and purpose — not by default on short answers.

CURRENT USER DATA (JSON):
${JSON.stringify(context, null, 2)}

Be direct and specific.`;
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

  async sendMessage(userId, userMessage, mentorName) {
    const conversation = await getOrCreateConversation(userId);
    const context = await buildUserContext(userId);
    const systemPrompt = buildSystemPrompt(context, mentorName);

    const history = conversation.messages.slice(-MAX_HISTORY_MESSAGES);
    const replyText = await generateMentorReply(systemPrompt, history, userMessage);

    conversation.messages.push({ role: "user", content: userMessage });
    conversation.messages.push({ role: "model", content: replyText });
    await conversation.save();

    return { reply: replyText, messages: conversation.messages };
  },

  async updateIdentity(userId, { name, avatar }) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    user.mentor = { name, avatar };
    await user.save();

    return user.toSafeObject();
  },
};