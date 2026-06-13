import { isSlotEnabled, type PageSpec } from "../schema/types";
import { themeToCssVars } from "../theme/apply-theme";
import { PAGE_STACK } from "../stack/page-stack";
import { SlotRenderer } from "./SlotRenderer";

type PageRendererProps = {
  spec: PageSpec;
};

export function PageRenderer({ spec }: PageRendererProps) {
  return (
    <div className="min-h-screen bg-[var(--lp-bg)] text-[var(--lp-fg)]" style={themeToCssVars(spec.theme)}>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--lp-radius-md)] focus:bg-[var(--lp-primary)] focus:px-4 focus:py-2 focus:text-[var(--lp-primary-fg)]"
      >
        Skip to content
      </a>
      <div className="relative py-8 md:py-12">
        {PAGE_STACK.map((entry) => {
          if (!isSlotEnabled(spec, entry.id)) return null;
          const payload = spec.slots[entry.id];
          if (!payload) return null;
          return <SlotRenderer key={entry.id} slotId={entry.id} payload={payload} />;
        })}
      </div>
    </div>
  );
}
