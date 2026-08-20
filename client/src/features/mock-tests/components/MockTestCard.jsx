import { Link } from "react-router-dom";
import { Clock, ListChecks, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";
import { DIFFICULTY_COLORS } from "@/lib/difficultyColors";

export function MockTestCard({ test }) {
  const cardBody = (
    <Card
      className={`p-5 transition-colors ${
        test.isLocked ? "opacity-70" : "hover:bg-white/[0.02]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-[15px] font-semibold text-text">{test.title}</h3>
        <span
          className={`shrink-0 text-[12px] font-medium ${
            DIFFICULTY_COLORS[test.difficulty]?.text || "text-text-muted"
          }`}
        >
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

      {test.isLocked && (
        <div className="mt-3 flex items-center gap-1.5 rounded-md border border-border bg-white/[0.02] px-2.5 py-1.5 text-[11.5px] text-text-faint">
          <Lock className="size-3.5 shrink-0" />
          <span>{test.lockedReason || "Complete the linked topic to unlock this test."}</span>
        </div>
      )}

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
  );

  if (test.isLocked) {
    return (
      <div className="block cursor-not-allowed" aria-disabled="true">
        {cardBody}
      </div>
    );
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link to={ROUTES.MOCK_TEST_DETAILS.replace(":testId", test._id)} className="block">
        {cardBody}
      </Link>
    </motion.div>
  );
}