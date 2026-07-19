import { Skeleton } from "@/components/ui/skeleton";

export function SubjectsGridSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[96px] w-full rounded-2xl" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[190px] w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}