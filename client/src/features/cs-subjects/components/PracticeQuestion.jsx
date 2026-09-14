import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function PracticeQuestion({ question, index }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isAnswered = selectedIndex !== null;
  const isCorrect = isAnswered && selectedIndex === question.correctOptionIndex;

  function handleSelect(optionIndex) {
    if (isAnswered) return; // locked after first answer, same as a real quiz question
    setSelectedIndex(optionIndex);
  }

  function handleReset() {
    setSelectedIndex(null);
  }

  return (
    <div className="rounded-lg border border-border bg-white/[0.02] p-3">
      <p className="text-[13px] font-medium text-text">
        {index}. {question.question}
      </p>

      <div className="mt-2.5 space-y-1.5">
        {question.options.map((option, optionIndex) => {
          const isSelected = optionIndex === selectedIndex;
          const isCorrectOption = optionIndex === question.correctOptionIndex;

          return (
            <button
              key={optionIndex}
              type="button"
              onClick={() => handleSelect(optionIndex)}
              disabled={isAnswered}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-left text-[12.5px] transition-colors",
                !isAnswered && "border-border text-text-muted hover:border-primary/50 hover:bg-white/[0.03]",
                isAnswered && isCorrectOption && "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
                isAnswered && isSelected && !isCorrectOption && "border-red-500/40 bg-red-500/10 text-red-300",
                isAnswered && !isSelected && !isCorrectOption && "border-border text-text-faint"
              )}
            >
              <span>{option}</span>
              {isAnswered && isCorrectOption && <Check className="size-3.5 shrink-0" />}
              {isAnswered && isSelected && !isCorrectOption && <X className="size-3.5 shrink-0" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-2.5 border-t border-border pt-2.5">
          <p className={cn("text-[12px] font-medium", isCorrect ? "text-emerald-400" : "text-red-400")}>
            {isCorrect ? "Correct" : "Not quite"}
          </p>
          {question.explanation && (
            <p className="mt-1 text-[12px] leading-relaxed text-text-muted">{question.explanation}</p>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="mt-1.5 text-[11.5px] font-medium text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}