"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { footerLinks, navLinks } from "@/data/nav";
import { creator } from "@/data/creator";
import LottiePlayer from "@/components/ui/LottiePlayer";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { StarDoodle, SparkleDoodle } from "@/components/ui/Doodles";

const SIGN_OFF = "Still not sitting still.";

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative border-t border-ink/10 bg-cream">
      <FooterDog reduce={reduce} />
      <StarDoodle className="pointer-events-none absolute left-[16%] top-10 hidden h-4 w-4 text-coral/50 sm:block" />
      <SparkleDoodle className="pointer-events-none absolute left-[38%] top-20 hidden h-4 w-4 text-purple/50 lg:block" />

      <div className="mx-auto max-w-350 px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
              ODDLYRINALDI
            </p>
            <p className="mt-2 text-sm text-ink/55">
              Websites that refuse to sit still.
            </p>
            <HandwrittenNote className="mt-2 inline-block text-base text-ink/45" rotate={-2}>
              made with a little weird
            </HandwrittenNote>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="view"
                    className="relative inline-block pb-0.5 hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <SocialLink href={creator.portfolioUrl} label="Portfolio">
              <Image
                src={creator.signature}
                alt=""
                width={80}
                height={80}
                className="h-4 w-4 object-contain invert"
              />
            </SocialLink>
            <SocialLink href={creator.instagramUrl} label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={creator.linkedinUrl} label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href="https://x.com" label="X / Twitter">
              <XIcon />
            </SocialLink>
          </div>
        </div>

        <nav aria-label="Legal" className="mt-8 border-t border-ink/10 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-ink/50">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} data-cursor="view" className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative mt-6 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 OddlyRinaldi. All rights reserved.</span>
          <span>{SIGN_OFF}</span>
        </div>
      </div>
    </footer>
  );
}

/**
 * A little surprise peeking in from the bottom-right corner, mostly hanging
 * below the footer's own bottom edge so it can never cover any footer
 * content at any screen size. The artwork itself is a dog peeking out from
 * behind a vertical wall on its right side, so it's kept upright (no tilt)
 * and pinned to the true right edge — the painted wall lines up with the
 * edge of the page, as if the dog is peeking around the corner of the screen.
 */
function FooterDog({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      aria-hidden="true"
      role="img"
      className="pointer-events-none absolute -bottom-9 right-0 h-16 w-16 sm:-bottom-12 sm:h-24 sm:w-24 lg:-bottom-16 lg:h-32 lg:w-32"
      initial={reduce ? undefined : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <LottiePlayer
        src="/animations/Flirting Dog.json"
        loop
        autoplay={!reduce}
        className="h-full w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)]"
      />
    </motion.div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const isPlaceholder = href === "#";
  return (
    <a
      href={href}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noreferrer noopener"}
      aria-label={isPlaceholder ? `${label} (link coming soon)` : label}
      data-cursor="view"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.3 2H21l-6.4 7.3L21.9 22h-6.4l-5-6.6L5 22H2.3l6.9-7.9L1.6 2H8l4.5 6 5.8-6z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z" />
      <path d="M20.5 13.6c0-3-1.9-4.4-4.4-4.4-1.7 0-2.8.94-3.3 1.85V8.5H9.44c.04.98 0 12 0 12h3.36v-6.7c0-.36.03-.72.13-.98.3-.72.98-1.47 2.12-1.47 1.5 0 2.1 1.14 2.1 2.8v6.35h3.36v-6.9Z" />
    </svg>
  );
}
