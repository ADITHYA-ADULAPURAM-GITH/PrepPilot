import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MockTestSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>
      <Skeleton className="mt-2 h-3 w-full" />
      <Skeleton className="mt-1 h-3 w-3/4" />
      <div className="mt-3 flex gap-1.5">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
      <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </Card>
  );
}