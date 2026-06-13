"use client";

import { itemIcon } from "../lib/icons";
import { resolveIcon } from "../schema/remix-icons";
import { Container, SectionHeader, Text } from "../primitives";
import { MagicCard } from "../ui/magic-card";
import { Ripple } from "../ui/effects";
import type { FeaturesSlot } from "../schema/types";
import type { RemixIconId } from "../schema/remix-icons";
import type { RemixiconComponentType } from "@remixicon/react";

type FeaturesBlockProps = {
  slot: FeaturesSlot;
};

type FeatureItem = FeaturesSlot["content"]["items"][number];

const cardBg = "flex flex-col items-start w-full bg-[color-mix(in_srgb,var(--lp-primary)_8%,transparent)]";

/** Luro bento grid — copy and icons from page-spec (five fixed roles). */
export function FeaturesBlock({ slot }: FeaturesBlockProps) {
  const { content } = slot;
  const [brief, analytics, ideation, integrations, hashtags] = content.items;
  const accents = content.accents ?? {};
  const marqueeLabel = accents.marqueeLabel ?? "Make it better";
  const marqueeIcon = resolveIcon(accents.marqueeIcon ?? "RiSparklingLine");
  const ringsIcon = resolveIcon(accents.ringsIcon ?? "RiApps2Line");
  const heroIcon = resolveIcon(brief?.icon ?? "RiSparklingLine");
  const MarqueeIcon = marqueeIcon;
  const RingsIcon = ringsIcon;

  return (
    <section id="features" className="scroll-mt-28 overflow-x-clip py-12 md:py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge={content.badge}
          title={content.title}
          subtitle={content.subtitle}
        />
      </Container>

      <div className="mt-16 flex w-full flex-col items-center gap-5 lg:gap-5">
        <Container>
          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[1fr_0.65fr] lg:gap-5">
            <MagicCard particles className={`${cardBg} size-full`}>
              <div className="lp-bento-card flex min-h-72 items-center justify-center">
                <span className="relative mx-auto text-[var(--lp-muted)] transition-colors group-hover:text-[var(--lp-fg)]">
                  {(() => {
                    const HeroIcon = heroIcon;
                    return <HeroIcon size={80} aria-hidden />;
                  })()}
                </span>
                <Ripple />
              </div>
            </MagicCard>

            {analytics ? (
              <MagicCard particles className={cardBg}>
                <div className="lp-bento-card flex w-full flex-row gap-6">
                  <div className="relative h-40 w-full">
                    <AnalyticsVisual icon={analytics.icon} />
                  </div>
                  <FeatureCopy item={analytics} />
                </div>
              </MagicCard>
            ) : null}
          </div>
        </Container>

        <Container>
          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-5">
            {ideation ? (
              <MagicCard particles className={cardBg}>
                <div className="lp-bento-card flex w-full flex-row gap-6">
                  <div className="relative h-52 w-full">
                    <IdeationVisual icon={ideation.icon} />
                  </div>
                  <FeatureCopy item={ideation} className="mt-auto" />
                </div>
              </MagicCard>
            ) : null}

            <div className="grid gap-5 lg:gap-5">
              <MagicCard particles className={`${cardBg} h-32`}>
                <div className="lp-bento-card relative w-full items-center justify-center">
                  <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2">
                    <p className="px-4 text-justify text-base text-[var(--lp-muted)] [mask-image:radial-gradient(50%_50%_at_50%_50%,#bab3ff_0%,rgba(186,179,255,0)_90%)]">
                      {content.subtitle ??
                        "AI-powered tools designed to optimize your content creation and engagement like never before."}
                    </p>
                  </div>
                  <div className="relative h-16 w-full">
                    <MarqueeCenterVisual label={marqueeLabel} icon={MarqueeIcon} />
                  </div>
                </div>
              </MagicCard>

              <MagicCard particles className={`${cardBg} !h-max`}>
                <div className="lp-bento-card relative w-full gap-6">
                  <div className="relative h-48 w-full">
                    <RingsVisual icon={RingsIcon} />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--lp-primary)_10%,transparent)] blur-3xl" />
                </div>
              </MagicCard>
            </div>

            {integrations ? (
              <MagicCard particles className={cardBg}>
                <div className="lp-bento-card flex w-full flex-row gap-6">
                  <FeatureCopy item={integrations} className="mb-auto" />
                  <div className="relative h-28 w-full">
                    <IconVisual icon={itemIcon(integrations.icon)} size={48} />
                    <div className="absolute top-1/2 left-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-full rounded-full bg-[color-mix(in_srgb,var(--lp-primary)_10%,transparent)] blur-3xl" />
                  </div>
                </div>
              </MagicCard>
            ) : null}
          </div>
        </Container>

        {(brief || hashtags) && (
          <Container>
            <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[0.4fr_1fr] lg:gap-5">
              {brief ? (
                <MagicCard particles className={cardBg}>
                  <div className="lp-bento-card flex w-full flex-row gap-6">
                    <div className="w-full">
                      <IconVisual icon={itemIcon(brief.icon)} className="h-40 lg:h-auto" size={56} />
                    </div>
                    <FeatureCopy item={brief} className="mt-auto" />
                  </div>
                </MagicCard>
              ) : null}
              {hashtags ? (
                <MagicCard particles className={cardBg}>
                  <div className="lp-bento-card flex w-full flex-row gap-6">
                    <div className="w-full">
                      <IconVisual icon={itemIcon(hashtags.icon)} className="h-40 lg:h-52" size={64} />
                    </div>
                    <FeatureCopy item={hashtags} className="mt-auto" />
                  </div>
                </MagicCard>
              ) : null}
            </div>
          </Container>
        )}
      </div>
    </section>
  );
}

