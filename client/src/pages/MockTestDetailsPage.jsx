import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, ClipboardList, Clock, ListChecks, Building2 } from "lucide-react";
import { useMockTest } from "@/features/mock-tests/hooks/useMockTest";
import { useStartAttempt } from "@/features/mock-tests/hooks/useStartAttempt";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ROUTES } from "@/lib/constants";

const DIFFICULTY_COLORS = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-red-400",
};

function MockTestDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-32 w-full rounded-2xl" />
    </div>
  );
}

export default function MockTestDetailsPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { data: test, isLoading, isError } = useMockTest(testId);
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

  if (isLoading) return <MockTestDetailsSkeleton />;

  if (isError || !test) {
    return (
      <div className="space-y-6">
        {backLink}
        <EmptyState
          icon={ClipboardList}
          title="Couldn't load this test"
          description="It may not exist, or something went wrong talking to the server."
        />
      </div>
    );
  }

  function handleStart() {
    startAttemptMutation.mutate(test._id, {
      onSuccess: ({ data }) => {
        const attempt = data.data.attempt;
        // ROUTES.MOCK_TEST_ATTEMPT doesn't exist yet — the attempt page
        // isn't built this batch, per scope. This navigate call is
        // correct once that route exists; until then it 404s to the
        // catch-all redirect, same known gap as MockTestCard's link
        // last batch.
        navigate(ROUTES.MOCK_TEST_ATTEMPT.replace(":attemptId", attempt._id));
      },
    });
  }

  return (
    <div className="space-y-6">
      {backLink}

      <div>
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-2xl font-semibold text-text">{test.title}</h1>
          <span className={`shrink-0 text-[13px] font-medium ${DIFFICULTY_COLORS[test.difficulty]}`}>
            {test.difficulty}
          </span>
        </div>
        {test.description && <p className="mt-1.5 text-[13.5px] text-text-muted">{test.description}</p>}

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge>{test.category}</Badge>
          {test.companyName && <Badge>{test.companyName}</Badge>}
        </div>
      </div>

      <Card className="p-5">
        <h2 className="font-display text-[15px] font-semibold text-text">Test Overview</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2.5 text-[13.5px] text-text-muted">
            <ListChecks className="size-4 text-text-faint" />
            {test.totalQuestions} questions
          </div>
          <div className="flex items-center gap-2.5 text-[13.5px] text-text-muted">
            <Clock className="size-4 text-text-faint" />
            {test.durationMinutes} minutes
          </div>
          {test.companyName && (
            <div className="flex items-center gap-2.5 text-[13.5px] text-text-muted">
              <Building2 className="size-4 text-text-faint" />
              {test.companyName}
            </div>
          )}
        </div>

        {test.totalQuestions === 0 ? (
          <p className="mt-5 text-[13px] text-text-faint">This test has no questions yet.</p>
        ) : (
          <Button type="button" className="mt-5" onClick={handleStart} isLoading={startAttemptMutation.isPending}>
            Start Test
          </Button>
        )}
      </Card>
    </div>
  );
}