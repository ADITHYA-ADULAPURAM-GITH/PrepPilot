import { Link } from "react-router-dom";
import { ProblemCard } from "@/features/dsa-tracker/components/ProblemCard";

export function ProblemCardList({ problems }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
      {problems.map((problem) => {
        const workspaceId = problem.problemBankRef;

        return (
          <div key={problem._id} className="space-y-2">
            <ProblemCard problem={problem} />
            {workspaceId ? (
              <Link
                to={`/dsa-tracker/${workspaceId}`}
                aria-label={`Solve ${problem.title}`}
                className="block w-full rounded-xl border border-border px-3 py-2 text-center text-[13px] font-medium text-text transition-colors hover:bg-white/[0.04]"
              >
                Solve
              </Link>
            ) : (
              <span
                className="block w-full cursor-not-allowed rounded-xl border border-border px-3 py-2 text-center text-[13px] font-medium text-text-faint opacity-50"
                title="Workspace not available for this problem yet"
              >
                Solve
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}