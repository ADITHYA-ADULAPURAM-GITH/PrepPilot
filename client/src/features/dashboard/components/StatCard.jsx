import { Card } from "@/components/ui/card";

export function StatCard({ label, value, change }) {
  return (
    <Card className="p-5 transition-colors hover:bg-white/[0.02]">
      <p className="text-[12.5px] text-text-muted">{label}</p>
      <p className="mt-2 font-display text-[26px] font-semibold leading-none text-text">{value}</p>
      {change && <p className="mt-2 text-[12px] text-text-faint">{change}</p>}
    </Card>
  );
}
