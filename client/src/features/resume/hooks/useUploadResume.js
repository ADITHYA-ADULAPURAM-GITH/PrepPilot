import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { resumeApi } from "@/features/resume/api/resumeApi";

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => resumeApi.upload(file),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["resume"], data.data.resume);
      toast.success("Resume saved");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't upload that file. Try again.");
    },
  });
}