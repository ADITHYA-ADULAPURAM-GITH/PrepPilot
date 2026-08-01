import { FileText } from "lucide-react";
import { useResume } from "@/features/resume/hooks/useResume";
import { ResumeCard } from "@/features/resume/components/ResumeCard";
import { ResumeUpload } from "@/features/resume/components/ResumeUpload";
import { ResumeSkeleton } from "@/features/resume/components/ResumeSkeleton";
import { EmptyState } from "@/components/common/EmptyState";

export default function ResumePage() {
  const { data: resume, isLoading, isError } = useResume();

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
        />
      )}

      {!isLoading && !isError && !resume && <ResumeUpload />}

      {!isLoading && !isError && resume && <ResumeCard resume={resume} />}
    </div>
  );
}