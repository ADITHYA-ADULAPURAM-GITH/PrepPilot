import { Card } from "@/components/ui/card";

const LABELS = {
  sections: "Sections",
  keywordMatch: "Keyword Match",
  skills: "Skills",
  experienceProjects: "Experience & Projects",
  impact: "Impact",
  formatting: "Formatting",
  contactEducation: "Contact & Education",
};

const ORDER = [
  "sections",
  "keywordMatch",
  "skills",
  "experienceProjects",
  "impact",
  "formatting",
  "contactEducation",
];

export function ScoreBreakdown({ breakdown }) {
  if (!breakdown) return null;

  // Per-category max weights aren't part of the API contract (only that the
  // 7 values sum to `score`), so bars are scaled relative to the highest
  // value present rather than an invented absolute scale.
  const maxValue = Math.max(1, ...ORDER.map((key) => breakdown[key] ?? 0));

  return (
    <Card className="p-5">
      <h3 className="font-display text-[15px] font-semibold text-text">Score breakdown</h3>
      <div className="mt-4 space-y-3">
        {ORDER.map((key) => {
          const value = breakdown[key] ?? 0;
          const widthPct = Math.max(4, (value / maxValue) * 100);
          return (
            <div key={key}>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-text-muted">{LABELS[key]}</span>
                <span className="font-medium text-text">{value}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}