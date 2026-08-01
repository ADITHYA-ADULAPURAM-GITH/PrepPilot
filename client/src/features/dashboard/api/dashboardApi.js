import { mockDashboardData } from "@/features/dashboard/mockData";
import { problemsApi } from "@/features/dsa-tracker/api/problemsApi";
import { analyticsApi } from "@/features/analytics/api/analyticsApi";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";

// Every field below has no backing module yet (Mock Tests, Projects, AI
// Assistant, streak tracking). Isolated in one place so removing mock
// data later is a one-line deletion here, not a hunt through the file.
const MOCK_ONLY = {
  streak: mockDashboardData.user.streak,
  mockInterviewsReadiness: mockDashboardData.readiness.breakdown.find((b) => b.label === "Mock Interviews").value,
  projectsReadiness: mockDashboardData.readiness.breakdown.find((b) => b.label === "Projects").value,
  todaysGoalStat: mockDashboardData.stats.find((s) => s.label === "Today's Goal"),
  currentStreakStat: mockDashboardData.stats.find((s) => s.label === "Current Streak"),
  nonDsaActivity: mockDashboardData.activity.filter((a) => a.type !== "dsa"),
};

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

function formatDeadlineDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export const dashboardApi = {
  getSummary: async () => {
    const [problemsRes, analyticsRes, tasksRes] = await Promise.all([
      problemsApi.getStats(),
      analyticsApi.getOverview(),
      studyTaskApi.list({ limit: 100 }),
    ]);

    const dsaStats = problemsRes.data.data;
    const analytics = analyticsRes.data.data;
    const allTasks = tasksRes.data.data.tasks;

    // Resume readiness is a real signal, just a binary one — no scoring
    // model exists, so "uploaded" maps to 100, "not uploaded" to 0.
    const breakdown = [
      { label: "DSA", value: analytics.dsa.completionPercentage },
      { label: "CS Subjects", value: analytics.csSubjects.overallCompletionPercentage },
      { label: "Resume", value: analytics.resume.uploaded ? 100 : 0 },
      { label: "Mock Interviews", value: MOCK_ONLY.mockInterviewsReadiness },
      { label: "Projects", value: MOCK_ONLY.projectsReadiness },
    ];
    const overall = Math.round(breakdown.reduce((sum, b) => sum + b.value, 0) / breakdown.length);

    const stats = [
      { label: "Problems Solved", value: dsaStats.solvedCount },
      MOCK_ONLY.todaysGoalStat,
      MOCK_ONLY.currentStreakStat,
      { label: "Companies in Catalog", value: analytics.companies.total },
    ];

    const dsaActivity = dsaStats.recentSolved.map((p) => ({
      id: p._id,
      type: "dsa",
      text: `Solved "${p.title}" (${p.difficulty})`,
      time: timeAgo(p.dateSolved),
    }));
    const activity = [...dsaActivity, ...MOCK_ONLY.nonDsaActivity].slice(0, 6);

    const today = new Date();
    const tasks = allTasks
      .filter((t) => isSameDay(new Date(t.dueDate), today))
      .map((t) => ({ id: t._id, label: t.title, done: t.isCompleted }));

    const sevenDaysOut = new Date();
    sevenDaysOut.setDate(today.getDate() + 7);
    const deadlines = allTasks
      .filter((t) => !t.isCompleted && new Date(t.dueDate) >= today && new Date(t.dueDate) <= sevenDaysOut)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)
      .map((t) => ({ id: t._id, type: "task", title: t.title, date: formatDeadlineDate(t.dueDate) }));

    return { user: { streak: MOCK_ONLY.streak }, readiness: { overall, breakdown }, stats, activity, tasks, deadlines };
  },
};