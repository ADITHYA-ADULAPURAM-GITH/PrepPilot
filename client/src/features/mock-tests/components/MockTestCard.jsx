import { Link } from "react-router-dom";
import { Clock, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";

const DIFFICULTY_COLORS = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-red-400",
};

export function MockTestCard({ test }) {
  return (
    <Link to={ROUTES.MOCK_TEST_DETAILS.replace(":testId", test._id)} className="block">
      <Card className="p-5 transition-colors hover:bg-white/[0.02]">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[15px] font-semibold text-text">{test.title}</h3>
          <span className={`shrink-0 text-[12px] font-medium ${DIFFICULTY_COLORS[test.difficulty]}`}>
            {test.difficulty}
          </span>
        </div>

        {test.description && (
          <p className="mt-1.5 line-clamp-2 text-[12.5px] text-text-muted">{test.description}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge>{test.category}</Badge>
          {test.companyName && <Badge>{test.companyName}</Badge>}
        </div>

        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-[11.5px] text-text-faint">
          <span className="flex items-center gap-1.5">
            <ListChecks className="size-3.5" />
            {test.totalQuestions} questions
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {test.durationMinutes} min
          </span>
        </div>
      </Card>
    </Link>
  );
}