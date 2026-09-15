"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import { BUDGET_OPTIONS, PAGE_COUNT_OPTIONS, TIMELINE_OPTIONS } from "@/data/customWebsite";
import FormField from "./FormField";
import OptionCardGroup from "./OptionCardGroup";

export default function ProjectScopeStep({ form }: { form: UseFormReturn<CustomWebsiteFormValues> }) {
  const { control } = form;

  return (
    <div className="flex flex-col gap-6">
      <FormField
        label="Budget range"
        hint="Final pricing depends on the number of pages, complexity, integrations, custom assets, animation requirements, and technical scope."
        optional
      >
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Budget range"
              options={BUDGET_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              columns="grid-cols-1 sm:grid-cols-2"
            />
          )}
        />
      </FormField>

      <FormField label="Desired timeline" optional>
        <Controller
          name="timeline"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Desired timeline"
              options={TIMELINE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              columns="grid-cols-1 sm:grid-cols-2"
            />
          )}
        />
      </FormField>

      <FormField label="Number of pages" optional>
        <Controller
          name="pageCount"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Number of pages"
              options={PAGE_COUNT_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              columns="grid-cols-1 sm:grid-cols-2"
            />
          )}
        />
      </FormField>
    </div>
  );
}
