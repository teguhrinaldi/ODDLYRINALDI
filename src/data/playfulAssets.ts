/**
 * Central registry of every "playfulness" asset used across the site —
 * mascot animations, character art, and hand-drawn accents — so it's
 * obvious at a glance what's local/final vs. temporary, and where each
 * asset is actually used. The doodle *shapes* themselves live as inline SVG
 * components in src/components/ui/Doodles.tsx, not as external files; this
 * file tracks the binary assets (Lottie JSON, PNGs) instead.
 */

export type PlayfulAsset = {
  name: string;
  path: string;
  type: "lottie" | "image";
  temporary: boolean;
  usage: string;
  replacementNote: string;
};

export const playfulAssets: PlayfulAsset[] = [
  {
    name: "Dog walking",
    path: "/animations/Dog walking.json",
    type: "lottie",
    temporary: false,
    usage: "Hero — walks continuously across the lower hero, looping left to right.",
    replacementNote: "Final asset. Swap the file in place if a different walk cycle is preferred.",
  },
  {
    name: "Flirting Dog",
    path: "/animations/Flirting Dog.json",
    type: "lottie",
    temporary: false,
    usage: "Footer — peeks from the bottom-right corner on every page.",
    replacementNote: "Final asset.",
  },
  {
    name: "Cat peeking (hero)",
    path: "/characters/cat-peek.png",
    type: "image",
    temporary: false,
    usage: "Hero — peeks over the top edge of the browser preview, ducking on hover.",
    replacementNote: "Final asset.",
  },
  {
    name: "Cat peeking (footer, alt crop)",
    path: "/characters/cat-peek2.png",
    type: "image",
    temporary: false,
    usage: "Reserved alternate crop of the peeking cat.",
    replacementNote: "Not currently referenced by any component — safe to remove if unused after a future pass.",
  },
  {
    name: "Cat pointing",
    path: "/characters/cat-point.png",
    type: "image",
    temporary: false,
    usage: "Collection Index ('which one is yours?') and template detail purchase panel ('yes, this one').",
    replacementNote: "Final asset.",
  },
  {
    name: "Climbing cat",
    path: "/characters/kucingg.png",
    type: "image",
    temporary: false,
    usage: "Hero → Featured Templates divider — climbs the section-break line.",
    replacementNote: "Final asset.",
  },
  {
    name: "Cool duck",
    path: "/characters/cool-duck.png",
    type: "image",
    temporary: false,
    usage: "'More Than Just Templates' dark section, and the 404 page mascot.",
    replacementNote: "Final asset.",
  },
  {
    name: "Running dog (static)",
    path: "/characters/running-dog.png",
    type: "image",
    temporary: false,
    usage: "Unused now that the hero uses the 'Dog walking' Lottie loop instead.",
    replacementNote: "Kept for reference; safe to remove once confirmed unused elsewhere.",
  },
  {
    name: "Psst arrow",
    path: "/doodles/psst-arrow.png",
    type: "image",
    temporary: false,
    usage: "Hero — points from the handwritten 'psst...' note down to the peeking cat.",
    replacementNote: "Final asset, user-supplied artwork.",
  },
  {
    name: "Creator portrait",
    path: "/creator/teguh-rinaldi.png",
    type: "image",
    temporary: false,
    usage: "About page hero — full annotated portrait (halo, glasses outline, notes baked into the artwork).",
    replacementNote: "Final asset, user-supplied.",
  },
  {
    name: "Creator signature",
    path: "/creator/signature.png",
    type: "image",
    temporary: false,
    usage: "About page and Footer — rendered with a CSS invert filter for a dark-ink look on cream.",
    replacementNote: "Final asset, user-supplied.",
  },
];

/**
 * Temporary, category-matched Unsplash photography used for template
 * preview/gallery imagery. Not tracked item-by-item here — see the
 * `previewImage` / `gallery` fields directly on each entry in
 * src/data/templates.ts, each marked with a
 * "TEMPORARY PREVIEW IMAGE — REPLACE OR VERIFY LICENSE BEFORE LAUNCH" note.
 */
export const TEMPORARY_TEMPLATE_IMAGERY_SOURCE = "Unsplash (images.unsplash.com)";
