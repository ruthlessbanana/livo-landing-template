import type { RemixiconComponentType } from "@remixicon/react";
import {
  RiApps2Line,
  RiArrowRightLine,
  RiArrowUpLine,
  RiAwardLine,
  RiBarChartGroupedLine,
  RiBookOpenLine,
  RiCloudLine,
  RiCodeSSlashLine,
  RiCustomerService2Line,
  RiDatabase2Line,
  RiFileTextLine,
  RiFlashlightLine,
  RiFlowChart,
  RiGlobalLine,
  RiHashtag,
  RiImageAddLine,
  RiInstagramFill,
  RiLinksLine,
  RiLockLine,
  RiMailLine,
  RiNotionLine,
  RiPaletteLine,
  RiPriceTag3Line,
  RiQuestionAnswerLine,
  RiRocketLine,
  RiScales3Line,
  RiShieldCheckLine,
  RiSlackFill,
  RiSparklingLine,
  RiSpotifyFill,
  RiTeamLine,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";

/** Curated Remix icons agents may reference in page-spec.json. */
export const REMIX_ICON_IDS = [
  "RiApps2Line",
  "RiArrowRightLine",
  "RiArrowUpLine",
  "RiAwardLine",
  "RiBarChartGroupedLine",
  "RiBookOpenLine",
  "RiCloudLine",
  "RiCodeSSlashLine",
  "RiCustomerService2Line",
  "RiDatabase2Line",
  "RiFileTextLine",
  "RiFlashlightLine",
  "RiFlowChart",
  "RiGlobalLine",
  "RiHashtag",
  "RiImageAddLine",
  "RiInstagramFill",
  "RiLinksLine",
  "RiLockLine",
  "RiMailLine",
  "RiNotionLine",
  "RiPaletteLine",
  "RiPriceTag3Line",
  "RiQuestionAnswerLine",
  "RiRocketLine",
  "RiScales3Line",
  "RiShieldCheckLine",
  "RiSlackFill",
  "RiSparklingLine",
  "RiSpotifyFill",
  "RiTeamLine",
  "RiTwitterXFill",
  "RiYoutubeFill",
] as const;

export type RemixIconId = (typeof REMIX_ICON_IDS)[number];

const ICON_MAP: Record<RemixIconId, RemixiconComponentType> = {
  RiApps2Line,
  RiArrowRightLine,
  RiArrowUpLine,
  RiAwardLine,
  RiBarChartGroupedLine,
  RiBookOpenLine,
  RiCloudLine,
  RiCodeSSlashLine,
  RiCustomerService2Line,
  RiDatabase2Line,
  RiFileTextLine,
  RiFlashlightLine,
  RiFlowChart,
  RiGlobalLine,
  RiHashtag,
  RiImageAddLine,
  RiInstagramFill,
  RiLinksLine,
  RiLockLine,
  RiMailLine,
  RiNotionLine,
  RiPaletteLine,
  RiPriceTag3Line,
  RiQuestionAnswerLine,
  RiRocketLine,
  RiScales3Line,
  RiShieldCheckLine,
  RiSlackFill,
  RiSparklingLine,
  RiSpotifyFill,
  RiTeamLine,
  RiTwitterXFill,
  RiYoutubeFill,
};

/** Legacy nav aliases from early page-spec drafts. */
export const NAV_ICON_ALIASES: Record<string, RemixIconId> = {
  features: "RiSparklingLine",
  "how-it-works": "RiFlowChart",
  connect: "RiLinksLine",
  perks: "RiAwardLine",
  faq: "RiQuestionAnswerLine",
  whitepaper: "RiFileTextLine",
  docs: "RiBookOpenLine",
};

export function isRemixIconId(value: string): value is RemixIconId {
  return (REMIX_ICON_IDS as readonly string[]).includes(value);
}

/** Resolve a spec icon id (or legacy nav alias) to a Remix component. */
export function resolveIcon(id: string, fallback: RemixIconId = "RiSparklingLine"): RemixiconComponentType {
  const normalized = NAV_ICON_ALIASES[id] ?? id;
  if (isRemixIconId(normalized)) {
    return ICON_MAP[normalized];
  }
  return ICON_MAP[fallback];
}

export function resolveIconId(id: string, fallback: RemixIconId = "RiSparklingLine"): RemixIconId {
  const normalized = NAV_ICON_ALIASES[id] ?? id;
  return isRemixIconId(normalized) ? normalized : fallback;
}

/** Map legacy icon aliases to allowlisted ids; null when the value is invalid. */
export function coerceRemixIconId(value: string): RemixIconId | null {
  const normalized = NAV_ICON_ALIASES[value] ?? value;
  return isRemixIconId(normalized) ? normalized : null;
}

/** Default connect-hub satellite layout (positions are fixed; icons come from spec). */
export const DEFAULT_CONNECT_HUB_NODES: Array<{
  id: string;
  icon: RemixIconId;
  x: number;
  y: number;
}> = [
  { id: "spotify", icon: "RiSpotifyFill", x: 20, y: 50 },
  { id: "twitter", icon: "RiTwitterXFill", x: 12, y: 32 },
  { id: "instagram", icon: "RiInstagramFill", x: 9, y: 70 },
  { id: "youtube", icon: "RiYoutubeFill", x: 88, y: 31 },
  { id: "notion", icon: "RiNotionLine", x: 88, y: 70 },
  { id: "slack", icon: "RiSlackFill", x: 80, y: 50 },
];
