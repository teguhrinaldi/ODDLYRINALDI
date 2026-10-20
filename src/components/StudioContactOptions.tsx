"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/customWebsite";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
  variant?: "text" | "pill";
};

export default function StudioContactOptions({ variant = "text" }: Props) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const isIndonesian = language === "id";
  const subject = isIndonesian ? "Pertanyaan untuk Oddlyrinaldi" : "Hello Oddlyrinaldi";

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        data-cursor="about"
        className={variant === "pill"
          ? "group inline-flex items-center gap-2 rounded-full border border-ink/25 bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          : "text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"}
      >
        {isIndonesian ? "Hubungi studio" : "Contact the Studio"}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-30 mt-3 grid min-w-56 gap-1 rounded-xl border border-ink/10 bg-cream p-2 text-sm shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)]"
        >
          <a
            role="menuitem"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-medium text-ink transition-colors hover:bg-ink/5"
          >
            <MessageCircle className="h-4 w-4 text-green-700" />
            {isIndonesian ? "Hubungi lewat WhatsApp" : "Contact via WhatsApp"}
          </a>
          <a
            role="menuitem"
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-medium text-ink transition-colors hover:bg-ink/5"
          >
            <Mail className="h-4 w-4 text-ink/60" />
            {isIndonesian ? "Kirim email" : "Send an email"}
          </a>
        </div>
      )}
    </div>
  );
}
