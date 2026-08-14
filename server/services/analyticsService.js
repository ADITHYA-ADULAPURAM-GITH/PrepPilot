import { Problem } from "../models/Problem.js";
import { Subject } from "../models/Subject.js";
import { Topic } from "../models/Topic.js";
import { UserTopicProgress } from "../models/UserTopicProgress.js";
import { Company } from "../models/Company.js";
import { Resume } from "../models/Resume.js";
import { StudyTask } from "../models/StudyTask.js";
import { TestAttempt } from "../models/TestAttempt.js";
import { MentorConversation } from "../models/MentorConversation.js";
import { User } from "../models/User.js";

function percentage(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function toDateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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


async function getRecentMockTestActivity(userId) {
  const attempts = await TestAttempt.find({
    user: userId,
    status: { $in: ["submitted", "auto-submitted"] },
  })
    .populate({ path: "test", select: "title" })
    .sort({ submittedAt: -1 })
    .limit(5)
    .select("test score totalQuestions submittedAt");

  return attempts.map((a) => ({
    id: a._id.toString(),
    type: "mock-test",
    text: `Completed "${a.test?.title || "Mock Test"}" — ${percentage(a.score, a.totalQuestions)}%`,
    date: a.submittedAt,
  }));
}

async function getRecentMentorActivity(userId) {
  const conversation = await MentorConversation.findOne({ user: userId }).select("messages");
  if (!conversation) return [];

  const userMessages = conversation.messages.filter((m) => m.role === "user");
  const recent = userMessages.slice(-5).reverse();

  return recent.map((m, i) => ({
    id: `mentor-${m.createdAt?.getTime() || i}`,
    type: "mentor",
    text: `Asked PrepPilot AI: "${m.content.length > 60 ? `${m.content.slice(0, 60)}…` : m.content}"`,
    date: m.createdAt,
  }));
}

// Deliberately excludes MentorConversation — per explicit agreement,
// chat activity does not count toward the preparation streak.
//
// completedTasks will currently always return empty: StudyTask.completedAt
// exists on the schema but nothing sets it yet (blocked — see chat notes).
// This query is correct and will start contributing automatically once
// that's wired up; no further change needed here at that point.
async function getStreakData(userId) {
  const [solvedProblems, testAttempts, completedTasks] = await Promise.all([
    Problem.find({ user: userId, status: "Solved", dateSolved: { $ne: null } }).select("dateSolved"),
    TestAttempt.find({
      user: userId,
      status: { $in: ["submitted", "auto-submitted"] },
      submittedAt: { $ne: null },
    }).select("submittedAt"),
    StudyTask.find({ user: userId, isCompleted: true, completedAt: { $ne: null } }).select("completedAt"),
  ]);

  const activeDays = new Set();
  solvedProblems.forEach((p) => activeDays.add(toDateKey(p.dateSolved)));
  testAttempts.forEach((t) => activeDays.add(toDateKey(t.submittedAt)));
  completedTasks.forEach((t) => activeDays.add(toDateKey(t.completedAt)));

  let current = 0;
  const cursor = new Date();
  // If nothing happened today yet, check from yesterday instead — a
  // streak shouldn't read as broken just because it's still today.
  if (!activeDays.has(toDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (activeDays.has(toDateKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { current };
}

export const analyticsService = {
  async getOverview(userId) {
    const [dsa, csSubjects, companies, resume, studyPlanner, mockTestActivity, mentorActivity, streak] =
      await Promise.all([
        getDsaAnalytics(userId),
        getCsSubjectsAnalytics(userId),
        getCompaniesAnalytics(),
        getResumeAnalytics(userId),
        getStudyPlannerAnalytics(userId),
        getRecentMockTestActivity(userId),
        getRecentMentorActivity(userId),
        getStreakData(userId),
      ]);

    
    const user = await User.findById(userId).select("longestStreak");
    let longestStreak = user?.longestStreak || 0;
    if (streak.current > longestStreak) {
      longestStreak = streak.current;
      await User.findByIdAndUpdate(userId, { longestStreak });
    }

    const recentActivity = [...mockTestActivity, ...mentorActivity]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    return {
      dsa,
      csSubjects,
      companies,
      resume,
      studyPlanner,
      recentActivity,
      streak: { current: streak.current, longest: longestStreak },
    };
  },
};