import mongoose from "mongoose";
import { MockTest } from "../models/MockTest.js";
import { Question } from "../models/Question.js";
import { TestAttempt } from "../models/TestAttempt.js";
import { ApiError } from "../utils/apiResponse.js";

export const mockTestService = {
  async list(query) {
    const { category, difficulty, page, limit } = query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const skip = (page - 1) * limit;

    const [tests, total] = await Promise.all([
      MockTest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      MockTest.countDocuments(filter),
    ]);

    return { tests, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  },

  // Test detail for the "about to start" screen — question count and
  // metadata only, never the questions themselves (those are only
  // revealed once an attempt exists, via getAttemptQuestions below).
  async getById(testId) {
    const test = await MockTest.findOne({ _id: testId, isActive: true });
    if (!test) {
      throw new ApiError(404, "Mock test not found");
    }
    return test;
  },

  async startAttempt(userId, testId) {
    const test = await MockTest.findOne({ _id: testId, isActive: true });
    if (!test) {
      throw new ApiError(404, "Mock test not found");
    }
    if (test.totalQuestions === 0) {
      throw new ApiError(400, "This test has no questions yet");
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
};