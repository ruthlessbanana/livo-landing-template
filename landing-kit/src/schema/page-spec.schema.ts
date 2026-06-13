import { z } from "zod";
import {
  collectPageSpecConsistencyIssues,
  normalizePageSpecInput,
} from "./normalize-page-spec";
import { collectCopyStyleIssues } from "./copy-style";
import { coerceRemixIconId, DEFAULT_CONNECT_HUB_NODES } from "./remix-icons";
import type { PageSpec } from "./types";

const remixIconId = z
  .string()
  .min(1)
  .superRefine((value, ctx) => {
    if (coerceRemixIconId(value) == null) {
      ctx.addIssue({
        code: "custom",
        message: `Unknown icon "${value}". Use a RemixIconId from REMIX_ICON_IDS (legacy aliases like "features" are accepted).`,
      });
    }
  })
  .transform((value) => coerceRemixIconId(value)!);

const ctaLink = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  icon: remixIconId.optional(),
});

const navLink = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  icon: remixIconId,
});

const sectionBadge = z.object({
  label: z.string().min(1),
  icon: remixIconId,
});

const connectHubNode = z.object({
  id: z.string().min(1),
  icon: remixIconId,
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
});

const connectHub = z.object({
  centerIcon: remixIconId,
  nodes: z.array(connectHubNode).min(1).max(12),
});

const resolvedTheme = z.object({
  palette: z.array(z.string().min(1)).min(1).max(16).optional(),
  colors: z.object({
    primary: z.string(),
    primaryForeground: z.string(),
    background: z.string(),
    foreground: z.string(),
    muted: z.string(),
    surface: z.string(),
    surfaceBorder: z.string(),
    accent: z.string(),
  }),
  radius: z.object({
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
  }),
  typography: z.object({
    display: z.string(),
    body: z.string(),
  }),
  spacing: z.object({
    sectionDesktop: z.string(),
    sectionMobile: z.string(),
    container: z.string(),
  }),
  shadow: z.object({
    card: z.string(),
  }),
  button: z.object({
    style: z.enum(["solid", "outline"]),
  }),
});

const headerSlot = z.object({
  variant: z.enum(["minimal", "sticky-cta"]),
  content: z.object({
    productName: z.string().min(1),
    navLinks: z.array(navLink).min(1),
    primaryCta: ctaLink,
    secondaryCta: ctaLink,
  }),
});

const heroSlot = z.object({
  variant: z.enum(["simple", "split", "gradient", "waitlist"]),
  content: z.object({
    eyebrow: z.string().optional(),
    headline: z.string().min(1),
    subheadline: z.string().min(1),
    primaryCta: ctaLink.optional(),
    secondaryCta: ctaLink.optional(),
    emailPlaceholder: z.string().optional(),
    waitlistCta: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const perksSlot = z.object({
  variant: z.enum(["3-up", "4-up", "inline-bar"]),
  content: z.object({
    badge: sectionBadge,
    title: z.string().optional(),
    items: z.array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
        icon: remixIconId,
      }),
    ).min(1).max(4),
  }),
});

const featureItem = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: remixIconId,
  size: z.enum(["sm", "md", "lg"]).optional(),
});

const featuresSlot = z.object({
  variant: z.enum(["grid", "bento", "tabs"]),
  content: z.object({
    badge: sectionBadge,
    title: z.string().min(1),
    subtitle: z.string().optional(),
    items: z.array(featureItem).length(5),
    accents: z
      .object({
        marqueeLabel: z.string().optional(),
        marqueeIcon: remixIconId.optional(),
        ringsIcon: remixIconId.optional(),
      })
      .optional(),
  }),
});

const connectSlot = z.object({
  variant: z.literal("connect"),
  content: z.object({
    badge: sectionBadge,
    title: z.string().min(1),
    subtitle: z.string().optional(),
    hub: connectHub,
  }),
});

const comparisonSlot = z.object({
  variant: z.enum(["before-after", "us-them", "pain-solution"]),
  content: z.object({
    badge: sectionBadge,
    title: z.string().min(1),
    leftLabel: z.string().min(1),
    rightLabel: z.string().min(1),
    rows: z.array(z.object({ left: z.string(), right: z.string() })).min(1),
  }),
});

const faqSlot = z.object({
  variant: z.enum(["accordion", "two-col-accordion"]),
  content: z.object({
    badge: sectionBadge,
    title: z.string().min(1),
    items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
  }),
});

const ctaSlot = z.object({
  variant: z.enum(["banner", "card", "fullscreen"]),
  content: z.object({
    headline: z.string().min(1),
    subheadline: z.string().optional(),
    primaryCta: ctaLink,
    secondaryCta: ctaLink.optional(),
  }),
});

const footerSlot = z.object({
  variant: z.enum(["simple", "columns"]),
  content: z.object({
    productName: z.string().min(1),
    tagline: z.string().optional(),
    links: z.array(navLink).optional(),
    columns: z
      .array(
        z.object({
          title: z.string().min(1),
          links: z.array(navLink).min(1),
        }),
      )
      .optional(),
    copyright: z.string().min(1),
  }),
});

export const pageSpecSchema = z.object({
  version: z.literal(1),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  sections: z.object({
    perks: z.boolean().optional(),
    features: z.boolean().optional(),
    connect: z.boolean().optional(),
    comparison: z.boolean().optional(),
    faq: z.boolean().optional(),
  }),
  theme: resolvedTheme,
  slots: z.object({
    header: headerSlot,
    hero: heroSlot,
    perks: perksSlot.optional(),
    features: featuresSlot.optional(),
    connect: connectSlot.optional(),
    comparison: comparisonSlot.optional(),
    faq: faqSlot.optional(),
    cta: ctaSlot,
    footer: footerSlot,
  }),
});

export type PageSpecInput = z.input<typeof pageSpecSchema>;

export class PageSpecValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super(`Invalid page-spec.json:\n${issues.map((issue) => `  - ${issue}`).join("\n")}`);
    this.name = "PageSpecValidationError";
    this.issues = issues;
  }
}

/** Validate and normalize page-spec.json for rendering. */
export function parsePageSpec(input: unknown): PageSpec {
  const normalized = normalizePageSpecInput(input);
  const result = pageSpecSchema.safeParse(normalized);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "(root)";
      return `${path}: ${issue.message}`;
    });
    throw new PageSpecValidationError(issues);
  }

  const consistencyIssues = collectPageSpecConsistencyIssues(result.data as PageSpec);
  if (consistencyIssues.length > 0) {
    throw new PageSpecValidationError(consistencyIssues);
  }

  const copyStyleIssues = collectCopyStyleIssues(result.data as PageSpec);
  if (copyStyleIssues.length > 0) {
    throw new PageSpecValidationError(copyStyleIssues);
  }

  return result.data as PageSpec;
}

/** Default connect hub used in docs and as a reference for agents. */
export function defaultConnectHub() {
  return {
    centerIcon: "RiApps2Line" as const,
    nodes: DEFAULT_CONNECT_HUB_NODES,
  };
}
