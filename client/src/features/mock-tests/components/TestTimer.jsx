import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Deadline is computed from startedAt + durationMinutes, not counted
// down from a fresh `durationMinutes` on every mount. A page refresh
// mid-attempt must not grant extra time — the server-persisted
// startedAt is the only source of truth for when time actually runs out.
export function TestTimer({ startedAt, durationMinutes, onExpire }) {
  const deadline = useRef(new Date(startedAt).getTime() + durationMinutes * 60 * 1000);
  const hasExpiredRef = useRef(false);
  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, deadline.current - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, deadline.current - Date.now());
      setRemainingMs(remaining);

      if (remaining <= 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpire]);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const isLowTime = totalSeconds <= 60;

  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13.5px] font-semibold ${
        isLowTime ? "border-red-500/30 bg-red-500/10 text-red-400" : "border-border bg-white/[0.03] text-text"
      }`}
    >
      <Clock className="size-4" />
      {formatTime(totalSeconds)}
    </div>
  );
}