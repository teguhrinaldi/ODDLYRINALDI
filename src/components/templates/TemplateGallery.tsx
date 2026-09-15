"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DashDoodle, StarDoodle } from "@/components/ui/Doodles";
import { accentHex, type Template } from "@/data/templates";

/**
 * Editorial, asymmetric gallery for template detail pages — one large
 * "homepage" shot, a stacked "inner page" shot, and a portrait "mobile"
 * shot, deliberately uneven rather than a flat 3-up grid. See `gallery` in
 * src/data/templates.ts for the source images.
 */
export default function TemplateGallery({ template }: { template: Template }) {
  const reduce = useReducedMotion();
  const accent = accentHex[template.accent];
  const [homepage, inner, mobile] = template.gallery;

  return (
    <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.55fr] lg:items-start lg:gap-5">
      <StarDoodle
        className="pointer-events-none absolute -top-8 left-[6%] hidden h-5 w-5 lg:block"
        style={{ color: accent }}
      />
      <DashDoodle className="pointer-events-none absolute -top-6 right-[8%] hidden w-9 -rotate-3 text-ink/25 lg:block" />

      <GalleryTile image={homepage} reduce={reduce} className="aspect-[4/3] sm:col-span-2 lg:col-span-1" delay={0} />
      <GalleryTile
        image={inner}
        reduce={reduce}
        className="aspect-[4/5] lg:mt-10"
        delay={0.1}
      />
      <GalleryTile
        image={mobile}
        reduce={reduce}
        className="mx-auto aspect-9/16 w-full max-w-52 sm:col-span-2 sm:max-w-64 lg:col-span-1 lg:mx-0 lg:mt-6 lg:max-w-none"
        delay={0.18}
      />
    </div>
  );
}

function GalleryTile({
  image,
  reduce,
  className,
  delay,
}: {
  image: { src: string; label: string };
  reduce: boolean | null;
  className: string;
  delay: number;
}) {
  return (
    <motion.figure
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-xl border border-ink/10 ${className}`}
    >
      <Image
        src={image.src}
        alt={`${image.label} preview for this template`}
        fill
        sizes="(min-width: 1024px) 480px, 90vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream backdrop-blur-sm">
        {image.label}
      </figcaption>
    </motion.figure>
  );
}
