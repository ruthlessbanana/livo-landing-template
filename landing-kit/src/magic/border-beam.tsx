"use client";

import { cn } from "../lib/utils";

type BorderBeamProps = {
  className?: string;
  colorFrom?: string;
  colorTo?: string;
};

/** Rotating conic gradient border — Magic UI inspired, CSS-only for static export reliability. */
export function BorderBeam({
  className,
  colorFrom = "var(--lp-accent)",
  colorTo = "var(--lp-primary)",
}: BorderBeamProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)}
      aria-hidden
    >
      <div
        className="lp-border-beam absolute -inset-[120%] opacity-70"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 25%, ${colorFrom} 35%, ${colorTo} 50%, transparent 65%)`,
        }}
      />
    </div>
  );
}
