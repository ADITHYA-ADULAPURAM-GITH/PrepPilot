import { useQuery } from "@tanstack/react-query";
import { attemptsApi } from "@/features/mock-tests/api/attemptsApi";

export function useAttemptQuestions(attemptId) {
  return useQuery({
    queryKey: ["attempt-questions", attemptId],
    queryFn: async () => {
      const { data } = await attemptsApi.getQuestions(attemptId);
      return data.data; // { attempt, questions } — questions omit correctOptionIndex/explanation until submitted
    },
    enabled: Boolean(attemptId),
    // Correctness data only exists after submission, and this attempt's
    // status won't change mid-fetch from outside the tab — no reason to
    // ever silently refetch behind the test-taker's back mid-attempt.
    staleTime: Infinity,
  });
}