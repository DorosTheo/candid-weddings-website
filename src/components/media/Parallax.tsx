"use client";

import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useRef, type ReactNode } from "react";

/**
 * Subtle vertical drift as the element passes through the viewport.
 * The child should be slightly taller than its frame (handled via `overscan`).
 */
export function Parallax({
  children,
  amount = 8,
  className = "",
}: {
  children: ReactNode;
  /** Travel as a percentage of the frame height */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Translate % is relative to the (taller) inner layer, so scale travel to stay within the overscan.
  const travel = (amount / (100 + 2 * amount)) * 100 * 0.98;
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className}`}>
      <m.div
        className="absolute inset-x-0 will-change-transform"
        style={{
          y: reduce ? 0 : y,
          top: `-${amount}%`,
          bottom: `-${amount}%`,
        }}
      >
        {children}
      </m.div>
    </div>
  );
}
