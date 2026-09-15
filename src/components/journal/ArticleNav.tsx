import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { TemplateStory } from "@/data/journal";

export default function ArticleNav({ prev, next }: { prev?: TemplateStory; next?: TemplateStory }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="More template stories" className="mt-12 grid grid-cols-1 gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/journal/${prev.slug}`}
          data-cursor="read"
          className="group flex items-center gap-3 rounded-xl border border-ink/10 p-5 transition-colors hover:border-ink/30"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:-translate-x-1" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">Previous story</p>
            <p className="mt-1 font-display text-base font-bold text-ink group-hover:text-coral">{prev.headline}</p>
          </div>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={`/journal/${next.slug}`}
          data-cursor="read"
          className="group flex items-center justify-end gap-3 rounded-xl border border-ink/10 p-5 text-right transition-colors hover:border-ink/30"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">Next story</p>
            <p className="mt-1 font-display text-base font-bold text-ink group-hover:text-coral">{next.headline}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
}
