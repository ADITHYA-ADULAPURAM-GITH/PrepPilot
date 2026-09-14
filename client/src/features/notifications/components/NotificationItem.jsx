function formatDateTime(dateStr) {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NotificationItem({
  notification,
  onMarkRead,
}) {
  const {
    _id,
    title,
    message,
    isRead,
    createdAt,
  } = notification;

  return (
    <div
      className={`flex flex-col gap-1 border-b border-border px-3.5 py-3 text-[12.5px] last:border-0 ${
        isRead ? "opacity-60" : "bg-primary/[0.04]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-text">
          {title}
        </p>

        {!isRead && (
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
        )}
      </div>

      <p className="text-text-muted">
        {message}
      </p>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-text-faint">
          {formatDateTime(createdAt)}
        </span>

        {!isRead && (
          <button
            type="button"
            onClick={() => onMarkRead(_id)}
            className="text-[11px] font-medium text-primary-strong hover:underline"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}