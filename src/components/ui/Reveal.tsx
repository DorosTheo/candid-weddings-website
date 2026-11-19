"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px */
  y?: number;
  as?: "div" | "section" | "li" | "p" | "span" | "figure" | "header";
};

/** Gentle fade-and-rise when the element scrolls into view (runs once). */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </Component>
  );
}

/**
 * Masked line-by-line text reveal for large editorial headings.
 * The (unclipped) wrapper is observed; each line slides up from behind its mask.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  inView = true,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** false = animate immediately on mount (above-the-fold heroes) */
  inView?: boolean;
}) {
  return (
    <m.span
      className={`block ${className ?? ""}`}
      initial="hidden"
      {...(inView ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } } : { animate: "show" })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <m.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1.25, ease, delay: delay + i * stagger } },
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
