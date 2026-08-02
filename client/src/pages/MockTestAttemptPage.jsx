import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { useAttemptQuestions } from "@/features/mock-tests/hooks/useAttemptQuestions";
import { useSaveAnswer } from "@/features/mock-tests/hooks/useSaveAnswer";
import { useSubmitAttempt } from "@/features/mock-tests/hooks/useSubmitAttempt";
import { QuestionCard } from "@/features/mock-tests/components/QuestionCard";
import { QuestionNavigator } from "@/features/mock-tests/components/QuestionNavigator";
import { TestTimer } from "@/features/mock-tests/components/TestTimer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ROUTES } from "@/lib/constants";

function AttemptSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="space-y-4 lg:col-span-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}

export default function MockTestAttemptPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useAttemptQuestions(attemptId);
  const saveAnswerMutation = useSaveAnswer(attemptId);
  const submitMutation = useSubmitAttempt(attemptId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Seed local answer state from whatever was already saved server-side
  // (e.g. resuming after a page refresh) — only once, when data first
  // arrives, so it doesn't stomp on in-progress local edits on refetch.
  useEffect(() => {
    if (data && !initialized) {
      const initialAnswers = {};
      data.attempt.answers.forEach((a) => {
        initialAnswers[a.question] = a.selectedOptionIndex;
      });
      setAnswers(initialAnswers);
      setInitialized(true);
    }
  }, [data, initialized]);

  const isSubmitted = data?.attempt?.status !== "in-progress";

  const answeredCount = useMemo(() => Object.values(answers).filter((v) => v !== null && v !== undefined).length, [
    answers,
  ]);

  function handleSelect(questionId, optionIndex) {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    // Save immediately on selection — a discrete click event, not
    // continuous input, so there's nothing worth debouncing here. The
    // hook itself has no opinion on this; this is the page's choice.
    saveAnswerMutation.mutate({ questionId, selectedOptionIndex: optionIndex });
  }

  const doSubmit = useCallback(
    (autoSubmitted) => {
      submitMutation.mutate(autoSubmitted, {
        onSuccess: () => {
          // ROUTES.MOCK_TEST_RESULT doesn't exist yet — Result page is
          // explicitly out of scope this batch. Until that route and
          // page are added, this lands on the catch-all redirect. The
          // attempt itself is correctly submitted and scored server-side
          // regardless of where this navigate call resolves.
          navigate(ROUTES.MOCK_TEST_RESULT?.replace(":attemptId", attemptId) || ROUTES.MOCK_TESTS);
        },
      });
    },
    [submitMutation, navigate, attemptId]
  );

  const handleTimerExpire = useCallback(() => {
    if (!isSubmitted) doSubmit(true);
  }, [isSubmitted, doSubmit]);

  if (isLoading) return <AttemptSkeleton />;

  if (isError || !data) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="Couldn't load this attempt"
        description="It may not exist, or something went wrong talking to the server."
      />
    );
  }

  const { attempt, questions } = data;

  if (isSubmitted) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="This attempt has already been submitted"
        description="The results view for completed attempts isn't available yet — check back soon."
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-text">Test in Progress</h1>
          <p className="text-[12.5px] text-text-muted">
            {answeredCount} of {questions.length} answered
          </p>
        </div>
        <TestTimer
          startedAt={attempt.startedAt}
          durationMinutes={attempt.test?.durationMinutes ?? attempt.durationMinutes}
          onExpire={handleTimerExpire}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-3">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            selectedOptionIndex={answers[currentQuestion._id]}
            onSelect={(optionIndex) => handleSelect(currentQuestion._id, optionIndex)}
            isSubmitted={false}
          />

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            >
              Previous
            </Button>

            {currentIndex === questions.length - 1 ? (
              <Button type="button" onClick={() => setConfirmOpen(true)}>
                Submit Test
              </Button>
            ) : (
              <Button type="button" onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}>
                Next
              </Button>
            )}
          </div>
        </div>

        <QuestionNavigator
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
        />
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent title="Submit test?">
          <p className="text-[13.5px] text-text-muted">
            You've answered {answeredCount} of {questions.length} questions.
            {answeredCount < questions.length && " Unanswered questions will be marked incorrect."} This can't be
            undone.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setConfirmOpen(false)}>
              Keep Reviewing
            </Button>
            <Button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                doSubmit(false);
              }}
              isLoading={submitMutation.isPending}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}