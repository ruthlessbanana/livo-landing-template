/** Anchor ids and render order for every landing page. */
export const PAGE_STACK = [
  { id: "header", required: true, toggleable: false },
  { id: "hero", required: true, toggleable: false },
  { id: "perks", required: false, toggleable: true },
  { id: "features", required: false, toggleable: true },
  { id: "connect", required: false, toggleable: true },
  { id: "comparison", required: false, toggleable: true },
  { id: "faq", required: false, toggleable: true },
  { id: "cta", required: true, toggleable: false },
  { id: "footer", required: true, toggleable: false },
] as const;

export type SlotId = (typeof PAGE_STACK)[number]["id"];

export type SectionToggles = Partial<
  Record<Exclude<SlotId, "header" | "hero" | "cta" | "footer">, boolean>
>;
