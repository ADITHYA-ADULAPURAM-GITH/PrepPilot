import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function AIAssistantCard() {
  const navigate = useNavigate();

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
        <Button variant="secondary" className="mt-4 w-full" onClick={() => navigate(ROUTES.MENTOR)}>
          Ask PrepPilot AI
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}