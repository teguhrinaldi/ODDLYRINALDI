"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { INTRO_SEEN_KEY } from "@/data/intro";

const WORD = "ODDLYRINALDI";
const HOLD_MS = 2100;
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

type Phase = "show" | "open" | "done";

/**
 * Opening sequence on the first visit of a session: a dark stage with a
 * "Welcome to ODDLYRINALDI" title, then the two halves slide apart like a
 * curtain to reveal the page. Click, tap, or any key skips it.
 */
export default function IntroCurtain() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const html = document.documentElement;
    // Already played this session: the CSS rule in globals.css keeps it hidden.
    if (html.dataset.introSeen !== undefined) return;
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage blocked (private mode etc.) — the intro just plays again next time.
    }
    html.style.overflow = "hidden";
    const skip = () => setPhase((p) => (p === "show" ? "open" : p));
    const timer = window.setTimeout(skip, reduce ? 900 : HOLD_MS);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      html.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  const open = phase === "open";
  const curtain = reduce
    ? { duration: 0.5 }
    : { duration: 1.1, ease: EASE_CURTAIN, delay: 0.15 };
  const finish = () => {
    if (open) setPhase("done");
  };

  return (
    <div
      className="intro-curtain fixed inset-0 z-90"
      onClick={() => setPhase((p) => (p === "show" ? "open" : p))}
      aria-hidden={open}
    >
      {/* Curtain halves */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          className={`absolute top-0 h-full w-[calc(50%+1px)] bg-black-deep ${
            side === "left" ? "left-0" : "right-0"
          }`}
          initial={false}
          animate={
            reduce
              ? { opacity: open ? 0 : 1 }
              : { x: open ? (side === "left" ? "-101%" : "101%") : "0%" }
          }
          transition={curtain}
          onAnimationComplete={side === "left" ? finish : undefined}
        />
      ))}

      {/* Title */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        animate={open ? { opacity: 0, y: -24, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <motion.p
          className="font-hand text-3xl text-coral sm:text-4xl"
          initial={{ opacity: 0, y: 12, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Welcome to
        </motion.p>

        <h2 className="mt-1 flex overflow-hidden font-display text-5xl font-extrabold tracking-tight text-cream sm:text-7xl lg:text-8xl">
          {WORD.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? { opacity: 0 } : { y: "110%" }}
              animate={reduce ? { opacity: 1 } : { y: "0%" }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </h2>

        <motion.div
          className="mt-5 h-0.75 w-28 origin-left rounded-full bg-yellow sm:w-36"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        />

        <motion.p
          className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-cream/60 sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Websites that refuse to sit still
        </motion.p>
      </motion.div>

      <motion.p
        className="absolute bottom-8 left-0 right-0 text-center text-[11px] uppercase tracking-[0.25em] text-cream/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4, delay: open ? 0 : 1.4 }}
      >
        Click anywhere to enter
      </motion.p>
    </div>
  );
}
