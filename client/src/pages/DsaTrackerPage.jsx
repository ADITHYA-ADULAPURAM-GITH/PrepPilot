import { useMemo, useState } from "react";
import { Code2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useProblems } from "@/features/dsa-tracker/hooks/useProblems";
import { SearchBar } from "@/features/dsa-tracker/components/SearchBar";
import { FilterBar } from "@/features/dsa-tracker/components/FilterBar";
import { AddProblemDialog } from "@/features/dsa-tracker/components/AddProblemDialog";
import { ProblemTable } from "@/features/dsa-tracker/components/ProblemTable";
import { ProblemCardList } from "@/features/dsa-tracker/components/ProblemCardList";
import { PaginationControls } from "@/features/dsa-tracker/components/PaginationControls";
import { LoadingSkeleton } from "@/features/dsa-tracker/components/LoadingSkeleton";
import { EmptyState } from "@/components/common/EmptyState";

const INITIAL_FILTERS = { topic: "", difficulty: "", status: "", search: "", page: 1 };

export default function DsaTrackerPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 350);

  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch || undefined, limit: 10 }),
    [filters, debouncedSearch]
  );

  const { data, isLoading, isError } = useProblems(queryFilters);

  const updateFilters = (patch) => setFilters((prev) => ({ ...prev, ...patch, page: 1 }));

  const hasActiveFilters = filters.topic || filters.difficulty || filters.status || debouncedSearch;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold text-text">DSA Tracker</h1>
          <p className="mt-1 text-[13.5px] text-text-muted">
            Every problem you've solved, bookmarked, or still need to revisit.
          </p>
        </div>
        <AddProblemDialog />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <FilterBar filters={filters} onChange={updateFilters} />
      </div>

      {isLoading && <LoadingSkeleton />}

      {isError && (
        <EmptyState
          icon={Code2}
          title="Couldn't load your problems"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      )}

      {!isLoading && !isError && data?.problems?.length === 0 && (
        <EmptyState
          icon={Code2}
          title={hasActiveFilters ? "No problems match your filters" : "No problems yet"}
          description={
            hasActiveFilters
              ? "Try adjusting your search or filters."
              : "Add the first problem you're working on to start tracking your progress."
          }
          action={!hasActiveFilters && <AddProblemDialog />}
        />
      )}

      {!isLoading && !isError && data?.problems?.length > 0 && (
        <>
          <ProblemTable problems={data.problems} />
          <ProblemCardList problems={data.problems} />
          <PaginationControls
            pagination={data.pagination}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </>
      )}
    </div>
  );
}