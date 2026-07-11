import { Badge } from "@/components/ui/badge";

const VARIANT_MAP = {
  Easy: "success",
  Medium: "accent",
  Hard: "danger",
};

export function DifficultyBadge({ difficulty }) {
  return <Badge variant={VARIANT_MAP[difficulty] || "default"}>{difficulty}</Badge>;
}