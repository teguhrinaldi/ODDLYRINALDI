import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplatePreviewCard from "@/components/TemplatePreviewCard";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { StarDoodle, SparkleDoodle } from "@/components/ui/Doodles";
import { templates } from "@/data/templates";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "10 unique website templates, each its own visual world — browse the full ODDLYRINALDI collection.",
  alternates: { canonical: `${site.url}/templates` },
};

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
          <StarDoodle className="pointer-events-none absolute right-[10%] top-16 hidden h-6 w-6 text-yellow/70 lg:block" />
          <SparkleDoodle className="pointer-events-none absolute left-[6%] top-28 hidden h-5 w-5 text-purple/60 md:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="flex items-baseline gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
                The Collection
              </p>
              <HandwrittenNote className="text-lg text-coral/80" rotate={-2}>
                a little weird
              </HandwrittenNote>
            </div>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              10 templates. 10 personalities.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
              Every template is its own visual world — pick the one that
              matches yours.
            </p>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream pb-20 sm:pb-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <ul className="flex flex-wrap gap-x-6 gap-y-12 sm:gap-x-7">
              {templates.map((t) => (
                <li key={t.slug}>
                  <Link href={`/templates/${t.slug}`} data-cursor="view">
                    <TemplatePreviewCard template={t} />
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
