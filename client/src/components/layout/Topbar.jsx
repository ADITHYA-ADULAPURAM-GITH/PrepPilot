import { LogOut, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Topbar({ title = "Dashboard" }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      <h1 className="font-display text-[15px] font-semibold text-text">{title}</h1>

      <div className="flex items-center gap-3">
        <button
          className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/[0.05] hover:text-text"
          aria-label="Notifications"
        >
          <Bell className="size-[17px]" />
        </button>

        <div className="mx-1 h-5 w-px bg-border" />

        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-[11.5px] font-semibold text-white">
            {initials(user?.name) || "U"}
          </div>
          <span className="hidden text-[13.5px] font-medium text-text sm:inline">{user?.name}</span>
        </div>

        <Button variant="ghost" size="sm" onClick={logout} aria-label="Log out">
          <LogOut className="size-3.5" />
        </Button>
      </div>
    </header>
  );
}
