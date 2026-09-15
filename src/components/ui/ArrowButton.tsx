"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ArrowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  diagonal?: boolean;
};

/** Small circular outlined arrow button used on cards, carousels, and lists. */
export default function ArrowButton({
  variant = "light",
  size = "md",
  diagonal = false,
  className,
  ...props
}: ArrowButtonProps) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return (
    <button
      type="button"
      className={clsx(
        "group inline-flex items-center justify-center rounded-full border transition-all duration-300",
        size === "md" ? "h-11 w-11" : "h-9 w-9",
        variant === "light"
          ? "border-ink/20 bg-cream text-ink hover:bg-ink hover:border-ink"
          : "border-white/25 bg-transparent text-white hover:bg-white hover:border-white",
        className
      )}
      {...props}
    >
      <Icon
        className={clsx(
          "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          variant === "light" ? "group-hover:text-cream" : "group-hover:text-ink",
          size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"
        )}
      />
    </button>
  );
}
