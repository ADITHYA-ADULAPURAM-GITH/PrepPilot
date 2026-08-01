import axiosInstance from "@/api/axiosInstance";

export const resumeApi = {
  get: () => axiosInstance.get("/resume"),
  upload: (file) => {
    const formData = new FormData();
    formData.append("resume", file); // field name must match multer's .single("resume") on the backend
    return axiosInstance.post("/resume", formData);
  },
  remove: () => axiosInstance.delete("/resume"),
  // Download isn't a React Query concern — it's a direct browser navigation/blob
  // fetch, not JSON data to cache. Exposed here for whichever page wires the
  // download button; deliberately no hook for it in this batch.
  downloadUrl: () => `${axiosInstance.defaults.baseURL}/resume/download`,
};