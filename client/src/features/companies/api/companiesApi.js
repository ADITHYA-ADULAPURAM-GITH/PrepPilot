import axiosInstance from "@/api/axiosInstance";

// Mirrors problemsApi's cleanParams fix (DSA Tracker): empty-string
// filter values fail the backend's Zod query schema the same way, so
// they're stripped here before the request goes out.
function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null)
  );
}

export const companiesApi = {
  list: (params) => axiosInstance.get("/companies", { params: cleanParams(params) }),
};