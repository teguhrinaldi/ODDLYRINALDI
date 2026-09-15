"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DOODLE_MESSAGES, FORM_STEPS } from "@/data/customWebsite";

export default function FormProgress({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);
  const total = FORM_STEPS.length;
  const percent = ((step + 1) / total) * 100;

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % DOODLE_MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-xs font-bold tracking-[0.2em] text-ink/50">
          {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="h-4 overflow-hidden text-right">
          <AnimatePresence mode="wait">
            <motion.span
              key={messageIndex}
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-hand text-base leading-none text-coral"
            >
              {DOODLE_MESSAGES[messageIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className="h-full rounded-full bg-ink"
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-3 font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
        {FORM_STEPS[step].description}
      </p>
    </div>
  );
}
