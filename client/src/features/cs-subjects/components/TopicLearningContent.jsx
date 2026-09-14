import {
  BookOpen,
  Video,
  Link as LinkIcon,
  FileText,
  ExternalLink,
} from "lucide-react";
import { PracticeQuestion } from "@/features/cs-subjects/components/PracticeQuestion";

const RESOURCE_TYPE_ICON = {
  article: BookOpen,
  notes: FileText,
  video: Video,
  link: LinkIcon,
};

function ResourceItem({ resource }) {
  const Icon =
    RESOURCE_TYPE_ICON[resource.type] ||
    FileText;

  return (
    <div className="rounded-lg border border-border bg-white/[0.02] p-3">
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 size-3.5 shrink-0 text-text-faint" />

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-text">
            {resource.title}
          </p>

          {resource.body && (
            <p className="mt-1 whitespace-pre-wrap text-[12.5px] leading-relaxed text-text-muted">
              {resource.body}
            </p>
          )}

          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium text-primary-strong hover:underline"
            >
              Open link
              <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function TopicLearningContent({
  topic,
}) {
  const resources = topic.resources || [];
  const practice = topic.practice || [];

  if (
    resources.length === 0 &&
    practice.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-3 space-y-4 border-t border-border pt-3">
      {resources.length > 0 && (
        <div>
          <h3 className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-text-faint">
            Resources
          </h3>

          <div className="space-y-2">
            {resources.map((resource) => (
              <ResourceItem
                key={resource._id}
                resource={resource}
              />
            ))}
          </div>
        </div>
      )}

      {practice.length > 0 && (
        <div>
          <h3 className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-text-faint">
            Practice
          </h3>

          <div className="space-y-4">
            {practice.map((practiceSet) => (
              <div key={practiceSet._id}>
                <p className="mb-2 text-[12.5px] font-medium text-text-muted">
                  {practiceSet.title}
                </p>

                <div className="space-y-2">
                  {practiceSet.questions.map(
                    (question, index) => (
                      <PracticeQuestion
                        key={index}
                        question={question}
                        index={index + 1}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}