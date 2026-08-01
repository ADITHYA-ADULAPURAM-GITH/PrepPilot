import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/features/resume/api/resumeApi";

export function useResume() {
  return useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const { data } = await resumeApi.get();
      return data.data.resume; // null if user hasn't uploaded one yet
    },
  });
}