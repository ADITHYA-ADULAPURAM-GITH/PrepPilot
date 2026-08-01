import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";

export function useToggleStudyTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isCompleted }) => studyTaskApi.update(id, { isCompleted }),
    onMutate: async ({ id, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: ["study-tasks"] });
      const previous = queryClient.getQueriesData({ queryKey: ["study-tasks"] });

      queryClient.setQueriesData({ queryKey: ["study-tasks"] }, (old) => {
        if (!old?.tasks) return old;
        return {
          ...old,
          tasks: old.tasks.map((t) => (t._id === id ? { ...t, isCompleted } : t)),
        };
      });

      return { previous };
    },
    onError: (error, _variables, context) => {
      context?.previous?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error(error.response?.data?.message || "Couldn't update task. Try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["study-tasks"] });
    },
  });
}