"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import { WEBSITE_TYPES } from "@/data/customWebsite";
import FormField, { fieldInputClass } from "./FormField";
import OptionCardGroup from "./OptionCardGroup";

export default function BasicIdentityStep({ form }: { form: UseFormReturn<CustomWebsiteFormValues> }) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;
  const websiteType = watch("websiteType");

  return (
    <div className="flex flex-col gap-6">
      <FormField label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="e.g. Rana Wijaya"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Brand / business / personal name" htmlFor="brandName" error={errors.brandName?.message}>
        <input
          id="brandName"
          type="text"
          placeholder="e.g. Kopi Senja"
          aria-invalid={Boolean(errors.brandName)}
          aria-describedby={errors.brandName ? "brandName-error" : undefined}
          {...register("brandName")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Email address" htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="WhatsApp number" htmlFor="whatsapp" optional>
        <input
          id="whatsapp"
          type="tel"
          autoComplete="tel"
          placeholder="e.g. 081234567890"
          {...register("whatsapp")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Website or social media link" htmlFor="existingLink" optional>
        <input
          id="existingLink"
          type="text"
          placeholder="instagram.com/yourbrand"
          {...register("existingLink")}
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="What kind of website do you need?" error={errors.websiteType?.message}>
        <Controller
          name="websiteType"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Website type"
              options={WEBSITE_TYPES}
              value={field.value}
              onChange={field.onChange}
              columns="grid-cols-2 sm:grid-cols-3"
            />
          )}
        />
      </FormField>

      {websiteType === "other" && (
        <FormField label="Tell us what kind of website that is" htmlFor="websiteTypeOther" error={errors.websiteTypeOther?.message}>
          <input
            id="websiteTypeOther"
            type="text"
            placeholder="e.g. Nonprofit donation site"
            {...register("websiteTypeOther")}
            className={fieldInputClass}
          />
        </FormField>
      )}
    </div>
  );
}
