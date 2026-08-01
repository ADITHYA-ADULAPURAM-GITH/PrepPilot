//CompanyCard.jsx
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";

function initials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CompanyCard({ company }) {
  return (
    <Link to={ROUTES.COMPANY_DETAILS.replace(":companyId", company._id)} className="block">
      <Card className="p-5 transition-colors hover:bg-white/[0.02]">
        <div className="flex items-start gap-3">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="size-10 shrink-0 rounded-xl bg-white/[0.05] object-contain p-1.5"
            />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted font-display text-[13px] font-semibold text-primary">
              {initials(company.name)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[15px] font-semibold text-text">{company.name}</h3>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 text-text-faint hover:text-text"
                  title="Visit website"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
            {company.description && (
              <p className="mt-1 line-clamp-2 text-[12.5px] text-text-muted">{company.description}</p>
            )}
          </div>
        </div>

        {company.eligibilityCriteria && (
          <p className="mt-3 text-[12px] text-text-faint">
            <span className="text-text-muted">Eligibility:</span> {company.eligibilityCriteria}
          </p>
        )}

        {company.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {company.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        {(company.importantTopics?.length > 0 || company.interviewRounds?.length > 0) && (
          <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-[11.5px] text-text-faint">
            {company.importantTopics?.length > 0 && <span>{company.importantTopics.length} key topics</span>}
            {company.interviewRounds?.length > 0 && <span>{company.interviewRounds.length} interview rounds</span>}
          </div>
        )}
      </Card>
    </Link>
  );
}