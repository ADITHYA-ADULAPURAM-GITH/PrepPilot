import { DifficultyBadge } from "@/features/dsa-tracker/components/DifficultyBadge";
import { StatusBadge } from "@/features/dsa-tracker/components/StatusBadge";
import { ProblemActions } from "@/features/dsa-tracker/components/ProblemActions";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function ProblemTable({ problems }) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-border lg:block">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-white/[0.02] text-[12px] text-text-muted">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Topic</th>
            <th className="px-4 py-3 font-medium">Difficulty</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Solved</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr
              key={problem._id}
              className="border-b border-border text-[13.5px] transition-colors last:border-0 hover:bg-white/[0.015]"
            >
              <td className="px-4 py-3">
                <p className="font-medium text-text">{problem.title}</p>
                <p className="text-[12px] text-text-faint">{problem.platform || "—"}</p>
              </td>
              <td className="px-4 py-3 text-text-muted">{problem.topic}</td>
              <td className="px-4 py-3">
                <DifficultyBadge difficulty={problem.difficulty} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={problem.status} />
              </td>
              <td className="px-4 py-3 font-mono text-[12.5px] text-text-muted">
                {formatDate(problem.dateSolved)}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  <ProblemActions problem={problem} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}