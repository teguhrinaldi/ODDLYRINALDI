import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { JournalArticle } from "@/data/journal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Compact list row for the studio's general process/opinion notes — deliberately
 * plainer than TemplateStoryCard so the two never read as the same kind of thing. */
export default function StudioNoteRow({ article }: { article: JournalArticle }) {
  return (
    <li className="border-b border-ink/10 py-6 first:pt-0 last:border-b-0">
      <Link href={`/journal/${article.slug}`} data-cursor="read" className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
            {article.category} · {formatDate(article.date)}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold text-ink transition-colors group-hover:text-coral sm:text-xl">
            {article.title}
          </h3>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink/55">{article.excerpt}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink/40 transition-colors group-hover:text-ink">
          {article.readingTime} <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </li>
  );
}
