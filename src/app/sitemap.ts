import type { MetadataRoute } from "next";
import { templates } from "@/data/templates";
import { journalArticles } from "@/data/journal";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/templates",
    "/about",
    "/journal",
    "/support",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/license",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const templateRoutes = templates.map((t) => ({
    url: `${site.url}/templates/${t.slug}`,
    lastModified: new Date(),
  }));

  const journalRoutes = journalArticles.map((a) => ({
    url: `${site.url}/journal/${a.slug}`,
    lastModified: new Date(a.date),
  }));

  return [...staticRoutes, ...templateRoutes, ...journalRoutes];
}
