"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import WaveDivider from "@/components/ui/WaveDivider";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import PillButton from "@/components/ui/PillButton";
import {
  CircleDoodle,
  DashDoodle,
  ScribbleDoodle,
  SparkleDoodle,
  StarDoodle,
  UnderlineDoodle,
} from "@/components/ui/Doodles";
import { features } from "@/data/nav";

const accentClass: Record<string, string> = {
  yellow: "text-yellow",
  blue: "text-blue",
  purple: "text-purple",
  lime: "text-lime",
};

const iconByIndex = [FeatureIconQuality, FeatureIconCustom, FeatureIconSupport, FeatureIconUpdates];

export default function MoreThanTemplates() {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="bg-cream">
        <WaveDivider fill="#101010" />
      </div>

      <section
        id="about"
        data-cursor-surface="dark"
        className="relative overflow-hidden bg-black-deep py-20 sm:py-24 lg:py-28"
      >
        <StarDoodle className="absolute right-[8%] top-[8%] hidden h-6 w-6 text-yellow/70 md:block" />
        <ScribbleDoodle className="absolute bottom-[10%] left-[4%] hidden w-16 text-orange/50 lg:block" />
        <DashDoodle className="absolute left-[46%] top-[10%] hidden w-6 -rotate-6 text-purple/60 lg:block" />
        <SparkleDoodle className="absolute bottom-[22%] right-[6%] hidden h-4 w-4 text-lime/60 md:block" />
        <CircleDoodle className="absolute left-[3%] top-[42%] hidden h-6 w-6 text-yellow/40 lg:block" />

        <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <HandwrittenNote className="text-lg text-yellow/90" rotate={-2}>
                ✦ More Than Just Templates.
              </HandwrittenNote>
              <h2 className="mt-3 font-hand text-6xl leading-[1.05] text-white sm:text-7xl">
                More
                <br />
                Than Just
                <br />
                <span className="relative inline-block">
                  Templates.
                  <UnderlineDoodle className="absolute -bottom-2 left-0 h-3 w-full text-yellow" />
                </span>
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-white/60">
                It&apos;s a collection of digital identities, ready for you to
                make your own.
              </p>
              <PillButton href="/about" variant="ghost-dark" cursorLabel="about" className="mt-8">
                About ODDLYRINALDI <span aria-hidden>→</span>
              </PillButton>
            </motion.div>

            <div className="relative">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:items-start lg:gap-x-4 lg:divide-x lg:divide-white/10">
                {features.map((feature, i) => {
                  const Icon = iconByIndex[i];
                  return (
                    <motion.div
                      key={feature.title}
                      initial={reduce ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="border-t border-white/10 pt-6 first:border-t-0 sm:border-t-0 lg:px-4 lg:first:pl-0"
                    >
                      <Icon className={accentClass[feature.accent]} />
                      <h3 className="mt-4 font-display text-lg font-bold text-white lg:min-h-12 lg:text-base xl:min-h-14 xl:text-lg">
                        {feature.title}
                      </h3>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/55">
                        {feature.body}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <DuckCorner />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DuckCorner() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mt-16 flex justify-end pr-2 sm:mt-20"
    >
      <div className="relative">
        <span className="absolute -right-6 -top-10 h-36 w-36 rounded-full bg-purple/25 blur-md sm:h-44 sm:w-44" />
        <div className="absolute -left-16 -top-8 hidden text-right sm:block">
          <HandwrittenNote className="text-2xl leading-tight text-white/90" rotate={-4}>
            Good
            <br />
            Vibes
            <br />
            Only :)
          </HandwrittenNote>
        </div>
        <div className="animate-sway">
          <Image
            src="/characters/cool-duck.png"
            alt="A cool rubber duck wearing sunglasses and a towel turban"
            width={1200}
            height={1200}
            className="w-28 drop-shadow-[0_16px_18px_rgba(0,0,0,0.35)] sm:w-36"
          />
        </div>
      </div>
    </motion.div>
  );
}

function iconWrap(children: ReactNode, className?: string) {
  return (
    <span
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-current/30 ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function FeatureIconQuality({ className }: { className?: string }) {
  return iconWrap(
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3l2.2 4.7 5.2.6-3.8 3.6.9 5.1L12 14.6l-4.5 2.4.9-5.1-3.8-3.6 5.2-.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>,
    className
  );
}

function FeatureIconCustom({ className }: { className?: string }) {
  return iconWrap(
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 17l4-1 9-9-3-3-9 9-1 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13 5l3 3" stroke="currentColor" strokeWidth="1.6" />
    </svg>,
    className
  );
}

function FeatureIconSupport({ className }: { className?: string }) {
  return iconWrap(
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9.5 10a2.5 2.5 0 115 0c0 1.6-2.5 1.8-2.5 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.6" r="0.6" fill="currentColor" />
    </svg>,
    className
  );
}

function FeatureIconUpdates({ className }: { className?: string }) {
  return iconWrap(
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 12a8 8 0 0113.6-5.7M20 12a8 8 0 01-13.6 5.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17.6 3.6v3.2h-3.2M6.4 20.4v-3.2h3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    className
  );
}
