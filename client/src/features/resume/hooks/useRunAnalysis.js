import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { resumeApi } from "@/features/resume/api/resumeApi";

// Explicit user-triggered action only (Analyze / Re-analyze button).
// Never call this automatically.
export function useRunAnalysis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resumeApi.runAnalysis(),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["resume", "analysis"], data.data.analysis);
      toast.success("Analysis complete");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't analyze your resume. Try again.");
    },
  });
}