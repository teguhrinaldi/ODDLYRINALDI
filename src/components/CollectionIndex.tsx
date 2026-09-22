"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { CurvedArrowDoodle, DashDoodle, SparkleDoodle, StarDoodle } from "@/components/ui/Doodles";
import { accentHex, Template, templates } from "@/data/templates";

const half = Math.ceil(templates.length / 2);
const columns = [templates.slice(0, half), templates.slice(half)];

export default function CollectionIndex() {
  const [hovered, setHovered] = useState<Template | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id="collection" className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-32">
      <StarDoodle className="absolute right-[8%] top-16 hidden h-6 w-6 text-lime/70 md:block" />
      <SparkleDoodle className="absolute left-[6%] top-40 hidden h-5 w-5 text-purple/60 lg:block" />
      <DashDoodle className="absolute bottom-24 left-[4%] hidden w-9 rotate-3 text-coral/50 lg:block" />
      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50"
        >
          The Collection →
        </motion.p>

        <div
          ref={listRef}
          onMouseMove={handleMove}
          className="relative mt-10 grid grid-cols-1 gap-x-16 sm:grid-cols-2"
        >
          {columns.map((col, ci) => (
            <ul key={ci} className={`flex flex-col ${ci === 1 ? "sm:pt-8" : ""}`}>
              {col.map((template, i) => {
                const isHovered = hovered?.slug === template.slug;
                const isDimmed = hovered !== null && !isHovered;
                return (
                  <motion.li
                    key={template.slug}
                    initial={reduce ? false : { opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay: (ci * 5 + i) * 0.05 }}
                    className={`border-b border-ink/10 py-5 first:pt-0 sm:py-6 ${
                      i % 2 === 1 ? "sm:py-7" : ""
                    }`}
                  >
                    <Link
                      href={`/templates/${template.slug}`}
                      onMouseEnter={() => setHovered(template)}
                      onMouseLeave={() => setHovered(null)}
                      data-cursor="view"
                      className="flex w-full items-center justify-between text-left transition-opacity duration-300"
                      style={{ opacity: isDimmed ? 0.35 : 1 }}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-xs font-medium text-ink/40">
                          {String(template.index).padStart(2, "0")}
                        </span>
                        <motion.span
                          animate={{ x: isHovered ? 10 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                          style={{
                            color: isHovered ? accentHex[template.accent] : "#111111",
                          }}
                        >
                          {template.name}
                        </motion.span>
                      </span>
                      <motion.span
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -8,
                        }}
                        transition={{ duration: 0.25 }}
                        className="hidden text-sm font-semibold sm:inline-flex sm:items-center sm:gap-2"
                        style={{ color: accentHex[template.accent] }}
                      >
                        View{" "}
                        <span aria-hidden>→</span>
                      </motion.span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          ))}

          <FollowPreview template={hovered} cursor={cursor} reduce={reduce} />
          <PointingCat reduce={reduce} active={hovered !== null} />
        </div>

        <MobilePointingCat reduce={reduce} />
      </div>
    </section>
  );
}

/** A small preview swatch — the template's real screenshot, tinted — that trails the cursor while a row is hovered. */
function FollowPreview({
  template,
  cursor,
  reduce,
}: {
  template: Template | null;
  cursor: { x: number; y: number };
  reduce: boolean | null;
}) {
  if (reduce) return null;
  const dark = template ? template.tint.startsWith("#2") || template.tint.startsWith("#1") : false;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20 hidden h-24 w-32 -translate-x-1/2 translate-y-[-120%] items-center justify-center overflow-hidden rounded-md border border-ink/10 shadow-[0_18px_30px_-8px_rgba(0,0,0,0.35)] lg:flex"
      style={{ left: cursor.x, top: cursor.y }}
      animate={{
        opacity: template ? 1 : 0,
        scale: template ? 1 : 0.9,
        rotate: template ? -4 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {template && (
        <>
          <Image
            src={template.previewImage}
            alt=""
            fill
            sizes="128px"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: template.tint, opacity: dark ? 0.72 : 0.82 }}
          />
          <span
            className="relative font-display text-base font-extrabold tracking-tight"
            style={{ color: dark ? "#f5f0e6" : accentHex[template.accent] }}
          >
            {template.name}
          </span>
        </>
      )}
    </motion.div>
  );
}

function MobilePointingCat({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-10 flex items-end justify-end gap-3 lg:hidden"
    >
      <HandwrittenNote className="mb-4 text-xl leading-tight text-ink/80" rotate={-2}>
        Which one
        <br />
        is yours?
      </HandwrittenNote>
      <Image
        src="/characters/cat-point.png"
        alt="A cat pointing toward the collection, as if recommending a favorite"
        width={1152}
        height={2048}
        className="w-24 drop-shadow-[0_14px_16px_rgba(0,0,0,0.18)] sm:w-28"
      />
    </motion.div>
  );
}

function PointingCat({
  reduce,
  active,
}: {
  reduce: boolean | null;
  active: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      animate={reduce ? undefined : { rotate: active ? -2 : 0, scale: active ? 1.03 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -right-6 -top-16 hidden w-[170px] sm:-right-10 sm:w-[200px] lg:block lg:w-[230px]"
    >
      <div className="relative">
        <div className="absolute -left-24 top-6 text-right">
          <HandwrittenNote className="text-2xl leading-tight text-ink/80" rotate={3}>
            Which
            <br />
            one is
            <br />
            yours?
          </HandwrittenNote>
        </div>
        <CurvedArrowDoodle className="absolute -bottom-6 -left-16 h-14 w-20 rotate-[15deg] scale-x-[-1] text-ink/50" />
        <Image
          src="/characters/cat-point.png"
          alt="A cat pointing toward the collection, as if recommending a favorite"
          width={1152}
          height={2048}
          className="w-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.18)]"
        />
      </div>
    </motion.div>
  );
}
