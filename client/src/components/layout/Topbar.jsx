import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { AccountMenu } from "@/features/account/components/AccountMenu";

export function Topbar({ title = "Dashboard", onMenuClick }) {
  const { logout } = useAuth();

  return (
    <header className="relative z-10 flex h-16 items-center justify-between border-b border-border bg-base px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/[0.05] hover:text-text md:hidden"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <Menu className="size-[18px]" />
        </button>
        <h1 className="min-w-0 truncate font-display text-[15px] font-semibold text-text">{title}</h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <NotificationBell />

        <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

        <AccountMenu />

        <Button variant="ghost" size="sm" onClick={logout} aria-label="Log out">
          <LogOut className="size-3.5" />
        </Button>
      </div>
    </header>
  );
}