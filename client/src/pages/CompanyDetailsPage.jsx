import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, ExternalLink } from "lucide-react";
import { useCompanyDetail } from "@/features/companies/hooks/useCompanyDetail";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ROUTES } from "@/lib/constants";

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function CompanyDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />
      <div className="flex items-center gap-3">
        <Skeleton className="size-11 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}

export default function CompanyDetailsPage() {
  const { companyId } = useParams();
  const { data, isLoading, isError } = useCompanyDetail(companyId);

  const backLink = (
    <Link
      to={ROUTES.COMPANIES}
      className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-text-muted hover:text-text"
    >
      <ArrowLeft className="size-3.5" />
      Companies
    </Link>
  );

  if (isLoading) return <CompanyDetailsSkeleton />;

  if (isError || !data?.company) {
    return (
      <div className="space-y-6">
        {backLink}
        <EmptyState
          icon={Building2}
          title="Couldn't load this company"
          description="It may not exist, or something went wrong talking to the server."
        />
      </div>
    );
  }

  const company = data.company;
  const hasNoDetails =
    !company.description &&
    !company.eligibilityCriteria &&
    !company.importantTopics?.length &&
    !company.interviewRounds?.length;

  return (
    <div className="space-y-6">
      {backLink}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="size-11 shrink-0 rounded-xl bg-white/[0.05] object-contain p-1.5"
            />
          ) : (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-muted font-display text-[14px] font-semibold text-primary">
              {initials(company.name)}
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl font-semibold text-text">{company.name}</h1>
            {company.tags?.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {company.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary-hover"
          >
            Website
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>

      {company.description && (
        <Card className="p-5">
          <h2 className="font-display text-[15px] font-semibold text-text">About</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{company.description}</p>
        </Card>
      )}

      {company.eligibilityCriteria && (
        <Card className="p-5">
          <h2 className="font-display text-[15px] font-semibold text-text">Eligibility</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{company.eligibilityCriteria}</p>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {company.importantTopics?.length > 0 && (
          <Card className="p-5">
            <h2 className="font-display text-[15px] font-semibold text-text">Important Topics</h2>
            <ul className="mt-3 space-y-2">
              {company.importantTopics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-[13.5px] text-text-muted">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {topic}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {company.interviewRounds?.length > 0 && (
          <Card className="p-5">
            <h2 className="font-display text-[15px] font-semibold text-text">Interview Rounds</h2>
            <ol className="mt-3 space-y-2.5">
              {company.interviewRounds.map((round, i) => (
                <li key={round} className="flex items-center gap-3 text-[13.5px] text-text-muted">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-mono text-[10.5px] text-text-faint">
                    {i + 1}
                  </span>
                  {round}
                </li>
              ))}
            </ol>
          </Card>
        )}
      </div>

      {hasNoDetails && (
        <EmptyState
          icon={Building2}
          title="No details added yet"
          description="This company hasn't been fully filled out in the catalog."
        />
      )}
    </div>
  );
}