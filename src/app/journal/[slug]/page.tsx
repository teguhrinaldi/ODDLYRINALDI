import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplatePreviewCard from "@/components/TemplatePreviewCard";
import ArticleNav from "@/components/journal/ArticleNav";
import TemplateStoryArticle from "@/components/journal/TemplateStoryArticle";
import {
  getAdjacentTemplateStories,
  getJournalArticleBySlug,
  getRelatedArticles,
  getTemplateStoryBySlug,
  journalArticles,
  templateStories,
} from "@/data/journal";
import { getRelatedTemplates, getTemplateBySlug } from "@/data/templates";
import { site } from "@/data/site";

export function generateStaticParams() {
  return [...journalArticles.map((a) => ({ slug: a.slug })), ...templateStories.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const story = getTemplateStoryBySlug(slug);
  if (story) {
    const template = getTemplateBySlug(story.templateSlug);
    return {
      title: `${template?.name ?? story.templateSlug} — ${story.headline}`,
      description: story.excerpt,
      alternates: { canonical: `${site.url}/journal/${story.slug}` },
    };
  }

  const article = getJournalArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${site.url}/journal/${article.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const story = getTemplateStoryBySlug(slug);
  if (story) {
    const template = getTemplateBySlug(story.templateSlug);
    if (!template) notFound();

    const { prev, next } = getAdjacentTemplateStories(story.slug);
    const related = getRelatedTemplates(template.slug, 3);

    return (
      <>
        <Navbar />
        <main className="pt-16 sm:pt-20">
          <article className="bg-cream py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <Link
                href="/journal"
                data-cursor="view"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" /> Back to journal
              </Link>

              <TemplateStoryArticle story={story} template={template} />
              <ArticleNav prev={prev} next={next} />
            </div>
          </article>

          {related.length > 0 && (
            <section className="border-t border-ink/10 bg-paper/40 py-16 sm:py-20">
              <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                  Other worlds worth exploring
                </h2>
                <div className="mt-8 flex flex-wrap gap-6 sm:gap-7">
                  {related.map((t) => (
                    <Link key={t.slug} href={`/templates/${t.slug}`} data-cursor="view">
                      <TemplatePreviewCard template={t} />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </>
    );
  }

  const article = getJournalArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = getRelatedArticles(article.slug, 2);
  const relatedTemplates = article.relatedTemplates
    .map((s) => getTemplateBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <article className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Link
              href="/journal"
              data-cursor="view"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> Back to journal
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              {article.category} · {formatDate(article.date)} · {article.readingTime}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {article.title}
            </h1>

            <div
              className="mt-10 aspect-video rounded-2xl border border-ink/10"
              style={{ backgroundColor: article.coverTint }}
            />

            <div className="mt-10 flex flex-col gap-5">
              {article.content.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {relatedTemplates.length > 0 && (
          <section className="border-t border-ink/10 bg-paper/40 py-16 sm:py-20">
            <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                Related templates
              </h2>
              <div className="mt-8 flex flex-wrap gap-6 sm:gap-7">
                {relatedTemplates.map((t) => (
                  <Link key={t.slug} href={`/templates/${t.slug}`} data-cursor="view">
                    <TemplatePreviewCard template={t} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedArticles.length > 0 && (
          <section className="border-t border-ink/10 bg-cream py-16 sm:py-20">
            <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                More from the journal
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/journal/${a.slug}`} data-cursor="read" className="group block">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                        {a.category}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-bold text-ink transition-colors group-hover:text-coral">
                        {a.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
