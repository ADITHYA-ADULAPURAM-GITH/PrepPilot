import { Briefcase, ClipboardList, RotateCcw, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  interview: { icon: Briefcase, variant: "primary", label: "Interview" },
  assessment: { icon: ClipboardList, variant: "accent", label: "Assessment" },
  revision: { icon: RotateCcw, variant: "default", label: "Revision" },
};

export function UpcomingDeadlines({ deadlines }) {
  return (
    <Card className="p-6">
      <h2 className="font-display text-[15px] font-semibold text-text">Upcoming Deadlines</h2>

      <ul className="mt-4 space-y-1">
        {deadlines.map((item) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.revision;
          const Icon = config.icon;

          return (
            <li key={item.id}>
              <div className="flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/[0.03]">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]")}>
                    <Icon className="size-4 text-text-muted" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] text-text">{item.title}</p>
                    <Badge variant={config.variant} className="mt-1">
                      {config.label}
                    </Badge>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="font-mono text-[12px] text-text-muted">{item.date}</span>
                  <ChevronRight className="size-3.5 text-text-faint" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
