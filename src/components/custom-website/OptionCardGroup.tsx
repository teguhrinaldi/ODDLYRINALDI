"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Option } from "@/data/customWebsite";
import OptionCard from "./OptionCard";

type OptionCardGroupProps = {
  label: string;
  options: Option[];
  columns?: string;
} & (
  | { multiple: true; value: string[]; onChange: (value: string[]) => void }
  | { multiple?: false; value: string; onChange: (value: string) => void }
);

/** Grid of selectable cards shared by every brief step — single- or multi-select. */
export default function OptionCardGroup(props: OptionCardGroupProps) {
  const { label, options, columns = "grid-cols-2 sm:grid-cols-3" } = props;
  const reduce = useReducedMotion();

  const isSelected = props.multiple
    ? (id: string) => props.value.includes(id)
    : (id: string) => props.value === id;

  const toggle = props.multiple
    ? (id: string) => props.onChange(props.value.includes(id) ? props.value.filter((v) => v !== id) : [...props.value, id])
    : (id: string) => props.onChange(props.value === id ? "" : id);

  return (
    <motion.div
      role={props.multiple ? "group" : "radiogroup"}
      aria-label={label}
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`grid gap-2.5 ${columns}`}
    >
      {options.map((option) => (
        <OptionCard
          key={option.id}
          label={option.label}
          selected={isSelected(option.id)}
          onToggle={() => toggle(option.id)}
          multiple={Boolean(props.multiple)}
        />
      ))}
    </motion.div>
  );
}
