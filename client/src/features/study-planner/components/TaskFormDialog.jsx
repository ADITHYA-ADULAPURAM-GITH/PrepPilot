import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PRIORITY_OPTIONS, CATEGORY_OPTIONS } from "@/features/study-planner/constants";
import { useCreateStudyTask } from "@/features/study-planner/hooks/useCreateStudyTask";
import { useUpdateStudyTask } from "@/features/study-planner/hooks/useUpdateStudyTask";

const EMPTY_FORM = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Medium",
  category: "Other",
};

function toDateInputValue(dueDate) {
  if (!dueDate) return "";
  return new Date(dueDate).toISOString().slice(0, 10);
}

export function TaskFormDialog({ open, onOpenChange, task }) {
  const isEditMode = Boolean(task);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const createMutation = useCreateStudyTask();
  const updateMutation = useUpdateStudyTask();
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (open) {
      setForm(
        task
          ? {
              title: task.title,
              description: task.description || "",
              dueDate: toDateInputValue(task.dueDate),
              priority: task.priority,
              category: task.category,
            }
          : EMPTY_FORM
      );
      setErrors({});
    }
  }, [open, task]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (!form.dueDate) nextErrors.dueDate = "Due date is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      priority: form.priority,
      category: form.category,
    };

    if (isEditMode) {
      updateMutation.mutate(
        { id: task._id, payload },
        { onSuccess: () => onOpenChange(false) }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: () => onOpenChange(false) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={isEditMode ? "Edit Task" : "New Study Task"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-text-muted">Title</label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Solve 5 graph problems"
              error={Boolean(errors.title)}
            />
            {errors.title && <p className="mt-1 text-[12px] text-danger">{errors.title}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-text-muted">
              Description <span className="text-text-faint">(optional)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              placeholder="Notes about this task..."
              className="flex w-full rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-sm text-text placeholder:text-text-faint transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-text-muted">Due Date</label>
              <Input
                type="date"
                value={form.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                error={Boolean(errors.dueDate)}
              />
              {errors.dueDate && <p className="mt-1 text-[12px] text-danger">{errors.dueDate}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-text-muted">Priority</label>
              <Select value={form.priority} onChange={(e) => handleChange("priority", e.target.value)}>
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-text-muted">Category</label>
            <Select value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending}>
              {isEditMode ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}