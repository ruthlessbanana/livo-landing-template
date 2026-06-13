import type { RemixIconId } from "../schema/remix-icons";
import { resolveIcon } from "../schema/remix-icons";

type SectionBadgeProps = {
  label: string;
  icon: RemixIconId;
};

/** Luro-style section eyebrow badge with spec-driven Remix icon. */
export function SectionBadge({ label, icon }: SectionBadgeProps) {
  const Icon = resolveIcon(icon);

  return (
    <div className="inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--lp-primary)_20%,transparent)] px-4 py-1">
      <Icon size={14} className="shrink-0 text-[var(--lp-primary)]" aria-hidden />
      <div className="animate-background-shine bg-[linear-gradient(110deg,var(--lp-primary),45%,var(--lp-palette-7),55%,var(--lp-primary))] bg-[length:250%_100%] bg-clip-text text-sm font-medium text-transparent">
        {label}
      </div>
    </div>
  );
}
