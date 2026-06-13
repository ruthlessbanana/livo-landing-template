import { Container } from "../primitives";
import { Particles } from "../ui/effects";
import type { FooterSlot, NavLink } from "../schema/types";

type FooterBlockProps = {
  slot: FooterSlot;
};

function flattenFooterLinks(
  links: NavLink[] | undefined,
  columns: FooterSlot["content"]["columns"],
): NavLink[] {
  if (links?.length) {
    return links;
  }

  return (columns ?? []).flatMap((section) => section.links);
}

/** Footer — `simple` is a single row; `columns` keeps the Luro multi-column layout. */
export function FooterBlock({ slot }: FooterBlockProps) {
  const { variant, content } = slot;

  if (variant === "simple") {
    const rowLinks = flattenFooterLinks(content.links, content.columns);

    return (
      <footer className="w-full border-t border-[color-mix(in_srgb,var(--lp-surface-border)_80%,transparent)] py-6">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--lp-primary)] text-xs font-bold text-[var(--lp-primary-fg)]">
                {content.productName.charAt(0)}
              </span>
              <span className="text-sm font-medium">{content.productName}</span>
            </div>

            {rowLinks.length ? (
              <nav
                aria-label="Footer"
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              >
                {rowLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[var(--lp-muted)] no-underline transition hover:text-[var(--lp-fg)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            ) : null}

            <p className="shrink-0 text-sm text-[color-mix(in_srgb,var(--lp-muted)_90%,transparent)]">
              {content.copyright}
            </p>
          </div>
        </Container>
      </footer>
    );
  }

  const columns =
    content.columns ??
    [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "FAQ", href: "#faq" },
        ],
      },
    ];

  return (
    <footer className="relative w-full py-10">
      <Container>
        <div className="lp-footer relative flex flex-col justify-between overflow-hidden pb-32 md:flex-row">
          <Particles className="absolute inset-0 -z-10 w-full" quantity={40} ease={10} color="#d4d4d8" refresh />

          <div className="flex max-w-xs flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--lp-primary)] text-xs font-bold text-[var(--lp-primary-fg)]">
                {content.productName.charAt(0)}
              </span>
              <span className="text-xl font-medium">{content.productName}</span>
            </div>
            {content.tagline ? (
              <p className="mt-4 max-w-xs text-base text-[var(--lp-muted)]">{content.tagline}</p>
            ) : null}
          </div>

          <div className="mt-10 grid w-full max-w-lg grid-cols-2 gap-8 md:mt-0 lg:grid-cols-4">
            {columns.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h4 className="text-sm font-medium">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={`${section.title}-${link.label}`}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--lp-muted)] no-underline transition hover:text-[var(--lp-fg)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col items-center justify-between gap-4 pt-10 md:flex-row">
          <p className="text-sm text-[color-mix(in_srgb,var(--lp-muted)_90%,transparent)]">{content.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
