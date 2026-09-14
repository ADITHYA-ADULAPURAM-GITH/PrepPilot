// A fixed, full-viewport ambient background: slow-drifting brand-color
// orbs + a faint grain layer. Opacity is driven by --orb-opacity-*
// vars (not Tailwind opacity classes) because dark and light themes
// need very different strengths — the same glow that reads as premium
// on near-black turns to mud on a cream background at equal alpha.
export function LiveBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(var(--primary-rgb), 0.1), transparent 60%)",
        }}
      />

      <div
        className="absolute left-[-12%] top-[-14%] size-[560px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.6), transparent 70%)",
          opacity: "var(--orb-opacity-1)",
          animation: "orb-drift-a 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-18%] right-[-10%] size-[620px] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.45), transparent 70%)",
          opacity: "var(--orb-opacity-2)",
          animation: "orb-drift-b 34s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[18%] top-[28%] size-[440px] rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(var(--warning-rgb), 0.45), transparent 70%)",
          opacity: "var(--orb-opacity-3)",
          animation: "orb-drift-c 40s ease-in-out infinite",
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
        <filter id="lb-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#lb-grain)" />
      </svg>
    </div>
  );
}