import type { RemixiconComponentType } from "@remixicon/react";
import type { ConnectHubSpec } from "../schema/types";
import { resolveIcon } from "../schema/remix-icons";

type ConnectHubVisualProps = {
  hub: ConnectHubSpec;
};

/** Integration hub — icons and layout driven by page-spec hub config. */
export function ConnectHubVisual({ hub }: ConnectHubVisualProps) {
  const center = { x: 50, y: 50 };
  const CenterIcon = resolveIcon(hub.centerIcon);

  return (
    <div className="relative aspect-[2225/1033] w-full min-h-[280px] overflow-hidden rounded-2xl md:min-h-[360px] lg:min-h-[420px]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in srgb, var(--lp-primary) 18%, transparent), transparent 70%)",
        }}
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {hub.nodes.map((node) => (
          <line
            key={node.id}
            x1={center.x}
            y1={center.y}
            x2={node.x}
            y2={node.y}
            stroke="var(--lp-primary)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {hub.nodes.map((node) => (
          <circle
            key={`${node.id}-dot`}
            cx={node.x}
            cy={node.y}
            r="0.6"
            fill="color-mix(in srgb, var(--lp-primary) 70%, white)"
            opacity="0.8"
          />
        ))}
      </svg>

      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${center.x}%`, top: `${center.y}%` }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border-2 border-[color-mix(in_srgb,var(--lp-primary)_50%,transparent)] bg-[var(--lp-bg)] shadow-[0_0_40px_color-mix(in_srgb,var(--lp-primary)_35%,transparent)] md:h-20 md:w-20 md:rounded-[1.5rem]">
          <div className="flex h-12 w-12 items-center justify-center rounded-[2rem] bg-[var(--lp-primary)] md:h-14 md:w-14 md:rounded-[2.5rem]">
            <CenterIcon className="text-white" size={28} aria-hidden />
          </div>
        </div>
      </div>

      {hub.nodes.map((node) => {
        const Icon = resolveIcon(node.icon);
        return (
          <div
            key={node.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--lp-primary)_35%,transparent)] bg-[var(--lp-bg)] md:h-[4.75rem] md:w-[4.75rem]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--lp-primary)_25%,transparent)] bg-[color-mix(in_srgb,var(--lp-primary)_15%,var(--lp-bg))] md:h-12 md:w-12">
                <Icon className="text-[var(--lp-fg)]" size={22} aria-hidden />
              </div>
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        {[18, 34, 50, 66, 82].map((left) => (
          <div
            key={`top-${left}`}
            className="absolute h-6 w-3 rounded-md border border-[color-mix(in_srgb,var(--lp-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--lp-primary)_20%,transparent)]"
            style={{ left: `${left}%`, top: "36%" }}
          />
        ))}
        {[18, 34, 50, 66, 82].map((left) => (
          <div
            key={`bottom-${left}`}
            className="absolute h-6 w-3 rounded-md border border-[color-mix(in_srgb,var(--lp-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--lp-primary)_20%,transparent)]"
            style={{ left: `${left}%`, top: "60%" }}
          />
        ))}
      </div>
    </div>
  );
}
