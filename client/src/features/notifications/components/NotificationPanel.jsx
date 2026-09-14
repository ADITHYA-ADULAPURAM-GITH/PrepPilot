import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useMarkNotificationRead } from "@/features/notifications/hooks/useMarkNotificationRead";
import { useMarkAllNotificationsRead } from "@/features/notifications/hooks/useMarkAllNotificationsRead";
import { NotificationItem } from "@/features/notifications/components/NotificationItem";

export function NotificationPanel() {
  const {
    data: notifications,
    isLoading,
    isError,
    refetch,
  } = useNotifications();

  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const hasUnread =
    Array.isArray(notifications) &&
    notifications.some((n) => !n.isRead);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-base shadow-xl sm:w-[340px]">
      <div className="flex items-center justify-between border-b border-border px-3.5 py-3">
        <p className="text-[13px] font-semibold text-text">
          Notifications
        </p>

        {hasUnread && (
          <button
            type="button"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="text-[11.5px] font-medium text-primary-strong hover:underline disabled:opacity-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-[360px] overflow-y-auto">
        {isLoading && (
          <div className="px-3.5 py-6 text-center text-[12.5px] text-text-muted">
            Loading...
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-2 px-3.5 py-6 text-center">
            <p className="text-[12.5px] text-red-400">
              Couldn't load notifications.
            </p>

            <button
              type="button"
              onClick={() => refetch?.()}
              className="text-[11.5px] font-medium text-primary-strong hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading &&
          !isError &&
          (!notifications ||
            notifications.length === 0) && (
            <div className="px-3.5 py-8 text-center">
              <p className="text-[13px] font-medium text-text">
                You're all caught up
              </p>

              <p className="mt-1 text-[12px] text-text-faint">
                No notifications yet.
              </p>
            </div>
          )}

        {!isLoading &&
          !isError &&
          notifications?.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkRead={(id) => markRead.mutate(id)}
            />
          ))}
      </div>
    </div>
  );
}