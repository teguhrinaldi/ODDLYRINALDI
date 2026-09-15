import { z } from "zod";

/**
 * Full creative-brief form shape. Only identity, website type, personality,
 * and asset source are actually required — everything else is optional so
 * an unsure visitor can still send a useful brief.
 */
export const customWebsiteSchema = z
  .object({
    // Step 1 — basic identity
    fullName: z.string().trim().min(2, "Tell us your name."),
    brandName: z.string().trim().min(1, "Give your brand or project a name."),
    email: z.email("That doesn't look like a valid email."),
    whatsapp: z.string(),
    existingLink: z.string(),
    websiteType: z.string().min(1, "Choose the kind of website you need."),
    websiteTypeOther: z.string(),

    // Step 2 — personality
    personalities: z.array(z.string()).min(1, "Pick at least one personality."),
    personalityDescription: z.string(),

    // Step 3 — visual direction
    colorDirection: z.string(),
    brandColorPrimary: z.string(),
    brandColorSecondary: z.string(),
    brandColorAccent: z.string(),
    typography: z.string(),
    animationPreference: z.string(),
    referenceWebsites: z.string(),
    designRestrictions: z.string(),

    // Step 4 — content & assets
    assetSource: z.string().min(1, "Let us know where your assets will come from."),
    assetPrivacy: z.string(),
    assetsAvailable: z.array(z.string()),
    assetFolderLink: z.string(),

    // Step 5 — technical preferences
    techStack: z.string(),
    hosting: z.string(),
    features: z.array(z.string()),
    backendRequirement: z.string(),

    // Step 6 — additional services
    additionalServices: z.array(z.string()),
    additionalNotes: z.string(),

    // Step 7 — budget & timeline
    budget: z.string(),
    timeline: z.string(),
    pageCount: z.string(),
  })
  .refine((data) => data.websiteType !== "other" || data.websiteTypeOther.length > 0, {
    message: "Tell us what kind of website that is.",
    path: ["websiteTypeOther"],
  });

export type CustomWebsiteFormValues = z.infer<typeof customWebsiteSchema>;

export const defaultCustomWebsiteValues: CustomWebsiteFormValues = {
  fullName: "",
  brandName: "",
  email: "",
  whatsapp: "",
  existingLink: "",
  websiteType: "",
  websiteTypeOther: "",
  personalities: [],
  personalityDescription: "",
  colorDirection: "",
  brandColorPrimary: "",
  brandColorSecondary: "",
  brandColorAccent: "",
  typography: "",
  animationPreference: "",
  referenceWebsites: "",
  designRestrictions: "",
  assetSource: "",
  assetPrivacy: "",
  assetsAvailable: [],
  assetFolderLink: "",
  techStack: "",
  hosting: "",
  features: [],
  backendRequirement: "",
  additionalServices: [],
  additionalNotes: "",
  budget: "",
  timeline: "",
  pageCount: "",
};

/** Field names validated before advancing past each step (index-aligned with FORM_STEPS). */
export const STEP_FIELDS: (keyof CustomWebsiteFormValues)[][] = [
  ["fullName", "brandName", "email", "websiteType", "websiteTypeOther"],
  ["personalities", "personalityDescription"],
  [
    "colorDirection",
    "brandColorPrimary",
    "brandColorSecondary",
    "brandColorAccent",
    "typography",
    "animationPreference",
    "referenceWebsites",
    "designRestrictions",
  ],
  ["assetSource", "assetPrivacy", "assetsAvailable", "assetFolderLink"],
  ["techStack", "hosting", "features", "backendRequirement"],
  ["additionalServices", "additionalNotes"],
  ["budget", "timeline", "pageCount"],
  [],
];
