"use client";

import { Button, Container, DisplayHeading, Text } from "../primitives";
import { Particles } from "../ui/effects";
import { RetroGrid } from "../ui/spotlight";
import type { CtaSlot } from "../schema/types";

type CtaBlockProps = {
  slot: CtaSlot;
};

/** Luro CTA panel with retro grid and particles. */
export function CtaBlock({ slot }: CtaBlockProps) {
  const { content } = slot;

  return (
    <section id="cta" className="scroll-mt-28 overflow-x-clip py-12 md:py-16 lg:py-24">
      <Container>
        <div className="relative mx-auto flex h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--lp-fg)_10%,transparent)] px-4 text-center md:h-[500px] md:px-0">
          <div className="absolute bottom-0 left-1/2 h-12 w-full -translate-x-1/2 bg-[color-mix(in_srgb,var(--lp-primary)_55%,transparent)] blur-[10rem]" />

          <div className="relative z-20 flex flex-col items-center justify-center">
            <DisplayHeading as="h2" className="!text-4xl md:!text-6xl font-semibold !leading-tight">
              {content.headline}
            </DisplayHeading>
            {content.subheadline ? (
              <Text muted className="mx-auto mt-6 max-w-xl">
                {content.subheadline}
              </Text>
            ) : null}
            <div className="mt-6 flex w-full flex-col items-center justify-center gap-6 md:flex-row">
              <Button asChild variant="primary" size="lg" href={content.primaryCta.href} className="w-full md:w-max">
                {content.primaryCta.label}
              </Button>
              {content.secondaryCta ? (
                <Button asChild variant="secondary" size="lg" href={content.secondaryCta.href} className="w-full md:w-max">
                  {content.secondaryCta.label}
                </Button>
              ) : null}
            </div>
          </div>

          <RetroGrid />
          <Particles refresh ease={80} color="#d4d4d8" quantity={100} className="absolute inset-0 size-full" />
        </div>
      </Container>
    </section>
  );
}
