import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToggleStudyTask } from "@/features/study-planner/hooks/useToggleStudyTask";
import { useDeleteStudyTask } from "@/features/study-planner/hooks/useDeleteStudyTask";

const PRIORITY_COLORS = {
  Low: "text-text-muted",
  Medium: "text-amber-400",
  High: "text-red-400",
};

export function TaskItem({ task, onEdit }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const toggleMutation = useToggleStudyTask();
  const deleteMutation = useDeleteStudyTask();

  function handleToggle() {
    toggleMutation.mutate({ id: task._id, isCompleted: !task.isCompleted });
  }

  function handleConfirmDelete() {
    deleteMutation.mutate(task._id, {
      onSuccess: () => setDeleteOpen(false),
    });
  }

  return (
    <Card className="flex items-start gap-3 p-4">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={handleToggle}
        className="mt-1 size-4 shrink-0 cursor-pointer rounded border-border accent-primary"
      />

      <div className="min-w-0 flex-1">
        <p
          className={
            task.isCompleted
              ? "text-[14px] font-medium text-text-faint line-through"
              : "text-[14px] font-medium text-text"
          }
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 text-[12.5px] text-text-muted">{task.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge>{task.category}</Badge>
          <span className={`text-[11.5px] font-medium ${PRIORITY_COLORS[task.priority]}`}>
            {task.priority} priority
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => onEdit(task)}>
          <Pencil className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setDeleteOpen(true)}
          className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent
          title="Delete this task?"
          description={`"${task.title}" will be permanently removed. This can't be undone.`}
        >
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-danger hover:bg-danger/90"
              isLoading={deleteMutation.isPending}
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}