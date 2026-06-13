"use client";

import { RiArrowRightLine } from "../lib/icons";
import { Button, Container, DisplayHeading, Text } from "../primitives";
import { Spotlight } from "../ui/spotlight";
import type { HeroSlot } from "../schema/types";

type HeroBlockProps = {
  slot: HeroSlot;
};

/** Luro-style centered hero with pulsing badge and gradient headline. */
export function HeroBlock({ slot }: HeroBlockProps) {
  const { content } = slot;
  const useDualCtas = Boolean(content.primaryCta && content.secondaryCta);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-5rem)] scroll-mt-28 items-start overflow-x-clip"
    >
      <Container className="relative w-full pt-14 pb-8 md:pt-20 md:pb-10 lg:pt-24">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgba(255, 255, 255, 0.5)" />

        <div className="relative z-40 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          {content.eyebrow ? (
            <div className="lp-hero-badge-shell mx-auto flex w-max cursor-pointer select-none items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-1.5">
              <div className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full lp-hero-badge-pulse">
                <div className="absolute h-2.5 w-2.5 animate-ping rounded-full lp-hero-badge-pulse" />
                <div className="absolute h-1.5 w-1.5 rounded-full lp-hero-badge-dot" />
              </div>
              <span className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--lp-palette-7)] via-[var(--lp-primary)] to-[var(--lp-palette-6)] bg-[length:200%_auto] bg-clip-text text-sm text-transparent animate-background-shine">
                {content.eyebrow}
                <span className="flex items-center justify-center rounded-full bg-gradient-to-b from-[color-mix(in_srgb,var(--lp-fg)_20%,transparent)] to-[color-mix(in_srgb,var(--lp-fg)_10%,transparent)] px-2 py-1 text-xs text-[var(--lp-fg)]">
                  What&apos;s new
                  <RiArrowRightLine size={14} className="ml-1 text-[color-mix(in_srgb,var(--lp-fg)_50%,transparent)]" />
                </span>
              </span>
            </div>
          ) : null}

          <DisplayHeading as="h1" hero className="mt-14 whitespace-pre-line">
            {content.headline}
          </DisplayHeading>

          <Text muted className="mx-auto mt-12 max-w-2xl">
            {content.subheadline}
          </Text>

          {useDualCtas ? (
            <div className="mt-14 flex items-center justify-center gap-x-6">
              <Button asChild variant="primary" size="lg" href={content.primaryCta!.href}>
                {content.primaryCta!.label}
              </Button>
              <Button asChild variant="outline" size="lg" href={content.secondaryCta!.href} className="hidden md:inline-flex">
                {content.secondaryCta!.label}
              </Button>
            </div>
          ) : content.primaryCta ? (
            <div className="mt-14">
              <Button asChild variant="primary" size="lg" href={content.primaryCta.href}>
                {content.primaryCta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
