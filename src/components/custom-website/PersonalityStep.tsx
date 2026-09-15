"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import FormField, { fieldInputClass } from "./FormField";
import PersonalitySelector from "./PersonalitySelector";

export default function PersonalityStep({ form }: { form: UseFormReturn<CustomWebsiteFormValues> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-ink/60">
        Choose the feeling you want people to experience when they visit. Pick as many as fit.
      </p>

      <FormField label="Personality" error={errors.personalities?.message}>
        <Controller
          name="personalities"
          control={control}
          render={({ field }) => <PersonalitySelector value={field.value} onChange={field.onChange} />}
        />
      </FormField>

      <FormField
        label="Describe your desired website personality in your own words"
        htmlFor="personalityDescription"
        optional
      >
        <textarea
          id="personalityDescription"
          rows={4}
          placeholder="For example: mysterious, editorial, dark, luxurious, but still approachable..."
          {...register("personalityDescription")}
          className={`${fieldInputClass} resize-none`}
        />
      </FormField>
    </div>
  );
}
