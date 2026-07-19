import { BookOpen } from "lucide-react";
import { useSubjects } from "@/features/cs-subjects/hooks/useSubjects";
import { useSubjectAnalytics } from "@/features/cs-subjects/hooks/useSubjectAnalytics";
import { SubjectsSummaryBanner } from "@/features/cs-subjects/components/SubjectsSummaryBanner";
import { SubjectCard } from "@/features/cs-subjects/components/SubjectCard";
import { SubjectsGridSkeleton } from "@/features/cs-subjects/components/SubjectsGridSkeleton";
import { EmptyState } from "@/components/common/EmptyState";

export default function CsSubjectsPage() {
  const { data: subjects, isLoading: subjectsLoading, isError: subjectsError } = useSubjects();
  const { data: analytics, isLoading: analyticsLoading } = useSubjectAnalytics();

  if (subjectsLoading || analyticsLoading) return <SubjectsGridSkeleton />;

  if (subjectsError) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Couldn't load CS Subjects"
        description="Something went wrong talking to the server. Try refreshing the page."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">CS Subjects</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Core CS fundamentals for placement interviews — tracked topic by topic.
        </p>
      </div>

      {analytics && <SubjectsSummaryBanner analytics={analytics} />}

      {subjects?.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="The subject catalog hasn't been seeded yet. Run `npm run seed` on the server."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject._id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}