function FeatureCopy({ item, className = "" }: { item: FeatureItem; className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h4 className="lp-heading font-[family-name:var(--lp-font-display)] text-xl font-medium">
        {item.title}
      </h4>
      <Text muted className="mt-2 text-sm md:text-base">
        {item.description}
      </Text>
    </div>
  );
}

function IconVisual({
  icon: Icon,
  className = "h-40",
  size = 48,
}: {
  icon: RemixiconComponentType;
  className?: string;
  size?: number;
}) {
  return (
    <div className={`relative flex w-full items-center justify-center ${className}`}>
      <Icon size={size} className="relative text-[var(--lp-primary)]" aria-hidden />
    </div>
  );
}

function AnalyticsVisual({ icon }: { icon: RemixIconId }) {
  const BadgeIcon = itemIcon(icon);
  const heights = ["h-[35%]", "h-[55%]", "h-[75%]", "h-[45%]", "h-[90%]"];

  return (
    <div className="relative flex h-full w-full items-end justify-center gap-2 px-2 pb-2">
      {heights.map((height, i) => (
        <div
          key={i}
          className={`w-5 rounded-full ${height} ${
            i === 4
              ? "bg-[var(--lp-primary)]"
              : "bg-[color-mix(in_srgb,var(--lp-muted)_35%,transparent)]"
          }`}
        />
      ))}
      <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-[var(--lp-radius-md)] border border-[color-mix(in_srgb,var(--lp-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--lp-primary)_25%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--lp-fg)]">
        <BadgeIcon size={14} aria-hidden />
        2K
      </div>
    </div>
  );
}

function IdeationVisual({ icon }: { icon: RemixIconId }) {
  const CenterIcon = itemIcon(icon);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {[100, 78, 56, 34].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-[color-mix(in_srgb,var(--lp-fg)_12%,transparent)]"
          style={{ width: `${size}%`, height: `${size}%` }}
        />
      ))}
      <CenterIcon size={40} className="relative text-[var(--lp-fg)]" aria-hidden />
      <div className="absolute top-1/2 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--lp-primary)_10%,transparent)] blur-3xl" />
    </div>
  );
}

function MarqueeCenterVisual({
  label,
  icon: Icon,
}: {
  label: string;
  icon: RemixiconComponentType;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex h-10 items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--lp-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--lp-primary)_15%,transparent)] px-4 text-xs font-medium text-[var(--lp-fg)]">
        <Icon size={16} aria-hidden />
        {label}
      </div>
      <div className="absolute top-1/2 left-1/2 -z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--lp-primary)_10%,transparent)] blur-2xl" />
    </div>
  );
}

function RingsVisual({ icon: Icon }: { icon: RemixiconComponentType }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="h-full w-full max-h-48 max-w-48 rounded-full border border-[color-mix(in_srgb,var(--lp-primary)_20%,transparent)]" />
      </div>
      <div className="absolute flex h-56 w-56 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--lp-primary)_15%,transparent)]" />
      <Icon size={96} className="relative opacity-80 text-[var(--lp-primary)]" aria-hidden />
    </div>
  );
}
