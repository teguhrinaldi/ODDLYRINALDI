"use client";

import { motion, useReducedMotion } from "framer-motion";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { CircleDoodle, StarDoodle } from "@/components/ui/Doodles";

const WORLDS = [
  { world: "A learning platform", feeling: "should feel curious." },
  { world: "A vehicle website", feeling: "should feel powerful." },
  { world: "A grooming studio", feeling: "should feel personal." },
  { world: "A fashion atelier", feeling: "should feel considered." },
  { world: "A restaurant", feeling: "should feel like an invitation." },
];

const BELIEFS = [
  "Design should have a point of view.",
  "Interaction should have a purpose.",
  "A template should feel like a world, not a collection of sections.",
  "Good motion guides attention.",
  "Details are never just decoration.",
];

export default function JournalBeliefs() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-ink/10 bg-cream py-20 sm:py-24 lg:py-28">
      <StarDoodle className="pointer-events-none absolute right-[6%] top-14 hidden h-5 w-5 text-yellow/70 lg:block" />

      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              Different worlds. One studio.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {WORLDS.map((row, i) => (
                <motion.p
                  key={row.world}
                  initial={reduce ? undefined : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="font-display text-xl font-bold text-ink sm:text-2xl"
                >
                  {row.world}{" "}
                  <span className="font-normal text-ink/50">{row.feeling}</span>
                </motion.p>
              ))}
            </div>
            <HandwrittenNote className="mt-6 inline-block text-lg text-coral" rotate={-2}>
              different worlds, different rules, one creative studio
            </HandwrittenNote>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              What we believe
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {BELIEFS.map((belief, i) => (
                <motion.li
                  key={belief}
                  initial={reduce ? undefined : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-3 border-b border-ink/10 pb-4 text-base leading-relaxed text-ink/70 last:border-b-0"
                >
                  <CircleDoodle className="mt-1 h-3.5 w-3.5 shrink-0 text-purple/70" />
                  {belief}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
