"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ArrowButton from "@/components/ui/ArrowButton";
import { PlusDoodle } from "@/components/ui/Doodles";
import { accentHex, Template } from "@/data/templates";

type TemplatePreviewCardProps = {
  template: Template;
  className?: string;
};

/**
 * Editorial "specimen" card for a template — the real product screenshot
 * washed in the template's tint, topped with the wordmark. See
 * `previewImage` in src/data/templates.ts for the source.
 */
export default function TemplatePreviewCard({
  template,
  className = "",
}: TemplatePreviewCardProps) {
  const accent = accentHex[template.accent];
  const dark = template.tint.startsWith("#2") || template.tint.startsWith("#1");

  return (
    <motion.article
      whileHover="hover"
      variants={{ hover: { y: -4 } }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex w-65 shrink-0 flex-col sm:w-72.5 ${className}`}
      data-cursor="view"
    >
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-ink/50">
        <span>{String(template.index).padStart(2, "0")} / 10 — Specimen</span>
        <span className="uppercase tracking-[0.15em]">{template.category}</span>
      </div>

      <div
        data-cursor-surface={dark ? "dark" : undefined}
        className="relative aspect-4/3 overflow-hidden rounded-md border border-ink/10 transition-colors duration-300 group-hover:border-ink/30"
      >
        <motion.div
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={template.previewImage}
            alt=""
            fill
            sizes="290px"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: template.tint, opacity: dark ? 0.72 : 0.82 }}
          />
        </motion.div>

        <PlusDoodle
          className="absolute left-3 top-3 h-3 w-3 opacity-40"
          style={{ color: dark ? "#f5f0e6" : "#111111" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span
            className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: dark ? "#f5f0e6" : accent }}
          >
            {template.name}
          </span>
          <span
            className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: dark ? "rgba(245,240,230,0.5)" : "rgba(17,17,17,0.45)" }}
          >
            {template.category}
          </span>
        </div>

        <motion.span
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          className="absolute right-3 top-3 h-2 w-2 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-bold text-ink">{template.name}</p>
          <p className="text-sm text-ink/55">{template.category}</p>
        </div>
        <motion.span
          variants={{ hover: { x: 4, rotate: 8 } }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          <ArrowButton aria-label={`View ${template.name} template`} />
        </motion.span>
      </div>
    </motion.article>
  );
}
