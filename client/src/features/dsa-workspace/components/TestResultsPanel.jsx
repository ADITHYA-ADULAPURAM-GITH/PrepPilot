// FIELD-NAME GAP FLAGGED: per your handoff, only overallResult, passedCount,
// totalCount are confirmed for Run; overallResult, passedCount, totalCount,
// attemptNumber, visibleFailures, runtimeMs, memoryKb are confirmed for Submit.
// The exact shape of individual visible test entries (order 0,1,2) was not
// provided, so this panel does NOT attempt to render per-test rows yet.
// Paste a sample JSON response and I'll add that section precisely.

export function TestResultsPanel({ result, mode }) {
  if (!result) return null;

  const { overallResult, passedCount, totalCount, attemptNumber, visibleFailures, runtimeMs, memoryKb } = result;

  const isAccepted = overallResult === "Accepted";

  return (
    <div className="space-y-2 rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between">
        <span
          className={`text-[13.5px] font-medium ${isAccepted ? "text-emerald-400" : "text-red-400"}`}
        >
          {overallResult}
        </span>
        <span className="text-[12.5px] text-text-muted">
          {passedCount}/{totalCount} passed
        </span>
      </div>

      {mode === "submit" && (
        <div className="space-y-1 text-[12.5px] text-text-muted">
          {typeof attemptNumber === "number" && <div>Attempt #{attemptNumber}</div>}
          {typeof runtimeMs === "number" && <div>Runtime: {runtimeMs} ms</div>}
          {typeof memoryKb === "number" && <div>Memory: {memoryKb} KB</div>}
          {Array.isArray(visibleFailures) && visibleFailures.length > 0 && (
            <div className="text-red-400">
              {visibleFailures.length} visible test{visibleFailures.length > 1 ? "s" : ""} failed
            </div>
          )}
        </div>
      )}
    </div>
  );
}