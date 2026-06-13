import type { RemixiconComponentType } from "@remixicon/react";
import { RiAddLine, RiArrowRightLine, RiCloseLine, RiMenuLine } from "@remixicon/react";
import type { RemixIconId } from "../schema/remix-icons";
import { resolveIcon } from "../schema/remix-icons";

export type { RemixIconId };
export { REMIX_ICON_IDS, resolveIcon, resolveIconId, isRemixIconId } from "../schema/remix-icons";

/** @deprecated Use resolveIcon with RemixIconId from page-spec. */
export type NavIconId = "features" | "how-it-works" | "faq" | "whitepaper" | "docs";

/** @deprecated Use resolveIcon(id) — accepts RemixIconId or legacy nav aliases. */
export function navIcon(id: string): RemixiconComponentType {
  return resolveIcon(id);
}

export function itemIcon(id: RemixIconId): RemixiconComponentType {
  return resolveIcon(id);
}

export {
  RiAddLine,
  RiArrowRightLine,
  RiCloseLine,
  RiMenuLine,
};
