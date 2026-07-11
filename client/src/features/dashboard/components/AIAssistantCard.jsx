import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIAssistantCard() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 15% 100%, rgba(245,185,66,0.14), transparent 60%)",
        }}
      />
      <div className="relative z-10">
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
          <Sparkles className="size-[18px] text-white" />
        </div>
        <h2 className="mt-3.5 font-display text-[15px] font-semibold text-text">PrepPilot AI</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
          Stuck on a DSA concept, need mock interview questions, or want your resume reviewed? Your AI assistant
          knows your progress and can help right now.
        </p>
        <Button variant="secondary" className="mt-4 w-full" disabled>
          Ask PrepPilot AI
          <ArrowRight className="size-3.5" />
        </Button>
        <p className="mt-2 text-center text-[11px] text-text-faint">Coming in a later feature</p>
      </div>
    </div>
  );
}
