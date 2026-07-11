import { cn } from "@/lib/utils";

export function ProgressBar({ value = 0, className, barClassName, showLabel = false, label }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
          <span className="text-text-muted">{label}</span>
          <span className="font-mono text-text-muted">{clamped}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-700 ease-out", barClassName)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
