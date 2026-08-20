import mongoose from "mongoose";
import { MockTest } from "../models/MockTest.js";
import { Question } from "../models/Question.js";
import { TestAttempt } from "../models/TestAttempt.js";
import { UserTopicProgress } from "../models/UserTopicProgress.js";
import { ApiError } from "../utils/apiResponse.js";

export const mockTestService = {
  async list(query, userId) {
    const { category, difficulty, page, limit } = query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const skip = (page - 1) * limit;

    const [tests, total] = await Promise.all([
      MockTest.find(filter)
        .populate("topic", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MockTest.countDocuments(filter),
    ]);

    const completedTopicIds = await this._getCompletedTopicIds(userId, tests);
    const annotated = tests.map((test) => this._withEligibility(test, completedTopicIds));

    return { tests: annotated, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  },

  // Test detail for the "about to start" screen — question count and
  // metadata only, never the questions themselves (those are only
  // revealed once an attempt exists, via getAttemptQuestions below).
  async getById(testId, userId) {
    const test = await MockTest.findOne({ _id: testId, isActive: true }).populate("topic", "title");
    if (!test) {
      throw new ApiError(404, "Mock test not found");
    }
    const completedTopicIds = await this._getCompletedTopicIds(userId, [test]);
    return this._withEligibility(test, completedTopicIds);
  },

  async startAttempt(userId, testId) {
    const test = await MockTest.findOne({ _id: testId, isActive: true });
    if (!test) {
      throw new ApiError(404, "Mock test not found");
    }
    if (test.totalQuestions === 0) {
      throw new ApiError(400, "This test has no questions yet");
    }

    // V2 Step 3 — topic-gating: server-side enforcement, independent of
    // whatever the frontend shows. A test with no `topic` set is
    // ungated and behaves exactly as before this change.
    if (test.topic) {
      const progress = await UserTopicProgress.findOne({
        user: userId,
        topic: test.topic,
        completed: true,
      });
      if (!progress) {
        throw new ApiError(403, "Complete the linked topic before starting this mock test.");
      }
    }

    return TestAttempt.create({
      user: userId,
      test: testId,
      totalQuestions: test.totalQuestions,
      status: "in-progress",
      startedAt: new Date(),
    });
  },

  // Questions are fetched separately from the attempt, keyed off the
  // attempt's own `test` ref rather than trusting a testId param again
  // — guarantees the questions shown always match the test the attempt
  // was actually started against, even if the test itself changes later.
  // correctOptionIndex and explanation are stripped unless the attempt
  // has already been submitted (review mode).
  async getAttemptQuestions(userId, attemptId) {
    const attempt = await TestAttempt.findOne({ _id: attemptId, user: userId }).populate(
      "test",
      "title category durationMinutes"
    );
    if (!attempt) {
      throw new ApiError(404, "Attempt not found");
    }

    const isReview = attempt.status !== "in-progress";
    const projection = isReview ? {} : { correctOptionIndex: 0, explanation: 0 };

    const questions = await Question.find({ test: attempt.test }, projection).sort({ order: 1 });

    return { attempt, questions };
  },

  async saveAnswer(userId, attemptId, { questionId, selectedOptionIndex }) {
    const attempt = await TestAttempt.findOne({ _id: attemptId, user: userId });
    if (!attempt) {
      throw new ApiError(404, "Attempt not found");
    }
    if (attempt.status !== "in-progress") {
      throw new ApiError(400, "This attempt has already been submitted");
    }

    const question = await Question.findOne({ _id: questionId, test: attempt.test });
    if (!question) {
      throw new ApiError(404, "Question not found on this test");
    }

    const existing = attempt.answers.find((a) => a.question.toString() === questionId);
    if (existing) {
      existing.selectedOptionIndex = selectedOptionIndex;
    } else {
      attempt.answers.push({ question: questionId, selectedOptionIndex });
    }

    await attempt.save();
    return attempt;
  },

  // Shared by both manual submit and auto-submit — only the resulting
  // `status` value differs, so the scoring logic itself lives in one
  // place rather than being duplicated across two controller actions.
  async submitAttempt(userId, attemptId, { autoSubmitted = false } = {}) {
    const attempt = await TestAttempt.findOne({ _id: attemptId, user: userId });
    if (!attempt) {
      throw new ApiError(404, "Attempt not found");
    }
    if (attempt.status !== "in-progress") {
      throw new ApiError(400, "This attempt has already been submitted");
    }

    const questions = await Question.find({ test: attempt.test }).select("correctOptionIndex");
    const correctMap = new Map(questions.map((q) => [q._id.toString(), q.correctOptionIndex]));

    let score = 0;
    attempt.answers.forEach((answer) => {
      const correctIndex = correctMap.get(answer.question.toString());
      answer.isCorrect = answer.selectedOptionIndex !== null && answer.selectedOptionIndex === correctIndex;
      if (answer.isCorrect) score += 1;
    });

    attempt.score = score;
    attempt.status = autoSubmitted ? "auto-submitted" : "submitted";
    attempt.submittedAt = new Date();

    await attempt.save();
    return attempt;
  },

  async listUserAttempts(userId, query) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [attempts, total] = await Promise.all([
      TestAttempt.find({ user: userId })
        .populate("test", "title category difficulty durationMinutes")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      TestAttempt.countDocuments({ user: userId }),
    ]);

    return { attempts, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  },

  async getAttemptById(userId, attemptId) {
    const attempt = await TestAttempt.findOne({ _id: attemptId, user: userId }).populate(
      "test",
      "title category difficulty durationMinutes"
    );
    if (!attempt) {
      throw new ApiError(404, "Attempt not found");
    }
    return attempt;
  },

  // --- V2 Step 3 helpers (topic-gating) -------------------------------

  // Given a list of (possibly topic-populated) MockTest docs, returns
  // the Set of topic-id strings the user has completed, scoped only to
  // the topics actually referenced by those tests.
  async _getCompletedTopicIds(userId, tests) {
    const topicIds = tests.filter((t) => t.topic).map((t) => t.topic._id.toString());
    if (topicIds.length === 0) {
      return new Set();
    }
    const progress = await UserTopicProgress.find({
      user: userId,
      topic: { $in: topicIds },
      completed: true,
    }).select("topic");
    return new Set(progress.map((p) => p.topic.toString()));
  },

  // Converts a MockTest doc to a plain object with isLocked/lockedReason
  // added. Tests with no `topic` are always unlocked — this is the
  // guarantee that existing, ungated tests behave exactly as before.
  _withEligibility(test, completedTopicIds) {
    const obj = test.toObject();
    if (!obj.topic) {
      obj.isLocked = false;
      obj.lockedReason = null;
      return obj;
    }
    const isCompleted = completedTopicIds.has(obj.topic._id.toString());
    obj.isLocked = !isCompleted;
    obj.lockedReason = isCompleted ? null : `Complete "${obj.topic.title}" to unlock this test.`;
    return obj;
  },
};