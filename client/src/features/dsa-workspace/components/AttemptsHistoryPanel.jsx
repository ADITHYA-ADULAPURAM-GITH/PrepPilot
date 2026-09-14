import { useAttempts } from "@/features/dsa-workspace/hooks/useAttempts";

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AttemptsHistoryPanel({ problemId }) {
  const { data: attempts, isLoading, isError } = useAttempts(problemId);

  if (isLoading) {
    return <div className="text-[12.5px] text-text-muted">Loading attempts...</div>;
  }

  if (isError) {
    return <div className="text-[12.5px] text-red-400">Couldn't load attempt history.</div>;
  }

  if (!attempts || attempts.length === 0) {
    return <div className="text-[12.5px] text-text-faint">No attempts yet.</div>;
  }

  return (
    <div className="space-y-2">
      {attempts.map((attempt) => (
        <div
          key={attempt.attemptNumber}
          className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-[12.5px]"
        >
          <div className="flex items-center gap-3">
            <span className="font-medium text-text">#{attempt.attemptNumber}</span>
            <span
              className={attempt.result === "Accepted" ? "text-emerald-400" : "text-red-400"}
            >
              {attempt.result}
            </span>
            <span className="text-text-faint">{attempt.language}</span>
          </div>
          <div className="flex items-center gap-3 text-text-muted">
            {typeof attempt.runtimeMs === "number" && <span>{attempt.runtimeMs} ms</span>}
            {typeof attempt.memoryKb === "number" && <span>{attempt.memoryKb} KB</span>}
            <span>{formatDateTime(attempt.submittedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}