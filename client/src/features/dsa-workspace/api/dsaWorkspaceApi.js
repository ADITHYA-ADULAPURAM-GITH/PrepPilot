// ASSUMPTION FLAGGED: mirrors the pattern implied by useProblems.js
// (problemsApi.list(filters) -> axios call, response returned as { data }).
// I have not seen problemsApi.js or axiosInstance.js directly, so the
// import path and baseURL prefix below are inferred. Adjust the import
// path if axiosInstance lives elsewhere, and adjust the path prefix
// below if axiosInstance's baseURL does not already include "/api/v1".
import axiosInstance from "@/api/axiosInstance";

const BASE = "/problem-progress";

export const dsaWorkspaceApi = {
  getWorkspace: (problemId) => axiosInstance.get(`${BASE}/${problemId}/workspace`),

  run: (problemId, payload) => axiosInstance.post(`${BASE}/${problemId}/run`, payload),

  submit: (problemId, payload) => axiosInstance.post(`${BASE}/${problemId}/submit`, payload),

  getAttempts: (problemId) => axiosInstance.get(`${BASE}/${problemId}/attempts`),
};