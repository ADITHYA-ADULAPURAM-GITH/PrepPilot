// Realistic mock data standing in for the /dashboard/summary endpoint
// that Feature 3+ (DSA Tracker, CS Subjects, Resume, Mock Tests) will
// populate for real. Shape mirrors the eventual API response so the
// components and hooks below don't need to change when it's wired up.

export const mockDashboardData = {
  user: {
    streak: 12,
  },
  readiness: {
    overall: 68,
    breakdown: [
      { label: "DSA", value: 74 },
      { label: "CS Subjects", value: 61 },
      { label: "Resume", value: 80 },
      { label: "Mock Interviews", value: 45 },
      { label: "Projects", value: 70 },
    ],
  },
  stats: [
    { label: "Problems Solved", value: 187, change: "+12 this week" },
    { label: "Today's Goal", value: "3 / 5", change: "2 remaining" },
    { label: "Current Streak", value: "12 days", change: "Personal best: 21" },
    { label: "Companies Covered", value: 9, change: "+2 this week" },
  ],
  weeklyProgress: [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 4.0 },
    { day: "Fri", hours: 2.1 },
    { day: "Sat", hours: 3.6 },
    { day: "Sun", hours: 2.9 },
  ],
  tasks: [
    { id: "t1", label: "Solve 3 Graph problems (Medium)", done: true },
    { id: "t2", label: "Revise DBMS — Normalization", done: true },
    { id: "t3", label: "Mock aptitude test — 30 min", done: false },
    { id: "t4", label: "Update resume — Projects section", done: false },
    { id: "t5", label: "Review yesterday's bookmarked problems", done: false },
  ],
  activity: [
    { id: "a1", type: "dsa", text: "Solved \"Merge Intervals\" (Medium)", time: "2h ago" },
    { id: "a2", type: "ai", text: "Asked PrepPilot AI about B-Tree indexing", time: "5h ago" },
    { id: "a3", type: "revision", text: "Revised OS — Deadlock Prevention", time: "Yesterday" },
    { id: "a4", type: "dsa", text: "Solved \"Two Sum\" (Easy)", time: "Yesterday" },
    { id: "a5", type: "mock", text: "Completed Aptitude Mock Test — 78%", time: "2 days ago" },
  ],
  deadlines: [
    { id: "d1", type: "interview", title: "Amazon — Technical Round 1", date: "Jul 14" },
    { id: "d2", type: "assessment", title: "TCS NQT — Online Assessment", date: "Jul 16" },
    { id: "d3", type: "revision", title: "CN — Full syllabus revision due", date: "Jul 18" },
    { id: "d4", type: "interview", title: "Google — Mock Interview (self-scheduled)", date: "Jul 20" },
  ],
};
