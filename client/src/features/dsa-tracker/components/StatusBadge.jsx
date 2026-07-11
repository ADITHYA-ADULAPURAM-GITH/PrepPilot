import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

export function StatusBadge({ status }) {
  const isSolved = status === "Solved";
  return (
    <Badge variant={isSolved ? "primary" : "default"}>
      {isSolved ? <CheckCircle2 className="size-3" /> : <Circle className="size-3" />}
      {status}
    </Badge>
  );
}