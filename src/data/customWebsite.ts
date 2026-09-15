import type { FaqItem } from "@/data/faq";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";

export type Option = { id: string; label: string };

/** Local number the user gave us, converted to the wa.me international format (082... -> 62...). */
function toWhatsAppNumber(localNumber: string) {
  const digits = localNumber.replace(/\D/g, "");
  return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
}

export const WHATSAPP_NUMBER = toWhatsAppNumber("082111639803");
export const CONTACT_EMAIL = "teguhrinaldi23@gmail.com";

export const WEBSITE_TYPES: Option[] = [
  { id: "personal-portfolio", label: "Personal portfolio" },
  { id: "creative-portfolio", label: "Creative portfolio" },
  { id: "business-website", label: "Business website" },
  { id: "company-profile", label: "Company profile" },
  { id: "landing-page", label: "Landing page" },
  { id: "online-store", label: "Online store" },
  { id: "restaurant-cafe", label: "Restaurant / café" },
  { id: "agency-website", label: "Agency website" },
  { id: "event-website", label: "Event website" },
  { id: "personal-brand", label: "Personal brand" },
  { id: "blog-magazine", label: "Blog / magazine" },
  { id: "community-website", label: "Community website" },
  { id: "other", label: "Other" },
];

export const PERSONALITY_OPTIONS: Option[] = [
  { id: "minimal", label: "Minimal" },
  { id: "elegant", label: "Elegant" },
  { id: "playful", label: "Playful" },
  { id: "bold", label: "Bold" },
  { id: "experimental", label: "Experimental" },
  { id: "futuristic", label: "Futuristic" },
  { id: "editorial", label: "Editorial" },
  { id: "luxury", label: "Luxury" },
  { id: "warm", label: "Warm" },
  { id: "friendly", label: "Friendly" },
  { id: "professional", label: "Professional" },
  { id: "artistic", label: "Artistic" },
  { id: "dark-cinematic", label: "Dark and cinematic" },
  { id: "colorful-energetic", label: "Colorful and energetic" },
  { id: "brutalist", label: "Brutalist" },
  { id: "retro", label: "Retro" },
  { id: "soft-calm", label: "Soft and calm" },
  { id: "tech-inspired", label: "Tech-inspired" },
];

export const COLOR_DIRECTIONS: Option[] = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "monochrome", label: "Monochrome" },
  { id: "neutral", label: "Neutral" },
  { id: "warm", label: "Warm" },
  { id: "colorful", label: "Colorful" },
  { id: "pastel", label: "Pastel" },
  { id: "neon", label: "Neon" },
  { id: "earthy", label: "Earthy" },
  { id: "high-contrast", label: "High contrast" },
  { id: "has-brand-colors", label: "I already have brand colors" },
];

export const TYPOGRAPHY_OPTIONS: Option[] = [
  { id: "modern-sans", label: "Modern sans-serif" },
  { id: "elegant-serif", label: "Elegant serif" },
  { id: "editorial-type", label: "Editorial" },
  { id: "experimental-type", label: "Experimental" },
  { id: "monospace", label: "Monospace" },
  { id: "handwritten", label: "Handwritten" },
  { id: "mixed-typography", label: "Mixed typography" },
  { id: "designer-decide", label: "Let the designer decide" },
];

export const ANIMATION_PREFERENCES: Option[] = [
  { id: "minimal-subtle", label: "Minimal and subtle" },
  { id: "smooth-premium", label: "Smooth and premium" },
  { id: "playful-interactive", label: "Playful and interactive" },
  { id: "cinematic", label: "Cinematic" },
  { id: "experimental-motion", label: "Experimental" },
  { id: "very-animated", label: "Very animated" },
  { id: "mostly-static", label: "Mostly static" },
];

export const ASSET_SOURCE_OPTIONS: Option[] = [
  { id: "own-assets", label: "I will provide my own assets" },
  { id: "public-assets", label: "Use public assets" },
  { id: "mix-assets", label: "Mix of my assets and public assets" },
  { id: "need-help-assets", label: "I need help finding suitable assets" },
];

