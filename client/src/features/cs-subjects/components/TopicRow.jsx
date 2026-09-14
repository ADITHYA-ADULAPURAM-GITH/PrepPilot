import { useState } from "react";
import {
  Star,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTopicProgressMutation } from "@/features/cs-subjects/hooks/useTopicProgressMutation";
import { TopicLearningContent } from "@/features/cs-subjects/components/TopicLearningContent";
import { cn } from "@/lib/utils";

function formatLastRevised(dateStr) {
  if (!dateStr) return "Never revised";

  return `Revised ${new Date(dateStr).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  )}`;
}

export function TopicRow({
  subjectId,
  topic,
}) {
  const [notes, setNotes] = useState(topic.notes);
  const [isExpanded, setIsExpanded] =
    useState(false);

  const mutation =
    useTopicProgressMutation(subjectId);

  const hasLearningContent =
    (topic.resources?.length || 0) > 0 ||
    (topic.practice?.length || 0) > 0;

  const toggleCompleted = () => {
    mutation.mutate({
      topicId: topic._id,
      payload: {
        completed: !topic.completed,
      },
    });
  };

  const toggleImportant = () => {
    mutation.mutate({
      topicId: topic._id,
      payload: {
        important: !topic.important,
      },
      silent: true,
    });
  };

  const saveNotes = () => {
    if (notes !== topic.notes) {
      mutation.mutate({
        topicId: topic._id,
        payload: { notes },
        silent: true,
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <button
          onClick={toggleCompleted}
          disabled={mutation.isPending}
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors disabled:opacity-50",
            topic.completed
              ? "border-primary bg-primary"
              : "border-border bg-transparent"
          )}
          title={
            topic.completed
              ? "Mark as not completed"
              : "Mark as completed"
          }
        >
          {topic.completed && (
            <Check
              className="size-3.5 text-white"
              strokeWidth={3}
            />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={cn(
                "text-[14px] font-medium",
                topic.completed
                  ? "text-text-faint line-through"
                  : "text-text"
              )}
            >
              {topic.title}
            </p>

            <button
              onClick={toggleImportant}
              disabled={mutation.isPending}
              className="shrink-0 disabled:opacity-50"
              title={
                topic.important
                  ? "Unmark important"
                  : "Mark important"
              }
            >
              <Star
                className={cn(
                  "size-4",
                  topic.important
                    ? "fill-accent text-accent"
                    : "text-text-faint"
                )}
              />
            </button>
          </div>

          <p className="mt-1 text-[11.5px] text-text-faint">
            {formatLastRevised(topic.lastRevised)}
          </p>

          <Textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            onBlur={saveNotes}
            placeholder="Add notes..."
            rows={2}
            className="mt-2.5 text-[13px]"
          />

          {hasLearningContent && (
            <>
              <button
                type="button"
                onClick={() =>
                  setIsExpanded((prev) => !prev)
                }
                className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-medium text-primary-strong hover:underline"
              >
                {isExpanded ? "Hide" : "View"} resources
                {" & "}practice

                {isExpanded ? (
                  <ChevronUp className="size-3.5" />
                ) : (
                  <ChevronDown className="size-3.5" />
                )}
              </button>

              {isExpanded && (
                <TopicLearningContent
                  topic={topic}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}