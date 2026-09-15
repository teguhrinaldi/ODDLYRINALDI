"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import { ADDITIONAL_SERVICE_OPTIONS } from "@/data/customWebsite";
import FormField, { fieldInputClass } from "./FormField";
import OptionCardGroup from "./OptionCardGroup";

export default function AdditionalServicesStep({ form }: { form: UseFormReturn<CustomWebsiteFormValues> }) {
  const { register, control } = form;

  return (
    <div className="flex flex-col gap-6">
      <FormField label="Additional services" optional>
        <Controller
          name="additionalServices"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Additional services"
              options={ADDITIONAL_SERVICE_OPTIONS}
              multiple
              value={field.value}
              onChange={field.onChange}
              columns="grid-cols-2 sm:grid-cols-3"
            />
          )}
        />
      </FormField>

      <FormField label="Additional notes" htmlFor="additionalNotes" optional>
        <textarea
          id="additionalNotes"
          rows={4}
          placeholder="Anything else the studio should know?"
          {...register("additionalNotes")}
          className={`${fieldInputClass} resize-none`}
        />
      </FormField>
    </div>
  );
}
