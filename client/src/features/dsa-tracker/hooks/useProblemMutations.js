import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { problemsApi } from "@/features/dsa-tracker/api/problemsApi";

function invalidateAfterMutation(queryClient) {
  queryClient.invalidateQueries({ queryKey: ["problems"] });
  queryClient.invalidateQueries({ queryKey: ["dashboard"] });
}

export function useCreateProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: problemsApi.create,
    onSuccess: () => {
      invalidateAfterMutation(queryClient);
      toast.success("Problem added");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't add that problem. Try again.");
    },
  });
}

export function useUpdateProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => problemsApi.update(id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["problems"] });
      const previousQueries = queryClient.getQueriesData({ queryKey: ["problems"] });

      queryClient.setQueriesData({ queryKey: ["problems"] }, (old) => {
        if (!old?.problems) return old;
        return {
          ...old,
          problems: old.problems.map((p) => (p._id === id ? { ...p, ...payload } : p)),
        };
      });

      return { previousQueries };
    },
    onError: (error, _variables, context) => {
      context?.previousQueries?.forEach(([key, data]) => queryClient.setQueryData(key, data));
      toast.error(error.response?.data?.message || "Couldn't update that problem. Try again.");
    },
    onSuccess: (_data, variables) => {
      if (!variables.silent) toast.success("Problem updated");
    },
    onSettled: () => invalidateAfterMutation(queryClient),
  });
}

export function useDeleteProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: problemsApi.remove,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["problems"] });
      const previousQueries = queryClient.getQueriesData({ queryKey: ["problems"] });

      queryClient.setQueriesData({ queryKey: ["problems"] }, (old) => {
        if (!old?.problems) return old;
        return { ...old, problems: old.problems.filter((p) => p._id !== id) };
      });

      return { previousQueries };
    },
    onError: (error, _id, context) => {
      context?.previousQueries?.forEach(([key, data]) => queryClient.setQueryData(key, data));
      toast.error(error.response?.data?.message || "Couldn't remove that problem. Try again.");
    },
    onSuccess: () => toast.success("Problem removed"),
    onSettled: () => invalidateAfterMutation(queryClient),
  });
}