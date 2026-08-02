import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attemptsApi } from "@/features/mock-tests/api/attemptsApi";

// Submission (unlike saveAnswer) does have a clear, unavoidable cache
// consequence: once submitted, this attempt's status flips from
// "in-progress" to "submitted"/"auto-submitted", and correctOptionIndex
// / explanation become visible in the questions payload. The cached
// attempt-questions response is now stale by definition — invalidating
// is not a timing/UX choice the way answer-saving is, it's just
// correctness, so it stays in the hook rather than being left to the
// page to remember every time.
export function useSubmitAttempt(attemptId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (autoSubmitted = false) => attemptsApi.submit(attemptId, autoSubmitted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attempt-questions", attemptId] });
      queryClient.invalidateQueries({ queryKey: ["attempt", attemptId] });
    },
  });
}