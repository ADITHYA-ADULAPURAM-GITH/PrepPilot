import { useQuery } from "@tanstack/react-query";
import { mockTestsApi } from "@/features/mock-tests/api/mockTestsApi";

export function useMockTests(filters) {
  return useQuery({
    queryKey: ["mock-tests", filters],
    queryFn: async () => {
      const { data } = await mockTestsApi.list(filters);
      return data.data; // { tests, pagination }
    },
    placeholderData: (prev) => prev,
  });
}