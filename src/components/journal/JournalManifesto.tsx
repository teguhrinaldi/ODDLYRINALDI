"use client";

import { motion, useReducedMotion } from "framer-motion";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { DashDoodle, SparkleDoodle, StarDoodle } from "@/components/ui/Doodles";

const FEELINGS = ["Quiet.", "Loud.", "Precise.", "Playful.", "Technical.", "Human.", "Mysterious.", "Warm."];

export default function JournalManifesto() {
  const reduce = useReducedMotion();

  return (
    <section
      data-cursor-surface="dark"
      className="relative overflow-hidden border-t border-ink/10 bg-ink py-20 text-cream sm:py-24 lg:py-28"
    >
      <StarDoodle className="pointer-events-none absolute right-[8%] top-10 hidden h-5 w-5 text-yellow/60 md:block" />
      <SparkleDoodle className="pointer-events-none absolute left-[6%] bottom-14 hidden h-5 w-5 text-purple/60 lg:block" />

      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <HandwrittenNote className="text-lg text-coral" rotate={-2}>
            made with intention
          </HandwrittenNote>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Design is not decoration.
          </h2>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mt-8 text-base leading-relaxed text-cream/70"
          >
            <p>We do not begin with a layout.</p>
            <p className="mt-1">We begin with a feeling.</p>
          </motion.div>

          <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {FEELINGS.map((word, i) => (
              <motion.span
                key={word}
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="font-display text-lg font-bold text-cream/90 sm:text-xl"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-base leading-relaxed text-cream/70"
          >
            The design follows the personality. Every Oddlyrinaldi template is
            built as a different world — with its own visual language,
            rhythm, interaction, and purpose.
          </motion.p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-cream/40">
          <DashDoodle className="w-8" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">
            every detail has a reason
          </span>
          <DashDoodle className="w-8 scale-x-[-1]" />
        </div>
      </div>
    </section>
  );
}
