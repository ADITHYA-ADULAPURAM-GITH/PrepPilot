import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/features/resume/api/resumeApi";

// `resumeId` gates the query: don't hit /resume/analysis until a resume
// actually exists (mirrors "gate everything on resume existing first").
export function useResumeAnalysis(resumeId) {
  return useQuery({
    queryKey: ["resume", "analysis"],
    queryFn: async () => {
      const { data } = await resumeApi.getAnalysis();
      return data.data.analysis; // null: no resume / never analyzed / invalidated by replace
    },
    enabled: !!resumeId,
  });
}