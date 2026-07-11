import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

/**
 * Minimal shell for now — Sidebar/Topbar with nav items get built out
 * in the Dashboard feature. This just proves the protected-route flow
 * end to end and gives Auth somewhere real to redirect to.
 */
export function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-base">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary font-display text-[13px] font-bold text-white">
            P
          </div>
          <span className="font-display text-[14px] font-semibold">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13.5px] text-text-muted">{user?.name}</span>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="size-3.5" />
            Log out
          </Button>
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
