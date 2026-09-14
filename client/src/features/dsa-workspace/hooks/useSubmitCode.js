import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dsaWorkspaceApi } from "@/features/dsa-workspace/api/dsaWorkspaceApi";

export function useSubmitCode(problemId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await dsaWorkspaceApi.submit(problemId, payload);
      return data.data;
    },
    onSuccess: () => {
      // Refresh attempts history after a successful submit
      queryClient.invalidateQueries({ queryKey: ["dsa-attempts", problemId] });
    },
  });
}