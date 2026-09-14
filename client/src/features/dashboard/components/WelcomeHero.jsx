import { Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useContinuePrep } from "@/features/dashboard/hooks/useContinuePrep";

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
  const continuePrep = useContinuePrep();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass group relative isolate overflow-hidden rounded-[22px] border border-white/[0.08] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)] lg:p-8"
    >
      {/* =========================================================
          CINEMATIC BACKGROUND
          All colors/opacities are driven by --hero-* CSS variables
          (defined in index.css) so dark and light themes can be
          tuned independently. Dark-mode values are set to match the
          original hand-tuned look exactly; light-mode values are a
          softer, lower-alpha variant tuned for a cream background.
          ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Deep atmospheric base */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-tint)" }}
        />

        {/* Large soft sunset glow */}
        <div
          className="absolute -right-[8%] -top-[55%] h-[440px] w-[720px] rounded-full blur-[90px]"
          style={{ background: "var(--hero-glow-1)" }}
        />

        {/* Horizon glow */}
        <div
          className="absolute -bottom-[48%] right-[12%] h-[380px] w-[680px] rounded-full blur-[70px]"
          style={{ background: "var(--hero-glow-2)" }}
        />

        {/* Soft sun */}
        <div
          className="absolute right-[25%] top-[22%] size-[76px] rounded-full"
          style={{
            background: "var(--hero-sun)",
            filter: "blur(1px)",
            opacity: "var(--hero-sun-opacity)",
          }}
        />

        {/* Subtle atmospheric ring around sun */}
        <div
          className="absolute right-[calc(25%-30px)] top-[calc(22%-30px)] size-[136px] rounded-full border border-white/[0.07]"
        />

        {/* =====================================================
            PREMIUM TOPOGRAPHIC LINES
            Instead of crude mountain polygons.
            ===================================================== */}
        <svg
          className="absolute bottom-[-5%] right-[-3%] h-[90%] w-[62%]"
          style={{ opacity: "var(--hero-topo-opacity)" }}
          viewBox="0 0 900 330"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 286C90 238 140 250 205 266C275 283 306 278 365 238C430 194 488 182 553 205C625 231 675 254 748 223C814 195 855 180 900 186"
            stroke="currentColor"
            strokeWidth="1"
            className="text-text"
          />
          <path
            d="M0 302C92 253 143 267 210 281C280 296 314 292 373 252C437 209 495 199 561 221C629 244 681 271 753 239C820 210 858 197 900 203"
            stroke="currentColor"
            strokeWidth="1"
            className="text-text"
          />
          <path
            d="M0 318C93 271 146 284 215 297C283 311 320 307 381 267C443 225 502 216 568 238C636 260 686 286 760 255C826 227 861 214 900 220"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <path
            d="M90 330C155 293 198 299 246 307C298 316 338 313 392 279C451 242 512 234 574 252C635 269 689 300 749 277C809 254 855 243 900 250"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <path
            d="M330 330C387 288 440 274 493 281C551 288 597 315 645 310C706 304 748 274 803 270C845 267 875 274 900 283"
            stroke="currentColor"
            strokeWidth="1"
            className="text-text"
          />
        </svg>

        {/* Very subtle vertical atmospheric light */}
        <div
          className="absolute right-[18%] top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-primary), transparent)",
            opacity: "var(--hero-vlight-opacity)",
          }}
        />

        {/* Bottom cinematic fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{ background: "var(--hero-bottom-fade)" }}
        />

        {/* Left readability fade */}
        <div
          className="absolute inset-y-0 left-0 w-[68%]"
          style={{ background: "var(--hero-left-fade)" }}
        />
      </div>

      {/* =========================================================
          CONTENT
          ========================================================= */}

      <div className="relative z-10 flex min-h-[150px] flex-col justify-between gap-8 lg:min-h-[158px] lg:flex-row lg:items-center">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-px w-8 bg-primary" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
              Your preparation journey
            </span>
          </div>

          <h1 className="font-display text-[29px] font-semibold leading-[1.05] tracking-[-0.025em] text-text lg:text-[36px]">
            Welcome back, {firstName}
          </h1>

          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-text-muted lg:text-[15px]">
            {line}
          </p>
        </div>

        {/* Right action capsule */}
        <div className="flex w-full shrink-0 items-center justify-between gap-2.5 rounded-2xl border border-white/[0.09] bg-black/[0.10] p-2 backdrop-blur-xl dark:bg-black/20 sm:w-auto sm:justify-start">
          {/* Streak */}
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <div className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Flame className="size-4 text-accent" />
            </div>

            <div className="min-w-[72px] leading-none">
              <div className="font-display text-[15px] font-semibold text-text">
                {streak} days
              </div>

              <div className="mt-1 text-[10px] text-text-muted">
                Current streak
              </div>
            </div>
          </div>

          {/* Continue button */}
          <Button
            size="lg"
            onClick={() => continuePrep.mutate()}
            isLoading={continuePrep.isPending}
            className="shadow-[0_8px_24px_rgba(216,90,48,0.18)]"
          >
            Continue prep
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>

      {/* Fine highlight along the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-[10%] bottom-0 h-px opacity-30"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
        }}
      />
    </motion.div>
  );
}
