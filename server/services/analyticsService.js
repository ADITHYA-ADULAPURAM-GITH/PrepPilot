import { Problem } from "../models/Problem.js";
import { Subject } from "../models/Subject.js";
import { Topic } from "../models/Topic.js";
import { UserTopicProgress } from "../models/UserTopicProgress.js";
import { Company } from "../models/Company.js";
import { Resume } from "../models/Resume.js";
import { StudyTask } from "../models/StudyTask.js";

function percentage(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

async function getDsaAnalytics(userId) {
  const [total, solved, byDifficulty] = await Promise.all([
    Problem.countDocuments({ user: userId }),
    Problem.countDocuments({ user: userId, status: "Solved" }),
    Problem.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$difficulty",
          total: { $sum: 1 },
          solved: { $sum: { $cond: [{ $eq: ["$status", "Solved"] }, 1, 0] } },
        },
      },
    ]),
  ]);

  // Aggregate only returns difficulties that have at least one problem
  // for this user, so missing ones are filled in as zero here to keep
  // the shape predictable for the frontend (no conditional rendering
  // needed for a difficulty with zero problems).
  const difficultyMap = { Easy: { total: 0, solved: 0 }, Medium: { total: 0, solved: 0 }, Hard: { total: 0, solved: 0 } };
  byDifficulty.forEach((entry) => {
    difficultyMap[entry._id] = { total: entry.total, solved: entry.solved };
  });

  return {
    total,
    solved,
    completionPercentage: percentage(solved, total),
    byDifficulty: difficultyMap,
  };
}

async function getCsSubjectsAnalytics(userId) {
  const [subjects, topicsBySubject, completedBySubject] = await Promise.all([
    Subject.find().select("_id name").sort({ order: 1 }),
    Topic.aggregate([{ $group: { _id: "$subject", total: { $sum: 1 } } }]),
    UserTopicProgress.aggregate([
      { $match: { user: userId, completed: true } },
      { $group: { _id: "$subject", completed: { $sum: 1 } } },
    ]),
  ]);

  const topicsMap = new Map(topicsBySubject.map((e) => [e._id.toString(), e.total]));
  const completedMap = new Map(completedBySubject.map((e) => [e._id.toString(), e.completed]));

  const bySubject = subjects.map((subject) => {
    const total = topicsMap.get(subject._id.toString()) || 0;
    const completed = completedMap.get(subject._id.toString()) || 0;
    return {
      subjectId: subject._id,
      name: subject.name,
      total,
      completed,
      completionPercentage: percentage(completed, total),
    };
  });

  const overallTotal = bySubject.reduce((sum, s) => sum + s.total, 0);
  const overallCompleted = bySubject.reduce((sum, s) => sum + s.completed, 0);

  return {
    overallTotal,
    overallCompleted,
    overallCompletionPercentage: percentage(overallCompleted, overallTotal),
    bySubject,
  };
}

async function getCompaniesAnalytics() {
  const total = await Company.countDocuments();
  return { total };
}

async function getResumeAnalytics(userId) {
  const resume = await Resume.findOne({ user: userId }).select("updatedAt");
  return {
    uploaded: Boolean(resume),
    lastUpdated: resume?.updatedAt || null,
  };
}

async function getStudyPlannerAnalytics(userId) {
  const now = new Date();

  const [total, completed, overdue, byCategory, byPriority] = await Promise.all([
    StudyTask.countDocuments({ user: userId }),
    StudyTask.countDocuments({ user: userId, isCompleted: true }),
    StudyTask.countDocuments({ user: userId, isCompleted: false, dueDate: { $lt: now } }),
    StudyTask.aggregate([{ $match: { user: userId } }, { $group: { _id: "$category", count: { $sum: 1 } } }]),
    StudyTask.aggregate([{ $match: { user: userId } }, { $group: { _id: "$priority", count: { $sum: 1 } } }]),
  ]);

  return {
    total,
    completed,
    pending: total - completed,
    overdue,
    byCategory: Object.fromEntries(byCategory.map((e) => [e._id, e.count])),
    byPriority: Object.fromEntries(byPriority.map((e) => [e._id, e.count])),
  };
}

export const analyticsService = {
  async getOverview(userId) {
    const [dsa, csSubjects, companies, resume, studyPlanner] = await Promise.all([
      getDsaAnalytics(userId),
      getCsSubjectsAnalytics(userId),
      getCompaniesAnalytics(),
      getResumeAnalytics(userId),
      getStudyPlannerAnalytics(userId),
    ]);

    return { dsa, csSubjects, companies, resume, studyPlanner };
  },
};