import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DashDoodle } from "@/components/ui/Doodles";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="relative bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <DashDoodle className="mb-4 w-9 -rotate-3 text-coral/60" />
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-ink/50">Last updated {updated}</p>
            <div className="mt-10 flex flex-col gap-8">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
