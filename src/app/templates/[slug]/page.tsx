import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplatePreviewCard from "@/components/TemplatePreviewCard";
import TemplateBrowserPreview from "@/components/templates/TemplateBrowserPreview";
import TemplateMobilePreview from "@/components/templates/TemplateMobilePreview";
import TemplateGallery from "@/components/templates/TemplateGallery";
import TemplateMeta from "@/components/templates/TemplateMeta";
import TemplatePurchasePanel from "@/components/templates/TemplatePurchasePanel";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import {
  CrownDoodle,
  CurvedArrowDoodle,
  ScribbleDoodle,
  SparkleDoodle,
  StarDoodle,
} from "@/components/ui/Doodles";
import { getRelatedTemplates, getTemplateBySlug, templates } from "@/data/templates";
import { site } from "@/data/site";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return {};

  const title = `${template.name} — ${template.category} Template`;
  const description = template.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/templates/${template.slug}` },
    openGraph: { title, description, url: `${site.url}/templates/${template.slug}` },
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  const related = getRelatedTemplates(template.slug, 3);

  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
          <StarDoodle className="pointer-events-none absolute right-[8%] top-24 hidden h-6 w-6 text-yellow/70 lg:block" />
          <SparkleDoodle className="pointer-events-none absolute left-[3%] top-40 hidden h-5 w-5 text-purple/60 xl:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink/45">
              <Link href="/templates" data-cursor="view" className="hover:text-ink">
                Templates
              </Link>
              <span aria-hidden>/</span>
              <span>{template.category}</span>
              <span aria-hidden>/</span>
              <span className="text-ink/70">{template.name}</span>
            </div>

            <Link
              href="/#collection"
              data-cursor="view"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> Back to collection
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
                  {String(template.index).padStart(2, "0")} / 10 — {template.category}
                </p>
                <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  {template.name}
                </h1>
                <p className="mt-3 font-hand text-2xl text-coral">{template.personality}</p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65">
                  {template.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-10">
                  <div className="flex items-start gap-6">
                    <div className="relative min-w-0 flex-1">
                      <HandwrittenNote
                        className="pointer-events-none absolute -top-8 right-2 hidden text-lg text-ink/60 sm:block"
                        rotate={-3}
                      >
                        psst… hover it
                      </HandwrittenNote>
                      <TemplateBrowserPreview template={template} />
                    </div>

                    <TemplateMobilePreview template={template} />
                  </div>

                  {/*
                    Anchored to the preview itself (not the sticky purchase
                    column) so it always reads as pointing at the template,
                    regardless of how far the price panel has scrolled.
                  */}
                  <div className="pointer-events-none absolute left-full top-1/2 z-20 hidden -translate-y-1/2 items-center gap-4 pl-8 xl:flex">
                    <CurvedArrowDoodle className="h-20 w-28 -translate-y-2 scale-x-[-1] text-ink/45" />
                    <div className="flex flex-col items-start gap-3">
                      <HandwrittenNote className="text-xl text-ink/70" rotate={-3}>
                        yes, this one.
                      </HandwrittenNote>
                      <div className="w-44 2xl:w-52">
                        <Image
                          src="/characters/cat-point.png"
                          alt="A cat pointing toward the template preview, as if recommending it"
                          width={1152}
                          height={2048}
                          className="w-full -rotate-3 drop-shadow-[0_16px_18px_rgba(0,0,0,0.22)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative lg:sticky lg:top-28 lg:self-start">
                <CrownDoodle className="pointer-events-none absolute -top-7 right-6 hidden h-8 w-11 text-coral/70 sm:block" />
                <TemplatePurchasePanel template={template} />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Gallery
              </h2>
              <HandwrittenNote className="text-lg text-purple/80" rotate={-3}>
                look closer
              </HandwrittenNote>
            </div>
            <p className="mt-2 max-w-md text-sm text-ink/50">
              Temporary preview imagery — real product screenshots replace
              these before launch.
            </p>
            <div className="mt-8">
              <TemplateGallery template={template} />
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden border-t border-ink/10 bg-ink py-16 text-cream sm:py-20 lg:py-24"
          data-cursor-surface="dark"
        >
          <ScribbleDoodle className="pointer-events-none absolute right-[6%] top-12 hidden w-24 text-yellow/40 lg:block" />
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/45">
              Template story
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
              Why {template.name}?
            </h2>
            <p className="mt-3 font-hand text-xl text-cream/70">{template.personalityTraits}</p>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <StoryCard label="Concept" body={template.story.concept} />
              <StoryCard label="Who it's for" body={template.story.audience} />
              <StoryCard label="The experience" body={template.story.experience} />
              <StoryCard label="Signature detail" body={template.story.signature} />
              <StoryCard label="Best used for" body={template.story.useCase} />
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-paper/40 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              Made with care
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              What you get
            </h2>
            <div className="mt-10">
              <TemplateMeta template={template} />
            </div>
          </div>
        </section>

        <section className="relative border-t border-ink/10 bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                You might also like
              </h2>
              <HandwrittenNote className="text-lg text-lime/80" rotate={2}>
                click around
              </HandwrittenNote>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-6 sm:gap-7">
              <CurvedArrowDoodle className="pointer-events-none absolute -top-10 left-[18%] hidden h-10 w-16 rotate-[70deg] text-ink/30 sm:block" />
              {related.map((t) => (
                <Link key={t.slug} href={`/templates/${t.slug}`} data-cursor="view">
                  <TemplatePreviewCard template={t} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StoryCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-cream/15 pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/45">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-cream/80">{body}</p>
    </div>
  );
}
