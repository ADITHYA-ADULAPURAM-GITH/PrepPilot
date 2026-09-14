import { StudyTask } from "../models/StudyTask.js";
import { ProblemProgress } from "../models/ProblemProgress.js";
import { Problem } from "../models/Problem.js";
import { MockTest } from "../models/MockTest.js";
import { TestAttempt } from "../models/TestAttempt.js";
import { subjectService } from "./subjectService.js";
import { mockTestService } from "./mockTestService.js";

async function getStudyPlannerActivity(userId) {
  const task = await StudyTask.findOne({ user: userId, isCompleted: false })
    .sort({ dueDate: 1 })
    .select("_id");

  if (!task) return null;

  return { type: "study-planner" };
}

async function getDsaActivity(userId) {
  const inProgress = await ProblemProgress.findOne({ user: userId, status: "in-progress" })
    .sort({ lastAttemptAt: -1, updatedAt: -1 })
    .select("problem");

  if (inProgress) {
    return { type: "dsa-workspace", problemId: inProgress.problem.toString() };
  }

  const assigned = await ProblemProgress.findOne({ user: userId, status: "assigned" })
    .sort({ createdAt: 1 })
    .select("problem");

  if (assigned) {
    return { type: "dsa-workspace", problemId: assigned.problem.toString() };
  }

  const todoProblem = await Problem.findOne({ user: userId, status: "Todo" })
    .sort({ createdAt: 1 })
    .select("_id");

  if (todoProblem) {
    return { type: "dsa-tracker" };
  }

  return null;
}

async function getCsSubjectActivity(userId) {
  const analytics = await subjectService.getOverallAnalytics(userId);
  const suggestion = analytics.suggestedNextSubject;

  if (suggestion && suggestion.progressPercent < 100) {
    return { type: "cs-subject", slug: suggestion.slug };
  }

  return null;
}

async function getMockTestActivity(userId) {
  const attemptedTestIds = await TestAttempt.find({ user: userId }).distinct("test");

  const candidateTests = await MockTest.find({
    isActive: true,
    _id: { $nin: attemptedTestIds },
  })
    .populate("topic", "_id")
    .select("_id topic")
    .sort({ createdAt: -1 });

  if (candidateTests.length === 0) return null;

  const completedTopicIds = await mockTestService._getCompletedTopicIds(userId, candidateTests);

  const unlockedTest = candidateTests.find(
    (test) => !test.topic || completedTopicIds.has(test.topic._id.toString())
  );

  if (!unlockedTest) return null;

  return { type: "mock-test", testId: unlockedTest._id.toString() };
}

export const nextActivityService = {
  async getNextActivity(userId) {
    const studyPlanner = await getStudyPlannerActivity(userId);
    if (studyPlanner) return studyPlanner;

    const dsa = await getDsaActivity(userId);
    if (dsa) return dsa;

    const csSubject = await getCsSubjectActivity(userId);
    if (csSubject) return csSubject;

    const mockTest = await getMockTestActivity(userId);
    if (mockTest) return mockTest;

    return { type: "none" };
  },
};