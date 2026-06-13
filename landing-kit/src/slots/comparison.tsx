import { Container, SectionHeader, Text } from "../primitives";
import type { ComparisonSlot } from "../schema/types";

type ComparisonBlockProps = {
  slot: ComparisonSlot;
};

export function ComparisonBlock({ slot }: ComparisonBlockProps) {
  const { content } = slot;

  return (
    <section id="comparison" className="scroll-mt-28 overflow-x-clip py-12 md:py-16 lg:py-24">
      <Container>
        <SectionHeader badge={content.badge} title={content.title} />

        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-[var(--lp-surface-border)]">
          <div className="grid grid-cols-2 border-b border-[var(--lp-surface-border)] bg-[color-mix(in_srgb,var(--lp-surface)_80%,transparent)] p-4 font-medium">
            <div className="text-[var(--lp-muted)]">{content.leftLabel}</div>
            <div className="text-[var(--lp-primary)]">{content.rightLabel}</div>
          </div>
          {content.rows.map((row, index) => (
            <div
              key={`${row.left}-${index}`}
              className="grid grid-cols-2 gap-4 border-b border-[color-mix(in_srgb,var(--lp-surface-border)_60%,transparent)] p-4 last:border-b-0"
            >
              <Text muted className="text-base">
                {row.left}
              </Text>
              <Text className="text-base">{row.right}</Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
