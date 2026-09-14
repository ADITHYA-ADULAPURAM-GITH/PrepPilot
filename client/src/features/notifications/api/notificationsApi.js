import axiosInstance from "@/api/axiosInstance";

const BASE = "/notifications";

export const notificationsApi = {
  list: (limit = 10) => axiosInstance.get(BASE, { params: { limit } }),
  getUnreadCount: () => axiosInstance.get(`${BASE}/unread-count`),
  markAsRead: (id) => axiosInstance.patch(`${BASE}/${id}/read`),
  markAllAsRead: () => axiosInstance.patch(`${BASE}/read-all`),
};