"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import { BACKEND_OPTIONS, FEATURE_OPTIONS, HOSTING_OPTIONS, TECH_STACK_OPTIONS } from "@/data/customWebsite";
import FormField from "./FormField";
import OptionCardGroup from "./OptionCardGroup";

export default function TechnicalPreferenceStep({ form }: { form: UseFormReturn<CustomWebsiteFormValues> }) {
  const { control } = form;

  return (
    <div className="flex flex-col gap-6">
      <FormField label="Preferred technology" optional>
        <Controller
          name="techStack"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Preferred technology"
              options={TECH_STACK_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField label="Website hosting" optional>
        <Controller
          name="hosting"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Website hosting"
              options={HOSTING_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField label="Website features" optional>
        <Controller
          name="features"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Website features"
              options={FEATURE_OPTIONS}
              multiple
              value={field.value}
              onChange={field.onChange}
              columns="grid-cols-2 sm:grid-cols-3"
            />
          )}
        />
      </FormField>

      <FormField
        label="Backend requirement"
        hint='If you are not sure, choose "I am not sure". We will recommend a suitable approach based on your needs.'
        optional
      >
        <Controller
          name="backendRequirement"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Backend requirement"
              options={BACKEND_OPTIONS}
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
