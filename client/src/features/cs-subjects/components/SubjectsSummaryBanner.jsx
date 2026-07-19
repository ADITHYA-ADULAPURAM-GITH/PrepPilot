import { motion } from "framer-motion";
import { Trophy, TrendingDown, Flame, RotateCcw } from "lucide-react";

function Stat({ icon: Icon, iconColor, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[12px] text-text-muted">
        {Icon && <Icon className={`size-3 ${iconColor}`} />}
        {label}
      </p>
      <p className="mt-1 font-display text-[16px] font-semibold text-text">{value}</p>
    </div>
  );
}

export function SubjectsSummaryBanner({ analytics }) {
  const { overallReadiness, strongestSubject, weakestSubject, studyStreak, totalRevisionDueTopics } = analytics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass grid grid-cols-2 gap-5 rounded-2xl p-5 sm:grid-cols-3 lg:grid-cols-5"
    >
      <Stat label="Overall Readiness" value={`${overallReadiness}%`} />
      <Stat icon={Trophy} iconColor="text-accent" label="Strongest" value={strongestSubject?.name || "—"} />
      <Stat icon={TrendingDown} iconColor="text-danger" label="Needs focus" value={weakestSubject?.name || "—"} />
      <Stat icon={RotateCcw} iconColor="text-primary" label="Due for revision" value={totalRevisionDueTopics} />
      <Stat icon={Flame} iconColor="text-accent" label="Study streak" value={`${studyStreak} ${studyStreak === 1 ? "day" : "days"}`} />
    </motion.div>
  );
}