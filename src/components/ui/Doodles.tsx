import { CSSProperties } from "react";

type DoodleProps = {
  className?: string;
  style?: CSSProperties;
};

/** Hand-drawn-feeling five-point star, deliberately imperfect. */
export function StarDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M30 3 L36 23 L57 21 L40 34 L47 55 L30 42 L12 54 L20 33 L4 22 L25 23 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

/** A loose, imperfect squiggle used as a filler mark. */
export function ScribbleDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M2 18 C 14 4, 22 4, 30 14 C 38 24, 46 6, 56 10 C 66 14, 72 22, 82 12 C 90 4, 98 8, 108 16 C 112 19, 115 18, 118 14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Curved hand-drawn arrow — used for "psst..." / "which one is yours?" pointers. */
export function CurvedArrowDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M6 8 C 20 8, 78 14, 82 46 C 84 60, 74 66, 60 62"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 55 C 55 59, 60 61, 61 62 C 60 63, 54 66, 50 71"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Simple sparkle / plus-sparkle mark. */
export function SparkleDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 2 C 20 12, 20 12, 20 12 C 20 12, 28 12, 38 20 C 28 20, 20 20, 20 20 C 20 20, 20 28, 20 38 C 20 28, 20 20, 20 20 C 20 20, 12 20, 2 20 C 12 20, 20 20, 20 20 C 20 20, 20 12, 20 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Soft irregular blob shape, used as a background accent behind characters. */
export function BlobDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M45 32 C 75 8, 130 6, 160 38 C 190 70, 188 122, 158 152 C 128 182, 72 186, 40 156 C 8 126, 8 62, 45 32 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Hand-drawn wobble underline used beneath headings/annotations. */
export function UnderlineDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      className={className}
      style={style}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 10 C 40 2, 90 14, 130 6 C 155 1, 178 10, 198 6"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Hand-drawn wobbly ring — not a perfect circle. */
export function CircleDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 4 C 30 4, 36 11, 35 21 C 34 31, 27 36, 18 35 C 9 34, 4 27, 5 18 C 6 9, 12 3, 20 4 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Small hand-drawn plus mark — an archival/specimen tag, not a close icon. */
export function PlusDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M15 4 L15 26 M4 15 L26 15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small hand-drawn cross / asterisk mark. */
export function CrossDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M5 5 L25 25 M25 6 L5 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A short, slightly crooked dash — the smallest filler mark. */
export function DashDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 10"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M2 7 C 14 4, 26 8, 38 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small hand-drawn cursor/pointer mark. */
export function PointerDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M8 4 L8 30 L15 24 L20 34 L25 32 L20 22 L30 22 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.9"
      />
    </svg>
  );
}

/** Hand-drawn smiling face — a small "friendly" mark for lighter sections. */
export function SmileDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 5 C29 5, 36 12, 35 21 C34 30, 27 36, 19 35 C10 34, 4 27, 5 18 C6 10, 12 5, 20 5 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M13 20 C15 24, 25 24, 27 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="14" cy="15" r="1.6" fill="currentColor" />
      <circle cx="26" cy="15" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Small hand-drawn speech bubble — used to flag notes / testimonials. */
export function SpeechBubbleDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 44 36"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M4 6 C4 3, 7 2, 10 2 L34 2 C38 2, 41 4, 41 8 L41 20 C41 24, 38 26, 34 26 L16 26 L8 33 L10 25 C6 24, 4 22, 4 18 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
    </svg>
  );
}

/** Small hand-drawn lightning bolt — used for "fast / energetic" callouts. */
export function LightningDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 26 40"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M16 2 L4 22 L12 22 L9 38 L23 16 L14 16 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

/** Hand-drawn checkmark — used in feature/included lists. */
export function CheckDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 30 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M3 12 C7 16, 9.5 18.5, 11.5 21 C15 15, 20 7, 27 3"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Small hand-drawn crown — a playful "premium" mark. */
export function CrownDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 48 34"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M4 30 L2 12 L13 20 L24 4 L35 20 L46 12 L44 30 Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path d="M4 30 L44 30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Hand-drawn halo — a wobbly ellipse meant to float above a portrait's head. */
export function HaloDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M6 26 C 4 10, 30 2, 50 3 C 72 4, 97 11, 94 27 C 92 37, 68 33, 50 33 C 32 33, 8 36, 6 26 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Colorful hand-drawn glasses outline — sits over a portrait's eyes as an accent. */
export function GlassesDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 140 50"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M6 26 C 6 15, 16 10, 30 10 C 44 10, 52 16, 52 26 C 52 36, 44 42, 30 42 C 16 42, 6 36, 6 26 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M88 26 C 88 15, 96 10, 110 10 C 124 10, 134 15, 134 26 C 134 36, 124 42, 110 42 C 96 42, 88 36, 88 26 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M52 22 C 62 14, 78 14, 88 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 24 L0 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M134 24 L140 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Loose hand-drawn wavy line — a longer decorative divider mark. */
export function WavyLineDoodle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 160 20"
      fill="none"
      className={className}
      style={style}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 10 C 20 -2, 38 22, 56 10 C 74 -2, 92 22, 110 10 C 128 -2, 146 22, 158 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
