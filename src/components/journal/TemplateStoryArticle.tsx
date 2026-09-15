import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { StarDoodle } from "@/components/ui/Doodles";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import type { TemplateStory } from "@/data/journal";
import type { Template } from "@/data/templates";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function TemplateStoryArticle({
  story,
  template,
}: {
  story: TemplateStory;
  template: Template;
}) {
  return (
    <>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
        {story.eyebrow} · {formatDate(story.date)} · {story.readingTime}
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {template.name} — {story.headline}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/65">{story.intro}</p>

      <div className="relative mt-10 aspect-16/9 overflow-hidden rounded-2xl border border-ink/10">
        <Image
          src={template.previewImage}
          alt={`Preview of the ${template.name} template's homepage`}
          fill
          sizes="(min-width: 1024px) 760px, 90vw"
          className="object-cover"
          priority
        />
        <StarDoodle className="pointer-events-none absolute right-4 top-4 h-5 w-5 text-yellow/80" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-y border-ink/10 py-5 text-sm sm:grid-cols-4">
        <MetaItem label="Template" value={template.name} />
        <MetaItem label="Category" value={template.category} />
        <MetaItem label="Philosophy" value={story.philosophy} />
        <MetaItem label="Signature" value={template.story.signature} />
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {story.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl font-extrabold uppercase tracking-[0.05em] text-ink sm:text-2xl">
              {section.heading}
            </h2>
            <div className="mt-3 flex flex-col gap-4">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/75">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-ink/10 pt-8">
        <HandwrittenNote className="text-xl text-coral" rotate={-2}>
          the final thought
        </HandwrittenNote>
        <p className="mt-3 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
          {story.closingThought}
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Like the idea?</p>
          <p className="mt-1 font-display text-lg font-bold text-ink">Explore the {template.name} template.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/templates/${template.slug}`}
            data-cursor="view"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black-secondary"
          >
            View template <ArrowUpRight className="h-4 w-4" />
          </Link>
          {template.liveDemoUrl && (
            <a
              href={template.liveDemoUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="explore"
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Live demo <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/40">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-snug text-ink/80">{value}</p>
    </div>
  );
}
