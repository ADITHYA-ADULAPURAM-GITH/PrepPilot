import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";

export function useCreateStudyTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => studyTaskApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-tasks"] });
      toast.success("Task created");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't create task. Try again.");
    },
  });
}