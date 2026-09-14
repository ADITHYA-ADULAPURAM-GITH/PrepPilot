import { Card } from "@/components/ui/card";
import { SeverityBadge } from "@/features/resume/components/SeverityBadge";

export function TopFixes({ topFixes = [] }) {
  if (topFixes.length === 0) return null;

  return (
    <Card className="p-5">
      <h3 className="font-display text-[15px] font-semibold text-text">Fix these first</h3>
      <div className="mt-4 space-y-4">
        {topFixes.map((fix, i) => (
          <div key={i} className="rounded-xl bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-[13.5px] font-semibold text-text">{fix.title}</p>
              <SeverityBadge severity={fix.severity} />
            </div>
            <p className="mt-1.5 text-[13px] text-text-muted">{fix.description}</p>
            <p className="mt-2 text-[12.5px] text-text-muted">
              <span className="font-medium text-text">Why it matters: </span>
              {fix.why}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}