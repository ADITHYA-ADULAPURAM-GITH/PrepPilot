const HEALTH_STYLES = {
  "Needs Work": {
    ring: "stroke-red-400",
    text: "text-red-400",
    chip: "bg-red-500/10 text-red-400",
  },

  Fair: {
    ring: "stroke-amber-400",
    text: "text-amber-400",
    chip: "bg-amber-500/10 text-amber-400",
  },

  Good: {
    ring: "stroke-primary",
    text: "text-primary-strong",
    chip: "bg-primary-muted text-primary-strong",
  },

  Strong: {
    ring: "stroke-emerald-400",
    text: "text-emerald-400",
    chip: "bg-emerald-500/10 text-emerald-400",
  },
};

const SIZE = 96;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE =
  2 * Math.PI * RADIUS;

export function ScoreRing({
  score,
  health,
}) {
  const clamped = Math.max(
    0,
    Math.min(100, score ?? 0)
  );

  const offset =
    CIRCUMFERENCE -
    (clamped / 100) * CIRCUMFERENCE;

  const styles =
    HEALTH_STYLES[health] ||
    HEALTH_STYLES.Fair;

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative shrink-0"
        style={{
          width: SIZE,
          height: SIZE,
        }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-white/10"
          />

          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className={`${styles.ring} transition-[stroke-dashoffset] duration-500`}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-semibold text-text">
            {clamped}
          </span>

          <span className="text-[10.5px] text-text-muted">
            / 100
          </span>
        </div>
      </div>

      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[12.5px] font-medium ${styles.chip}`}
        >
          {health}
        </span>

        <p className="mt-1.5 text-[12.5px] text-text-muted">
          Overall ATS score
        </p>
      </div>
    </div>
  );
}