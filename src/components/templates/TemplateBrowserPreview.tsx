"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SparkleDoodle } from "@/components/ui/Doodles";
import { accentHex, type Template } from "@/data/templates";

/**
 * Realistic browser-mockup preview used on template detail pages, showing
 * the real product screenshot (see `previewImage` in src/data/templates.ts).
 */
export default function TemplateBrowserPreview({ template }: { template: Template }) {
  const reduce = useReducedMotion();
  const accent = accentHex[template.accent];

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="explore"
      data-cursor-surface="dark"
      className="group relative"
    >
      <SparkleDoodle
        className="pointer-events-none absolute -right-4 -top-5 z-10 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:-right-6 sm:-top-7"
        style={{ color: accent }}
      />

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-[#1c1815] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 border-b border-white/5 bg-[#141110] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
            {template.name.toLowerCase()}.oddlyrinaldi.com
          </span>
        </div>

        <div className="relative aspect-16/10 w-full overflow-hidden">
          <Image
            src={template.previewImage}
            alt={`Preview screenshot representing the ${template.name} template's ${template.category.toLowerCase()} homepage`}
            fill
            sizes="(min-width: 1024px) 640px, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
            }}
          />
          <div className="pointer-events-none absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <span className="font-display text-lg font-extrabold tracking-tight text-cream sm:text-xl">
              {template.name}
            </span>
            <span
              className="translate-y-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              style={{ color: accent }}
            >
              View Template →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
