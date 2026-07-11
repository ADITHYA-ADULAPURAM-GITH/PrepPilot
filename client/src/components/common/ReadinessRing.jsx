import { motion } from "framer-motion";

/**
 * Signature brand motif: a circular "readiness" arc — the same visual
 * language used for the product's core Placement Readiness metric on
 * the dashboard, reused here as ambient branding rather than a random
 * decorative shape.
 */
export function ReadinessRing({ size = 340, value = 72 }) {
  const strokeWidth = 1.5;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b4fe8" />
            <stop offset="100%" stopColor="#f5b942" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="font-display text-5xl font-semibold text-text"
        >
          {value}%
        </motion.span>
        <span className="mt-1 text-[13px] text-text-muted">Placement Readiness</span>
      </div>
    </div>
  );
}
