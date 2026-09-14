import { FileText } from "lucide-react";
import { useResume } from "@/features/resume/hooks/useResume";
import { ResumeCard } from "@/features/resume/components/ResumeCard";
import { ResumeUpload } from "@/features/resume/components/ResumeUpload";
import { ResumeSkeleton } from "@/features/resume/components/ResumeSkeleton";
import { ResumeCopilot } from "@/features/resume/components/ResumeCopilot";
import { BulletImprover } from "@/features/resume/components/BulletImprover";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";

export default function ResumePage() {
  const { data: resume, isLoading, isError, refetch } = useResume();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Resume</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Upload and manage the resume you use for placements.
        </p>
      </div>

      {isLoading && <ResumeSkeleton />}

      {!isLoading && isError && (
        <EmptyState
          icon={FileText}
          title="Couldn't load your resume"
          description="Something went wrong talking to the server. Try refreshing the page."
          action={
            <Button type="button" variant="secondary" onClick={() => refetch?.()}>
              Retry
            </Button>
          }
        />
      )}

      {!isLoading && !isError && !resume && <ResumeUpload />}

      {!isLoading && !isError && resume && <ResumeCard resume={resume} />}

      {!isLoading && !isError && <ResumeCopilot resume={resume} />}

      <BulletImprover />
    </div>
  );
}