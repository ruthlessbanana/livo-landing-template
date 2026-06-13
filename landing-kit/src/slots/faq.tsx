"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { RiAddLine } from "../lib/icons";
import { cn } from "../lib/utils";
import { Container, SectionBadge, SectionTitle, Text } from "../primitives";
import type { FaqSlot } from "../schema/types";

type FaqBlockProps = {
  slot: FaqSlot;
};

/** FAQ accordion — badge, title, and Q&A from page-spec. */
export function FaqBlock({ slot }: FaqBlockProps) {
  const { content } = slot;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 overflow-x-clip py-12 md:py-16 lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionBadge label={content.badge.label} icon={content.badge.icon} />
          <SectionTitle as="h2" className="mt-6" title={content.title} preferSingleLine />
        </div>

        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-4">
          {content.items.map((item, faqIndex) => (
            <div
              key={item.question}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedIndex(selectedIndex === faqIndex ? null : faqIndex)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedIndex(selectedIndex === faqIndex ? null : faqIndex);
                }
              }}
              className="cursor-pointer rounded-xl border border-[color-mix(in_srgb,var(--lp-surface-border)_80%,transparent)] bg-[color-mix(in_srgb,var(--lp-surface)_70%,transparent)] p-6 transition hover:border-[color-mix(in_srgb,var(--lp-primary)_35%,transparent)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="m-0 text-left font-medium text-[var(--lp-fg)]">{item.question}</h3>
                <RiAddLine
                  size={24}
                  className={cn(
                    "shrink-0 text-[var(--lp-primary)] transition duration-300",
                    selectedIndex === faqIndex && "rotate-45",
                  )}
                />
              </div>

              <AnimatePresence initial={false}>
                {selectedIndex === faqIndex ? (
                  <motion.div
                    initial={{ height: 0, marginTop: 0, opacity: 0 }}
                    animate={{ height: "auto", marginTop: 16, opacity: 1 }}
                    exit={{ height: 0, marginTop: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Text muted className="text-left text-sm md:text-base">
                      {item.answer}
                    </Text>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
