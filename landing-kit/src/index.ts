export { PAGE_STACK, type SlotId, type SectionToggles } from "./stack/page-stack";
export {
  type PageSpec,
  type ResolvedTheme,
  type CtaLink,
  type NavLink,
  type SectionBadgeContent,
  type RemixIconId,
  type ConnectHubSpec,
  isSlotEnabled,
} from "./schema/types";
export { REMIX_ICON_IDS, DEFAULT_CONNECT_HUB_NODES } from "./schema/remix-icons";
export {
  pageSpecSchema,
  parsePageSpec,
  PageSpecValidationError,
  defaultConnectHub,
} from "./schema/page-spec.schema";
export { resolveIcon, resolveIconId, isRemixIconId } from "./schema/remix-icons";
export { themeToCssVars, STARTER_BLUE_PALETTE } from "./theme/apply-theme";
export { PageRenderer } from "./renderer/PageRenderer";
