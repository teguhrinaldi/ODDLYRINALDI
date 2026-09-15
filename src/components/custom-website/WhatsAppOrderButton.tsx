"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/customWebsite";
import HandwrittenNote from "@/components/ui/HandwrittenNote";
import { SparkleDoodle, StarDoodle } from "@/components/ui/Doodles";

export default function WhatsAppOrderButton({
  brief,
  brandName,
}: {
  brief: string;
  brandName: string;
}) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`;
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Custom website brief — ${brandName || "New project"}`
  )}&body=${encodeURIComponent(brief)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard access can be unavailable (older browsers, denied permission,
      // insecure context) — the brief is still visible below to select by hand.
      setCopied(false);
    }
  };

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ink p-8 text-center text-cream sm:p-10"
      data-cursor-surface="dark"
    >
      <StarDoodle className="pointer-events-none absolute right-6 top-6 h-5 w-5 text-yellow/70" />
      <SparkleDoodle className="pointer-events-none absolute left-8 bottom-8 h-5 w-5 text-purple/60" />

      <HandwrittenNote className="text-xl text-coral" rotate={-2}>
        Your brief is ready
      </HandwrittenNote>
      <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        Let’s turn your idea into a website.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/65">
        Send your brief directly to Oddlyrinaldi via WhatsApp. Your request will
        be reviewed manually — final pricing, scope, and timeline are confirmed
        through the chat.
      </p>

      <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="go"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.02] sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" />
          Send to WhatsApp
        </a>
        <button
          type="button"
          onClick={handleCopy}
          data-cursor="view"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream sm:w-auto"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy brief"}
        </button>
        <a
          href={mailtoUrl}
          data-cursor="view"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream sm:w-auto"
        >
          <Mail className="h-4 w-4" />
          Email the brief
        </a>
      </div>

      <p className="mt-5 text-xs text-cream/40">
        WhatsApp is ready with your brief. Please review and send the message.
      </p>
    </motion.div>
  );
}
