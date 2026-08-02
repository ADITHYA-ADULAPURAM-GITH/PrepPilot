import axiosInstance from "@/api/axiosInstance";

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null)
  );
}

export const attemptsApi = {
  start: (testId) => axiosInstance.post(`/mocktests/${testId}/start`),
  getQuestions: (attemptId) => axiosInstance.get(`/mocktests/attempts/${attemptId}/questions`),
  saveAnswer: (attemptId, payload) => axiosInstance.patch(`/mocktests/attempts/${attemptId}/answer`, payload),
  submit: (attemptId, autoSubmitted = false) =>
    axiosInstance.post(`/mocktests/attempts/${attemptId}/submit`, { autoSubmitted }),
  list: (params) => axiosInstance.get("/mocktests/attempts", { params: cleanParams(params) }),
  getById: (attemptId) => axiosInstance.get(`/mocktests/attempts/${attemptId}`),
};