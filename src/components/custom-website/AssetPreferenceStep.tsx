"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import { ASSET_CHECKLIST, ASSET_PRIVACY_OPTIONS, ASSET_SOURCE_OPTIONS } from "@/data/customWebsite";
import FormField, { fieldInputClass } from "./FormField";
import OptionCardGroup from "./OptionCardGroup";

export default function AssetPreferenceStep({ form }: { form: UseFormReturn<CustomWebsiteFormValues> }) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FormField label="Asset source" error={errors.assetSource?.message}>
          <Controller
            name="assetSource"
            control={control}
            render={({ field }) => (
              <OptionCardGroup
                label="Asset source"
                options={ASSET_SOURCE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                columns="grid-cols-1 sm:grid-cols-2"
              />
            )}
          />
        </FormField>

        <button
          type="button"
          onClick={() => setInfoOpen((v) => !v)}
          aria-expanded={infoOpen}
          aria-controls="asset-info-panel"
          data-cursor="view"
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45 hover:text-ink"
        >
          Public vs. private assets
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${infoOpen ? "rotate-180" : ""}`} />
        </button>
        <div id="asset-info-panel" hidden={!infoOpen} className="mt-2 rounded-lg bg-paper p-4 text-sm leading-relaxed text-ink/65">
          <p>
            <strong className="text-ink">Private assets</strong> are files provided by you, such as
            personal photos, brand images, logos, product photos, or internal materials.
          </p>
          <p className="mt-2">
            <strong className="text-ink">Public assets</strong> are images or resources selected from
            legitimate public sources and may be replaced later based on licensing and availability.
          </p>
        </div>
      </div>

      <FormField label="Asset privacy" optional>
        <Controller
          name="assetPrivacy"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Asset privacy"
              options={ASSET_PRIVACY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField label="Assets available" optional>
        <Controller
          name="assetsAvailable"
          control={control}
          render={({ field }) => (
            <OptionCardGroup
              label="Assets available"
              options={ASSET_CHECKLIST}
              multiple
              value={field.value}
              onChange={field.onChange}
              columns="grid-cols-2 sm:grid-cols-3"
            />
          )}
        />
      </FormField>

      <FormField label="Asset folder link" htmlFor="assetFolderLink" optional>
        <input
          id="assetFolderLink"
          type="text"
          placeholder="Google Drive, Dropbox, OneDrive, or other asset folder link"
          {...register("assetFolderLink")}
          className={fieldInputClass}
        />
      </FormField>
    </div>
  );
}
