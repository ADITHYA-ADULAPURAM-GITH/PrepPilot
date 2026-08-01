import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";

export function useUpdateStudyTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => studyTaskApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-tasks"] });
      toast.success("Task updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't update task. Try again.");
    },
  });
}