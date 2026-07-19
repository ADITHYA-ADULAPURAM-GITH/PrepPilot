import axiosInstance from "@/api/axiosInstance";

// Only the two calls the Subject Dashboard (Step 3) needs. getTopics
// and updateProgress belong to the Subject Details page (Step 4) and
// are added there, not here, to keep this step properly scoped.
export const subjectsApi = {
  list: () => axiosInstance.get("/subjects"),
  getAnalytics: () => axiosInstance.get("/subjects/analytics"),
};