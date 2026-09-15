import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillButton from "@/components/ui/PillButton";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import {
  ScribbleDoodle,
  SparkleDoodle,
  StarDoodle,
  WavyLineDoodle,
} from "@/components/ui/Doodles";
import { creator } from "@/data/creator";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `About ${creator.name}`,
  description:
    "Meet Teguh Rinaldi, the creative developer behind ODDLYRINALDI, a personal digital studio creating premium website templates with personality, motion, and distinctive visual identities.",
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        {/* Creator hero */}
        <section className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-28">
          <StarDoodle className="pointer-events-none absolute right-[10%] top-20 hidden h-6 w-6 text-yellow/70 lg:block" />
          <SparkleDoodle className="pointer-events-none absolute left-[6%] top-32 hidden h-5 w-5 text-purple/60 md:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="relative mx-auto w-64 overflow-visible sm:w-80 lg:w-full">
                {/*
                  The source photo already carries its own hand-drawn halo,
                  glasses outline, crown, stars, and handwritten notes — baked
                  directly into the artwork. It's square (1254x1254), so the
                  frame matches that ratio exactly and uses object-contain:
                  the full composition stays visible, nothing gets cropped,
                  and no redundant doodle layer is stacked on top of it.
                */}
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]">
                  <Image
                    src={creator.photo}
                    alt="Teguh Rinaldi, founder and creative developer behind ODDLYRINALDI — portrait annotated with hand-drawn stars, a halo, and playful notes"
                    fill
                    sizes="(min-width: 1024px) 560px, 320px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
                  {creator.role}
                </p>
                <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  {creator.headline}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65">
                  I&apos;m {creator.name}, the creator behind {creator.studio} —
                  a creative digital studio focused on distinctive website
                  templates, expressive interfaces, motion, and memorable
                  digital experiences.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <Image
                    src={creator.signature}
                    alt={`${creator.name}'s signature`}
                    width={160}
                    height={160}
                    className="h-14 w-auto object-contain invert sm:h-16"
                  />
                  <div>
                    <p className="font-display text-base font-bold text-ink">{creator.name}</p>
                    <p className="text-sm text-ink/55">{creator.role}</p>
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <PillButton href="/templates" cursorLabel="explore">
                    Explore Templates
                  </PillButton>
                  <Link
                    href="/contact"
                    data-cursor="about"
                    className="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                  >
                    Contact the studio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is ODDLYRINALDI? */}
        <section
          className="relative overflow-hidden border-t border-ink/10 bg-ink py-16 text-cream sm:py-20 lg:py-24"
          data-cursor-surface="dark"
        >
          <ScribbleDoodle className="pointer-events-none absolute right-[8%] top-14 hidden w-24 text-yellow/40 lg:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/45">
                  What is {creator.studio}?
                </p>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
                  A personal digital studio built around one simple belief:
                  <br />
                  <span className="text-yellow">a website should have a personality.</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70">
                  Each template is designed as its own world — with a
                  different mood, visual language, interaction style, and
                  purpose. Some are dark and cinematic. Some are energetic.
                  Some are quiet and architectural. Some are playful and
                  unexpected. But every template is made to feel like more
                  than a collection of sections. It should feel like an
                  experience.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-cream/10 bg-cream/5 px-6 py-10 text-center">
                <span className="font-display text-lg font-bold tracking-tight">
                  ONE TEMPLATE
                </span>
                <WavyLineDoodle className="h-4 w-16 text-cream/30" />
                <span className="font-display text-lg font-bold tracking-tight text-yellow">
                  ONE IDENTITY
                </span>
                <WavyLineDoodle className="h-4 w-16 text-cream/30" />
                <span className="font-display text-lg font-bold tracking-tight">
                  ONE SIGNATURE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Who created it */}
        <section className="border-t border-ink/10 bg-paper/40 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              Who is behind it?
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-extrabold leading-snug tracking-tight text-ink sm:text-3xl">
              I&apos;m {creator.name}, a creative developer interested in
              building websites that feel expressive, interactive, and
              carefully designed.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65">
              I enjoy combining frontend development, visual design,
              animation, typography, interaction, and responsive systems.
              {" "}
              {creator.studio} is where I collect those ideas and turn them
              into usable website templates.
            </p>
          </div>
        </section>

        {/* The way I build */}
        <section className="relative border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                The way I build
              </h2>
              <HandwrittenNote className="text-lg text-coral/80" rotate={-3}>
                not another boring template
              </HandwrittenNote>
            </div>
            <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {creator.principles.map((line, i) => (
                <li key={line} className="group flex items-start gap-4">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-ink/15 transition-colors group-hover:text-coral/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-base font-medium leading-snug text-ink/75">
                    {line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-t border-ink/10 bg-paper/40 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Philosophy
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {creator.philosophy.map((item) => (
                <div key={item.title}>
                  <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="relative border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <ScribbleDoodle className="pointer-events-none absolute right-[8%] top-10 hidden w-24 text-lime/60 md:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              How a template gets made
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {creator.process.map((item) => (
                <li key={item.step}>
                  <span className="font-display text-sm font-bold text-ink/30">{item.step}</span>
                  <h3 className="mt-2 font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Skills & tools */}
        <section className="border-t border-ink/10 bg-paper/40 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Skills & tools
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {creator.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink/70"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Links + CTA */}
        <section className="border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Find the rest of the work
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
                  Portfolio and social links below — placeholders for now,
                  swapped for real profiles soon.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <SocialLink href={creator.portfolioUrl} label="Portfolio">
                  <Image
                    src={creator.signature}
                    alt=""
                    width={80}
                    height={80}
                    className="h-4 w-4 object-contain invert"
                  />
                </SocialLink>
                <SocialLink href={creator.instagramUrl} label="Instagram">
                  <InstagramIcon />
                </SocialLink>
                <SocialLink href={creator.linkedinUrl} label="LinkedIn">
                  <LinkedInIcon />
                </SocialLink>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 border-t border-ink/10 pt-10">
              <PillButton href="/templates" cursorLabel="explore">
                Explore Templates
              </PillButton>
              <PillButton href="/contact" variant="outline" cursorLabel="about">
                Contact the Studio
              </PillButton>
              <PillButton
                href={creator.portfolioUrl}
                variant="outline"
                cursorLabel="view"
                target={creator.portfolioUrl === "#" ? undefined : "_blank"}
                rel={creator.portfolioUrl === "#" ? undefined : "noreferrer noopener"}
              >
                Visit Portfolio
                <ExternalLink className="h-3.5 w-3.5" />
              </PillButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const isPlaceholder = href === "#";
  return (
    <a
      href={href}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noreferrer noopener"}
      aria-label={isPlaceholder ? `${label} (link coming soon)` : label}
      data-cursor="view"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z" />
      <path d="M20.5 13.6c0-3-1.9-4.4-4.4-4.4-1.7 0-2.8.94-3.3 1.85V8.5H9.44c.04.98 0 12 0 12h3.36v-6.7c0-.36.03-.72.13-.98.3-.72.98-1.47 2.12-1.47 1.5 0 2.1 1.14 2.1 2.8v6.35h3.36v-6.9Z" />
    </svg>
  );
}
