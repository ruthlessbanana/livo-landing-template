"use client";

import { Container, SectionBadge, SectionTitle, Text } from "../primitives";
import { ConnectHubVisual } from "../ui/connect-hub-visual";
import { Particles } from "../ui/effects";
import type { ConnectSlot } from "../schema/types";

type ConnectBlockProps = {
  slot: ConnectSlot;
};

/** Connect section — integration hub from page-spec. */
export function ConnectBlock({ slot }: ConnectBlockProps) {
  const { content } = slot;

  return (
    <section id="connect" className="scroll-mt-28 overflow-x-clip py-8 md:py-12">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <SectionBadge label={content.badge.label} icon={content.badge.icon} />
          <SectionTitle as="h2" className="mt-6" title={content.title} preferSingleLine />
          {content.subtitle ? (
            <Text muted className="mt-6 max-w-xl">
              {content.subtitle}
            </Text>
          ) : null}
        </div>
      </Container>

      <Container>
        <div className="relative mt-12 w-full">
          <ConnectHubVisual hub={content.hub} />
          <Particles
            className="pointer-events-none absolute inset-0"
            quantity={150}
            ease={80}
            color="#e4e4e7"
            refresh
          />
        </div>
      </Container>
    </section>
  );
}
