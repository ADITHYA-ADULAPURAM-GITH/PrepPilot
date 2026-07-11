import { Code2, Sparkles, RotateCcw, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  dsa: { icon: Code2, color: "text-primary", bg: "bg-primary-muted" },
  ai: { icon: Sparkles, color: "text-accent", bg: "bg-accent-muted" },
  revision: { icon: RotateCcw, color: "text-success", bg: "bg-success/10" },
  mock: { icon: ClipboardCheck, color: "text-[#b3a9ff]", bg: "bg-primary-muted" },
};

export function RecentActivity({ activity }) {
  return (
    <Card className="p-6">
      <h2 className="font-display text-[15px] font-semibold text-text">Recent Activity</h2>

      <ol className="mt-4 space-y-5">
        {activity.map((item, idx) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.dsa;
          const Icon = config.icon;
          const isLast = idx === activity.length - 1;

          return (
            <li key={item.id} className="relative flex gap-3">
              {!isLast && (
                <span className="absolute left-[13px] top-7 h-[calc(100%+4px)] w-px bg-border" aria-hidden />
              )}
              <span
                className={cn(
                  "relative z-10 flex size-[26px] shrink-0 items-center justify-center rounded-full",
                  config.bg
                )}
              >
                <Icon className={cn("size-3.5", config.color)} />
              </span>
              <div className="pt-0.5">
                <p className="text-[13.5px] leading-snug text-text">{item.text}</p>
                <p className="mt-0.5 text-[12px] text-text-faint">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
