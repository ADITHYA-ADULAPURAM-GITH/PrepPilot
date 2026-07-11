import axiosInstance from "@/api/axiosInstance";

export const authApi = {
  register: (payload) => axiosInstance.post("/auth/register", payload),
  login: (payload) => axiosInstance.post("/auth/login", payload),
  logout: () => axiosInstance.post("/auth/logout"),
  forgotPassword: (payload) => axiosInstance.post("/auth/forgot-password", payload),
  resetPassword: (token, payload) => axiosInstance.post(`/auth/reset-password/${token}`, payload),
  getMe: () => axiosInstance.get("/auth/me"),
};
