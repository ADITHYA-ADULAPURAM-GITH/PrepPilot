import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_COLORS } from "@/lib/difficultyColors";

export function DifficultyBadge({ difficulty }) {
  return <Badge variant={DIFFICULTY_COLORS[difficulty]?.badge || "default"}>{difficulty}</Badge>;
}