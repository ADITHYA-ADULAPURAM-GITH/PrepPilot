import { Card } from "@/components/ui/card";

export function QuestionNavigator({ questions, answers, currentIndex, onNavigate }) {
  return (
    <Card className="p-4">
      <p className="mb-3 text-[12.5px] font-semibold text-text-muted">Questions</p>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isAnswered = answers[question._id] !== undefined && answers[question._id] !== null;
          const isCurrent = index === currentIndex;

          return (
            <button
              key={question._id}
              type="button"
              onClick={() => onNavigate(index)}
              className={[
                "flex size-9 items-center justify-center rounded-lg text-[12.5px] font-medium transition-colors",
                isCurrent
                  ? "bg-primary text-white"
                  : isAnswered
                    ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                    : "bg-white/[0.04] text-text-faint hover:bg-white/[0.08]",
              ].join(" ")}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[11.5px] text-text-faint">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary" /> Current
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-emerald-500/40" /> Answered
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/[0.15]" /> Unanswered
        </div>
      </div>
    </Card>
  );
}