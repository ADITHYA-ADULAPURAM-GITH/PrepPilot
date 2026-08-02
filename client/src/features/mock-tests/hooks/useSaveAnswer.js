import { useMutation } from "@tanstack/react-query";
import { attemptsApi } from "@/features/mock-tests/api/attemptsApi";

// Deliberately no onSuccess/onError side effects, no debounce, no
// queryClient cache writes — per your instruction, this hook is just a
// thin mutation wrapper. The page decides when to call mutate() (on
// change, on navigation, debounced, whatever) and how to react to the
// result (toast, silent, retry). Baking any of that in here would take
// that decision away from the caller.
export function useSaveAnswer(attemptId) {
  return useMutation({
    mutationFn: ({ questionId, selectedOptionIndex }) =>
      attemptsApi.saveAnswer(attemptId, { questionId, selectedOptionIndex }),
  });
}