export const ASSET_PRIVACY_OPTIONS: Option[] = [
  { id: "public-ok", label: "Public assets are okay" },
  { id: "private-only", label: "Use only my private assets" },
  { id: "combination", label: "Use a combination" },
  { id: "not-sure", label: "I am not sure yet" },
];

export const ASSET_CHECKLIST: Option[] = [
  { id: "logo", label: "Logo" },
  { id: "brand-colors", label: "Brand colors" },
  { id: "brand-guideline", label: "Brand guideline" },
  { id: "personal-photos", label: "Personal photos" },
  { id: "product-photos", label: "Product photos" },
  { id: "team-photos", label: "Team photos" },
  { id: "illustrations", label: "Illustrations" },
  { id: "videos", label: "Videos" },
  { id: "icons", label: "Icons" },
  { id: "product-information", label: "Product information" },
  { id: "written-copy", label: "Written copy" },
  { id: "social-media-content", label: "Social media content" },
  { id: "none-yet", label: "None yet" },
];

export const TECH_STACK_OPTIONS: Option[] = [
  { id: "recommend-tech", label: "I do not know — recommend the best option" },
  { id: "nextjs", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "html-css-js", label: "HTML / CSS / JavaScript" },
  { id: "wordpress", label: "WordPress" },
  { id: "webflow", label: "Webflow" },
  { id: "shopify", label: "Shopify" },
  { id: "other-tech", label: "Other" },
];

export const HOSTING_OPTIONS: Option[] = [
  { id: "have-hosting", label: "I already have hosting" },
  { id: "netlify", label: "Netlify" },
  { id: "vercel", label: "Vercel" },
  { id: "cpanel", label: "cPanel hosting" },
  { id: "cloudflare-pages", label: "Cloudflare Pages" },
  { id: "wordpress-hosting", label: "WordPress hosting" },
  { id: "recommend-hosting", label: "I need a recommendation" },
  { id: "other-hosting", label: "Other" },
];

export const FEATURE_OPTIONS: Option[] = [
  { id: "responsive-design", label: "Responsive design" },
  { id: "cms", label: "CMS / content management" },
  { id: "blog", label: "Blog" },
  { id: "product-catalog", label: "Product catalog" },
  { id: "online-store-feature", label: "Online store" },
  { id: "contact-form", label: "Contact form" },
  { id: "whatsapp-button", label: "WhatsApp button" },
  { id: "newsletter-form", label: "Newsletter form" },
  { id: "booking-form", label: "Booking form" },
  { id: "reservation-form", label: "Reservation form" },
  { id: "user-login", label: "User login" },
  { id: "admin-dashboard", label: "Admin dashboard" },
  { id: "search", label: "Search" },
  { id: "filter-sorting", label: "Filter and sorting" },
  { id: "gallery", label: "Gallery" },
  { id: "video-section", label: "Video section" },
  { id: "testimonials", label: "Testimonials" },
  { id: "pricing-section", label: "Pricing section" },
  { id: "multi-language", label: "Multi-language support" },
  { id: "seo-setup", label: "SEO setup" },
  { id: "analytics", label: "Analytics integration" },
  { id: "dark-mode", label: "Dark mode" },
  { id: "custom-animations", label: "Custom animations" },
  { id: "custom-cursor", label: "Custom cursor" },
  { id: "page-transitions", label: "Page transitions" },
  { id: "3d-elements", label: "3D elements" },
  { id: "other-feature", label: "Other" },
];

export const BACKEND_OPTIONS: Option[] = [
  { id: "frontend-only", label: "Frontend only" },
  { id: "frontend-simple-form", label: "Frontend with simple form integration" },
  { id: "full-stack", label: "Full-stack website" },
  { id: "cms-required", label: "CMS required" },
  { id: "database-required", label: "Database required" },
  { id: "not-sure-backend", label: "I am not sure" },
];

