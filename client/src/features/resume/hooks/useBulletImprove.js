import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resumeApi } from "@/features/resume/api/resumeApi";

// Standalone tool — works even if the user has no resume uploaded at all.
export function useBulletImprove() {
  return useMutation({
    mutationFn: (bullet) => resumeApi.improveBullet(bullet),
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't improve that bullet. Try again.");
    },
  });
}