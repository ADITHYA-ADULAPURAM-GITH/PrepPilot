import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useSubjects } from "@/features/cs-subjects/hooks/useSubjects";
import { useSubjectDetail } from "@/features/cs-subjects/hooks/useSubjectDetail";
import { TopicRow } from "@/features/cs-subjects/components/TopicRow";
import { SubjectDetailsSkeleton } from "@/features/cs-subjects/components/SubjectDetailsSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SUBJECT_ICON_MAP } from "@/features/cs-subjects/constants";
import { ROUTES } from "@/lib/constants";

export default function SubjectDetailsPage() {
  const { subjectSlug: slug } = useParams();
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();

  const subjectSummary = subjects?.find((s) => s.slug === slug);

  const {
    data,
    isLoading: detailLoading,
    isError,
  } = useSubjectDetail(subjectSummary?._id);

  const backLink = (
    <Link
      to={ROUTES.CS_SUBJECTS}
      className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-text-muted hover:text-text"
    >
      <ArrowLeft className="size-3.5" />
      CS Subjects
    </Link>
  );

  // Still resolving the subjects list, or resolved and now fetching
  // this subject's topics.
  if (subjectsLoading || (subjectSummary && detailLoading)) {
    return <SubjectDetailsSkeleton />;
  }

  // Subjects list loaded but no subject matches this slug.
  if (!subjectSummary) {
    return (
      <div className="space-y-6">
        {backLink}
        <EmptyState
          icon={BookOpen}
          title="Subject not found"
          description="This subject doesn't exist, or the catalog hasn't been seeded."
        />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-6">
        {backLink}
        <EmptyState
          icon={BookOpen}
          title="Couldn't load this subject"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      </div>
    );
  }

  const Icon = SUBJECT_ICON_MAP[data.subject.icon] || BookOpen;
  const completedCount = data.topics.filter((t) => t.completed).length;
  const progressPercent = data.topics.length
    ? Math.round((completedCount / data.topics.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {backLink}

      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary-muted">
          <Icon className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-text">{data.subject.name}</h1>
          <p className="text-[13px] text-text-muted">
            {completedCount}/{data.topics.length} topics completed
          </p>
        </div>
      </div>

      <ProgressBar value={progressPercent} showLabel label="Progress" />

      {data.topics.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No topics in this subject yet"
          description="Topics for this subject haven't been added to the catalog."
        />
      ) : (
        <div className="space-y-3">
          {data.topics.map((topic) => (
            <TopicRow key={topic._id} subjectId={subjectSummary._id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}