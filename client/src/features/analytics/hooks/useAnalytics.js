import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/features/analytics/api/analyticsApi";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: async () => {
      const { data } = await analyticsApi.getOverview();
      return data.data; // { dsa, csSubjects, companies, resume, studyPlanner }
    },
    staleTime: 60 * 1000, // analytics don't need to feel real-time; avoids refetching on every tab focus
  });
}