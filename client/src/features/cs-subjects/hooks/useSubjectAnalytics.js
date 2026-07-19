import { useQuery } from "@tanstack/react-query";
import { subjectsApi } from "@/features/cs-subjects/api/subjectsApi";

export function useSubjectAnalytics() {
  return useQuery({
    queryKey: ["subjects", "analytics"],
    queryFn: async () => {
      const { data } = await subjectsApi.getAnalytics();
      return data.data;
    },
  });
}