import { useMutation } from "@tanstack/react-query";
import { dsaWorkspaceApi } from "@/features/dsa-workspace/api/dsaWorkspaceApi";

export function useRunCode(problemId) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await dsaWorkspaceApi.run(problemId, payload);
      return data.data;
    },
  });
}