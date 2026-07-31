import axiosInstance from "@/api/axiosInstance";

export const subjectsApi = {
  list: () => axiosInstance.get("/subjects"),
  getAnalytics: () => axiosInstance.get("/subjects/analytics"),
  getTopics: (subjectId) => axiosInstance.get(`/subjects/${subjectId}/topics`),
  updateProgress: (subjectId, topicId, payload) =>
    axiosInstance.patch(`/subjects/${subjectId}/topics/${topicId}/progress`, payload),
};