import { problemsApi } from "@/features/dsa-tracker/api/problemsApi";
import { analyticsApi } from "@/features/analytics/api/analyticsApi";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";

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

    
    const breakdown = [
      { label: "DSA", value: analytics.dsa.completionPercentage },
      { label: "CS Subjects", value: analytics.csSubjects.overallCompletionPercentage },
      { label: "Resume", value: analytics.resume.uploaded ? 100 : 0 },
      { label: "Mock Interviews", value: null, notTracked: true },
      { label: "Projects", value: null, notTracked: true },
    ];
    const trackedValues = breakdown.filter((b) => !b.notTracked).map((b) => b.value);
    const overall = Math.round(trackedValues.reduce((sum, v) => sum + v, 0) / trackedValues.length);

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const todaysTasks = allTasks.filter((t) => isSameDay(new Date(t.dueDate), today));
    const todaysGoalDone = todaysTasks.filter((t) => t.isCompleted).length;
    const todaysGoalTotal = todaysTasks.length;

    const stats = [
      { label: "Problems Solved", value: dsaStats.solvedCount },
      {
        label: "Today's Goal",
        value: todaysGoalTotal ? `${todaysGoalDone} / ${todaysGoalTotal}` : "No tasks today",
        change: todaysGoalTotal ? `${todaysGoalTotal - todaysGoalDone} remaining` : "",
      },
      {
        label: "Current Streak",
        value: `${analytics.streak.current} day${analytics.streak.current === 1 ? "" : "s"}`,
        change: `Personal best: ${analytics.streak.longest}`,
      },
      { label: "Companies in Catalog", value: analytics.companies.total },
    ];

    const dsaActivityRaw = dsaStats.recentSolved.map((p) => ({
      id: p._id,
      type: "dsa",
      text: `Solved "${p.title}" (${p.difficulty})`,
      date: p.dateSolved,
    }));
    const activity = [...dsaActivityRaw, ...analytics.recentActivity]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6)
      .map((a) => ({ id: a.id, type: a.type, text: a.text, time: timeAgo(a.date) }));

    const tasks = todaysTasks.map((t) => ({ id: t._id, label: t.title, done: t.isCompleted }));

    const sevenDaysOut = new Date(todayStart);
    sevenDaysOut.setDate(todayStart.getDate() + 7);

    const deadlines = allTasks
      .filter((t) => !t.isCompleted && new Date(t.dueDate) >= todayStart && new Date(t.dueDate) <= sevenDaysOut)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)
      .map((t) => ({ id: t._id, type: t.category, title: t.title, date: formatDeadlineDate(t.dueDate) }));

    return {
      user: { streak: analytics.streak.current },
      readiness: { overall, breakdown },
      stats,
      activity,
      tasks,
      deadlines,
    };
  },
};