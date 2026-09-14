import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";
import { useToggleDashboardTask } from "@/features/dashboard/hooks/useToggleDashboardTask";

export function TodaysTasks({ tasks }) {
  const toggleTask = useToggleDashboardTask();

  const doneCount = tasks.filter((t) => t.done).length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  function handleToggle(task) {
    const isThisPending = toggleTask.isPending && toggleTask.variables?.id === task.id;
    if (isThisPending) return;
    toggleTask.mutate({ id: task.id, isCompleted: !task.done });
  }

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
        {tasks.map((task) => {
          const isPending = toggleTask.isPending && toggleTask.variables?.id === task.id;

          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => handleToggle(task)}
                disabled={isPending}
                aria-pressed={task.done}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
                  isPending ? "cursor-wait" : "cursor-pointer hover:bg-white/[0.03]"
                )}
              >
                <span
                  className={cn(
                    "relative flex size-[18px] shrink-0 items-center justify-center rounded-md border transition-colors duration-200",
                    task.done ? "border-primary bg-primary" : "border-border bg-transparent",
                    isPending && "opacity-70"
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isPending ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                      >
                        <Loader2 className="size-3 animate-spin text-text-faint" />
                      </motion.span>
                    ) : task.done ? (
                      <motion.span
                        key="checked"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                      >
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
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
          );
        })}
      </ul>
    </Card>
  );
}