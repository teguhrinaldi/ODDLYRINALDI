"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CircleDoodle } from "@/components/ui/Doodles";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { accentHex, getTemplateBySlug } from "@/data/templates";
import type { TemplateStory } from "@/data/journal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function TemplateStoryCard({
  story,
  featured = false,
  reverse = false,
}: {
  story: TemplateStory;
  featured?: boolean;
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();
  const template = getTemplateBySlug(story.templateSlug);
  if (!template) return null;
  const accent = accentHex[template.accent];

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group grid grid-cols-1 items-center gap-8 lg:gap-14 ${
        featured ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-2"
      } ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <Link
        href={`/journal/${story.slug}`}
        data-cursor="read"
        className="relative block overflow-hidden rounded-2xl border border-ink/10"
      >
        <div className={`relative w-full ${featured ? "aspect-16/10" : "aspect-4/3"}`}>
          <Image
            src={template.previewImage}
            alt={`Preview of the ${template.name} template`}
            fill
            sizes={featured ? "(min-width: 1024px) 760px, 90vw" : "(min-width: 1024px) 560px, 90vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)" }}
          />
          <span className="pointer-events-none absolute bottom-4 left-5 font-display text-lg font-extrabold text-cream">
            {template.name}
          </span>
        </div>
      </Link>

      <div>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
          <CircleDoodle className="h-3 w-3" style={{ color: accent }} />
          {story.eyebrow} · {formatDate(story.date)}
        </p>

        <Link href={`/journal/${story.slug}`} data-cursor="read">
          <h2
            className={`mt-3 font-display font-extrabold leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-coral ${
              featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {template.name} — {story.headline}
          </h2>
        </Link>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/60">{story.excerpt}</p>

        <HandwrittenNote className="mt-4 inline-block text-lg text-coral" rotate={-2}>
          &ldquo;{story.philosophy}&rdquo;
        </HandwrittenNote>

        <div className="mt-5 flex items-center gap-4">
          <Link
            href={`/journal/${story.slug}`}
            data-cursor="read"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 transition-colors group-hover:text-ink"
          >
            Read the story <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-xs text-ink/40">{story.readingTime}</span>
        </div>
      </div>
    </motion.article>
  );
}
