"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import PillButton from "@/components/ui/PillButton";
import { CrownDoodle, SparkleDoodle, StarDoodle, UnderlineDoodle } from "@/components/ui/Doodles";
import { HOW_IT_WORKS, PERSONALITY_TEASER } from "@/data/customWebsite";

export default function CustomWebsitePromo() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-ink/10 bg-cream py-20 sm:py-24 lg:py-28">
      <StarDoodle className="pointer-events-none absolute right-[6%] top-12 hidden h-6 w-6 text-yellow/70 lg:block" />
      <SparkleDoodle className="pointer-events-none absolute left-[4%] bottom-16 hidden h-5 w-5 text-purple/60 xl:block" />

      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 rounded-3xl border border-ink/10 bg-paper p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-14">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <CrownDoodle className="h-6 w-8 text-coral" />
              <HandwrittenNote className="text-lg text-coral" rotate={-2}>
                A premium service
              </HandwrittenNote>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Want something built{" "}
              <span className="relative inline-block">
                just for you?
                <UnderlineDoodle className="absolute -bottom-1 left-0 h-2.5 w-full text-coral/70" />
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
              Skip the template. Tell us about your brand, personality, and
              content in a guided creative brief, and get a custom website
              designed around exactly that — reviewed by hand, ordered
              straight through WhatsApp.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {PERSONALITY_TEASER.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs font-semibold text-ink/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <PillButton href="/custom-website" className="mt-8 py-3.5">
              Start your brief
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </PillButton>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center gap-6 border-t border-ink/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.label} className="flex gap-4">
                <span className="font-hand text-3xl leading-none text-coral">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{item.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.detail}</p>
                </div>
              </div>
            ))}
            <Link
              href="/custom-website"
              data-cursor="view"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45 hover:text-ink"
            >
              See the full brief →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
