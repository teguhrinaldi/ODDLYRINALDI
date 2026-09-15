import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StarDoodle, ScribbleDoodle, WavyLineDoodle } from "@/components/ui/Doodles";

export const metadata = {
  title: "Page Not Found | ODDLYRINALDI",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-cream py-20">
          <StarDoodle className="pointer-events-none absolute left-[12%] top-20 hidden h-6 w-6 text-yellow/70 md:block" />
          <ScribbleDoodle className="pointer-events-none absolute right-[10%] top-28 hidden w-20 text-coral/50 lg:block" />
          <div className="mx-auto max-w-350 px-5 text-center sm:px-8 lg:px-12">
            <div className="mx-auto w-32 animate-sway sm:w-40">
              <Image
                src="/characters/cool-duck.png"
                alt="A cool rubber duck wearing sunglasses, shrugging"
                width={1200}
                height={1200}
                priority
                className="w-full drop-shadow-[0_16px_18px_rgba(0,0,0,0.2)]"
              />
            </div>
            <p className="mt-8 font-display text-7xl font-extrabold tracking-tight text-ink sm:text-8xl">
              404
            </p>
            <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              This page wandered off somewhere.
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
              Even our duck can&apos;t find it. Let&apos;s get you back
              somewhere that exists.
            </p>
            <WavyLineDoodle className="mx-auto mt-8 w-32 text-ink/20" />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                data-cursor="view"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black-secondary"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
              <Link
                href="/templates"
                data-cursor="explore"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                <LayoutGrid className="h-4 w-4" /> Browse Templates
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
