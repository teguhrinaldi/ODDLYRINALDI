"use client";

import { PERSONALITY_OPTIONS } from "@/data/customWebsite";
import OptionCardGroup from "./OptionCardGroup";

/** The 18-option personality grid — its own component since it's the heart of the brief. */
export default function PersonalitySelector({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <OptionCardGroup
      label="Website personality"
      options={PERSONALITY_OPTIONS}
      multiple
      value={value}
      onChange={onChange}
      columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    />
  );
}
