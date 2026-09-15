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
import { HOW_IT_WORKS } from "@/data/customWebsite";

export default function CustomWebsiteHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <StarDoodle className="pointer-events-none absolute right-[8%] top-16 hidden h-6 w-6 text-yellow/70 lg:block" />
      <SparkleDoodle className="pointer-events-none absolute left-[4%] top-40 hidden h-5 w-5 text-purple/60 xl:block" />
      <ScribbleDoodle className="pointer-events-none absolute left-[6%] bottom-16 hidden w-20 text-coral/40 lg:block" />

      <div className="mx-auto grid max-w-350 grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-12">
        <motion.div
          initial={reduce ? undefined : "hidden"}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={rise} transition={{ duration: 0.6 }}>
            <HandwrittenNote className="text-2xl text-coral" rotate={-3}>
              A premium service
            </HandwrittenNote>
          </motion.div>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink/50"
          >
            Custom website
          </motion.p>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-tight text-ink"
          >
            Not just a website.
            <br />
            A digital identity{" "}
            <span className="relative inline-block">
              made for you.
              <UnderlineDoodle className="absolute -bottom-1 left-0 h-2.5 w-full text-coral/70" />
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-ink/65"
          >
            Tell us what you imagine. We&apos;ll help turn it into a website
            with personality — reviewed by hand, never a template dump.
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#brief-form"
              data-cursor="go"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-black-secondary"
            >
              Start your brief
            </a>
            <a
              href="#how-it-works"
              data-cursor="view"
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-cream px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        <SketchToBrowser reduce={reduce} />
      </div>

      <div
        id="how-it-works"
        className="mx-auto mt-20 max-w-350 scroll-mt-24 px-5 sm:px-8 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-6 border-t border-ink/10 pt-10 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="font-hand text-3xl text-coral">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">{item.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** A rough sketch fades away to reveal a polished browser frame beneath it. */
function SketchToBrowser({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-[0_30px_60px_-20px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-2 border-b border-ink/10 bg-paper px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-col gap-3 p-6">
          <div className="h-4 w-2/3 rounded-full bg-ink/10" />
          <div className="h-3 w-full rounded-full bg-ink/5" />
          <div className="h-3 w-5/6 rounded-full bg-ink/5" />
          <div className="mt-3 h-24 rounded-lg bg-coral/15" />
          <div className="h-8 w-28 rounded-full bg-ink/90" />
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={reduce ? { opacity: 0 } : { opacity: 1, rotate: -2 }}
        whileInView={reduce ? undefined : { opacity: 0, rotate: -6, scale: 1.04 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-dashed border-ink/40 bg-cream"
      >
        <ScribbleDoodle className="w-2/3 text-ink/50" />
        <HandwrittenNote className="absolute -top-6 left-4 text-lg text-ink/60" rotate={-4}>
          sketching...
        </HandwrittenNote>
      </motion.div>

      <CurvedArrowDoodle className="pointer-events-none absolute -left-10 -top-8 hidden h-14 w-16 -rotate-12 text-ink/30 sm:block" />
    </motion.div>
  );
}
