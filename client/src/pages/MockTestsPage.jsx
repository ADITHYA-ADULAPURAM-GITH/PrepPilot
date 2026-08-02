import { useMemo, useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import { useMockTests } from "@/features/mock-tests/hooks/useMockTests";
import { MockTestCard } from "@/features/mock-tests/components/MockTestCard";
import { MockTestSkeleton } from "@/features/mock-tests/components/MockTestSkeleton";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/common/EmptyState";

const CATEGORY_OPTIONS = ["Aptitude", "SQL", "Python", "DSA", "Company-specific"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];

export default function MockTestsPage() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const queryFilters = useMemo(
    () => ({ category: category || undefined, difficulty: difficulty || undefined, limit: 50 }),
    [category, difficulty]
  );

  const { data, isLoading, isError } = useMockTests(queryFilters);

  const hasActiveFilters = Boolean(category || difficulty);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Mock Tests</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Timed practice tests across aptitude, technical topics, and company-specific rounds.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full sm:w-[200px]">
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full sm:w-[180px]">
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">All difficulties</option>
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MockTestSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <EmptyState
          icon={ClipboardList}
          title="Couldn't load mock tests"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      )}

      {!isLoading && !isError && data?.tests?.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title={hasActiveFilters ? "No tests match your filters" : "No mock tests yet"}
          description={
            hasActiveFilters ? "Try a different category or difficulty." : "The test catalog hasn't been seeded yet."
          }
        />
      )}

      {!isLoading && !isError && data?.tests?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.tests.map((test) => (
            <MockTestCard key={test._id} test={test} />
          ))}
        </div>
      )}
    </div>
  );
}