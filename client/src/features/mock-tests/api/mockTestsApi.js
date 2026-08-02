import axiosInstance from "@/api/axiosInstance";

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null)
  );
}

export const mockTestsApi = {
  list: (params) => axiosInstance.get("/mocktests", { params: cleanParams(params) }),
  getById: (id) => axiosInstance.get(`/mocktests/${id}`),
};