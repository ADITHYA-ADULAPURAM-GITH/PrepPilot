import { Code2, BookOpen, ClipboardList, Briefcase, Terminal, ListTodo, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Keyed by the real StudyTask.category enum values (server/models/StudyTask.js).
// No fake/invented categories — every key here is a value the backend can
// actually produce.
const TYPE_CONFIG = {
  DSA: { icon: Code2, variant: "primary" },
  "CS Subjects": { icon: BookOpen, variant: "accent" },
  Aptitude: { icon: ClipboardList, variant: "default" },
  "Interview Prep": { icon: Briefcase, variant: "primary" },
  Development: { icon: Terminal, variant: "accent" },
  Other: { icon: ListTodo, variant: "default" },
};

export function UpcomingDeadlines({ deadlines }) {
  const navigate = useNavigate();

  // No per-task detail route exists yet — every deadline is a Study
  // Planner task, so we route to the existing Study Planner page
  // rather than inventing a new one.
  function handleOpenDeadline() {
    navigate(ROUTES.STUDY_PLANNER);
  }

  return (
    <Card className="p-6">
      <h2 className="font-display text-[15px] font-semibold text-text">Upcoming Deadlines</h2>

      <ul className="mt-4 space-y-1">
        {deadlines.map((item) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.Other;
          const Icon = config.icon;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={handleOpenDeadline}
                className={cn(
                  "group flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-left",
                  "cursor-pointer transition-all duration-200 ease-out",
                  "hover:bg-white/[0.05] active:scale-[0.99] active:bg-white/[0.06]"
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] transition-colors duration-200",
                      "group-hover:bg-white/[0.08]"
                    )}
                  >
                    <Icon className="size-4 text-text-muted" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] text-text">{item.title}</p>
                    <Badge variant={config.variant} className="mt-1">
                      {item.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="font-mono text-[12px] text-text-muted">{item.date}</span>
                  <ChevronRight
                    className={cn(
                      "size-3.5 text-text-faint transition-all duration-200",
                      "group-hover:translate-x-0.5 group-hover:text-text-muted"
                    )}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}