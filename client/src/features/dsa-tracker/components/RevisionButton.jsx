import { RotateCcw } from "lucide-react";
import { useUpdateProblem } from "@/features/dsa-tracker/hooks/useProblemMutations";

export function RevisionButton({ problem }) {
  const updateProblem = useUpdateProblem();

  const handleClick = () => {
    updateProblem.mutate({
      id: problem._id,
      payload: { revisionCount: problem.revisionCount + 1 },
      silent: true,
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={updateProblem.isPending}
      className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[12px] text-text-muted transition-colors hover:border-primary hover:text-text disabled:opacity-50"
      title="Log a revision"
    >
      <RotateCcw className="size-3" />
      {problem.revisionCount}
    </button>
  );
}