import { Card } from "@/components/ui/card";

export function QuestionCard({ question, questionNumber, selectedOptionIndex, onSelect, isSubmitted }) {
  return (
    <Card className="p-5">
      <p className="text-[12px] font-medium text-text-faint">Question {questionNumber}</p>
      <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-text">{question.questionText}</p>

      <div className="mt-4 space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionIndex === index;
          const isCorrect = isSubmitted && question.correctOptionIndex === index;
          const isWrongSelected = isSubmitted && isSelected && !isCorrect;

          return (
            <button
              key={index}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSelect(index)}
              className={[
                "flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-[13.5px] transition-colors",
                isSubmitted ? "cursor-default" : "cursor-pointer hover:bg-white/[0.03]",
                isCorrect
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : isWrongSelected
                    ? "border-red-500/40 bg-red-500/10 text-red-300"
                    : isSelected
                      ? "border-primary bg-primary-muted text-text"
                      : "border-border text-text-muted",
              ].join(" ")}
            >
              <span
                className={[
                  "flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium",
                  isSelected || isCorrect ? "border-current" : "border-border text-text-faint",
                ].join(" ")}
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {isSubmitted && question.explanation && (
        <p className="mt-4 rounded-lg bg-white/[0.03] p-3 text-[12.5px] leading-relaxed text-text-muted">
          <span className="font-medium text-text">Explanation: </span>
          {question.explanation}
        </p>
      )}
    </Card>
  );
}