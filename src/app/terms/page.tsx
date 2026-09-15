import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to using this site and purchasing templates.",
  alternates: { canonical: `${site.url}/terms` },
};

const sections = [
  {
    title: "Using this site",
    body: "By browsing this site or purchasing a template, you agree to these terms. If you don't agree, please don't use the site.",
  },
  {
    title: "Purchases",
    body: "Templates are sold as digital source code, delivered instantly after checkout. Prices are listed in USD on each template's detail page and are subject to change without notice for future purchases.",
  },
  {
    title: "Licensing",
    body: "Purchasing a template grants a license to use it as described in the License page — it does not transfer ownership of the underlying design or code as an original work.",
  },
  {
    title: "Availability",
    body: "Live demos and \"coming soon\" states are updated as templates ship. We do not guarantee a specific launch date for an unreleased demo.",
  },
  {
    title: "Limitation of liability",
    body: "Templates are provided as-is. We are not liable for damages arising from their use, modification, or deployment.",
  },
  {
    title: "Changes",
    body: "These terms may be updated from time to time; continued use of the site after a change constitutes acceptance of the new terms.",
  },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="March 2026">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="font-display text-lg font-bold text-ink">{section.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{section.body}</p>
        </div>
      ))}
    </LegalLayout>
  );
}
