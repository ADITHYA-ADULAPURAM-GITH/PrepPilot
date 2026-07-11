import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-text">Welcome, {user?.name?.split(" ")[0]}</h1>
      <p className="mt-1.5 text-[14px] text-text-muted">
        Auth is wired end to end. The real Dashboard feature (stat cards, readiness score, weekly progress) is next.
      </p>
    </div>
  );
}
