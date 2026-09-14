import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "@/features/notifications/api/notificationsApi";

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId) => {
      const { data } = await notificationsApi.markAsRead(notificationId);
      return data.data.notification;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", "list"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
}