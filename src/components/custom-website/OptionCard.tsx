"use client";

import clsx from "clsx";
import { CheckDoodle } from "@/components/ui/Doodles";

export default function OptionCard({
  label,
  selected,
  onToggle,
  multiple,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  multiple: boolean;
}) {
  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onToggle}
      data-cursor="view"
      className={clsx(
        "group relative flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors duration-200",
        selected
          ? "border-ink bg-ink text-cream"
          : "border-ink/15 bg-cream text-ink/75 hover:border-ink/40 hover:text-ink"
      )}
    >
      <span
        className={clsx(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
          selected ? "border-cream/70 bg-cream/15" : "border-ink/25"
        )}
        aria-hidden="true"
      >
        {selected && <CheckDoodle className="h-2.5 w-3 text-cream" />}
      </span>
      {label}
    </button>
  );
}
