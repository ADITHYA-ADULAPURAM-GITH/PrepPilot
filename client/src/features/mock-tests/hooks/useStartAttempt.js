import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { attemptsApi } from "@/features/mock-tests/api/attemptsApi";

// No queryClient/cache invalidation here — starting an attempt doesn't
// change any data a list/detail query already has cached (the test
// catalog is unaffected by starting an attempt on it). The caller uses
// the returned attempt._id to navigate into the test-taking flow, which
// is why this mutation returns data on success rather than just firing
// a toast.
export function useStartAttempt() {
  return useMutation({
    mutationFn: (testId) => attemptsApi.start(testId),
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't start the test. Try again.");
    },
  });
}