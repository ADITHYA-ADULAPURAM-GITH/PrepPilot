import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkspace } from "@/features/dsa-workspace/hooks/useWorkspace";
import { useRunCode } from "@/features/dsa-workspace/hooks/useRunCode";
import { useSubmitCode } from "@/features/dsa-workspace/hooks/useSubmitCode";
import { ProblemStatementPanel } from "@/features/dsa-workspace/components/ProblemStatementPanel";
import { CodeEditor } from "@/features/dsa-workspace/components/CodeEditor";
import { LanguageSelector } from "@/features/dsa-workspace/components/LanguageSelector";
import { RunSubmitControls } from "@/features/dsa-workspace/components/RunSubmitControls";
import { TestResultsPanel } from "@/features/dsa-workspace/components/TestResultsPanel";
import { AttemptsHistoryPanel } from "@/features/dsa-workspace/components/AttemptsHistoryPanel";
import { EmptyState } from "@/components/common/EmptyState";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DsaWorkspacePage() {
  const { problemId } = useParams();
  const { data: problem, isLoading, isError, refetch } = useWorkspace(problemId);

  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [activeResult, setActiveResult] = useState(null);
  const [activeMode, setActiveMode] = useState(null);

  const runMutation = useRunCode(problemId);
  const submitMutation = useSubmitCode(problemId);

  useEffect(() => {
    if (!problem) return;
    const initialLanguage = problem.supportedLanguages?.[0] || "";
    setLanguage(initialLanguage);
    setCode(problem.starterCode?.[initialLanguage] || "");
  }, [problem]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(problem?.starterCode?.[newLanguage] || "");
  };

  const handleRun = async () => {
    const result = await runMutation.mutateAsync({ language, code });
    setActiveResult(result);
    setActiveMode("run");
  };

  const handleSubmit = async () => {
    const result = await submitMutation.mutateAsync({ language, code });
    setActiveResult(result);
    setActiveMode("submit");
  };

  if (isLoading) {
    return <div className="text-[13.5px] text-text-muted">Loading workspace...</div>;
  }

  if (isError) {
    return (
      <EmptyState
        icon={Code2}
        title="Couldn't load this problem"
        description="Something went wrong talking to the server. Try refreshing the page."
        action={
          <Button type="button" variant="secondary" onClick={() => refetch?.()}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <ProblemStatementPanel problem={problem} />
        <div className="mt-6">
          <h2 className="mb-2 text-[13px] font-medium text-text">Attempts</h2>
          <AttemptsHistoryPanel problemId={problemId} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <LanguageSelector
            languages={problem?.supportedLanguages}
            value={language}
            onChange={handleLanguageChange}
            disabled={runMutation.isPending || submitMutation.isPending}
          />
          <RunSubmitControls
            onRun={handleRun}
            onSubmit={handleSubmit}
            isRunning={runMutation.isPending}
            isSubmitting={submitMutation.isPending}
          />
        </div>

        <CodeEditor value={code} onChange={setCode} language={language} />

        {runMutation.isError && (
          <div className="text-[12.5px] text-red-400">Run failed. Please try again.</div>
        )}
        {submitMutation.isError && (
          <div className="text-[12.5px] text-red-400">Submit failed. Please try again.</div>
        )}

        <TestResultsPanel result={activeResult} mode={activeMode} />
      </div>
    </div>
  );
}