import type { CSSProperties } from "react";
import type { ResolvedTheme } from "../schema/types";

/** Default starter palette — single-hue blue scale. */
export const STARTER_BLUE_PALETTE = [
  "#03045e",
  "#023e8a",
  "#0077b6",
  "#0096c7",
  "#00b4d8",
  "#48cae4",
  "#90e0ef",
  "#ade8f4",
  "#caf0f8",
] as const;

/** Map resolved theme tokens from page-spec.json to CSS custom properties. */
export function themeToCssVars(theme: ResolvedTheme): CSSProperties {
  const { colors, radius, typography, spacing, shadow } = theme;
  const palette = theme.palette?.length === 9 ? theme.palette : [...STARTER_BLUE_PALETTE];

  const vars: Record<string, string> = {
    "--lp-primary": colors.primary,
    "--lp-primary-fg": colors.primaryForeground,
    "--lp-bg": colors.background,
    "--lp-fg": colors.foreground,
    "--lp-muted": colors.muted,
    "--lp-surface": colors.surface,
    "--lp-surface-border": colors.surfaceBorder,
    "--lp-accent": colors.accent,
    "--lp-radius-sm": `${radius.sm}px`,
    "--lp-radius-md": `${radius.md}px`,
    "--lp-radius-lg": `${radius.lg}px`,
    "--lp-font-display": typography.display,
    "--lp-font-body": typography.body,
    "--lp-section-y": spacing.sectionDesktop,
    "--lp-section-y-mobile": spacing.sectionMobile,
    "--lp-container": spacing.container,
    "--lp-shadow-card": shadow.card,
  };

  palette.forEach((stop, index) => {
    vars[`--lp-palette-${index}`] = stop;
  });

  return vars as CSSProperties;
}
