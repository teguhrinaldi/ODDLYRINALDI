import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StarDoodle, SparkleDoodle } from "@/components/ui/Doodles";
import { journalArticles } from "@/data/journal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on design, code, and the small decisions behind each template.",
  alternates: { canonical: `${site.url}/journal` },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
          <StarDoodle className="pointer-events-none absolute right-[10%] top-16 hidden h-6 w-6 text-yellow/70 lg:block" />
          <SparkleDoodle className="pointer-events-none absolute left-[6%] top-28 hidden h-5 w-5 text-purple/60 md:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              Journal
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Notes on design, code, and the
              <br />
              small decisions behind each template.
            </h1>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream pb-20 sm:pb-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {journalArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/journal/${article.slug}`}
                    data-cursor="read"
                    className="group block"
                  >
                    <div
                      className="aspect-[4/3] overflow-hidden rounded-xl border border-ink/10"
                      style={{ backgroundColor: article.coverTint }}
                    />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                      {article.category} · {formatDate(article.date)}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-coral">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">
                      {article.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink/50">
                      {article.readingTime} <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
