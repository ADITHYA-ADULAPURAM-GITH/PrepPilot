const SEVERITY_STYLES = {
  high: "bg-red-500/10 text-red-400",
  medium: "bg-amber-500/10 text-amber-400",
  low: "bg-white/5 text-text-muted",
};

const SEVERITY_LABELS = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

export function SeverityBadge({ severity }) {
  const style = SEVERITY_STYLES[severity] || SEVERITY_STYLES.medium;
  const label = SEVERITY_LABELS[severity] || SEVERITY_LABELS.medium;

  return (
    <span className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${style}`}>
      {label}
    </span>
  );
}