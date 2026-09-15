"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TemplatePreviewCard from "@/components/TemplatePreviewCard";
import { CircleDoodle, DashDoodle, SparkleDoodle, StarDoodle } from "@/components/ui/Doodles";
import { featuredTemplates } from "@/data/templates";

export default function FeaturedTemplates() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const drag = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  // Click-and-drag scrolling for mouse users — native overflow-x-auto already
  // supports trackpad/touch, but offers no way for a mouse-only user to pan.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
    // CSS scroll-snap fights programmatic scrollLeft writes mid-gesture,
    // snapping straight back to the nearest card on every frame — suspend
    // both snapping and smooth-scrolling for the duration of the drag.
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScrollLeft - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = scrollerRef.current;
    el?.releasePointerCapture(e.pointerId);
    if (el) {
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
    }
  };

  return (
    <section className="relative bg-cream py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <StarDoodle className="absolute -left-2 -top-6 h-5 w-5 text-coral" />
            <SparkleDoodle className="absolute right-6 top-0 hidden h-5 w-5 text-yellow/80 sm:block" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">
              ✦ Featured Templates
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              10 Templates.
              <br />
              10 Personalities.
            </h2>
            <CircleDoodle className="absolute -left-3 bottom-16 hidden h-7 w-7 text-blue/40 md:block" />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/65">
              Each template is a complete digital experience, crafted for a
              specific industry and mood.
            </p>
            <Link
              href="/#collection"
              data-cursor="view"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-ink"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">
                Explore All Templates
              </span>
            </Link>
          </motion.div>

          <div className="relative min-w-0">
            <DashDoodle className="absolute -top-8 right-16 hidden w-8 -rotate-3 text-lime/70 lg:block" />
            <div
              ref={scrollerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onClickCapture={(e) => {
                if (drag.current.moved) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 active:cursor-grabbing sm:gap-7"
            >
              {featuredTemplates.map((template, i) => (
                <motion.div
                  key={template.slug}
                  initial={reduce ? false : { opacity: 0, x: 48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="snap-start"
                >
                  <Link href={`/templates/${template.slug}`} data-cursor="view">
                    <TemplatePreviewCard template={template} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll templates right"
              data-cursor="view"
              className="mt-8 hidden h-12 w-12 items-center justify-center rounded-full bg-ink text-cream shadow-lg transition-all hover:scale-105 disabled:cursor-default disabled:opacity-25 disabled:hover:scale-100 lg:flex lg:absolute lg:-right-10 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll templates left"
              data-cursor="view"
              className="absolute -left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-lg ring-1 ring-ink/10 transition-all hover:scale-105 disabled:cursor-default disabled:opacity-0 lg:flex"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <path
                  d="M16 10H4M9 5l-5 5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
