import {
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const SECTION_LABELS = {
  contact: "Contact",
  summary: "Summary",
  education: "Education",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  certifications: "Certifications",
  achievements: "Achievements",
};

export function StrengthsAndIssues({
  strengths = [],
  issues = [],
  sectionsPresent,
}) {
  return (
    <Card className="p-5">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-1.5 font-display text-[14px] font-semibold text-text">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Strengths
          </h3>

          {strengths.length === 0 ? (
            <p className="mt-2 text-[13px] text-text-muted">
              No strengths flagged yet.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {strengths.map((item, i) => (
                <li
                  key={i}
                  className="text-[13px] text-text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="flex items-center gap-1.5 font-display text-[14px] font-semibold text-text">
            <AlertTriangle className="size-4 text-amber-400" />
            Issues
          </h3>

          {issues.length === 0 ? (
            <p className="mt-2 text-[13px] text-text-muted">
              No issues flagged.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {issues.map((item, i) => (
                <li
                  key={i}
                  className="text-[13px] text-text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {sectionsPresent && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <h4 className="text-[12.5px] font-medium text-text-muted">
            Sections detected
          </h4>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {Object.entries(SECTION_LABELS).map(
              ([key, label]) => {
                const present =
                  !!sectionsPresent[key];

                return (
                  <span
                    key={key}
                    className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                      present
                        ? "bg-primary-muted text-primary-strong"
                        : "bg-white/5 text-text-muted"
                    }`}
                  >
                    {label}
                  </span>
                );
              }
            )}
          </div>
        </div>
      )}
    </Card>
  );
}