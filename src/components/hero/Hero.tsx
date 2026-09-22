"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import BrowserPreview from "./BrowserPreview";
import RunningDog from "./RunningDog";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import PillButton from "@/components/ui/PillButton";
import {
  CircleDoodle,
  CrossDoodle,
  DashDoodle,
  PointerDoodle,
  ScribbleDoodle,
  SparkleDoodle,
  StarDoodle,
  UnderlineDoodle,
} from "@/components/ui/Doodles";

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -46]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream pb-14 pt-36 sm:pt-40 lg:min-h-[88vh] lg:pb-20 lg:pt-44"
    >
      {/* BACKGROUND doodle layer — faint, large, slow parallax */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduce ? undefined : { y: bgY }}
      >
        <ScribbleDoodle className="absolute left-[8%] top-[12%] hidden w-24 text-ink/20 lg:block" />
        <CircleDoodle className="absolute right-[16%] top-[6%] hidden h-16 w-16 text-ink/10 md:block" />
        <DashDoodle className="absolute left-[30%] top-[6%] hidden w-8 text-ink/15 lg:block" />
        <CircleDoodle className="absolute left-[3%] bottom-[22%] h-10 w-10 text-ink/10" />
      </motion.div>

      {/* MIDDLE doodle layer — colored accents, moderate parallax */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduce ? undefined : { y: midY }}
      >
        <StarDoodle className="absolute right-[6%] top-[14%] h-8 w-8 text-coral animate-wiggle sm:h-10 sm:w-10" />
        <StarDoodle className="absolute left-[6%] top-[30%] hidden h-6 w-6 text-lime lg:block" />
        <SparkleDoodle className="absolute left-[42%] top-[8%] hidden h-8 w-8 text-yellow lg:block" />
        <CircleDoodle className="absolute left-[22%] top-[64%] hidden h-3.5 w-3.5 text-blue/60 md:block" />
        <CircleDoodle className="absolute right-[3%] top-[46%] hidden h-8 w-8 text-purple/50 lg:block" />
        <DashDoodle className="absolute right-[28%] bottom-[10%] hidden w-7 text-orange/60 md:block" />
      </motion.div>

      {/* FOREGROUND doodle layer — small, close to the characters/text */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduce ? undefined : { y: fgY }}
      >
        <SparkleDoodle className="absolute left-[38%] bottom-[26%] hidden h-4 w-4 text-coral/80 sm:block" />
        <PointerDoodle className="absolute left-[3%] top-[52%] hidden h-6 w-6 -rotate-12 text-ink/30 lg:block" />
        <CrossDoodle className="absolute right-[9%] top-[36%] hidden h-3.5 w-3.5 text-ink/25 md:block" />
      </motion.div>

      <div className="mx-auto grid max-w-350 grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-12">
        <motion.div
          initial={reduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="relative z-10"
        >
          <motion.div variants={rise} transition={{ duration: 0.6 }}>
            <HandwrittenNote className="text-2xl text-coral sm:text-3xl" rotate={-3}>
              Hello, we&apos;re
            </HandwrittenNote>
          </motion.div>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.6 }}
            className="font-display text-[clamp(2.5rem,7.4vw,5.25rem)] font-extrabold leading-[0.95] tracking-tight text-ink"
          >
            ODDLYRINALDI
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-2 font-display text-[clamp(1.75rem,4.6vw,3rem)] font-semibold leading-[1.05] text-ink"
          >
            Websites that
            <br />
            refuse to{" "}
            <span className="relative inline-block">
              sit still.
              <UnderlineDoodle className="absolute -bottom-1 left-0 h-2.5 w-full text-coral/70" />
            </span>
          </motion.p>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-ink/70"
          >
            A creative studio crafting premium website templates for bold
            brands, dreamers, and digital explorers.
            <br />
            <br />
            12 unique templates. 12 different worlds. One collection.
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <PillButton href="#collection" className="py-3.5">
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </PillButton>
            <PillButton href="/custom-website" variant="outline" cursorLabel="view" className="py-3.5">
              <Sparkles className="h-4 w-4" />
              Custom Website
            </PillButton>
          </motion.div>
        </motion.div>

        <div className="relative z-10 pt-6 lg:pt-0">
          <BrowserPreview />
        </div>
      </div>

      <RunningDog containerRef={sectionRef} />

      {/* "made with care" — tiny handwritten aside near the dog's trail */}
      <HandwrittenNote
        className="pointer-events-none absolute bottom-[3%] left-[19%] hidden text-base text-ink/40 sm:block"
        rotate={-4}
      >
        made with care
      </HandwrittenNote>

      {/* scroll indicator */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:right-10 lg:flex">
        <span className="rotate-90 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/50">
          Scroll
        </span>
        <span className="h-10 w-px bg-ink/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/60 animate-scroll-dot" />
      </div>
    </section>
  );
}
