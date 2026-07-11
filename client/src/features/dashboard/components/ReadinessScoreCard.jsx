import { ReadinessRing } from "@/components/common/ReadinessRing";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Card } from "@/components/ui/card";

export function ReadinessScoreCard({ overall, breakdown }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[15px] font-semibold text-text">Placement Readiness</h2>
      </div>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <ReadinessRing size={168} value={overall} showLabel={false} />

        <div className="w-full flex-1 space-y-3.5">
          {breakdown.map((item) => (
            <ProgressBar key={item.label} value={item.value} label={item.label} showLabel />
          ))}
        </div>
      </div>
    </Card>
  );
}
