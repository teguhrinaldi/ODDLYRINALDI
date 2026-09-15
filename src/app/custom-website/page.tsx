import type { Metadata } from "next";
import { MessageCircle, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomWebsiteHero from "@/components/custom-website/CustomWebsiteHero";
import CustomWebsiteForm from "@/components/custom-website/CustomWebsiteForm";
import CustomWebsiteFAQ from "@/components/custom-website/CustomWebsiteFAQ";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { ScribbleDoodle, StarDoodle } from "@/components/ui/Doodles";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/customWebsite";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Custom Website Design & Development",
  description:
    "Tell us your vision and request a custom website designed around your brand, personality, content, and technical needs.",
  alternates: { canonical: `${site.url}/custom-website` },
};

export default function CustomWebsitePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <CustomWebsiteHero />

        <section
          id="brief-form"
          className="relative scroll-mt-20 overflow-hidden border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              Creative brief
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Let&apos;s create a website that feels completely yours.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/60">
              Answer a few guided questions — it takes a few minutes. Nothing
              here is submitted to a server; at the end, your brief is handed
              straight to Oddlyrinaldi through WhatsApp or email.
            </p>

            <div className="mt-10">
              <CustomWebsiteForm />
            </div>
          </div>
        </section>

        <section
          data-cursor-surface="dark"
          className="relative overflow-hidden border-t border-ink/10 bg-ink py-16 text-center text-cream sm:py-20"
        >
          <StarDoodle className="pointer-events-none absolute left-[8%] top-10 hidden h-5 w-5 text-yellow/60 md:block" />
          <ScribbleDoodle className="pointer-events-none absolute bottom-8 right-[10%] hidden w-16 text-coral/40 lg:block" />
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            <HandwrittenNote className="text-lg text-coral" rotate={-2}>
              Prefer to talk first?
            </HandwrittenNote>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              No pressure to fill out the whole brief right now.
            </h2>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="go"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-cursor="view"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream hover:border-cream"
              >
                <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">FAQ</p>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Common questions about custom projects.
            </h2>
            <div className="mt-10">
              <CustomWebsiteFAQ />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
