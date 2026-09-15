"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import { ANIMATION_PREFERENCES, COLOR_DIRECTIONS, TYPOGRAPHY_OPTIONS } from "@/data/customWebsite";
import FormField, { fieldInputClass } from "./FormField";
import OptionCardGroup from "./OptionCardGroup";

export default function VisualDirectionStep({ form }: { form: UseFormReturn<CustomWebsiteFormValues> }) {
  const { register, control, watch } = form;
  const reduce = useReducedMotion();
  const colorDirection = watch("colorDirection");

  return (
    <div className="flex flex-col gap-6">
      <FormField label="Preferred color direction" optional>
        <Controller
          name="colorDirection"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Color direction"
              options={COLOR_DIRECTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <AnimatePresence initial={false}>
        {colorDirection === "has-brand-colors" && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-3"
          >
            <FormField label="Primary color" htmlFor="brandColorPrimary" optional>
              <input
                id="brandColorPrimary"
                type="text"
                placeholder="#111111"
                {...register("brandColorPrimary")}
                className={fieldInputClass}
              />
            </FormField>
            <FormField label="Secondary color" htmlFor="brandColorSecondary" optional>
              <input
                id="brandColorSecondary"
                type="text"
                placeholder="#f5f0e6"
                {...register("brandColorSecondary")}
                className={fieldInputClass}
              />
            </FormField>
            <FormField label="Accent color" htmlFor="brandColorAccent" optional>
              <input
                id="brandColorAccent"
                type="text"
                placeholder="#ff735e"
                {...register("brandColorAccent")}
                className={fieldInputClass}
              />
            </FormField>
          </motion.div>
        )}
      </AnimatePresence>

      <FormField label="Preferred typography" optional>
        <Controller
          name="typography"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Typography"
              options={TYPOGRAPHY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField label="Animation preference" optional>
        <Controller
          name="animationPreference"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Animation preference"
              options={ANIMATION_PREFERENCES}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField label="Share website references or visual inspiration" htmlFor="referenceWebsites" optional>
        <textarea
          id="referenceWebsites"
          rows={3}
          placeholder="Paste links to websites you like, or explain what you want to achieve."
          {...register("referenceWebsites")}
          className={`${fieldInputClass} resize-none`}
        />
      </FormField>

      <FormField label="Anything you do not want?" htmlFor="designRestrictions" optional>
        <textarea
          id="designRestrictions"
          rows={3}
          placeholder="No gradients, no rounded cards, no bright colors, no excessive animations..."
          {...register("designRestrictions")}
          className={`${fieldInputClass} resize-none`}
        />
      </FormField>
    </div>
  );
}
