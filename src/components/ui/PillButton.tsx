"use client";

import { AnchorHTMLAttributes, ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useMagnetic } from "./useMagnetic";

type PillButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> & {
  variant?: "solid" | "outline" | "ghost-dark";
  children: ReactNode;
  /** Custom-cursor label key (see CustomCursor's labelMap). Defaults to "go". */
  cursorLabel?: string;
};

/**
 * Black pill CTA / outlined pill used across nav, hero, and dark section.
 * Drifts a few pixels toward the cursor on hover (a subtle "magnetic" pull)
 * and snaps back on leave. Compose the arrow or icon directly into `children`
 * so call sites control whether it leads or trails the label.
 */
export default function PillButton({
  variant = "solid",
  children,
  className,
  cursorLabel = "go",
  ...props
}: PillButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const magnetic = useMagnetic(ref);

  return (
    <motion.a
      ref={ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      style={magnetic.style}
      className={clsx(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300",
        variant === "solid" && "bg-ink text-cream hover:bg-black-secondary",
        variant === "outline" &&
          "bg-cream text-ink border border-ink/25 hover:border-ink",
        variant === "ghost-dark" &&
          "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5",
        className
      )}
      data-cursor={cursorLabel}
      {...props}
    >
      {children}
    </motion.a>
  );
}
