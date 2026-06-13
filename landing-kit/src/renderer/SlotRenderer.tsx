import type {
  ComparisonSlot,
  ConnectSlot,
  CtaSlot,
  FaqSlot,
  FeaturesSlot,
  FooterSlot,
  HeaderSlot,
  HeroSlot,
  PerksSlot,
  SlotPayload,
} from "../schema/types";
import type { SlotId } from "../stack/page-stack";
import { ComparisonBlock } from "../slots/comparison";
import { ConnectBlock } from "../slots/connect";
import { CtaBlock } from "../slots/cta";
import { FaqBlock } from "../slots/faq";
import { FeaturesBlock } from "../slots/features";
import { FooterBlock } from "../slots/footer";
import { HeaderBlock } from "../slots/header";
import { HeroBlock } from "../slots/hero";
import { PerksBlock } from "../slots/perks";

type SlotRendererProps = {
  slotId: SlotId;
  payload: SlotPayload;
};

export function SlotRenderer({ slotId, payload }: SlotRendererProps) {
  switch (slotId) {
    case "header":
      return <HeaderBlock slot={payload as HeaderSlot} />;
    case "hero":
      return <HeroBlock slot={payload as HeroSlot} />;
    case "perks":
      return <PerksBlock slot={payload as PerksSlot} />;
    case "features":
      return <FeaturesBlock slot={payload as FeaturesSlot} />;
    case "connect":
      return <ConnectBlock slot={payload as ConnectSlot} />;
    case "comparison":
      return <ComparisonBlock slot={payload as ComparisonSlot} />;
    case "faq":
      return <FaqBlock slot={payload as FaqSlot} />;
    case "cta":
      return <CtaBlock slot={payload as CtaSlot} />;
    case "footer":
      return <FooterBlock slot={payload as FooterSlot} />;
    default:
      return null;
  }
}
