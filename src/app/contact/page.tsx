import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { StarDoodle, SpeechBubbleDoodle } from "@/components/ui/Doodles";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message about a template, a project, or anything else.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
          <StarDoodle className="pointer-events-none absolute right-[10%] top-16 hidden h-6 w-6 text-yellow/70 lg:block" />
          <SpeechBubbleDoodle className="pointer-events-none absolute left-[6%] top-28 hidden h-9 w-11 text-blue/60 md:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
                  Contact
                </p>
                <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                  Say hello.
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65">
                  Questions about a template, a custom project, or just want
                  to talk shop — the form below reaches us directly.
                </p>
                <p className="mt-6 text-sm text-ink/55">
                  Prefer email? Write to{" "}
                  <a
                    href={`mailto:${site.supportEmail}`}
                    data-cursor="view"
                    className="font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
                  >
                    {site.supportEmail}
                  </a>
                  .
                </p>
              </div>

              <div className="max-w-xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
