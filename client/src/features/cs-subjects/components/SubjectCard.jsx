import { Link } from "react-router-dom";
import { ChevronRight, Star, RotateCcw, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { SUBJECT_ICON_MAP } from "@/features/cs-subjects/constants";
import { ROUTES } from "@/lib/constants";

function formatDate(dateStr) {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function SubjectCard({ subject }) {
  const Icon = SUBJECT_ICON_MAP[subject.icon] || BookOpen;

  return (
    <Link to={`${ROUTES.CS_SUBJECTS}/${subject.slug}`} className="group block">
      <Card className="p-5 transition-colors hover:bg-white/[0.02]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary-muted">
              <Icon className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-[15px] font-semibold text-text">{subject.name}</h3>
              <p className="text-[12px] text-text-faint">
                {subject.completedTopics}/{subject.totalTopics} topics
              </p>
            </div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-text-faint transition-transform group-hover:translate-x-0.5" />
        </div>

        <ProgressBar value={subject.progressPercent} className="mt-4" showLabel label="Progress" />

        {(subject.revisionDueTopics.count > 0 || subject.importantCount > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {subject.revisionDueTopics.count > 0 && (
              <Badge variant="accent">
                <RotateCcw className="size-3" />
                {subject.revisionDueTopics.count} due for revision
              </Badge>
            )}
            {subject.importantCount > 0 && (
              <Badge variant="primary">
                <Star className="size-3" />
                {subject.importantCount} important
              </Badge>
            )}
          </div>
        )}

        <p className="mt-3 text-[12px] text-text-faint">Last revised: {formatDate(subject.lastRevised)}</p>
      </Card>
    </Link>
  );
}