import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { ReadinessRing } from "@/components/common/ReadinessRing";
import { APP_NAME } from "@/lib/constants";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-base">
      {/* Branding panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-border p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(91,79,232,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(245,185,66,0.10), transparent 50%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-white">
            P
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">{APP_NAME}</span>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center">
          <ReadinessRing />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 max-w-sm"
        >
          <h1 className="font-display text-2xl font-semibold leading-tight text-gradient">
            Every DSA sheet, mock test, and interview note — in one readiness score.
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-text-muted">
            Track what you've covered, see what's left, and walk into placement season knowing exactly where you stand.
          </p>
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-white">
              P
            </div>
            <span className="font-display text-[15px] font-semibold">{APP_NAME}</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
