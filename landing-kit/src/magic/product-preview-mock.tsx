import { cn } from "../lib/utils";
import { BorderBeam } from "./border-beam";

/** Product preview mock for split hero — structured like a design tool canvas. */
export function ProductPreviewMock({ label }: { label?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[540px] lp-animate-in">
      <div className="relative overflow-hidden rounded-[var(--lp-radius-lg)] p-[1px]">
        <BorderBeam colorFrom="var(--lp-accent)" colorTo="#7CC4FF" />
        <div className="relative overflow-hidden rounded-[calc(var(--lp-radius-lg)-1px)] border border-[var(--lp-surface-border)] bg-[var(--lp-surface)] shadow-[var(--lp-shadow-card)]">
          <div className="p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2 border-b border-[var(--lp-surface-border)] pb-3">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-xs text-[var(--lp-muted)]">{label ?? "Workspace preview"}</span>
            </div>
            <div className="grid grid-cols-[88px_1fr] gap-3">
              <div className="space-y-2 rounded-[var(--lp-radius-md)] bg-[color-mix(in_srgb,var(--lp-bg)_70%,transparent)] p-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={cn(
                      "h-8 rounded-[var(--lp-radius-sm)]",
                      item === 1
                        ? "bg-[color-mix(in_srgb,var(--lp-accent)_22%,transparent)]"
                        : "bg-[color-mix(in_srgb,var(--lp-surface-border)_55%,transparent)]",
                    )}
                  />
                ))}
              </div>
              <div className="space-y-3">
                <div className="h-28 rounded-[var(--lp-radius-md)] border border-[var(--lp-surface-border)] bg-[color-mix(in_srgb,var(--lp-bg)_55%,transparent)] p-3">
                  <div className="mb-2 h-2 w-24 rounded bg-[var(--lp-accent)]/70" />
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-[var(--lp-surface-border)]/80" />
                    <div className="h-2 w-[80%] rounded bg-[var(--lp-surface-border)]/60" />
                    <div className="h-2 w-[60%] rounded bg-[var(--lp-surface-border)]/40" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-[var(--lp-radius-md)] bg-[color-mix(in_srgb,var(--lp-primary)_12%,transparent)]" />
                  <div className="h-16 rounded-[var(--lp-radius-md)] bg-[color-mix(in_srgb,var(--lp-accent)_12%,transparent)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
