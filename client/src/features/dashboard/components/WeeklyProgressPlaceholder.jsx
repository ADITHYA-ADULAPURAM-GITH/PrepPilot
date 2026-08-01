import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function WeeklyProgressPlaceholder() {
  return (
    <Card className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <BarChart3 className="size-6 text-text-faint" />
      <h3 className="font-display text-[15px] font-semibold text-text">Weekly Progress</h3>
      <p className="max-w-sm text-[13px] text-text-muted">
        Weekly progress analytics will become available once sufficient study history has been collected.
      </p>
    </Card>
  );
}