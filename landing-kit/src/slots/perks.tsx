"use client";

import type { ReactNode } from "react";
import { itemIcon } from "../lib/icons";
import { cn } from "../lib/utils";
import { Container, SectionHeader } from "../primitives";
import type { PerksSlot } from "../schema/types";

type PerksBlockProps = {
  slot: PerksSlot;
};

/** Perks section — bordered benefit grid from page-spec. */
export function PerksBlock({ slot }: PerksBlockProps) {
  const { content } = slot;

  return (
    <Section id="perks">
      <Container>
        <SectionHeader
          badge={content.badge}
          title={content.title ?? "Discover the benefits"}
          subtitle="Explore the advantages that help your team ship landing pages faster."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <PerkCell
              key={item.label}
              index={index}
              total={content.items.length}
              title={item.value}
              description={item.label}
              icon={itemIcon(item.icon)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PerkCell({
  title,
  description,
  icon: Icon,
  index,
  total,
}: {
  title: string;
  description: string;
  icon: ReturnType<typeof itemIcon>;
  index: number;
  total: number;
}) {
  const cols = 3;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const lastRow = Math.floor((total - 1) / cols);

  return (
    <div
      className={cn(
        "group/feature relative flex transform-gpu flex-col border-neutral-800 py-10 lp-perk-grid",
        col === 0 && "lg:border-l",
        col === cols - 1 && "lg:border-r",
        row < lastRow && "lg:border-b",
        "border-b lg:border-r",
      )}
    >
      {row < lastRow ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/25 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950/25 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}

      <div className="flex w-full transform-gpu flex-col transition-all duration-300 group-hover/feature:-translate-y-1">
        <div className="relative z-10 mb-4 px-10">
          <Icon
            size={40}
            className="origin-left text-[var(--lp-muted)] transition-all duration-300 ease-in-out group-hover/feature:scale-75 group-hover/feature:text-[var(--lp-fg)]"
          />
        </div>
        <div className="relative z-10 mb-2 px-10 font-[family-name:var(--lp-font-display)] text-lg font-medium">
          <div className="absolute -inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-[var(--lp-surface-border)] transition-all duration-500 group-hover/feature:h-8 group-hover/feature:bg-[var(--lp-primary)]" />
          <span className="lp-heading inline-block">{title}</span>
        </div>
        <p className="relative z-10 max-w-xs px-10 text-sm text-[color-mix(in_srgb,var(--lp-muted)_90%,transparent)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 overflow-x-clip py-12 md:py-16 lg:py-24">
      {children}
    </section>
  );
}
