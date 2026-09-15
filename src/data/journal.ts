export type JournalArticle = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO date
  readingTime: string;
  excerpt: string;
  /** TEMPORARY PREVIEW IMAGE — REPLACE BEFORE COMMERCIAL RELEASE */
  coverTint: string;
  content: string[];
  relatedTemplates: string[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "why-every-template-needs-a-personality",
    title: "Why Every Template Needs a Personality",
    category: "Design",
    date: "2026-01-14",
    readingTime: "5 min read",
    excerpt:
      "A template without a point of view is just a layout. Here's why ODDLYRINALDI starts every project with a character, not a grid.",
    coverTint: "#2a2320",
    content: [
      "Most template marketplaces sell layouts. A hero, a features grid, a footer — rearranged just enough to feel like a new product. It works, technically. It also means almost nothing you buy feels like it was made for you.",
      "When we started ODDLYRINALDI, the rule was simple: no template ships until it has a personality strong enough to describe in one sentence. NOIRÉ is 'dark and mysterious.' AZURA is 'soft but precise.' If we can't say it in five words, the template isn't done.",
      "That constraint changes everything downstream — the type pairing, the motion timing, even how much whitespace a section is allowed to breathe in. Personality isn't a coat of paint at the end. It's the brief.",
      "The result is templates that feel considered rather than assembled. That's the whole bet.",
    ],
    relatedTemplates: ["noire", "arcana"],
  },
  {
    slug: "building-motion-without-making-a-website-annoying",
    title: "Building Motion Without Making a Website Annoying",
    category: "Development",
    date: "2026-01-22",
    readingTime: "6 min read",
    excerpt:
      "Motion is the easiest way to make a website feel cheap. Here's the restraint system behind ODDLYRINALDI's animation choices.",
    coverTint: "#101010",
    content: [
      "The fastest way to make a premium-looking site feel amateur is to animate everything. Bouncing icons, spinning logos, parallax on every element — it reads as effort, not craft.",
      "Our rule of thumb: something should be still by default. Movement is a signal, and signals only work against a quiet baseline. That's why a single character gets a moment on a page instead of five doodles all wiggling at once.",
      "We also gate everything behind prefers-reduced-motion, not as an afterthought but as a design constraint from day one — if a page doesn't work with motion turned off, the layout was leaning on a crutch.",
      "Framer Motion makes the mechanics easy. The discipline is entirely about what you choose not to animate.",
    ],
    relatedTemplates: ["vanta", "forge"],
  },
  {
    slug: "the-story-behind-oddlyrinaldi",
    title: "The Story Behind ODDLYRINALDI",
    category: "Studio",
    date: "2026-02-02",
    readingTime: "4 min read",
    excerpt: "Why a template studio needed its own weird little mascots, and how the name actually happened.",
    coverTint: "#f5f0e6",
    content: [
      "ODDLYRINALDI started as a side answer to a boring question: why do so many 'creative studio' websites look like insurance companies? Clean isn't the same as memorable.",
      "The characters — the cat, the dog, the duck — weren't a marketing decision. They were sketches that stuck around because they made the site feel like a place instead of a product page.",
      "The name is exactly as odd as it sounds, on purpose. A studio selling personality should probably have one.",
    ],
    relatedTemplates: ["atelier", "velora"],
  },
  {
    slug: "designing-for-scroll-and-surprise",
    title: "Designing for Scroll and Surprise",
    category: "Design",
    date: "2026-02-11",
    readingTime: "5 min read",
    excerpt:
      "Scroll-triggered reveals are everywhere. Here's how we decide which moments earn one and which don't.",
    coverTint: "#e4e9f7",
    content: [
      "Every section doesn't need a fade-up. If everything reveals the same way, scrolling starts to feel like flipping through a slideshow rather than reading a page.",
      "We try to give each section its own motion identity — a carousel reveals horizontally, a manifesto section staggers, a footer barely moves at all. The variation is what keeps scrolling feeling alive instead of templated.",
      "The best compliment we can get on a scroll interaction is that nobody mentions it. It should feel inevitable, not clever.",
    ],
    relatedTemplates: ["azura", "estatex"],
  },
  {
    slug: "from-concept-to-commercial-template",
    title: "From Concept to Commercial Template",
    category: "Process",
    date: "2026-02-20",
    readingTime: "7 min read",
    excerpt: "What actually happens between a mood board and a template you can buy.",
    coverTint: "#2b2733",
    content: [
      "A template starts as a single reference image and a one-line personality brief. From there it's a rough layout pass in the browser — real type, real spacing, no Figma detours pretending to be final.",
      "Once the structure holds up, we build out the full page set: home, detail templates, and whatever the category actually needs (a menu system for a restaurant, a listings grid for real estate).",
      "The last stretch is the least glamorous and most important: responsive passes at five breakpoints, accessibility checks, and a lint/build pass with zero warnings before anything ships.",
    ],
    relatedTemplates: ["syntra", "lumora"],
  },
  {
    slug: "why-generic-templates-feel-forgettable",
    title: "Why Generic Templates Feel Forgettable",
    category: "Opinion",
    date: "2026-03-01",
    readingTime: "4 min read",
    excerpt: "A short argument for why 'clean and modern' stopped being a compliment.",
    coverTint: "#f8e9dc",
    content: [
      "Open ten template marketplaces and you'll see the same hero four different ways: big headline, subtext, two buttons, a stock photo of someone laughing at a laptop.",
      "None of that is wrong. It's just invisible. A visitor's brain has seen it enough times to stop reading it as a choice.",
      "The fix isn't more decoration — it's specificity. A restaurant site should feel like the restaurant. A gym site should feel like the gym. That's the whole premise of building ten templates as ten different worlds instead of one theme with ten color palettes.",
    ],
    relatedTemplates: ["forge", "vanta"],
  },
];

export function getJournalArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 2): JournalArticle[] {
  return journalArticles.filter((a) => a.slug !== slug).slice(0, count);
}
