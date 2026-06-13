import { ProductPreviewMock } from "../magic/product-preview-mock";

/** Luro-style framed product preview beneath the hero. */
export function HeroProductFrame() {
  return (
    <div className="relative mx-auto mt-12 max-w-7xl rounded-xl border border-[color-mix(in_srgb,var(--lp-muted)_35%,transparent)] bg-[color-mix(in_srgb,var(--lp-surface)_50%,transparent)] p-2 backdrop-blur-lg lg:rounded-[32px] md:p-4">
      <div className="lp-hero-gradient pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-1/4 w-3/4 -translate-x-1/2 -translate-y-1/2 blur-[10rem]" />
      <div className="rounded-lg border border-[var(--lp-surface-border)] bg-black p-2 lg:rounded-[24px]">
        <ProductPreviewMock label="Dashboard preview" />
      </div>
    </div>
  );
}
