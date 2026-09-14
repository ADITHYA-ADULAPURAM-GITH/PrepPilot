import { useQuery } from "@tanstack/react-query";
import { notificationsApi } from "@/features/notifications/api/notificationsApi";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications", "list"],
    queryFn: async () => {
      const { data } = await notificationsApi.list(10);
      return data?.data?.notifications ?? [];
    },
  });
}