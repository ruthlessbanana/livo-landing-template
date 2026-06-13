import type { PageSpec } from "./types";

const LEGACY_SECTION_KEYS: Record<string, keyof PageSpec["sections"]> = {
  metrics: "perks",
  explainer: "connect",
};

const LEGACY_SLOT_KEYS: Record<string, string> = {
  metrics: "perks",
  explainer: "connect",
};

const LEGACY_ANCHOR_REPLACEMENTS: Record<string, string> = {
  "#metrics": "#perks",
  "#explainer": "#connect",
  "#pricing": "#faq",
};

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function rewriteHref(href: unknown): unknown {
  if (typeof href !== "string") return href;
  return LEGACY_ANCHOR_REPLACEMENTS[href] ?? href;
}

function normalizeLinkCollection(links: unknown): void {
  if (!Array.isArray(links)) return;
  for (const link of links) {
    if (!isRecord(link)) continue;
    if ("href" in link) link.href = rewriteHref(link.href);
  }
}

function normalizeHeaderFooterLinks(slots: JsonRecord): void {
  for (const slotId of ["header", "footer"]) {
    const slot = slots[slotId];
    if (!isRecord(slot) || !isRecord(slot.content)) continue;
    const content = slot.content;
    normalizeLinkCollection(content.navLinks);
    normalizeLinkCollection(content.links);
    if (isRecord(content.primaryCta) && "href" in content.primaryCta) {
      content.primaryCta.href = rewriteHref(content.primaryCta.href);
    }
    if (isRecord(content.secondaryCta) && "href" in content.secondaryCta) {
      content.secondaryCta.href = rewriteHref(content.secondaryCta.href);
    }
  }
}

function migrateLegacySections(sections: JsonRecord): void {
  for (const [legacyKey, nextKey] of Object.entries(LEGACY_SECTION_KEYS)) {
    if (!(legacyKey in sections) || nextKey in sections) continue;
    sections[nextKey] = sections[legacyKey];
    delete sections[legacyKey];
  }
  delete sections.pricing;
}

function migrateLegacySlots(slots: JsonRecord): void {
  for (const [legacyKey, nextKey] of Object.entries(LEGACY_SLOT_KEYS)) {
    if (!(legacyKey in slots) || nextKey in slots) continue;
    slots[nextKey] = slots[legacyKey];
    delete slots[legacyKey];
  }
  delete slots.pricing;
}

/** Infer section toggles when agents provide slot content but forget the flag. */
function inferSectionToggles(sections: JsonRecord, slots: JsonRecord): void {
  for (const slotId of ["perks", "features", "connect", "comparison", "faq"] as const) {
    if (sections[slotId] === undefined && slotId in slots) {
      sections[slotId] = true;
    }
  }
}

/**
 * Normalize agent-authored page-spec input before schema validation.
 * Migrates legacy ids, rewrites old anchors, and infers missing section toggles.
 */
export function normalizePageSpecInput(input: unknown): unknown {
  if (!isRecord(input)) return input;

  const normalized: JsonRecord = structuredClone(input);

  if (isRecord(normalized.sections)) {
    migrateLegacySections(normalized.sections);
  } else {
    normalized.sections = {};
  }

  if (isRecord(normalized.slots)) {
    migrateLegacySlots(normalized.slots);
    normalizeHeaderFooterLinks(normalized.slots);
    inferSectionToggles(normalized.sections as JsonRecord, normalized.slots);
  }

  return normalized;
}

const OPTIONAL_SECTIONS = ["perks", "features", "connect", "comparison", "faq"] as const;

/** Cross-field checks after Zod parsing — catches incomplete agent output early. */
export function collectPageSpecConsistencyIssues(spec: PageSpec): string[] {
  const issues: string[] = [];

  for (const slotId of OPTIONAL_SECTIONS) {
    const enabled = spec.sections[slotId] === true;
    const hasSlot = spec.slots[slotId] != null;

    if (enabled && !hasSlot) {
      issues.push(`sections.${slotId} is true but slots.${slotId} is missing`);
    }
  }

  return issues;
}
