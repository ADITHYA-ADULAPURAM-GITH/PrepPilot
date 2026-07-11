import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProblemForm } from "@/features/dsa-tracker/components/ProblemForm";
import { useCreateProblem } from "@/features/dsa-tracker/hooks/useProblemMutations";

export function AddProblemDialog() {
  const [open, setOpen] = useState(false);
  const createProblem = useCreateProblem();

  const handleSubmit = (values) => {
    createProblem.mutate(values, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Add Problem
        </Button>
      </DialogTrigger>
      <DialogContent title="Add a problem" description="Track a new DSA problem you're working on.">
        <ProblemForm onSubmit={handleSubmit} isSubmitting={createProblem.isPending} submitLabel="Add problem" />
      </DialogContent>
    </Dialog>
  );
}