"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { type Template } from "@/data/templates";

/**
 * Phone-shaped mockup shown beside the desktop browser preview on template
 * detail pages. Renders `template.mobileImage` once a real mobile screenshot
 * exists; until then it falls back to a tint + wordmark placeholder so the
 * slot is visibly reserved.
 */
export default function TemplateMobilePreview({ template }: { template: Template }) {
  const reduce = useReducedMotion();
  const dark = template.tint.startsWith("#2") || template.tint.startsWith("#1");

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 1 }}
      whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-cursor-surface="dark"
      className="relative hidden w-32 shrink-0 sm:block sm:w-36 lg:w-40"
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#1c1815] p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-9/19.5 w-full overflow-hidden rounded-[1.25rem]">
          <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-black/50" />

          {template.mobileImage ? (
            <>
              <Image
                src={template.mobileImage}
                alt={`Preview of the ${template.name} template's mobile layout`}
                fill
                sizes="160px"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <span className="pointer-events-none absolute bottom-3 left-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-cream/70">
                Mobile
              </span>
            </>
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center"
              style={{ backgroundColor: template.tint }}
            >
              <span
                className="font-display text-lg font-extrabold tracking-tight"
                style={{ color: dark ? "#f5f0e6" : "#111111" }}
              >
                {template.name}
              </span>
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: dark ? "rgba(245,240,230,0.55)" : "rgba(17,17,17,0.45)" }}
              >
                Mobile
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
