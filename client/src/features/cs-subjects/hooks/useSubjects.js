import { useQuery } from "@tanstack/react-query";
import { subjectsApi } from "@/features/cs-subjects/api/subjectsApi";

export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } = await subjectsApi.list();
      return data.data.subjects;
    },
  });
}