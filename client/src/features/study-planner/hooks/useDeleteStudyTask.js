import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";

export function useDeleteStudyTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => studyTaskApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-tasks"] });
      toast.success("Task deleted");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't delete task. Try again.");
    },
  });
}