"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

/** A slow, quiet fade as the photograph scrolls into view. */
export function ImageReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={`relative h-full w-full ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </m.div>
  );
}
