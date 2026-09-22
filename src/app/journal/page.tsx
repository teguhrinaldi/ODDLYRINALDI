import type { Metadata } from "next";
import JournalHero from "@/components/journal/JournalHero";
import JournalManifesto from "@/components/journal/JournalManifesto";
import JournalBeliefs from "@/components/journal/JournalBeliefs";
import TemplateStoryCard from "@/components/journal/TemplateStoryCard";
import StudioNoteRow from "@/components/journal/StudioNoteRow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StarDoodle } from "@/components/ui/Doodles";
import { journalArticles, templateStories } from "@/data/journal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "The Soul Behind the Screen",
  description:
    "Explore the ideas, visual languages, and design philosophies behind Oddlyrinaldi's website templates.",
  alternates: { canonical: `${site.url}/journal` },
};

export default function JournalPage() {
  const [featured, ...rest] = templateStories;

  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <JournalHero />

        <JournalManifesto />

        <section className="relative overflow-hidden border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <StarDoodle className="pointer-events-none absolute right-[6%] top-10 hidden h-5 w-5 text-yellow/70 lg:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="flex items-baseline gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
                Template Stories
              </p>
              <span className="font-hand text-lg text-coral">a website with a point of view</span>
            </div>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Twelve templates. Twelve different worlds.
            </h2>

            <div className="mt-14 flex flex-col gap-20 sm:gap-24">
              {featured && <TemplateStoryCard story={featured} featured />}
              {rest.map((story, i) => (
                <TemplateStoryCard key={story.slug} story={story} reverse={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        <JournalBeliefs />

        <section className="border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Studio Notes</p>
            <div className="mt-3 flex items-baseline gap-3">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Notes on design, code, and the small decisions behind each template.
              </h2>
            </div>
            <ul className="mt-10 max-w-3xl">
              {journalArticles.map((article) => (
                <StudioNoteRow key={article.slug} article={article} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
