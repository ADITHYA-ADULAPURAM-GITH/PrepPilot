import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { resumeApi } from "@/features/resume/api/resumeApi";

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resumeApi.remove(),
    onSuccess: () => {
      queryClient.setQueryData(["resume"], null);
      toast.success("Resume deleted");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't delete resume. Try again.");
    },
  });
}