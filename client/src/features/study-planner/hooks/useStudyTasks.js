import { useQuery } from "@tanstack/react-query";
import { studyTaskApi } from "@/features/study-planner/api/studyTaskApi";

export function useStudyTasks(filters) {
  return useQuery({
    queryKey: ["study-tasks", filters],
    queryFn: async () => {
      const { data } = await studyTaskApi.list(filters);
      return data.data; // { tasks, pagination }
    },
    placeholderData: (prev) => prev,
  });
}