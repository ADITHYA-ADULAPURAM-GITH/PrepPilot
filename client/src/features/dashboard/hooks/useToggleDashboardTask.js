
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";


export function useToggleDashboardTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isCompleted }) => studyTaskApi.update(id, { isCompleted }),

    onMutate: async ({ id, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: ["dashboard", "summary"] });
      const previous = queryClient.getQueryData(["dashboard", "summary"]);

      queryClient.setQueryData(["dashboard", "summary"], (old) => {
        if (!old?.tasks) return old;

        const tasks = old.tasks.map((t) => (t.id === id ? { ...t, done: isCompleted } : t));
        const doneCount = tasks.filter((t) => t.done).length;
        const total = tasks.length;

        const stats = old.stats.map((s) =>
          s.label === "Today's Goal"
            ? {
                ...s,
                value: total ? `${doneCount} / ${total}` : "No tasks today",
                change: total ? `${total - doneCount} remaining` : "",
              }
            : s
        );

        return { ...old, tasks, stats };
      });

      return { previous };
    },

    onError: (error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["dashboard", "summary"], context.previous);
      }
      toast.error(error.response?.data?.message || "Couldn't update task. Try again.");
    },

    onSettled: () => {
      // Refresh Dashboard's own numbers, and keep Study Planner's
      // cache honest too in case the user navigates there next.
      queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["study-tasks"] });
    },
  });
}