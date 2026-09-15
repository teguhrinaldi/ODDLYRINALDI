"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { navLinks } from "@/data/nav";
import PillButton from "@/components/ui/PillButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 backdrop-blur-md">
        <nav className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl"
            data-cursor="hello"
          >
            <Image
              src="/brand-mark.png"
              alt=""
              width={500}
              height={500}
              className="h-8 w-8 sm:h-9 sm:w-9"
              priority
            />
            ODDLYRINALDI
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-sm font-medium transition-colors hover:text-ink",
                      isActive ? "text-ink" : "text-ink/80"
                    )}
                    data-cursor="view"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <PillButton href="/templates" className="py-2.5">
                Browse Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </PillButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-cream text-ink"
              data-cursor="view"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/*
        Rendered as a sibling of <header>, not a descendant — a backdrop-blur
        ancestor establishes a new containing block for fixed-position
        children, which would otherwise shrink this fullscreen overlay down
        to the header's own small box instead of the viewport.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-cream px-8"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl font-extrabold text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 w-fit"
            >
              <PillButton href="/templates" onClick={() => setOpen(false)}>
                Browse Collection
                <ArrowRight className="h-4 w-4" />
              </PillButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
