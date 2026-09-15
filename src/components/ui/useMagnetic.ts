"use client";

import { type MouseEvent, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const PULL = 0.28;
const MAX = 10;

/**
 * Shared "magnetic" hover behavior for premium CTAs — the element drifts a
 * few pixels toward the cursor and springs back on leave. Works on any
 * motion.* element (a, button, div, ...). Pass in a ref you created locally
 * with `useRef` — returning a ref from a hook trips the refs-during-render
 * lint rule, so ownership stays with the calling component.
 */
export function useMagnetic<T extends HTMLElement>(elementRef: RefObject<T | null>) {
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 18, mass: 0.4 });

  const onMouseMove = (e: MouseEvent<T>) => {
    if (reduce || !elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX, Math.min(MAX, relX * PULL)));
    y.set(Math.max(-MAX, Math.min(MAX, relY * PULL)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    onMouseMove,
    onMouseLeave,
    style: reduce ? undefined : { x: springX, y: springY },
  };
}
