import { useQuery } from "@tanstack/react-query";
import { attemptsApi } from "@/features/mock-tests/api/attemptsApi";

export function useAttempt(attemptId) {
  return useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: async () => {
      const { data } = await attemptsApi.getById(attemptId);
      return data.data.attempt;
    },
    enabled: Boolean(attemptId),
  });
}