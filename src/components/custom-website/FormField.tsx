import { ReactNode } from "react";

/** Shared input/textarea styling reused across every brief step. */
export const fieldInputClass =
  "w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink";

export default function FormField({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50"
      >
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal text-ink/35">Optional</span>}
      </label>
      {hint && <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{hint}</p>}
      <div className="mt-2.5">{children}</div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-coral">
          {error}
        </p>
      )}
    </div>
  );
}
