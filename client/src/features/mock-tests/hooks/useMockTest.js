import { useQuery } from "@tanstack/react-query";
import { mockTestsApi } from "@/features/mock-tests/api/mockTestsApi";

export function useMockTest(testId) {
  return useQuery({
    queryKey: ["mock-test", testId],
    queryFn: async () => {
      const { data } = await mockTestsApi.getById(testId);
      return data.data.test;
    },
    enabled: Boolean(testId),
  });
}