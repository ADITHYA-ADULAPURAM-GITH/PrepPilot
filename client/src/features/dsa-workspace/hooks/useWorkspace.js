import { useQuery } from "@tanstack/react-query";
import { dsaWorkspaceApi } from "@/features/dsa-workspace/api/dsaWorkspaceApi";

export function useWorkspace(problemId) {
  return useQuery({
    queryKey: ["dsa-workspace", problemId],
    queryFn: async () => {
      const { data } = await dsaWorkspaceApi.getWorkspace(problemId);
      return data.data.problem;
    },
    enabled: Boolean(problemId),
  });
}