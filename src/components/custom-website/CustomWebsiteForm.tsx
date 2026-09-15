"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import {
  customWebsiteSchema,
  defaultCustomWebsiteValues,
  STEP_FIELDS,
  type CustomWebsiteFormValues,
} from "@/data/customWebsiteSchema";
import { buildBriefMessage, FORM_STEPS } from "@/data/customWebsite";
import FormProgress from "./FormProgress";
import BasicIdentityStep from "./BasicIdentityStep";
import PersonalityStep from "./PersonalityStep";
import VisualDirectionStep from "./VisualDirectionStep";
import AssetPreferenceStep from "./AssetPreferenceStep";
import TechnicalPreferenceStep from "./TechnicalPreferenceStep";
import AdditionalServicesStep from "./AdditionalServicesStep";
import ProjectScopeStep from "./ProjectScopeStep";
import BriefSummary, { LiveBriefPreview } from "./BriefSummary";
import WhatsAppOrderButton from "./WhatsAppOrderButton";

const REVIEW_STEP = FORM_STEPS.length - 1;

const STEP_COMPONENTS = [
  BasicIdentityStep,
  PersonalityStep,
  VisualDirectionStep,
  AssetPreferenceStep,
  TechnicalPreferenceStep,
  AdditionalServicesStep,
  ProjectScopeStep,
];

export default function CustomWebsiteForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"editing" | "loading" | "submitted">("editing");
  const [brief, setBrief] = useState("");
  const [blockedMessage, setBlockedMessage] = useState("");

  const form = useForm<CustomWebsiteFormValues>({
    resolver: zodResolver(customWebsiteSchema),
    mode: "onSubmit",
    defaultValues: defaultCustomWebsiteValues,
  });
  const { trigger, getValues, handleSubmit, formState, reset, control } = form;
  const liveValues = useWatch({ control });

  const goToStep = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setBlockedMessage("");
    setStep(next);
  };

  const handleBack = () => goToStep(Math.max(0, step - 1));

  const handleContinue = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) {
      setBlockedMessage("Please fix the highlighted fields before continuing.");
      return;
    }
    goToStep(Math.min(REVIEW_STEP, step + 1));
  };

  const jumpToFirstError = () => {
    const errorKeys = Object.keys(formState.errors);
    const stepWithError = STEP_FIELDS.findIndex((fields) =>
      fields.some((f) => errorKeys.includes(f))
    );
    goToStep(stepWithError === -1 ? 0 : stepWithError);
  };

  const onConfirm = handleSubmit(
    async (values) => {
      setStatus("loading");
      // No backend is wired up — this is deliberate thinking time so the
      // hand-off to WhatsApp feels considered rather than instantaneous.
      await new Promise((r) => setTimeout(r, 500));
      setBrief(buildBriefMessage(values));
      setStatus("submitted");
    },
    () => {
      setBlockedMessage("Some required fields still need your attention.");
      jumpToFirstError();
    }
  );

  const handleReset = () => {
    reset(defaultCustomWebsiteValues);
    setStatus("editing");
    setBrief("");
    goToStep(0);
  };

  if (status === "submitted") {
    return <WhatsAppOrderButton brief={brief} brandName={getValues("brandName")} />;
  }

  const StepComponent = STEP_COMPONENTS[step];
  const isReview = step === REVIEW_STEP;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-start lg:gap-10">
      <div className="rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8">
        <FormProgress step={step} />

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (isReview) {
              onConfirm();
            } else {
              handleContinue();
            }
          }}
          className="mt-7"
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={reduce ? undefined : { opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {isReview ? (
                  <BriefSummary values={getValues()} onEditStep={goToStep} />
                ) : (
                  <StepComponent form={form} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            aria-live="polite"
            className="mt-4 min-h-5 text-sm font-medium text-coral"
          >
            {blockedMessage}
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                data-cursor="view"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink/70 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {isReview && (
                <button
                  type="button"
                  onClick={handleReset}
                  data-cursor="view"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink/40 hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              data-cursor="go"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-bold text-cream transition-colors hover:bg-black-secondary disabled:opacity-60"
            >
              {isReview
                ? status === "loading"
                  ? "Preparing your brief…"
                  : "Confirm & generate brief"
                : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      <div className="lg:sticky lg:top-28">
        <LiveBriefPreview values={liveValues} />
      </div>
    </div>
  );
}