export const ADDITIONAL_SERVICE_OPTIONS: Option[] = [
  { id: "logo-design", label: "Logo design" },
  { id: "brand-identity", label: "Brand identity" },
  { id: "color-palette", label: "Color palette" },
  { id: "typography-selection", label: "Typography selection" },
  { id: "copywriting", label: "Copywriting" },
  { id: "content-writing", label: "Website content writing" },
  { id: "image-selection", label: "Image selection" },
  { id: "image-editing", label: "Image editing" },
  { id: "illustration", label: "Illustration" },
  { id: "custom-icons", label: "Custom icons" },
  { id: "motion-design", label: "Motion design" },
  { id: "3d-elements-service", label: "3D elements" },
  { id: "seo-basics", label: "SEO basics" },
  { id: "deployment", label: "Deployment" },
  { id: "domain-setup", label: "Domain setup guidance" },
  { id: "hosting-setup", label: "Hosting setup guidance" },
  { id: "cms-setup", label: "CMS setup" },
  { id: "maintenance", label: "Maintenance" },
  { id: "future-updates", label: "Future updates" },
  { id: "social-media-design", label: "Social media design" },
  { id: "no-additional-services", label: "No additional services" },
];

export const BUDGET_OPTIONS: Option[] = [
  { id: "under-1m", label: "Under Rp1.000.000" },
  { id: "1m-3m", label: "Rp1.000.000 – Rp3.000.000" },
  { id: "3m-5m", label: "Rp3.000.000 – Rp5.000.000" },
  { id: "5m-10m", label: "Rp5.000.000 – Rp10.000.000" },
  { id: "10m-plus", label: "Rp10.000.000+" },
  { id: "recommend-budget", label: "I need a recommendation" },
  { id: "discuss-first", label: "I prefer to discuss first" },
];

export const TIMELINE_OPTIONS: Option[] = [
  { id: "asap", label: "As soon as possible" },
  { id: "1-2-weeks", label: "1–2 weeks" },
  { id: "2-4-weeks", label: "2–4 weeks" },
  { id: "1-2-months", label: "1–2 months" },
  { id: "flexible", label: "Flexible" },
  { id: "not-sure-timeline", label: "I am not sure yet" },
];

export const PAGE_COUNT_OPTIONS: Option[] = [
  { id: "one-landing-page", label: "One landing page" },
  { id: "2-4-pages", label: "2–4 pages" },
  { id: "5-8-pages", label: "5–8 pages" },
  { id: "9-15-pages", label: "9–15 pages" },
  { id: "15-plus-pages", label: "15+ pages" },
  { id: "not-sure-pages", label: "I am not sure" },
];

export const FORM_STEPS = [
  { title: "Basic identity", description: "First, tell us about your project" },
  { title: "Website personality", description: "What personality should your website have?" },
  { title: "Visual direction", description: "What should the visual direction feel like?" },
  { title: "Content & assets", description: "What content and assets do you already have?" },
  { title: "Technical preferences", description: "How should your website be built?" },
  { title: "Additional services", description: "Would you like help with anything else?" },
  { title: "Budget & timeline", description: "Let’s understand the project scope" },
  { title: "Review your brief", description: "Check everything before it goes to the studio" },
] as const;

export const HOW_IT_WORKS = [
  { label: "Tell us what you imagine", detail: "Fill out a guided creative brief — no jargon required." },
  { label: "We shape the direction", detail: "We review your brief and come back with scope, price, and timeline." },
  { label: "You approve on WhatsApp", detail: "Confirm the details directly in chat and the build begins." },
];

export const PERSONALITY_TEASER = ["Minimal", "Bold", "Dark and cinematic", "Luxury", "Playful", "Editorial"];

export const DOODLE_MESSAGES = [
  "Make it yours.",
  "No boring websites.",
  "Your idea, but online.",
  "Let’s give it personality.",
  "A little weird is good.",
  "Tell us everything.",
];

export const CUSTOM_WEBSITE_FAQS: FaqItem[] = [
  {
    question: "Do I need to know the technical details?",
    answer:
      'No. You can choose "I am not sure" and we will recommend a suitable approach based on your project.',
  },
  {
    question: "Can I provide my own assets?",
    answer:
      "Yes. You can provide logos, images, videos, brand guidelines, copy, or asset-folder links.",
  },
  {
    question: "Can you help with branding and design direction?",
    answer:
      "Yes. You can request additional services such as brand direction, typography, color palettes, copywriting, image selection, and custom illustrations.",
  },
  {
    question: "Is the price fixed?",
    answer:
      "No. The final price depends on the number of pages, design complexity, animation, integrations, content, and technical requirements.",
  },
  {
    question: "Will the website include a CMS or database?",
    answer:
      "That depends on your selected requirements. Frontend-only websites, CMS websites, and full-stack websites have different scopes and pricing.",
  },
  {
    question: "How do I place the order?",
    answer:
      "Complete the brief and send it to Oddlyrinaldi through WhatsApp. We will review the request and discuss the scope, price, and timeline.",
  },
];

