import { Card } from "@/components/ui/card";


const READINESS_ITEMS = [
  { label: "DSA" },
  { label: "CS Subjects" },
  { label: "Aptitude" },
  { label: "Mock Tests" },
];

export function PlacementReadiness() {
  return (
    <Card className="p-5">
      <h3 className="font-display text-[15px] font-semibold text-text">Placement readiness</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {READINESS_ITEMS.map((item) => (
          <div key={item.label} className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[12.5px] text-text-muted">{item.label}</p>
            <p className="mt-1 text-[13px] font-medium text-text-muted">Not available yet</p>
          </div>
        ))}
      </div>
    </Card>
  );
}