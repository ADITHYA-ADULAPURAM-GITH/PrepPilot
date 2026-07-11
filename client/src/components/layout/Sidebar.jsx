import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Building2,
  ClipboardList,
  FileText,
  CalendarDays,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: ROUTES.DASHBOARD, active: true },
  { label: "DSA Tracker", icon: Code2, to: ROUTES.DSA_TRACKER, active: true },
  { label: "CS Subjects", icon: BookOpen, active: false },
  { label: "Companies", icon: Building2, active: false },
  { label: "Mock Tests", icon: ClipboardList, active: false },
  { label: "Resume", icon: FileText, active: false },
  { label: "Calendar", icon: CalendarDays, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
];

export function Sidebar() {
  return (
    <aside className="hidden w-[240px] shrink-0 flex-col border-r border-border bg-surface/50 md:flex">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary font-display text-[13px] font-bold text-white">
          P
        </div>
        <span className="font-display text-[14.5px] font-semibold tracking-tight">PrepPilot</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) =>
          item.active ? (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                  isActive
                    ? "bg-primary-muted text-text"
                    : "text-text-muted hover:bg-white/[0.04] hover:text-text"
                )
              }
            >
              <item.icon className="size-[17px]" />
              {item.label}
            </NavLink>
          ) : (
            <div
              key={item.label}
              className="flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-2 text-[13.5px] font-medium text-text-faint"
              title="Coming soon"
            >
              <span className="flex items-center gap-2.5">
                <item.icon className="size-[17px]" />
                {item.label}
              </span>
              <span className="rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-text-faint">Soon</span>
            </div>
          )
        )}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-gradient-to-br from-primary-muted to-accent-muted px-3 py-2.5">
          <Sparkles className="size-4 text-accent" />
          <span className="text-[12.5px] font-medium text-text-muted">PrepPilot AI</span>
        </div>
      </div>
    </aside>
  );
}