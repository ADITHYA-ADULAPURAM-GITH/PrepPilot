import axiosInstance from "@/api/axiosInstance";

const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== undefined && value !== null
    )
  );

export const problemsApi = {
  list: (params) =>
    axiosInstance.get("/problems", {
      params: cleanParams(params),
    }),

  getById: (id) => axiosInstance.get(`/problems/${id}`),

  create: (payload) => axiosInstance.post("/problems", payload),

  update: (id, payload) =>
    axiosInstance.patch(`/problems/${id}`, payload),

  remove: (id) => axiosInstance.delete(`/problems/${id}`),

  getStats: () => axiosInstance.get("/problems/stats"),
};