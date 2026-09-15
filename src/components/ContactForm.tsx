"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const contactSchema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.email("That doesn't look like a valid email."),
  message: z.string().min(10, "A few more words would help."),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [sent, setSent] = useState<ContactValues | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    // No backend is wired up yet — this validates the form and shows a
    // clear, honest confirmation instead of pretending a message was sent.
    await new Promise((r) => setTimeout(r, 400));
    setSent(values);
    reset();
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-paper p-8 text-center">
        <p className="font-display text-lg font-bold text-ink">Form validated ✓</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
          This form isn&apos;t connected to a live inbox yet, so nothing was
          actually sent. To reach us directly right now, email{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=${encodeURIComponent(
              `Message from ${sent.name}`
            )}&body=${encodeURIComponent(sent.message)}`}
            data-cursor="view"
            className="font-semibold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
          >
            {site.supportEmail}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(null)}
          data-cursor="view"
          className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50 hover:text-ink"
        >
          Fill it out again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
          className="mt-2 w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-coral">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className="mt-2 w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-coral">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
          className="mt-2 w-full resize-none rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-coral">
            {errors.message.message}
          </p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-ink/45">
        This is a demo form — no backend is connected. Submitting validates
        your message and gives you a direct mailto link.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        data-cursor="go"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black-secondary disabled:opacity-60"
      >
        {isSubmitting ? "Validating…" : "Send message"}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </form>
  );
}
