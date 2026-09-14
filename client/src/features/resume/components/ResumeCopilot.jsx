import { Sparkles, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { useResumeAnalysis } from "@/features/resume/hooks/useResumeAnalysis";
import { useRunAnalysis } from "@/features/resume/hooks/useRunAnalysis";
import { ScoreRing } from "@/features/resume/components/ScoreRing";
import { ScoreBreakdown } from "@/features/resume/components/ScoreBreakdown";
import { StrengthsAndIssues } from "@/features/resume/components/StrengthsAndIssues";
import { TopFixes } from "@/features/resume/components/TopFixes";
import { JdMatch } from "@/features/resume/components/JdMatch";
import { PlacementReadiness } from "@/features/resume/components/PlacementReadiness";

function AnalysisSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <Skeleton className="size-24 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </Card>
  );
}

export function ResumeCopilot({ resume }) {
  const { data: analysis, isLoading, isError, refetch } = useResumeAnalysis(resume?._id);
  const runAnalysisMutation = useRunAnalysis();

  if (!resume) return null;

  
  const isStale = !!analysis && String(analysis.resume) !== String(resume._id);
  const isAnalyzed = !!analysis && !isStale;

  function handleAnalyze() {
    runAnalysisMutation.mutate();
  }

  return (
    <div className="space-y-4">
      {isLoading && <AnalysisSkeleton />}

      {!isLoading && isError && (
        <Card className="p-0">
          <EmptyState
            icon={Sparkles}
            title="Couldn't load your analysis"
            description="Something went wrong talking to the server. Try again."
            action={
              <Button type="button" variant="secondary" onClick={() => refetch?.()}>
                Retry
              </Button>
            }
          />
        </Card>
      )}

      {!isLoading && !isError && (!analysis || isStale) && (
        <Card className="flex flex-col items-center gap-3 p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary-muted text-primary">
            <Sparkles className="size-6" />
          </div>
          <div>
            <p className="font-display text-[15px] font-semibold text-text">
              {isStale ? "Your resume has changed" : "Not analyzed yet"}
            </p>
            <p className="mt-1 text-[13px] text-text-muted">
              {isStale
                ? "Re-run the analysis to get an up-to-date score for your latest resume."
                : "Run the Resume Copilot to get an ATS score, a breakdown, and concrete fixes."}
            </p>
          </div>
          <Button type="button" onClick={handleAnalyze} isLoading={runAnalysisMutation.isPending}>
            {isStale ? "Re-analyze" : "Analyze my resume"}
          </Button>
        </Card>
      )}

      {!isLoading && !isError && isAnalyzed && (
        <>
          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ScoreRing score={analysis.score} health={analysis.health} />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAnalyze}
                isLoading={runAnalysisMutation.isPending}
              >
                <RefreshCw className="size-3.5" />
                Re-analyze
              </Button>
            </div>
            <p className="mt-3 text-[11.5px] text-text-muted">
              Confidence: <span className="font-medium text-text">{analysis.confidence}</span>
            </p>
          </Card>

          <ScoreBreakdown breakdown={analysis.breakdown} />
          <StrengthsAndIssues
            strengths={analysis.strengths}
            issues={analysis.issues}
            sectionsPresent={analysis.sectionsPresent}
          />
          <TopFixes topFixes={analysis.topFixes} />
          <JdMatch />
          <PlacementReadiness />
        </>
      )}
    </div>
  );
}