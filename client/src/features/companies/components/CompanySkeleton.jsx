import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Represents one card's loading state — a page composes N of these,
// same convention as ProblemCard/SubjectCard being single-item
// components rather than baking a grid into the skeleton itself.
export function CompanySkeleton() {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <Skeleton className="size-10 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
      <Skeleton className="mt-3 h-3 w-3/4" />
      <div className="mt-3 flex gap-1.5">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
    </Card>
  );
}