import { useQuery } from "@tanstack/react-query";
import { problemsApi } from "@/features/dsa-tracker/api/problemsApi";

export function useProblems(filters) {
  return useQuery({
    queryKey: ["problems", filters],
    queryFn: async () => {
      const { data } = await problemsApi.list(filters);
      return data.data;
    },
    placeholderData: (prev) => prev,
  });
}