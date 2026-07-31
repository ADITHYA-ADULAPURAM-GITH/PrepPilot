import { useQuery } from "@tanstack/react-query";
import { subjectsApi } from "@/features/cs-subjects/api/subjectsApi";

export function useSubjectDetail(subjectId) {
  return useQuery({
    queryKey: ["subject-detail", subjectId],
    queryFn: async () => {
      const { data } = await subjectsApi.getTopics(subjectId);
      return data.data; // { subject, topics }
    },
    enabled: !!subjectId,
  });
}