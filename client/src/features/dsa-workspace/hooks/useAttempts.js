import { useQuery } from "@tanstack/react-query";
import { dsaWorkspaceApi } from "@/features/dsa-workspace/api/dsaWorkspaceApi";

export function useAttempts(problemId) {
  return useQuery({
    queryKey: ["dsa-attempts", problemId],
    queryFn: async () => {
      const { data } = await dsaWorkspaceApi.getAttempts(problemId);
      return data?.data?.attempts ?? [];
    },
    enabled: Boolean(problemId),
  });
}