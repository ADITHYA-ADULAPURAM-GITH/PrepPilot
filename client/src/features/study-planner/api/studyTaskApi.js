import axiosInstance from "@/api/axiosInstance";

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null)
  );
}

export const studyTaskApi = {
  list: (params) => axiosInstance.get("/study-tasks", { params: cleanParams(params) }),
  getById: (id) => axiosInstance.get(`/study-tasks/${id}`),
  create: (payload) => axiosInstance.post("/study-tasks", payload),
  update: (id, payload) => axiosInstance.patch(`/study-tasks/${id}`, payload),
  remove: (id) => axiosInstance.delete(`/study-tasks/${id}`),
};