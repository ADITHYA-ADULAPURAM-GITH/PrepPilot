import { useMemo, useState } from "react";
import { Plus, ListTodo } from "lucide-react";
import { useStudyTasks } from "@/features/study-planner/hooks/useStudyTasks";
import { TaskItem } from "@/features/study-planner/components/TaskItem";
import { TaskFormDialog } from "@/features/study-planner/components/TaskFormDialog";
import { TaskSkeleton } from "@/features/study-planner/components/TaskSkeleton";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";

function formatGroupLabel(dateKey) {
  const date = new Date(dateKey);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, tomorrow)) return "Tomorrow";

  return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function groupTasksByDate(tasks) {
  const groups = {};
  for (const task of tasks) {
    // dueDate is stored as a full ISO datetime; only the date portion
    // is used as the grouping key so time-of-day never splits a task
    // into the wrong group.
    const dateKey = new Date(task.dueDate).toISOString().slice(0, 10);
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(task);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function StudyPlannerPage() {
  const { data, isLoading, isError } = useStudyTasks({ limit: 100 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const groupedTasks = useMemo(() => groupTasksByDate(data?.tasks || []), [data]);

  function handleAddNew() {
    setEditingTask(null);
    setDialogOpen(true);
  }

  function handleEdit(task) {
    setEditingTask(task);
    setDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-text">Study Planner</h1>
          <p className="mt-1 text-[13.5px] text-text-muted">
            Track what you need to study and when, grouped by due date.
          </p>
        </div>
        <Button type="button" onClick={handleAddNew}>
          <Plus className="size-4" />
          New Task
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <EmptyState
          icon={ListTodo}
          title="Couldn't load your tasks"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      )}

      {!isLoading && !isError && groupedTasks.length === 0 && (
        <EmptyState
          icon={ListTodo}
          title="No study tasks yet"
          description="Create your first task to start planning your prep."
        />
      )}

      {!isLoading &&
        !isError &&
        groupedTasks.map(([dateKey, tasks]) => (
          <div key={dateKey}>
            <h2 className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-text-faint">
              {formatGroupLabel(dateKey)}
            </h2>
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onEdit={handleEdit} />
              ))}
            </div>
          </div>
        ))}

      <TaskFormDialog open={dialogOpen} onOpenChange={setDialogOpen} task={editingTask} />
    </div>
  );
}