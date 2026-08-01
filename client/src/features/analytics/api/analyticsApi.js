import axiosInstance from "@/api/axiosInstance";

export const analyticsApi = {
  getOverview: () => axiosInstance.get("/analytics/overview"),
};