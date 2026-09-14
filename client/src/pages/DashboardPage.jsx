import { LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { WelcomeHero } from "@/features/dashboard/components/WelcomeHero";
import { ReadinessScoreCard } from "@/features/dashboard/components/ReadinessScoreCard";
import { QuickStatsGrid } from "@/features/dashboard/components/QuickStatsGrid";
import { WeeklyProgressPlaceholder } from "@/features/dashboard/components/WeeklyProgressPlaceholder";
import { TodaysTasks } from "@/features/dashboard/components/TodaysTasks";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { AIAssistantCard } from "@/features/dashboard/components/AIAssistantCard";
import { UpcomingDeadlines } from "@/features/dashboard/components/UpcomingDeadlines";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardData();

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <EmptyState
        icon={LayoutDashboard}
        title="Couldn't load your dashboard"
        description="Something went wrong talking to the server. Try refreshing the page."
        action={
          <Button type="button" variant="secondary" onClick={() => refetch?.()}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.25 }}>
        <WelcomeHero streak={data.user.streak} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <ReadinessScoreCard overall={data.readiness.overall} breakdown={data.readiness.breakdown} />
        </div>
        <AIAssistantCard />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.25, delay: 0.1 }}>
        <QuickStatsGrid stats={data.stats} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <WeeklyProgressPlaceholder />
        </div>
        <TodaysTasks tasks={data.tasks} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <RecentActivity activity={data.activity} />
        </div>
        <UpcomingDeadlines deadlines={data.deadlines} />
      </motion.div>
    </div>
  );
}