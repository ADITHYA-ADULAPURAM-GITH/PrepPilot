import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, change, to }) {
  const navigate = useNavigate();
  const isClickable = Boolean(to);

  function handleActivate() {
    if (isClickable) navigate(to);
  }

  function handleKeyDown(e) {
    if (!isClickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  }

  return (
    <Card
      onClick={isClickable ? handleActivate : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={cn(
        "group relative p-5 transition-all duration-200",
        isClickable
          ? "cursor-pointer hover:bg-white/[0.04] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          : ""
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12.5px] text-text-muted">{label}</p>
        {isClickable && (
          <ArrowRight
            className={cn(
              "size-3.5 shrink-0 text-text-faint opacity-0 transition-all duration-200",
              "group-hover:translate-x-0.5 group-hover:opacity-100"
            )}
          />
        )}
      </div>
      <p className="mt-2 font-display text-[26px] font-semibold leading-none text-text">{value}</p>
      {change && <p className="mt-2 text-[12px] text-text-faint">{change}</p>}
    </Card>
  );
}