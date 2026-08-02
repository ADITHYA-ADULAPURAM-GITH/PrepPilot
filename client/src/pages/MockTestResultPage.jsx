import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Circle, ClipboardList, RotateCcw } from "lucide-react";
import { useAttemptQuestions } from "@/features/mock-tests/hooks/useAttemptQuestions";
import { useStartAttempt } from "@/features/mock-tests/hooks/useStartAttempt";
import { QuestionCard } from "@/features/mock-tests/components/QuestionCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ROUTES } from "@/lib/constants";

function ResultSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}

export default function MockTestResultPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useAttemptQuestions(attemptId);
  const startAttemptMutation = useStartAttempt();

  const backLink = (
    <Link
      to={ROUTES.MOCK_TESTS}
      className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-text-muted hover:text-text"
    >
      <ArrowLeft className="size-3.5" />
      Mock Tests
    </Link>
  );

  if (isLoading) return <ResultSkeleton />;

  if (isError || !data) {
    return (
      <div className="space-y-6">
        {backLink}
        <EmptyState
          icon={ClipboardList}
          title="Couldn't load this result"
          description="It may not exist, or something went wrong talking to the server."
        />
      </div>
    );
  }

  const { attempt, questions } = data;

  if (attempt.status === "in-progress") {
    return (
      <div className="space-y-6">
        {backLink}
        <EmptyState
          icon={ClipboardList}
          title="This attempt hasn't been submitted yet"
          description="Results are only available after a test is completed."
        />
      </div>
    );
  }

  const answerMap = new Map(attempt.answers.map((a) => [a.question, a]));
  const correctCount = attempt.answers.filter((a) => a.isCorrect).length;
  const incorrectCount = attempt.answers.filter(
    (a) => a.selectedOptionIndex !== null && !a.isCorrect
  ).length;
  const unansweredCount = questions.length - attempt.answers.filter((a) => a.selectedOptionIndex !== null).length;
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  function handleRetake() {
    startAttemptMutation.mutate(attempt.test._id, {
      onSuccess: ({ data: res }) => {
        const newAttempt = res.data.attempt;
        navigate(ROUTES.MOCK_TEST_ATTEMPT.replace(":attemptId", newAttempt._id));
      },
    });
  }

  return (
    <div className="space-y-6">
      {backLink}

      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-text">{attempt.test?.title || "Test Result"}</h1>
            {attempt.status === "auto-submitted" && (
              <p className="mt-1 text-[12.5px] text-amber-400">Auto-submitted when time expired</p>
            )}
          </div>
          {attempt.test?.category && <Badge>{attempt.test.category}</Badge>}
        </div>
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-[12px] text-text-faint">Score</p>
            <p className="mt-1 font-display text-2xl font-semibold text-text">
              {correctCount}/{questions.length}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-text-faint">Percentage</p>
            <p className="mt-1 font-display text-2xl font-semibold text-text">{percentage}%</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[12px] text-text-faint">
              <CheckCircle2 className="size-3.5 text-emerald-400" /> Correct
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-emerald-400">{correctCount}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[12px] text-text-faint">
              <XCircle className="size-3.5 text-red-400" /> Incorrect
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-red-400">{incorrectCount}</p>
          </div>
        </div>
        {unansweredCount > 0 && (
          <p className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-[12.5px] text-text-faint">
            <Circle className="size-3.5" />
            {unansweredCount} question{unansweredCount !== 1 ? "s" : ""} left unanswered
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={() => navigate(ROUTES.MOCK_TESTS)}>
            Back to Mock Tests
          </Button>
          {attempt.test?._id && (
            <Button type="button" onClick={handleRetake} isLoading={startAttemptMutation.isPending}>
              <RotateCcw className="size-3.5" />
              Retake Test
            </Button>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="font-display text-[15px] font-semibold text-text">Review Answers</h2>
        {questions.map((question, index) => {
          const answer = answerMap.get(question._id);
          return (
            <QuestionCard
              key={question._id}
              question={question}
              questionNumber={index + 1}
              selectedOptionIndex={answer?.selectedOptionIndex ?? null}
              onSelect={() => {}}
              isSubmitted
            />
          );
        })}
      </div>
    </div>
  );
}