type WaveDividerProps = {
  /** Fill color of the section being revealed below this divider. */
  fill?: string;
  className?: string;
};

/**
 * Organic, hand-drawn-feeling seam between two full-bleed sections, used
 * instead of a straight horizontal edge. Sits directly in the document flow
 * between the two sections — everything above the wavy line shows whatever
 * is behind it (the previous section's background), everything below is
 * painted with `fill` so it reads as one continuous shape into the next
 * section.
 */
export default function WaveDivider({
  fill = "#101010",
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`relative h-[46px] w-full sm:h-[64px] md:h-[84px] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 84"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 32 C 70 2, 165 48, 250 22 C 320 2, 400 10, 470 36 C 560 62, 640 14, 720 8 C 790 3, 830 30, 900 24 C 990 16, 1040 50, 1120 32 C 1190 17, 1240 2, 1310 14 C 1370 24, 1400 8, 1440 16 L1440 84 L0 84 Z"
          fill={fill}
        />
      </svg>
      {/* tiny hand-placed interruptions riding along the seam */}
      <span
        className="absolute left-[15%] top-1.5 h-2.5 w-2.5 rotate-6 rounded-full bg-coral md:h-3.5 md:w-3.5"
        style={{ transform: "translateY(-45%)" }}
      />
      <span
        className="absolute left-[48%] top-0 h-2 w-4 -rotate-12 rounded-full bg-yellow md:h-2.5 md:w-5"
        style={{ transform: "translateY(-70%)" }}
      />
      <span
        className="absolute left-[64%] top-2 h-1.5 w-1.5 rotate-3 rounded-full bg-purple/80 md:h-2 md:w-2"
        style={{ transform: "translateY(-20%)" }}
      />
      <span
        className="absolute left-[82%] top-1 h-2 w-2 -rotate-6 rounded-full bg-lime md:h-3 md:w-3"
        style={{ transform: "translateY(-35%)" }}
      />
    </div>
  );
}
