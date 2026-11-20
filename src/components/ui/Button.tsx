import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = ComponentProps<typeof Link>;

const primaryBase =
  "group relative inline-flex min-h-13 items-center justify-center overflow-hidden rounded-full px-10 py-4 eyebrow !tracking-[0.18em] transition-colors duration-500 ease-editorial focus-visible:outline-offset-4";

const primaryTones = {
  dark: "bg-black text-white",
  light: "bg-white text-ink",
};

/** Swaps the label upward on hover — quiet, tactile, premium. */
function PrimaryLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-editorial group-hover:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-editorial group-hover:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}

export function ButtonLink({
  children,
  tone = "dark",
  className = "",
  ...props
}: LinkProps & { tone?: keyof typeof primaryTones; children: ReactNode }) {
  return (
    <Link className={`${primaryBase} ${primaryTones[tone]} ${className}`} {...props}>
      <PrimaryLabel>{children}</PrimaryLabel>
    </Link>
  );
}

export function Button({
  children,
  tone = "dark",
  className = "",
  ...props
}: ComponentProps<"button"> & { tone?: keyof typeof primaryTones }) {
  return (
    <button
      className={`${primaryBase} ${primaryTones[tone]} disabled:cursor-wait disabled:opacity-60 ${className}`}
      {...props}
    >
      <PrimaryLabel>{children}</PrimaryLabel>
    </button>
  );
}

/** Secondary CTA: understated text link with an animated underline and arrow. */
export function TextLink({
  children,
  className = "",
  arrow = true,
  ...props
}: LinkProps & { children: ReactNode; arrow?: boolean }) {
  return (
    <Link className={`group inline-flex items-center gap-3 eyebrow ${className}`} {...props}>
      <span className="link-underline">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          strokeWidth={1.25}
          className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
        />
      )}
    </Link>
  );
}
