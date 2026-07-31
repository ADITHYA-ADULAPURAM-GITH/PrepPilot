import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { subjectsApi } from "@/features/cs-subjects/api/subjectsApi";

export function useTopicProgressMutation(subjectId) {
  const queryClient = useQueryClient();
  const queryKey = ["subject-detail", subjectId];

  return useMutation({
    mutationFn: ({ topicId, payload }) => subjectsApi.updateProgress(subjectId, topicId, payload),
    onMutate: async ({ topicId, payload }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => {
        if (!old?.topics) return old;
        return {
          ...old,
          topics: old.topics.map((t) => (t._id === topicId ? { ...t, ...payload } : t)),
        };
      });

      return { previous };
    },
    onError: (error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      toast.error(error.response?.data?.message || "Couldn't update that topic. Try again.");
    },
    onSuccess: (_data, variables) => {
      if (!variables.silent) toast.success("Progress updated");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      // Subject cards + analytics banner + main Dashboard's CS Subjects
      // line all derive from this same progress data.
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}