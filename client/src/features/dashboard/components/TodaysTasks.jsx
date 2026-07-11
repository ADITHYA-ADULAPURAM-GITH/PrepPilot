import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

export function TodaysTasks({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[15px] font-semibold text-text">Today's Tasks</h2>
        <span className="font-mono text-[12.5px] text-text-muted">
          {doneCount}/{tasks.length}
        </span>
      </div>

      <ProgressBar value={progress} className="mt-3" />

      <ul className="mt-4 space-y-1">
        {tasks.map((task) => (
          <li key={task.id}>
            <button
              onClick={() => toggleTask(task.id)}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.03]"
            >
              <span
                className={cn(
                  "flex size-[18px] shrink-0 items-center justify-center rounded-md border transition-colors",
                  task.done ? "border-primary bg-primary" : "border-border bg-transparent"
                )}
              >
                {task.done && <Check className="size-3 text-white" strokeWidth={3} />}
              </span>
              <span
                className={cn(
                  "text-[13.5px] transition-colors",
                  task.done ? "text-text-faint line-through" : "text-text"
                )}
              >
                {task.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
