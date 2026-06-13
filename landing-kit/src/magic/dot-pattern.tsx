"use client";

import { cn } from "../lib/utils";

type DotPatternProps = {
  className?: string;
};

/** Subtle SVG dot texture for hero and CTA backgrounds. */
export function DotPattern({ className }: DotPatternProps) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-[var(--lp-surface-border)] opacity-40",
        className,
      )}
    >
      <defs>
        <pattern id="lp-dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lp-dot-pattern)" />
    </svg>
  );
}