export function labelFor(id: string | undefined, options: Option[]) {
  if (!id) return "";
  return options.find((o) => o.id === id)?.label ?? id;
}

export function labelsFor(ids: string[] | undefined, options: Option[]) {
  if (!ids || ids.length === 0) return "";
  return ids.map((id) => labelFor(id, options)).join(", ");
}

const FALLBACK = "Not specified";

function line(label: string, value: string) {
  return `${label}:\n${value.trim().length > 0 ? value : FALLBACK}`;
}

/**
 * Turns the completed form into the plain-text brief sent through WhatsApp,
 * email, and the copy-to-clipboard button — one shared format everywhere.
 */
export function buildBriefMessage(values: CustomWebsiteFormValues) {
  const websiteType =
    values.websiteType === "other" && values.websiteTypeOther
      ? values.websiteTypeOther
      : labelFor(values.websiteType, WEBSITE_TYPES);

  const colorDirection =
    values.colorDirection === "has-brand-colors"
      ? [
          labelFor(values.colorDirection, COLOR_DIRECTIONS),
          values.brandColorPrimary && `Primary: ${values.brandColorPrimary}`,
          values.brandColorSecondary && `Secondary: ${values.brandColorSecondary}`,
          values.brandColorAccent && `Accent: ${values.brandColorAccent}`,
        ]
          .filter(Boolean)
          .join(", ")
      : labelFor(values.colorDirection, COLOR_DIRECTIONS);

  return [
    "Hello Oddlyrinaldi, I would like to request a custom website.",
    "",
    "CUSTOM WEBSITE BRIEF",
    "",
    line("Name", values.fullName),
    "",
    line("Brand / Project", values.brandName),
    "",
    line("Email", values.email),
    "",
    line("WhatsApp", values.whatsapp),
    "",
    line("Website / Social Link", values.existingLink),
    "",
    line("Website Type", websiteType),
    "",
    line("Website Personality", labelsFor(values.personalities, PERSONALITY_OPTIONS)),
    "",
    line("Personality Description", values.personalityDescription),
    "",
    line("Color Direction", colorDirection),
    "",
    line("Typography", labelFor(values.typography, TYPOGRAPHY_OPTIONS)),
    "",
    line("Animation Preference", labelFor(values.animationPreference, ANIMATION_PREFERENCES)),
    "",
    line("Reference Websites", values.referenceWebsites),
    "",
    line("Design Restrictions", values.designRestrictions),
    "",
    line("Asset Preference", labelFor(values.assetSource, ASSET_SOURCE_OPTIONS)),
    "",
    line("Asset Privacy", labelFor(values.assetPrivacy, ASSET_PRIVACY_OPTIONS)),
    "",
    line("Available Assets", labelsFor(values.assetsAvailable, ASSET_CHECKLIST)),
    "",
    line("Asset Folder Link", values.assetFolderLink),
    "",
    line("Preferred Tech Stack", labelFor(values.techStack, TECH_STACK_OPTIONS)),
    "",
    line("Hosting", labelFor(values.hosting, HOSTING_OPTIONS)),
    "",
    line("Required Features", labelsFor(values.features, FEATURE_OPTIONS)),
    "",
    line("Backend Requirement", labelFor(values.backendRequirement, BACKEND_OPTIONS)),
    "",
    line("Additional Services", labelsFor(values.additionalServices, ADDITIONAL_SERVICE_OPTIONS)),
    "",
    line("Budget", labelFor(values.budget, BUDGET_OPTIONS)),
    "",
    line("Timeline", labelFor(values.timeline, TIMELINE_OPTIONS)),
    "",
    line("Number of Pages", labelFor(values.pageCount, PAGE_COUNT_OPTIONS)),
    "",
    line("Additional Notes", values.additionalNotes),
    "",
    "I understand that the final price and scope will be discussed and confirmed through WhatsApp.",
  ].join("\n");
}
