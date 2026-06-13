import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/utils";

import type { SectionBadgeContent } from "../schema/types";
import { SectionBadge } from "../ui/section-badge";



export function Container({ children, className }: { children: ReactNode; className?: string }) {

  return (

    <div className={cn("container mx-auto w-full max-w-[var(--lp-container)] px-4 md:px-8", className)}>

      {children}

    </div>

  );

}



export function Section({

  id,

  children,

  className,

}: {

  id?: string;

  children: ReactNode;

  className?: string;

}) {

  return (

    <section

      id={id}

      className={cn("scroll-mt-28 overflow-x-clip py-12 md:py-16 lg:py-24", className)}

    >

      {children}

    </section>

  );

}



const buttonStyles = {

  primary: "lp-btn-primary",

  white: "lp-btn-white",

  tertiary: "lp-btn-tertiary",

  secondary: "lp-btn-secondary",

  outline: "lp-btn-outline",

  ghost: "border-transparent bg-transparent text-[color-mix(in_srgb,var(--lp-muted)_85%,transparent)] hover:text-[var(--lp-fg)]",

} as const;



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {

  variant?: keyof typeof buttonStyles;

  asChild?: false;

  size?: "xs" | "default" | "sm" | "lg";

};



type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {

  variant?: keyof typeof buttonStyles;

  asChild: true;

  size?: "xs" | "default" | "sm" | "lg";

};



export function Button(props: ButtonProps | ButtonLinkProps) {

  const variant = props.variant ?? "primary";

  const size = props.size ?? "default";

  const className = cn(

    "inline-flex transform-gpu select-none items-center justify-center gap-2 rounded-[var(--lp-radius-md)] text-sm font-medium transition duration-300 ease-in-out focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50",

    size === "xs"
      ? "h-7 px-2.5 text-xs"
      : size === "sm"
        ? "h-8 px-3"
        : size === "lg"
          ? "h-10 px-8"
          : "h-9 px-4",

    buttonStyles[variant],

    props.className,

  );



  if ("asChild" in props && props.asChild) {

    const { asChild: _a, variant: _v, size: _s, children, ...rest } = props;

    return (

      <a {...rest} className={className}>

        {children}

      </a>

    );

  }



  const { variant: _v, size: _s, ...rest } = props as ButtonProps;

  return <button type="button" {...rest} className={className} />;

}



export function DisplayHeading({

  as: Tag = "h2",

  children,

  className,

  hero = false,

}: {

  as?: "h1" | "h2" | "h3";

  children: ReactNode;

  className?: string;

  hero?: boolean;

}) {

  return (

    <Tag

      className={cn(

        "lp-heading font-[family-name:var(--lp-font-display)] font-medium !leading-snug tracking-[-0.0125em]",

        hero

          ? "text-center text-3xl sm:text-5xl lg:text-6xl xl:text-7xl"

          : "text-center text-2xl md:text-4xl lg:text-5xl",

        className,

      )}

    >

      {children}

    </Tag>

  );

}



/** Section title with inline accent on the last word; stays one row when it fits. */
export function SectionTitle({

  as: Tag = "h2",

  title,

  className,

  hero = false,

  preferSingleLine,

}: {

  as?: "h1" | "h2" | "h3";

  title: string;

  className?: string;

  hero?: boolean;

  preferSingleLine?: boolean;

}) {

  const lastSpace = title.lastIndexOf(" ");

  const lead = lastSpace === -1 ? title : title.slice(0, lastSpace);

  const accent = lastSpace === -1 ? "" : title.slice(lastSpace + 1);

  const singleLine = preferSingleLine ?? title.length <= 42;

  return (

    <Tag

      className={cn(

        "font-[family-name:var(--lp-font-display)] font-medium !leading-snug tracking-[-0.0125em]",

        hero

          ? "text-center text-3xl sm:text-5xl lg:text-6xl xl:text-7xl"

          : "text-center text-2xl md:text-4xl lg:text-5xl",

        singleLine && "text-balance sm:whitespace-nowrap",

        className,

      )}

    >

      <span className="lp-heading">{lead}</span>

      {accent ? (

        <>

          {" "}

          <span className="text-[color-mix(in_srgb,var(--lp-fg)_58%,transparent)]">{accent}</span>

        </>

      ) : null}

    </Tag>

  );

}



export function Text({

  children,

  muted = false,

  className,

}: {

  children: ReactNode;

  muted?: boolean;

  className?: string;

}) {

  return (

    <p className={cn(muted ? "lp-muted-text text-sm sm:text-base lg:text-lg" : "text-[var(--lp-fg)]", className)}>

      {children}

    </p>

  );

}



export function SectionHeader({

  title,

  subtitle,

  badge,

}: {

  title: ReactNode;

  subtitle?: string;

  badge: SectionBadgeContent;

}) {

  return (

    <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center lg:mb-16">

      <SectionBadge label={badge.label} icon={badge.icon} />

      {typeof title === "string" ? (

        <SectionTitle as="h2" className="mt-6" title={title} />

      ) : (

        <DisplayHeading as="h2" className="mt-6">

          {title}

        </DisplayHeading>

      )}

      {subtitle ? <Text muted className="mt-6 max-w-xl">{subtitle}</Text> : null}

    </div>

  );

}



export { SectionBadge };


