import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProblem } from "@/features/dsa-tracker/hooks/useProblemMutations";

export function DeleteConfirmationDialog({ problem, open, onOpenChange }) {
  const deleteProblem = useDeleteProblem();

  if (!problem) return null;

  const handleConfirm = () => {
    deleteProblem.mutate(problem._id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title="Delete this problem?"
        description={`"${problem.title}" will be permanently removed. This can't be undone.`}
      >
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-danger hover:bg-danger/90"
            isLoading={deleteProblem.isPending}
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}