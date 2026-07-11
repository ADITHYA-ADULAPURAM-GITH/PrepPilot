import { mockDashboardData } from "@/features/dashboard/mockData";
import { problemsApi } from "@/features/dsa-tracker/api/problemsApi";

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

export const dashboardApi = {
  getSummary: async () => {
    const { data } = await problemsApi.getStats();
    const stats = data.data;

    const breakdown = mockDashboardData.readiness.breakdown.map((item) =>
      item.label === "DSA" ? { ...item, value: stats.readinessScore } : item
    );
    const overall = Math.round(breakdown.reduce((sum, b) => sum + b.value, 0) / breakdown.length);

    const dsaActivity = stats.recentSolved.map((p) => ({
      id: p._id,
      type: "dsa",
      text: `Solved "${p.title}" (${p.difficulty})`,
      time: timeAgo(p.dateSolved),
    }));
    const nonDsaActivity = mockDashboardData.activity.filter((a) => a.type !== "dsa");
    const activity = [...dsaActivity, ...nonDsaActivity].slice(0, 6);

    return {
      ...mockDashboardData,
      stats: mockDashboardData.stats.map((s) =>
        s.label === "Problems Solved" ? { ...s, value: stats.solvedCount, change: undefined } : s
      ),
      readiness: { overall, breakdown },
      activity,
    };
  },
};