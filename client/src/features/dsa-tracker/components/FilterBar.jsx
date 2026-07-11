import { Select } from "@/components/ui/select";
import { TOPIC_OPTIONS } from "@/features/dsa-tracker/constants";

export function FilterBar({ filters, onChange }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="flex flex-wrap gap-3">
      <div className="w-[160px]">
        <Select value={filters.topic} onChange={update("topic")}>
          <option value="">All topics</option>
          {TOPIC_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </div>

      <div className="w-[140px]">
        <Select value={filters.difficulty} onChange={update("difficulty")}>
          <option value="">All difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Select>
      </div>

      <div className="w-[130px]">
        <Select value={filters.status} onChange={update("status")}>
          <option value="">All status</option>
          <option value="Todo">Todo</option>
          <option value="Solved">Solved</option>
        </Select>
      </div>
    </div>
  );
}