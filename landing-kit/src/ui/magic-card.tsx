"use client";

import type { ReactNode } from "react";
import { Particles } from "./effects";

type MagicCardProps = {
  children: ReactNode;
  particles?: boolean;
  count?: number;
  className?: string;
};

/** Spotlight-follow bento card — from Luro template. */
export function MagicCard({ children, particles = false, count = 20, className = "" }: MagicCardProps) {
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--pos-x", `${e.clientX - rect.left}px`);
    currentTarget.style.setProperty("--pos-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className={`lp-magic-card overflow-hidden rounded-xl lg:rounded-2xl ${className}`}
      onMouseMove={onMouseMove}
    >
      <div className="lp-magic-card-content relative">
        {particles ? (
          <Particles
            className="absolute inset-0 z-10 size-full"
            quantity={count}
            ease={80}
            color="#d4d4d8"
            refresh
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
