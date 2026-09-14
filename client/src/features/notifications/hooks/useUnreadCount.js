import { useQuery } from "@tanstack/react-query";
import { notificationsApi } from "@/features/notifications/api/notificationsApi";

export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const { data } = await notificationsApi.getUnreadCount();
      return data?.data?.count ?? 0;
    },
  });
}