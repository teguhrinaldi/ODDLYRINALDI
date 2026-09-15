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

/**
 * Editorial "design story" for one template — the philosophy and thinking
 * behind it, grounded in the real feature set and copy from `templates.ts`
 * (see `story` there). Distinct from `JournalArticle` (the studio's more
 * general process/opinion notes) so the two can evolve independently.
 */
export type TemplateStorySection = {
  heading: string;
  paragraphs: string[];
};

export type TemplateStory = {
  slug: string;
  /** Links back to the matching entry in `templates.ts`. */
  templateSlug: string;
  eyebrow: string;
  headline: string;
  excerpt: string;
  date: string;
  readingTime: string;
  /** One-line, quotable design philosophy — the thesis of the piece. */
  philosophy: string;
  intro: string;
  sections: TemplateStorySection[];
  closingThought: string;
};

export const templateStories: TemplateStory[] = [
  {
    slug: "noire-culinary-choreography",
    templateSlug: "noire",
    eyebrow: "Fine Dining / Restaurant",
    headline: "Culinary Choreography",
    excerpt:
      "NOIRÉ treats a restaurant's website like the first course of the meal — dark, paced, and never in a hurry to sell a reservation.",
    date: "2026-03-08",
    readingTime: "5 min read",
    philosophy: "A dining experience should begin before the first course.",
    intro:
      "NOIRÉ started with a question: what if a restaurant's website felt less like a menu screenshot and more like the ten minutes before your food arrives — the part where you're already leaning in?",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "Most restaurant sites lead with information: address, hours, a reservation button above the fold. NOIRÉ leads with mood instead, on the belief that a guest decides how they feel about a place long before they read what's on the menu.",
          "The hero is allowed to hold the screen. No offer competes with it, no banner interrupts it — the site earns the right to ask for a reservation only after it has made its case.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Deep contrast and restrained color set the tone — this is a dark room, not a bright storefront. Type is confident and editorial rather than friendly, closer to a menu card than a landing page.",
          "Photography carries the atmosphere: dim, tactile, a dark editorial grid rather than stock-photo lighting. Nothing is decorative for its own sake — every image is doing the work of setting a mood.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature move is patience. The reservation call-to-action doesn't appear until the cinematic hero has had its full moment — it never competes with the first impression.",
          "It's a small, deliberate delay, and it's the whole argument of the template: NOIRÉ would rather be felt for three extra seconds than clicked through in one.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Chef-led restaurants and hospitality groups who want a site as considered as the food — a single-location restaurant or a chef's table concept launching its first real digital home, not a franchise needing ten location pages.",
        ],
      },
    ],
    closingThought: "NOIRÉ isn't a restaurant website. It's the first course.",
  },
  {
    slug: "estatex-space-without-the-noise",
    templateSlug: "estatex",
    eyebrow: "Real Estate / Listings",
    headline: "Space, Without the Noise",
    excerpt:
      "ESTATEX trades loud sales copy for clarity — a calm, confident home for listings that are the real product, not the pitch.",
    date: "2026-03-15",
    readingTime: "4 min read",
    philosophy: "The best listing page gets out of the property's way.",
    intro:
      "Most real-estate sites shout: bold banners, countdown offers, an agent's face in every hero. ESTATEX asks a different question — what if the property did the talking?",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "ESTATEX is built on the idea that clarity sells better than noise. Large photography and calm typography let a property speak for itself instead of competing with the page around it.",
          "That restraint is a trust signal. An agency that isn't shouting reads as an agency that doesn't need to.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "A cool, neutral palette and generous whitespace keep the focus on photography, not decoration. Typography stays quiet and legible — this is a site meant to be read at a glance, not admired for its type system.",
          "The listings grid is treated like a catalog: consistent and filterable, never dressed up with effects that would make two different properties look like the same product.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature is consistency rather than a single flashy moment: a filterable listings grid that feels like browsing a catalog, and a property detail page that opens with the exact same calm pacing as the homepage. Nothing about ESTATEX feels bolted on.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Boutique agencies and independent agents whose listings are the real product and don't need extra noise around them — the kind of agency that wants to look like the most trustworthy option on the block.",
        ],
      },
    ],
    closingThought: "ESTATEX gives space the attention it deserves, and nothing more.",
  },
  {
    slug: "azura-a-moment-designed-to-be-felt",
    templateSlug: "azura",
    eyebrow: "Hospitality / Booking",
    headline: "A Moment Designed to Be Felt",
    excerpt:
      "AZURA sells a feeling before it sells a room — a breathing, resort-grade site built around whitespace, horizon lines, and a booking flow that waits its turn.",
    date: "2026-03-22",
    readingTime: "5 min read",
    philosophy: "A guest should feel the place before they're asked to book it.",
    intro:
      "A resort is rarely booked because of its amenities list. It's booked because of a feeling — and AZURA is built to get that feeling across before a single price appears.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "AZURA is built around whitespace and horizon lines, so the destination sells the room before a single amenity is listed. The site is unhurried on purpose.",
          "A full-screen hero is allowed to breathe, mirroring how a guest actually decides where to stay: with a feeling first, a comparison second.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Soft, precise, and immersive — large-format imagery and generous negative space set a resort tone without ever tipping into clutter.",
          "Every section is paced like a breath: image, pause, detail, pause. Nothing is rushed onto the screen at once.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature move is restraint: booking never interrupts the mood. The reservation call-to-action drifts in only once a guest has felt the place, following a room and suite showcase built to mirror how people actually choose where to stay.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Boutique hotels and resorts with strong photography and a story to tell before the booking form — brands selling a feeling first and a room second.",
        ],
      },
    ],
    closingThought: "AZURA is designed so the first impression is already part of the stay.",
  },
  {
    slug: "arcana-the-monograph-of-a-project",
    templateSlug: "arcana",
    eyebrow: "Architecture / Studio",
    headline: "The Monograph, Not the Brochure",
    excerpt:
      "ARCANA treats a project archive like a monograph — generous margins, quiet pacing, and a grid that gives serious work room to be looked at.",
    date: "2026-03-29",
    readingTime: "4 min read",
    philosophy: "Some work deserves silence before it deserves a caption.",
    intro:
      "Architecture portfolios usually behave like brochures: a hero shot, a caption, a next button. ARCANA behaves like a monograph instead — the kind of book you slow down for.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "ARCANA treats a project archive like a monograph, not a slideshow. Grid-driven layouts and generous margins give a firm's work room to be looked at, not scrolled past.",
          "It's built for studios whose portfolio needs to be read, not skimmed — a small number of serious projects that deserve real depth over a large number of thin ones.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Structural, conceptual, and quiet — a project grid with filtering leads into a case-study template built for drawings and process, not just hero shots of finished buildings.",
          "The tone stays exacting throughout: confident type, disciplined spacing, and nothing competing for attention with the work itself.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature moment is patience: every case study opens on a single image, held in silence, before any text appears. It's a small pause that asks a visitor to actually look before they read.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Architecture studios and firms with a small, serious body of work — practices that would rather show five projects properly than fifteen thinly.",
        ],
      },
    ],
    closingThought: "ARCANA gives a project room to be looked at before it's explained.",
  },
  {
    slug: "velora-the-work-is-the-pitch",
    templateSlug: "velora",
    eyebrow: "Creative Agency / Portfolio",
    headline: "The Work Is the Pitch",
    excerpt:
      "VELORA is built for studios who sell taste as much as output — bold type, an unapologetic case-study flow, and just enough irregularity to prove a human made it.",
    date: "2026-04-05",
    readingTime: "4 min read",
    philosophy: "A portfolio should look like the studio that made it, not a pitch deck about it.",
    intro:
      "Most agency sites are careful to the point of being invisible. VELORA is built for studios who'd rather be recognizable than safe.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "VELORA is built for studios and agencies who sell taste as much as output. The site is designed to look like the work, not like a pitch deck explaining the work.",
          "That means bold type and just enough irregularity to prove a person — not a template generator — designed it.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Energetic, expressive, and unapologetically human. An oversized editorial hero sets the tone before visitors ever reach the case-study archive.",
          "Nothing about the layout apologizes for taking up space — this is a studio site built to be looked at, not politely skimmed.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature move is rhythm: the layout shifts from case study to case study, so nothing repeats exactly the same way twice. Scrolling through the archive should feel like flipping through a studio's actual process, not a repeating card component.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Small studios and collectives that want their personality to be the pitch — agencies whose site should look like the work, not like a deck about the work.",
        ],
      },
    ],
    closingThought: "VELORA lets the work argue for itself.",
  },
  {
    slug: "forge-built-to-move",
    templateSlug: "forge",
    eyebrow: "Fitness / Gym / Coaching",
    headline: "Built to Move",
    excerpt:
      "FORGE is kinetic by design — a high-energy template built for gyms, coaches, and performance brands that need their site to match the intensity of the workout.",
    date: "2026-04-12",
    readingTime: "4 min read",
    philosophy: "A website for a gym should feel like it just finished a set.",
    intro: "A gym's website is usually the calmest thing about the gym. FORGE was built to close that gap.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "FORGE is built to move. Kinetic type and a class-schedule system are designed to feel as intense as the workout itself, not like a calm brochure bolted onto a loud brand.",
          "The site goes straight from a high-energy hero into a class and program schedule grid built for quick scanning — a fast path to 'when's the next class,' not a scroll-and-hope.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Kinetic, disciplined, physical, loud — the type system carries weight and motion, and the layout favors momentum over politeness.",
          "Coach profile cards, membership pricing tiers, and a transformation/results gallery all read as evidence, not decoration.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature is in a detail most visitors won't consciously notice: hover states hit like a rep count — sharp, immediate, with no easing softness. Nothing lingers or drifts; it lands.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Gyms, coaches, and performance brands that train hard and want a site selling a program, not just a location.",
        ],
      },
    ],
    closingThought: "FORGE doesn't describe intensity. It moves like it.",
  },
  {
    slug: "atelier-the-art-of-the-considered-detail",
    templateSlug: "atelier",
    eyebrow: "Fashion / Lookbook",
    headline: "The Art of the Considered Detail",
    excerpt:
      "ATELIER moves like a lookbook — full-bleed imagery and slow, editorial pacing that gives clothing room to breathe.",
    date: "2026-04-19",
    readingTime: "4 min read",
    philosophy: "Craft doesn't rush, and neither should the page showing it.",
    intro:
      "Fashion sites usually compete with their own UI — buttons, badges, chrome everywhere. ATELIER was built to get out of the clothes' way.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "ATELIER moves like a lookbook: full-bleed imagery, slow pacing, and a collection template that gives clothing room to breathe instead of competing with UI chrome.",
          "The pacing is the point — this is a template for labels whose collection is the whole story, not a supporting cast to a sale banner.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Editorial, tactile, controlled, and slow. Typography stays sophisticated and quiet, letting photography carry the season's story.",
          "A stockist/press section and newsletter capture exist, but never at the expense of the full-bleed imagery that does the actual selling.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature move is pacing itself: nothing moves quickly. Every transition is paced like a page turn, not a scroll — closer to flipping through a printed lookbook than browsing a feed.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Fashion labels and studios with strong photography and a seasonal drop to showcase — brands whose collection is the whole story.",
        ],
      },
    ],
    closingThought: "ATELIER is a digital space for things made slowly, and shown just as slowly.",
  },
  {
    slug: "syntra-content-before-price",
    templateSlug: "syntra",
    eyebrow: "Education / Courses / Cohort",
    headline: "Content Sells Before the Price Does",
    excerpt:
      "SYNTRA is built for teaching, not just marketing — a curriculum-first layout that builds trust before it asks for a decision.",
    date: "2026-04-26",
    readingTime: "5 min read",
    philosophy: "Content should sell a course before the price ever gets a chance to.",
    intro:
      "Most course sites lead with a countdown timer and a price. SYNTRA leads with the curriculum, on the bet that a serious course sells itself if you actually show it.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "SYNTRA is built for teaching, not just marketing. A curriculum layout makes a course feel structured, and an instructor profile does the credibility work a testimonial carousel usually tries to fake.",
          "Enrollment is treated as the natural next step of a clear pitch, not the thing the whole page is racing toward.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Structured, clear, connected, and credible — the type system favors legibility over flourish, since the content itself is the selling point.",
          "A module-by-module curriculum breakdown, student testimonials, and an FAQ accordion are laid out like a syllabus a serious student would actually want to read.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature choice is placement: the enrollment call-to-action sits beside the curriculum, not above it. The content sells before the price ever gets a chance to.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Cohort-based courses, educators, and instructors who need to build trust fast — a course that needs to look as credible as it actually is.",
        ],
      },
    ],
    closingThought: "SYNTRA lets the curriculum make the first argument.",
  },
  {
    slug: "vanta-lit-like-a-reveal",
    templateSlug: "vanta",
    eyebrow: "Automotive / Performance",
    headline: "Lit Like a Reveal",
    excerpt:
      "VANTA treats a vehicle lineup like a reveal — high-contrast photography and spec sheets that read like data, built for brands selling precision as much as horsepower.",
    date: "2026-05-03",
    readingTime: "4 min read",
    philosophy: "A vehicle should be lit like a reveal, not photographed like inventory.",
    intro: "Most dealership sites photograph cars like inventory. VANTA photographs them like an unveiling.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "VANTA treats a vehicle lineup like a reveal. High-contrast photography and spec sheets that read like data replace the flat, over-lit catalog shots most automotive sites default to.",
          "The layout is configurator-ready, built for dealerships, detailers, and performance brands who sell precision as much as they sell horsepower.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Controlled, engineered, dynamic, and dark — a dark-mode base and high-contrast type give every page the tension of a reveal event rather than a listings page.",
          "A model lineup with spec comparison and a dealer/location finder stay legible against the dark backdrop without ever softening the mood.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature discipline is lighting: vehicle imagery is always lit like a reveal, never a flat catalog shot. It's a small rule applied consistently across every model, and it's what keeps the whole lineup feeling premium.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Dealerships, detailers, and performance shops with a lineup worth showing off — brands selling precision as much as horsepower.",
        ],
      },
    ],
    closingThought: "VANTA doesn't list a lineup. It reveals one.",
  },
  {
    slug: "lumora-a-shop-of-people",
    templateSlug: "lumora",
    eyebrow: "Grooming / Wellness",
    headline: "A Shop of People, Not Services",
    excerpt:
      "LUMORA treats a cut like a craft — a warm, booking-first site built around the people doing the work, not just the services on the menu.",
    date: "2026-05-10",
    readingTime: "4 min read",
    philosophy: "A shop of people is not the same as a shop of services.",
    intro: "Most barbershop sites list services like a price sheet. LUMORA starts with the people holding the clippers.",
    sections: [
      {
        heading: "The Idea",
        paragraphs: [
          "LUMORA is built for shops that treat a cut like a craft. A booking-first layout and a service menu that reads like a bar menu replace the usual price-list approach.",
          "The site is built to build repeat clients, not just first bookings — familiarity is the actual product being sold.",
        ],
      },
      {
        heading: "The Visual Language",
        paragraphs: [
          "Warm, personal, precise, and repeat-worthy. The palette stays warm rather than clinical, and the pacing favors a first visit that already feels familiar.",
          "A before/after gallery and a location/hours block sit alongside the booking flow without ever making the shop feel like a chain.",
        ],
      },
      {
        heading: "The Interaction",
        paragraphs: [
          "The signature choice is the roster: every barber gets a real profile card. This is a shop of people, not just services — a visitor picks a barber, not a slot.",
        ],
      },
      {
        heading: "Who It Is For",
        paragraphs: [
          "Barbershops and grooming studios that live and die on repeat clients, where booking should feel like the easiest part of the visit.",
        ],
      },
    ],
    closingThought: "LUMORA makes a cut feel like a ritual, not a transaction.",
  },
];

export function getTemplateStoryBySlug(slug: string): TemplateStory | undefined {
  return templateStories.find((s) => s.slug === slug);
}

export function getAdjacentTemplateStories(slug: string): {
  prev?: TemplateStory;
  next?: TemplateStory;
} {
  const i = templateStories.findIndex((s) => s.slug === slug);
  if (i === -1) return {};
  return {
    prev: templateStories[i - 1],
    next: templateStories[i + 1],
  };
}
