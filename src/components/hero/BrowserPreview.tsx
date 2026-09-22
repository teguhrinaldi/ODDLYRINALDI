"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { templates, type Template } from "@/data/templates";

type ShowcaseTemplate = Template & { heroVideo: string };

const showcaseTemplates = templates.filter(
  (t): t is ShowcaseTemplate => typeof t.heroVideo === "string"
);

/**
 * The floating "physical object" preview in the hero — a tactile browser
 * mockup that takes turns playing each template's looping hero mp4 (see
 * `heroVideo` in src/data/templates.ts), with the cat hiding behind it,
 * peeking over the top edge. Hovering the object makes the cat duck down
 * shyly; moving away, it peeks back out.
 */
const catVariants: Variants = {
  hidden: { y: "12%", opacity: 0 },
  // Paws resting right on the browser's top edge — confirmed against the
  // actual rendered page, not just the source art's transparent bounds.
  peek: {
    y: "-75%",
    opacity: 1,
    transition: { delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
  duck: {
    y: "-61%",
    opacity: 1,
    transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
  },
};

export default function BrowserPreview() {
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // Matches the typical screen-recording ratio of the hero videos, so the
  // frame doesn't jump on first paint before metadata loads.
  const [videoRatio, setVideoRatio] = useState(1908 / 910);

  const { scrollY } = useScroll();
  const floatY = useTransform(scrollY, [0, 700], [0, -26]);

  const active = showcaseTemplates[activeIndex];
  const canCycle = showcaseTemplates.length > 1 && !reduce;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[580px]"
      style={reduce ? undefined : { y: floatY }}
      onMouseEnter={() => setNear(true)}
      onMouseLeave={() => setNear(false)}
      data-cursor="hello"
    >
      {/* psst... annotation + arrow pointing at the cat */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pointer-events-none absolute -left-8 -top-16 z-30 flex items-start gap-1 text-ink sm:-left-12 sm:-top-20"
      >
        <HandwrittenPsst />
      </motion.div>

      {/* tiny confirmation note tucked under the browser's bottom-right corner */}
      <motion.span
        initial={reduce ? undefined : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="pointer-events-none absolute -bottom-8 right-4 z-30 hidden -rotate-2 whitespace-nowrap font-hand text-lg text-ink/60 sm:block"
      >
        yes, that cat.
      </motion.span>

      {/* the cat, hiding behind the browser and peeking over its top edge */}
      <motion.div
        className="absolute left-1/2 top-0 z-20 w-[175px] -translate-x-1/2 sm:w-[215px] lg:w-[235px]"
        variants={catVariants}
        initial={reduce ? "peek" : "hidden"}
        animate={near ? "duck" : "peek"}
      >
        <div className={reduce ? undefined : "animate-float"}>
          <Image
            src="/characters/cat-peek.png"
            alt="A curious black cat hiding behind the browser preview, peeking over the top edge"
            width={1199}
            height={672}
            priority
            className="w-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.18)]"
          />
        </div>
      </motion.div>

      {/* the browser frame itself */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: near ? -0.5 : -2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <div className={reduce ? undefined : "animate-float"}>
          <div
            data-cursor-surface="dark"
            className="overflow-hidden rounded-2xl border border-ink/10 bg-[#1c1815] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-2 border-b border-white/5 bg-[#141110] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div
              className="relative w-full overflow-hidden bg-gradient-to-br from-[#2a2320] via-[#1c1815] to-[#0f0d0c] transition-[aspect-ratio] duration-500 ease-out"
              style={{ aspectRatio: videoRatio }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <video
                    src={active.heroVideo}
                    poster={active.heroPoster}
                    autoPlay
                    muted
                    playsInline
                    loop={!canCycle}
                    onEnded={
                      canCycle
                        ? () => setActiveIndex((i) => (i + 1) % showcaseTemplates.length)
                        : undefined
                    }
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      if (v.videoWidth && v.videoHeight) {
                        setVideoRatio(v.videoWidth / v.videoHeight);
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HandwrittenPsst() {
  return (
    <div className="relative">
      <span className="font-hand text-2xl text-ink/80 sm:text-3xl">psst...</span>
      {/* Swoops down and to the right, tip pointing straight at the cat below. */}
      <Image
        src="/doodles/psst-arrow.png"
        alt=""
        width={443}
        height={459}
        className="pointer-events-none absolute -right-16 top-2 w-16 opacity-80 sm:-right-20 sm:top-3 sm:w-20"
      />
    </div>
  );
}
