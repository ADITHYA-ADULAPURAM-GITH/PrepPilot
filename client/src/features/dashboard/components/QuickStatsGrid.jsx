import { StatCard } from "@/features/dashboard/components/StatCard";
import { ROUTES } from "@/lib/constants";


const STAT_ROUTES = {
  "Problems Solved": ROUTES.DSA_TRACKER,
  "Today's Goal": ROUTES.STUDY_PLANNER,
  "Companies in Catalog": ROUTES.COMPANIES,
};

export function QuickStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} to={STAT_ROUTES[stat.label]} />
      ))}
    </div>
  );
}