"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribeMediaQuery(query: string, callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** Tracks a media query via the browser as the external source of truth. */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => subscribeMediaQuery(query, callback),
    () => window.matchMedia(query).matches,
    () => false
  );
}

const labelMap: Record<string, string> = {
  view: "VIEW",
  go: "LET'S GO",
  hello: "HELLO",
  explore: "EXPLORE",
  buy: "BUY",
  about: "ABOUT",
  read: "READ",
};

/**
 * Subtle custom cursor: a small dot that expands into a labelled pill when
 * hovering elements tagged with `data-cursor="view" | "go" | "hello"`.
 * Disabled entirely on touch devices and when the user prefers reduced motion.
 */
export default function CustomCursor() {
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = isFinePointer && !prefersReducedMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const surface = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest<HTMLElement>("[data-cursor-surface]")
        ?.dataset.cursorSurface;
      setOnDark(surface === "dark");
    };
    const leave = () => setVisible(false);
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.<HTMLElement>("[data-cursor]");
      const key = target?.dataset.cursor;
      setLabel(key ? labelMap[key] ?? null : null);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className={
        "pointer-events-none fixed left-0 top-0 z-100 flex items-center justify-center rounded-full transition-colors duration-300 " +
        (onDark ? "bg-cream text-ink" : "bg-ink text-cream")
      }
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: label ? "auto" : 8,
        height: label ? 32 : 8,
        paddingInline: label ? 14 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      aria-hidden="true"
    >
      {label && (
        <span className="whitespace-nowrap text-[11px] font-semibold tracking-wide">
          {label}
        </span>
      )}
    </motion.div>
  );
}
