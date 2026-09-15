"use client";

import { motion, useReducedMotion } from "framer-motion";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import {
  CurvedArrowDoodle,
  ScribbleDoodle,
  SparkleDoodle,
  StarDoodle,
  UnderlineDoodle,
} from "@/components/ui/Doodles";

export default function JournalHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <StarDoodle className="pointer-events-none absolute right-[8%] top-16 hidden h-6 w-6 text-yellow/70 lg:block" />
      <SparkleDoodle className="pointer-events-none absolute left-[4%] top-44 hidden h-5 w-5 text-purple/60 xl:block" />
      <ScribbleDoodle className="pointer-events-none absolute left-[6%] bottom-10 hidden w-20 text-coral/40 lg:block" />

      <div className="mx-auto grid max-w-350 grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-12">
        <motion.div
          initial={reduce ? undefined : "hidden"}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={rise} transition={{ duration: 0.6 }}>
            <HandwrittenNote className="text-lg text-coral" rotate={-2}>
              nothing here is accidental
            </HandwrittenNote>
          </motion.div>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink/50"
          >
            Oddlyrinaldi Journal / Design Philosophy
          </motion.p>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-tight text-ink"
          >
            The soul{" "}
            <span className="relative inline-block">
              behind
              <UnderlineDoodle className="absolute -bottom-1 left-0 h-2.5 w-full text-coral/70" />
            </span>{" "}
            the screen.
          </motion.h1>

          <motion.div
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-ink/65"
          >
            <p>Every website begins with an idea.</p>
            <p className="mt-1">
              A mood. A personality. A point of view.
            </p>
            <p className="mt-4">
              Here are the stories, decisions, and design philosophies behind
              the worlds we create.
            </p>
          </motion.div>
        </motion.div>

        <IdeaToWorldCollage reduce={reduce} />
      </div>
    </section>
  );
}

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * A small stacked collage — blank paper, a sketch, a type sample, and a
 * finished layout — revealed on scroll to suggest "idea becomes website"
 * without a fragile, slow, timed animation sequence.
 */
function IdeaToWorldCollage({ reduce }: { reduce: boolean | null }) {
  const stages = [
    { label: "blank paper", rotate: -6, content: null },
    { label: "a rough sketch", rotate: 4, content: "sketch" as const },
    { label: "typography", rotate: -3, content: "type" as const },
    { label: "a complete world", rotate: 2, content: "layout" as const },
  ];

  return (
    <div className="relative mx-auto h-[340px] w-full max-w-sm sm:h-[400px]">
      {stages.map((stage, i) => (
        <motion.div
          key={stage.label}
          initial={reduce ? undefined : { opacity: 0, y: 24, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: stage.rotate }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute overflow-hidden rounded-xl border border-ink/10 bg-cream shadow-[0_20px_40px_-16px_rgba(0,0,0,0.2)]"
          style={{
            width: "78%",
            aspectRatio: "4 / 3",
            top: `${i * 16}%`,
            left: `${(i % 2) * 14}%`,
            zIndex: i,
          }}
        >
          {stage.content === "sketch" && (
            <div className="flex h-full items-center justify-center p-6">
              <ScribbleDoodle className="w-2/3 text-ink/40" />
            </div>
          )}
          {stage.content === "type" && (
            <div className="flex h-full flex-col justify-center gap-2 p-6">
              <div className="h-3 w-3/4 rounded-full bg-ink/15" />
              <div className="h-2 w-full rounded-full bg-ink/10" />
              <div className="h-2 w-5/6 rounded-full bg-ink/10" />
            </div>
          )}
          {stage.content === "layout" && (
            <div className="flex h-full flex-col gap-2 p-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-coral" />
                <span className="h-2 w-2 rounded-full bg-yellow" />
                <span className="h-2 w-2 rounded-full bg-lime" />
              </div>
              <div className="mt-1 h-3 w-2/3 rounded-full bg-ink/70" />
              <div className="mt-2 flex-1 rounded-lg bg-ink/10" />
            </div>
          )}
        </motion.div>
      ))}
      <CurvedArrowDoodle className="pointer-events-none absolute -bottom-6 -right-8 hidden h-16 w-20 rotate-[100deg] text-ink/30 sm:block" />
    </div>
  );
}
