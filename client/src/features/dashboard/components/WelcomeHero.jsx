import { Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const MOTIVATIONAL_LINES = [
  "Every problem you solve today is one less surprise in the interview room.",
  "Consistency beats intensity — showing up is most of the work.",
  "Your readiness score moves with every session. Keep stacking them.",
];

function pickLine(seed) {
  return MOTIVATIONAL_LINES[seed % MOTIVATIONAL_LINES.length];
}

export function WelcomeHero({ streak = 0 }) {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";
  const line = pickLine(new Date().getDate());

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass relative overflow-hidden rounded-2xl p-6 lg:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 85% 0%, rgba(91,79,232,0.16), transparent 55%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h1 className="font-display text-[26px] font-semibold leading-tight text-text lg:text-[30px]">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-text-muted">{line}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-4 py-2.5">
            <Flame className="size-4 text-accent" />
            <div className="leading-none">
              <div className="font-display text-[15px] font-semibold text-text">{streak} days</div>
              <div className="mt-0.5 text-[11px] text-text-muted">Current streak</div>
            </div>
          </div>
          <Button size="lg">
            Continue prep
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
