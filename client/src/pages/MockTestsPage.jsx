import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { useMockTests } from "@/features/mock-tests/hooks/useMockTests";
import { MockTestCard } from "@/features/mock-tests/components/MockTestCard";
import { MockTestSkeleton } from "@/features/mock-tests/components/MockTestSkeleton";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";

const CATEGORY_OPTIONS = ["Aptitude", "SQL", "Python", "DSA", "Company-specific"];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function MockTestsPage() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const queryFilters = useMemo(
    () => ({ category: category || undefined, difficulty: difficulty || undefined, limit: 50 }),
    [category, difficulty]
  );

  const { data, isLoading, isError, refetch } = useMockTests(queryFilters);

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
          action={
            <Button type="button" variant="secondary" onClick={() => refetch?.()}>
              Retry
            </Button>
          }
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={gridVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.tests.map((test) => (
            <motion.div key={test._id} variants={cardVariants} transition={{ duration: 0.2 }}>
              <MockTestCard test={test} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}