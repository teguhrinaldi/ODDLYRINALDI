import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { StarDoodle } from "@/components/ui/Doodles";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about buying, using, and customizing ODDLYRINALDI templates.",
  alternates: { canonical: `${site.url}/faq` },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
          <StarDoodle className="pointer-events-none absolute right-[10%] top-16 hidden h-6 w-6 text-yellow/70 lg:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">FAQ</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Frequently asked questions.
            </h1>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream pb-20 sm:pb-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
