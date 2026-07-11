import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProblemForm } from "@/features/dsa-tracker/components/ProblemForm";
import { useUpdateProblem } from "@/features/dsa-tracker/hooks/useProblemMutations";

export function EditProblemDialog({ problem, open, onOpenChange }) {
  const updateProblem = useUpdateProblem();

  if (!problem) return null;

  const handleSubmit = (values) => {
    updateProblem.mutate(
      { id: problem._id, payload: values },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Edit problem" description={problem.title}>
        <ProblemForm
          defaultValues={{
            title: problem.title,
            platform: problem.platform || "",
            problemUrl: problem.problemUrl || "",
            topic: problem.topic,
            difficulty: problem.difficulty,
            notes: problem.notes || "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={updateProblem.isPending}
          submitLabel="Save changes"
        />
      </DialogContent>
    </Dialog>
  );
}