import type { SlotId } from "../stack/page-stack";
import type { RemixIconId } from "./remix-icons";

export type { RemixIconId };
export { REMIX_ICON_IDS, DEFAULT_CONNECT_HUB_NODES } from "./remix-icons";

export type CtaLink = {
  label: string;
  href: string;
  icon?: RemixIconId;
};

export type NavLink = {
  label: string;
  href: string;
  icon: RemixIconId;
};

export type SectionBadgeContent = {
  label: string;
  icon: RemixIconId;
};

export type ConnectHubNodeSpec = {
  id: string;
  icon: RemixIconId;
  x: number;
  y: number;
};

export type ConnectHubSpec = {
  centerIcon: RemixIconId;
  nodes: ConnectHubNodeSpec[];
};

export type ResolvedTheme = {
  palette?: string[];
  colors: {
    primary: string;
    primaryForeground: string;
    background: string;
    foreground: string;
    muted: string;
    surface: string;
    surfaceBorder: string;
    accent: string;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    display: string;
    body: string;
  };
  spacing: {
    sectionDesktop: string;
    sectionMobile: string;
    container: string;
  };
  shadow: {
    card: string;
  };
  button: {
    style: "solid" | "outline";
  };
};

export type HeaderSlot = {
  variant: "minimal" | "sticky-cta";
  content: {
    productName: string;
    navLinks: NavLink[];
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
};

export type HeroSlot = {
  variant: "simple" | "split" | "gradient" | "waitlist";
  content: {
    eyebrow?: string;
    headline: string;
    subheadline: string;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
    emailPlaceholder?: string;
    waitlistCta?: string;
    imageAlt?: string;
  };
};

export type PerksSlot = {
  variant: "3-up" | "4-up" | "inline-bar";
  content: {
    badge: SectionBadgeContent;
    title?: string;
    items: Array<{ value: string; label: string; icon: RemixIconId }>;
  };
};

export type FeaturesAccents = {
  marqueeLabel?: string;
  marqueeIcon?: RemixIconId;
  ringsIcon?: RemixIconId;
};

export type FeaturesSlot = {
  variant: "grid" | "bento" | "tabs";
  content: {
    badge: SectionBadgeContent;
    title: string;
    subtitle?: string;
    /** Exactly five items in bento order: brief, analytics, ideation, integrations, hashtags. */
    items: Array<{
      title: string;
      description: string;
      icon: RemixIconId;
      size?: "sm" | "md" | "lg";
    }>;
    accents?: FeaturesAccents;
  };
};

export type ConnectSlot = {
  variant: "connect";
  content: {
    badge: SectionBadgeContent;
    title: string;
    subtitle?: string;
    hub: ConnectHubSpec;
  };
};

export type ComparisonSlot = {
  variant: "before-after" | "us-them" | "pain-solution";
  content: {
    badge: SectionBadgeContent;
    title: string;
    leftLabel: string;
    rightLabel: string;
    rows: Array<{ left: string; right: string }>;
  };
};

export type FaqSlot = {
  variant: "accordion" | "two-col-accordion";
  content: {
    badge: SectionBadgeContent;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};

export type CtaSlot = {
  variant: "banner" | "card" | "fullscreen";
  content: {
    headline: string;
    subheadline?: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
  };
};

export type FooterSlot = {
  variant: "simple" | "columns";
  content: {
    productName: string;
    tagline?: string;
    links?: NavLink[];
    columns?: Array<{ title: string; links: NavLink[] }>;
    copyright: string;
  };
};

export type SlotPayload =
  | HeaderSlot
  | HeroSlot
  | PerksSlot
  | FeaturesSlot
  | ConnectSlot
  | ComparisonSlot
  | FaqSlot
  | CtaSlot
  | FooterSlot;

export type PageSpec = {
  version: 1;
  meta: {
    title: string;
    description: string;
  };
  sections: {
    perks?: boolean;
    features?: boolean;
    connect?: boolean;
    comparison?: boolean;
    faq?: boolean;
  };
  theme: ResolvedTheme;
  slots: Partial<Record<SlotId, SlotPayload>>;
};

export function isSlotEnabled(spec: PageSpec, slotId: SlotId): boolean {
  if (slotId === "header" || slotId === "hero" || slotId === "cta" || slotId === "footer") {
    return true;
  }
  return spec.sections[slotId] === true;
}
