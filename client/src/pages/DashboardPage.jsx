import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { WelcomeHero } from "@/features/dashboard/components/WelcomeHero";
import { ReadinessScoreCard } from "@/features/dashboard/components/ReadinessScoreCard";
import { QuickStatsGrid } from "@/features/dashboard/components/QuickStatsGrid";
import { WeeklyProgressChart } from "@/features/dashboard/components/WeeklyProgressChart";
import { TodaysTasks } from "@/features/dashboard/components/TodaysTasks";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { AIAssistantCard } from "@/features/dashboard/components/AIAssistantCard";
import { UpcomingDeadlines } from "@/features/dashboard/components/UpcomingDeadlines";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-[14px] text-text-muted">Couldn't load your dashboard right now.</p>
        <p className="mt-1 text-[13px] text-text-faint">Try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeHero streak={data.user.streak} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReadinessScoreCard overall={data.readiness.overall} breakdown={data.readiness.breakdown} />
        </div>
        <AIAssistantCard />
      </div>

      <QuickStatsGrid stats={data.stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyProgressChart data={data.weeklyProgress} />
        </div>
        <TodaysTasks tasks={data.tasks} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity activity={data.activity} />
        </div>
        <UpcomingDeadlines deadlines={data.deadlines} />
      </div>
    </div>
  );
}
