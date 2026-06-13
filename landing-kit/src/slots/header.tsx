"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { RiCloseLine, RiMenuLine } from "../lib/icons";
import { resolveIcon } from "../schema/remix-icons";
import { cn } from "../lib/utils";
import { Button } from "../primitives";
import type { CtaLink, HeaderSlot, NavLink } from "../schema/types";

type HeaderBlockProps = {
  slot: HeaderSlot;
};

function NavItem({
  link,
  onClick,
  mobile = false,
}: {
  link: NavLink;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const Icon = resolveIcon(link.icon);

  return (
    <a
      href={link.href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 no-underline transition",
        mobile
          ? "w-full rounded-md px-4 py-3 text-lg text-[var(--lp-fg)] hover:bg-[color-mix(in_srgb,var(--lp-fg)_6%,transparent)]"
          : "px-3 text-sm text-[color-mix(in_srgb,var(--lp-fg)_80%,transparent)] hover:text-[var(--lp-fg)]",
      )}
    >
      <Icon size={mobile ? 18 : 16} aria-hidden className="shrink-0 opacity-80" />
      <span>{link.label}</span>
    </a>
  );
}

function CtaButtonContent({ cta, fallbackIcon }: { cta: CtaLink; fallbackIcon: string }) {
  const Icon = resolveIcon(cta.icon ?? fallbackIcon);
  return (
    <>
      <Icon size={14} aria-hidden />
      {cta.label}
    </>
  );
}

/** Header Whitepaper/Docs — always open the configured URL in a new tab. */
const headerExternalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Luro-style fixed glass navbar with opaque full-screen mobile menu. */
export function HeaderBlock({ slot }: HeaderBlockProps) {
  const { content } = slot;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) {
        setIsOpen(false);
      }
    };

    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className="relative w-full">
      {!isOpen ? (
        <div className="lp-nav-mask pointer-events-none fixed inset-x-0 z-[99] h-[88px]" aria-hidden />
      ) : null}

      <header
        className={cn(
          "fixed z-[100]",
          isOpen
            ? "inset-0 lg:inset-x-0 lg:top-4 lg:bottom-auto lg:mx-auto lg:h-12 lg:max-w-6xl lg:px-12"
            : "inset-x-0 top-4 mx-auto h-12 max-w-6xl px-2 md:px-12",
        )}
      >
        <div
          className={cn(
            "lp-nav-shell relative flex h-full flex-col",
            isOpen
              ? "lp-nav-shell-mobile-open min-h-dvh lg:min-h-0 lg:flex-row lg:items-center lg:px-3"
              : "h-12 flex-row items-center px-2 md:px-3",
          )}
        >
          <div className="flex h-12 w-full shrink-0 items-center justify-between">
            <div className="flex h-full items-center pl-1">
              <a
                href="#"
                className="flex items-center text-lg font-semibold leading-none text-[var(--lp-fg)] no-underline"
              >
                {content.productName}
              </a>
            </div>

            <nav
              className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center lg:flex"
              aria-label="Primary"
            >
              {content.navLinks.map((link) => (
                <NavItem key={link.href} link={link} />
              ))}
            </nav>

            <div className="flex h-full items-center gap-2 lg:gap-3">
              <Button
                asChild
                variant="tertiary"
                size="xs"
                href={content.primaryCta.href}
                className="hidden sm:inline-flex"
                {...headerExternalLinkProps}
              >
                <CtaButtonContent cta={content.primaryCta} fallbackIcon="RiFileTextLine" />
              </Button>
              <Button
                asChild
                variant="white"
                size="xs"
                href={content.secondaryCta.href}
                className="hidden sm:inline-flex"
                {...headerExternalLinkProps}
              >
                <CtaButtonContent cta={content.secondaryCta} fallbackIcon="RiBookOpenLine" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-2 lg:hidden"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <RiCloseLine size={16} /> : <RiMenuLine size={14} />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.nav
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ type: "spring", bounce: 0.12, duration: 0.35 }}
                aria-label="Mobile"
                className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-3 pb-8 pt-4 lg:hidden"
              >
                <ul className="flex w-full flex-col items-start gap-1">
                  {content.navLinks.map((link) => (
                    <li key={link.href} className="w-full">
                      <NavItem link={link} mobile onClick={() => setIsOpen(false)} />
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--lp-surface-border)_80%,transparent)] pt-6">
                  <Button
                    asChild
                    variant="tertiary"
                    size="sm"
                    href={content.primaryCta.href}
                    className="w-full"
                    {...headerExternalLinkProps}
                  >
                    <CtaButtonContent cta={content.primaryCta} fallbackIcon="RiFileTextLine" />
                  </Button>
                  <Button
                    asChild
                    variant="white"
                    size="sm"
                    href={content.secondaryCta.href}
                    className="w-full"
                    {...headerExternalLinkProps}
                  >
                    <CtaButtonContent cta={content.secondaryCta} fallbackIcon="RiBookOpenLine" />
                  </Button>
                </div>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      <div className="h-20" aria-hidden />
    </div>
  );
}
