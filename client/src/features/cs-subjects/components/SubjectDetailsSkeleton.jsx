import { Skeleton } from "@/components/ui/skeleton";

export function SubjectDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />

      <div className="flex items-center gap-3">
        <Skeleton className="size-11 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <Skeleton className="h-2.5 w-full" />

      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}