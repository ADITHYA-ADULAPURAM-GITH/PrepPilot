import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Building2,
  ClipboardList,
  FileText,
  CalendarDays,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: ROUTES.DASHBOARD, active: true },
  { label: "DSA Tracker", icon: Code2, to: ROUTES.DSA_TRACKER, active: true },
  { label: "CS Subjects", icon: BookOpen, to: ROUTES.CS_SUBJECTS, active: true },
  { label: "Companies", icon: Building2, to: ROUTES.COMPANIES, active: true },
  { label: "Mock Tests", icon: ClipboardList, to: ROUTES.MOCK_TESTS, active: true },
  { label: "Resume", icon: FileText, to: ROUTES.RESUME, active: true },
  { label: "Study Planner", icon: CalendarDays, to: ROUTES.STUDY_PLANNER, active: true },
];

// Nav list + AI badge extracted so desktop and mobile render identical
// markup instead of two hand-maintained copies drifting apart.
function SidebarContent({ onNavigate }) {
  return (
    <>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) =>
          item.active ? (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onNavigate}
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
  <NavLink
    to={ROUTES.MENTOR}
    onClick={onNavigate}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-2.5 rounded-lg bg-gradient-to-br from-primary-muted to-accent-muted px-3 py-2.5 transition-all duration-200 shadow-[var(--ai-pill-shadow)] border border-[var(--ai-pill-border)]",
        isActive
          ? "ring-1 ring-primary/60"
          : "hover:brightness-110 active:scale-[0.99]"
      )
    }
  >
    <Sparkles className="size-4 text-accent" />
    <span className="text-[12.5px] font-medium text-text-muted">PrepPilot AI</span>
  </NavLink>
</div>
    </>
  );
}

export function Sidebar({ isMobileOpen = false, onMobileClose }) {
  // Lock background scroll while thedrawer is open — required by spec
  // item 1 ("prevent the page behindfrom behaving awkwardly").
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Desktop — unchanged from before */}
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-border bg-surface/50 md:flex">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary font-display text-[13px] font-bold text-white">
            P
          </div>
          <span className="font-display text-[14.5px] font-semibold tracking-tight">PrepPilot</span>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden",
          isMobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] max-w-[80vw] flex-col border-r border-border bg-surface transition-transform duration-300 ease-in-out md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary font-display text-[13px] font-bold text-white">
              P
            </div>
            <span className="font-display text-[14.5px] font-semibold tracking-tight">PrepPilot</span>
          </div>
          <button
            className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/[0.05] hover:text-text"
            aria-label="Close menu"
            onClick={onMobileClose}
          >
            <X className="size-[18px]" />
          </button>
        </div>
        <SidebarContent onNavigate={onMobileClose} />
      </aside>
    </>
  );
}
