import { useMemo, useState } from "react";
import { Search, Building2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { CompanyCard } from "@/features/companies/components/CompanyCard";
import { CompanySkeleton } from "@/features/companies/components/CompanySkeleton";
import { TAG_OPTIONS } from "@/features/companies/constants";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/common/EmptyState";

export default function CompaniesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [tag, setTag] = useState("");
  const debouncedSearch = useDebounce(searchInput, 350);

  const queryFilters = useMemo(
    () => ({ search: debouncedSearch || undefined, tag: tag || undefined, limit: 50 }),
    [debouncedSearch, tag]
  );

  const { data, isLoading, isError } = useCompanies(queryFilters);

  const hasActiveFilters = Boolean(debouncedSearch || tag);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Companies</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Eligibility, key topics, and interview rounds for companies visiting your campus.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-faint" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search companies..."
            className="pl-9"
          />
        </div>

        <div className="w-full sm:w-[180px]">
          <Select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">All tags</option>
            {TAG_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CompanySkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <EmptyState
          icon={Building2}
          title="Couldn't load companies"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      )}

      {!isLoading && !isError && data?.companies?.length === 0 && (
        <EmptyState
          icon={Building2}
          title={hasActiveFilters ? "No companies match your filters" : "No companies yet"}
          description={
            hasActiveFilters
              ? "Try a different search term or tag."
              : "The company catalog hasn't been seeded yet."
          }
        />
      )}

      {!isLoading && !isError && data?.companies?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}