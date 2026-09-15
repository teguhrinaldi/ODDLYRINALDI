"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The visual bridge between Hero and Featured Templates: a long hand-drawn
 * line that draws itself in as the user scrolls down, with kucingg walking
 * straight across it — the boundary between the two sections made literal.
 */
export default function HeroDivider() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const catDrift = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream"
      aria-hidden="true"
    >
      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
        <div className="relative h-[92px] sm:h-[112px] lg:h-[132px]">
          <svg
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="absolute left-0 top-1/2 h-6 w-full -translate-y-1/2 text-ink/70"
          >
            <motion.path
              d="M0 20 C 140 17, 260 23, 400 19 C 520 16, 600 22, 660 20 C 760 17, 880 21, 1010 18 C 1080 17, 1150 20, 1200 19"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 w-25 -translate-x-1/2 translate-y-[-39%] sm:w-30 lg:w-35"
            initial={reduce ? undefined : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={reduce ? undefined : { x: catDrift }}
          >
            <Image
              src="/characters/kucingg.png"
              alt="A tabby cat walking across the divider between sections"
              width={960}
              height={960}
              className="w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.15)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
