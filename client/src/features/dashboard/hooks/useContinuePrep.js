import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { analyticsApi } from "@/features/analytics/api/analyticsApi";
import { ROUTES } from "@/lib/constants";

function resolvePath(activity) {
  switch (activity?.type) {
    case "study-planner":
      return ROUTES.STUDY_PLANNER;
    case "dsa-workspace":
      return ROUTES.DSA_WORKSPACE.replace(":problemId", activity.problemId);
    case "dsa-tracker":
      return ROUTES.DSA_TRACKER;
    case "cs-subject":
      return `${ROUTES.CS_SUBJECTS}/${activity.slug}`;
    case "mock-test":
      return ROUTES.MOCK_TEST_DETAILS.replace(":testId", activity.testId);
    default:
      return null;
  }
}

export function useContinuePrep() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await analyticsApi.getNextActivity();
      return data.data.activity;
    },
    onSuccess: (activity) => {
      const path = resolvePath(activity);

      if (!path) {
        toast.success("You're all caught up! 🎉");
        return;
      }

      navigate(path);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't figure out what's next. Try again.");
    },
  });
}