import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-faint" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by problem title..."
        className="pl-9"
      />
    </div>
  );
}