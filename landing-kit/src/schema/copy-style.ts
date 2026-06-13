import type { PageSpec } from "./types";

const EM_DASH = "\u2014";
const EN_DASH = "\u2013";
const HYPHEN_MINUS = "-";

const COPY_SKIP_KEYS = new Set([
  "$schema",
  "href",
  "icon",
  "variant",
  "id",
  "size",
  "x",
  "y",
  "style",
  "primary",
  "primaryForeground",
  "background",
  "foreground",
  "muted",
  "surface",
  "surfaceBorder",
  "accent",
  "display",
  "body",
  "sectionDesktop",
  "sectionMobile",
  "container",
  "card",
  "sm",
  "md",
  "lg",
]);

function isCopyContainerKey(key: string): boolean {
  return !COPY_SKIP_KEYS.has(key);
}

function findDashIssues(value: string, path: string): string[] {
  const issues: string[] = [];

  if (value.includes(EM_DASH)) {
    issues.push(`${path}: remove em dashes (—); use a period or comma instead`);
  }
  if (value.includes(EN_DASH)) {
    issues.push(`${path}: remove en dashes (–); use a period or comma instead`);
  }
  if (value.includes(HYPHEN_MINUS)) {
    issues.push(`${path}: remove hyphens (-); rewrite as separate words or a short sentence`);
  }

  return issues;
}

function walkCopy(value: unknown, path: string, issues: string[]): void {
  if (typeof value === "string") {
    issues.push(...findDashIssues(value, path));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkCopy(entry, `${path}[${index}]`, issues));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (!isCopyContainerKey(key)) continue;
    walkCopy(nested, path ? `${path}.${key}` : key, issues);
  }
}

/** Reject em dashes, en dashes, and hyphens in user-facing copy fields. */
export function collectCopyStyleIssues(spec: PageSpec): string[] {
  const issues: string[] = [];
  walkCopy(spec.meta, "meta", issues);
  walkCopy(spec.slots, "slots", issues);
  return issues;
}
