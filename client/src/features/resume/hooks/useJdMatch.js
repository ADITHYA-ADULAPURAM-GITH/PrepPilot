import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resumeApi } from "@/features/resume/api/resumeApi";


export function useJdMatch() {
  return useMutation({
    mutationFn: (jdText) => resumeApi.matchJd(jdText),
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't match that job description. Try again.");
    },
  });
}