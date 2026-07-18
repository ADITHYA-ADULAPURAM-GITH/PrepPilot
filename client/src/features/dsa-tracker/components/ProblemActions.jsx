import { useState } from "react";
import { Pencil, Trash2, CheckCircle2, RotateCw, ExternalLink } from "lucide-react";
import { RevisionButton } from "@/features/dsa-tracker/components/RevisionButton";
import { EditProblemDialog } from "@/features/dsa-tracker/components/EditProblemDialog";
import { DeleteConfirmationDialog } from "@/features/dsa-tracker/components/DeleteConfirmationDialog";
import { useUpdateProblem } from "@/features/dsa-tracker/hooks/useProblemMutations";

const iconBtn =
  "flex size-7 items-center justify-center rounded-md text-text-faint transition-colors hover:bg-white/[0.06] hover:text-text";

export function ProblemActions({ problem }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const updateProblem = useUpdateProblem();

  const toggleStatus = () => {
    updateProblem.mutate({
      id: problem._id,
      payload: { status: problem.status === "Solved" ? "Todo" : "Solved" },
      silent: true,
    });
  };

  return (
    <div className="flex items-center gap-1">
      {problem.problemUrl && (
        <a
          href={problem.problemUrl}
          target="_blank"
          rel="noreferrer"
          className={iconBtn}
          title="Open problem"
        >
          <ExternalLink className="size-3.5" />
        </a>
      )}

      <RevisionButton problem={problem} />

      <button
        onClick={toggleStatus}
        className={iconBtn}
        title={problem.status === "Solved" ? "Mark as Todo" : "Mark as Solved"}
      >
        {problem.status === "Solved" ? (
          <RotateCw className="size-3.5" />
        ) : (
          <CheckCircle2 className="size-3.5" />
        )}
      </button>

      <button onClick={() => setEditOpen(true)} className={iconBtn} title="Edit">
        <Pencil className="size-3.5" />
      </button>

      <button
        onClick={() => setDeleteOpen(true)}
        className={iconBtn + " hover:text-danger"}
        title="Delete"
      >
        <Trash2 className="size-3.5" />
      </button>

      <EditProblemDialog problem={problem} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteConfirmationDialog problem={problem} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}