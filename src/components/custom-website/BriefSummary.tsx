"use client";

import { Pencil } from "lucide-react";
import type { CustomWebsiteFormValues } from "@/data/customWebsiteSchema";
import {
  ADDITIONAL_SERVICE_OPTIONS,
  ANIMATION_PREFERENCES,
  ASSET_CHECKLIST,
  ASSET_PRIVACY_OPTIONS,
  ASSET_SOURCE_OPTIONS,
  BACKEND_OPTIONS,
  BUDGET_OPTIONS,
  COLOR_DIRECTIONS,
  FEATURE_OPTIONS,
  HOSTING_OPTIONS,
  PAGE_COUNT_OPTIONS,
  PERSONALITY_OPTIONS,
  TECH_STACK_OPTIONS,
  TIMELINE_OPTIONS,
  TYPOGRAPHY_OPTIONS,
  WEBSITE_TYPES,
  labelFor,
} from "@/data/customWebsite";

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-ink/15 bg-cream px-3 py-1 text-xs font-semibold text-ink/70">
      {children}
    </span>
  );
}

function TagRow({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <span className="text-sm text-ink/40">Not specified</span>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}

type SummarySection = {
  title: string;
  step: number;
  rows: { label: string; items: string[] }[];
};

function buildSections(values: CustomWebsiteFormValues): SummarySection[] {
  const websiteType =
    values.websiteType === "other" && values.websiteTypeOther
      ? values.websiteTypeOther
      : labelFor(values.websiteType, WEBSITE_TYPES);

  return [
    {
      title: "Basic identity",
      step: 0,
      rows: [
        { label: "Name", items: [values.fullName].filter(Boolean) },
        { label: "Brand / project", items: [values.brandName].filter(Boolean) },
        { label: "Email", items: [values.email].filter(Boolean) },
        { label: "Website type", items: [websiteType].filter(Boolean) },
      ],
    },
    {
      title: "Personality",
      step: 1,
      rows: [
        { label: "Personality", items: values.personalities.map((id) => labelFor(id, PERSONALITY_OPTIONS)) },
        { label: "In their words", items: [values.personalityDescription].filter(Boolean) },
      ],
    },
    {
      title: "Visual direction",
      step: 2,
      rows: [
        { label: "Color direction", items: [labelFor(values.colorDirection, COLOR_DIRECTIONS)].filter(Boolean) },
        { label: "Typography", items: [labelFor(values.typography, TYPOGRAPHY_OPTIONS)].filter(Boolean) },
        {
          label: "Animation",
          items: [labelFor(values.animationPreference, ANIMATION_PREFERENCES)].filter(Boolean),
        },
      ],
    },
    {
      title: "Content & assets",
      step: 3,
      rows: [
        { label: "Asset source", items: [labelFor(values.assetSource, ASSET_SOURCE_OPTIONS)].filter(Boolean) },
        { label: "Asset privacy", items: [labelFor(values.assetPrivacy, ASSET_PRIVACY_OPTIONS)].filter(Boolean) },
        { label: "Available assets", items: values.assetsAvailable.map((id) => labelFor(id, ASSET_CHECKLIST)) },
      ],
    },
    {
      title: "Technical preferences",
      step: 4,
      rows: [
        { label: "Tech stack", items: [labelFor(values.techStack, TECH_STACK_OPTIONS)].filter(Boolean) },
        { label: "Hosting", items: [labelFor(values.hosting, HOSTING_OPTIONS)].filter(Boolean) },
        { label: "Features", items: values.features.map((id) => labelFor(id, FEATURE_OPTIONS)) },
        {
          label: "Backend",
          items: [labelFor(values.backendRequirement, BACKEND_OPTIONS)].filter(Boolean),
        },
      ],
    },
    {
      title: "Additional services",
      step: 5,
      rows: [
        {
          label: "Services",
          items: values.additionalServices.map((id) => labelFor(id, ADDITIONAL_SERVICE_OPTIONS)),
        },
        { label: "Notes", items: [values.additionalNotes].filter(Boolean) },
      ],
    },
    {
      title: "Budget & timeline",
      step: 6,
      rows: [
        { label: "Budget", items: [labelFor(values.budget, BUDGET_OPTIONS)].filter(Boolean) },
        { label: "Timeline", items: [labelFor(values.timeline, TIMELINE_OPTIONS)].filter(Boolean) },
        { label: "Pages", items: [labelFor(values.pageCount, PAGE_COUNT_OPTIONS)].filter(Boolean) },
      ],
    },
  ];
}

/** Full review screen — a stack of studio-note cards, each editable in one tap. */
export default function BriefSummary({
  values,
  onEditStep,
}: {
  values: CustomWebsiteFormValues;
  onEditStep: (step: number) => void;
}) {
  const sections = buildSections(values);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {sections.map((section) => (
        <div key={section.title} className="rounded-xl border border-ink/10 bg-paper p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-ink">
              {section.title}
            </h3>
            <button
              type="button"
              onClick={() => onEditStep(section.step)}
              data-cursor="view"
              className="flex items-center gap-1 text-xs font-semibold text-ink/50 hover:text-ink"
            >
              <Pencil className="h-3 w-3" /> Edit
            </button>
          </div>
          <dl className="mt-3 flex flex-col gap-2.5">
            {section.rows.map((row) => (
              <div key={row.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/40">
                  {row.label}
                </dt>
                <dd className="mt-1">
                  <TagRow items={row.items} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/** Compact "YOUR WEBSITE SO FAR" sticky preview shown alongside earlier steps. */
export function LiveBriefPreview({ values }: { values: Partial<CustomWebsiteFormValues> }) {
  const tags = [
    values.websiteType &&
      (values.websiteType === "other" ? values.websiteTypeOther : labelFor(values.websiteType, WEBSITE_TYPES)),
    ...(values.personalities ?? []).map((id) => labelFor(id, PERSONALITY_OPTIONS)),
    labelFor(values.colorDirection, COLOR_DIRECTIONS),
    labelFor(values.budget, BUDGET_OPTIONS),
    labelFor(values.timeline, TIMELINE_OPTIONS),
  ].filter((t): t is string => Boolean(t));

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Your website so far</p>
      <div className="mt-4">
        {tags.length === 0 ? (
          <p className="text-sm text-ink/45">Your selections will appear here as you go.</p>
        ) : (
          <TagRow items={tags} />
        )}
      </div>
    </div>
  );
}
