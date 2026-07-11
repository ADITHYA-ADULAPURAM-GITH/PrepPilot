import { Card } from "@/components/ui/card";
import { DifficultyBadge } from "@/features/dsa-tracker/components/DifficultyBadge";
import { StatusBadge } from "@/features/dsa-tracker/components/StatusBadge";
import { ProblemActions } from "@/features/dsa-tracker/components/ProblemActions";

export function ProblemCard({ problem }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[14px] font-medium text-text">{problem.title}</p>
          <p className="mt-0.5 text-[12px] text-text-faint">
            {problem.topic} · {problem.platform || "—"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <DifficultyBadge difficulty={problem.difficulty} />
        <StatusBadge status={problem.status} />
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <ProblemActions problem={problem} />
      </div>
    </Card>
  );
}