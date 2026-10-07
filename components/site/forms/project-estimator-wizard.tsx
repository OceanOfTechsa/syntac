"use client";

import React, { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  useForm,
  useWatch,
  type DefaultValues,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Check, Info, Loader2, MoveLeft, MoveRight, X} from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import AppSettings from "@/utils/AppSettings";
import {
  CHOICE_KEYS,
  EstimatorSchema,
  PersistedProgressSchema,
  SERVICES,
  STEP_LABELS,
  describeAnswers,
  estimateDays,
  getService,
  isChoiceStepComplete,
  sanitizeValues,
  suggestEmailFix,
  type AnswerSummary,
  type ChoiceKey,
  type ChoiceOption,
  type Estimate,
  type EstimatorAnswers,
  type EstimatorFormValues,
  type ServiceDefinition,
} from "@/components/site/forms/shemas/estimate-schema";



/* -------------------------------------------------------------------------
 * Step configuration (steps 1-4 depend on the service chosen in step 0)
 * ---------------------------------------------------------------------- */

interface ChoiceStepView {
  field: ChoiceKey;
  title: string;
  hint?: string;
  options: readonly ChoiceOption[];
  multiple: boolean;
  /** Optional free-text box shown under the options. */
  other?: { field: "involvesOther" | "featuresOther"; placeholder: string };
}

const MULTI_HINT = "Select everything that applies, or describe it in your own words below.";

function getChoiceStep(step: number, service: ServiceDefinition | undefined): ChoiceStepView | undefined {
  switch (CHOICE_KEYS[step]) {
    case "service":
      return {
        field: "service",
        title: "What can we help you with?",
        options: SERVICES,
        multiple: false,
      };
    case "involves":
      return (
        service && {
          field: "involves",
          title: service.involves.title,
          hint: MULTI_HINT,
          options: service.involves.options,
          multiple: true,
          other: { field: "involvesOther", placeholder: service.involves.otherPlaceholder },
        }
      );
    case "stage":
      return (
        service && {
          field: "stage",
          title: "What stage are you at?",
          options: service.stages,
          multiple: false,
        }
      );
    case "engagement":
      return (
        service && {
          field: "engagement",
          title: "What do you need from SYNTAC?",
          hint: "Choose the option that best fits how you'd like to work with us.",
          options: service.engagement,
          multiple: false,
        }
      );
    case "features":
      return (
        service && {
          field: "features",
          title: service.features.title,
          hint: MULTI_HINT,
          options: service.features.options,
          multiple: true,
          other: { field: "featuresOther", placeholder: service.features.otherPlaceholder },
        }
      );
    default:
      return undefined;
  }
}

const STEP_ESTIMATE = CHOICE_KEYS.length; // 5
const STEP_CONTACT = STEP_ESTIMATE + 1; // 6

const DEFAULT_VALUES: DefaultValues<EstimatorFormValues> = {
  involves: [],
  involvesOther: "",
  features: [],
  featuresOther: "",
  name: "",
  email: "",
  details: "",
};

/** Index of the first unanswered choice step, or Infinity when all are done. */
const firstIncompleteStep = (values: Partial<EstimatorAnswers>) => {
  const index = CHOICE_KEYS.findIndex((key) => !isChoiceStepComplete(key, values));
  return index === -1 ? Number.POSITIVE_INFINITY : index;
};

/* -------------------------------------------------------------------------
 * Saved progress (only with "preferences" cookie consent)
 * ---------------------------------------------------------------------- */

const STORAGE_KEY = "syntac-project-estimator";
const STORAGE_VERSION = 3;
const SAVE_DEBOUNCE_MS = 400;

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
  return cookie ? cookie.slice(name.length + 1) : null;
};

const hasPreferencesConsent = (): boolean => {
  const rawCookie = getCookie("cc_cookie");
  if (!rawCookie) return false;

  try {
    const cookie = JSON.parse(decodeURIComponent(rawCookie));
    return Array.isArray(cookie?.categories) && cookie.categories.includes("preferences");
  } catch {
    return false;
  }
};

const clearProgress = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage unavailable, nothing to clear
  }
};

const writeProgress = (step: number, values: EstimatorFormValues) => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, step, values })
    );
  } catch {
    // storage full or unavailable, progress just won't persist
  }
};

const readProgress = (): { step: number; values: Partial<EstimatorFormValues> } | null => {
  if (typeof window === "undefined" || !hasPreferencesConsent()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = PersistedProgressSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || parsed.data.version !== STORAGE_VERSION) {
      clearProgress();
      return null;
    }

    return { step: parsed.data.step, values: sanitizeValues(parsed.data.values) };
  } catch {
    clearProgress();
    return null;
  }
};

const hasProgress = (step: number, v: EstimatorFormValues) =>
  step > 0 ||
  Boolean(v.service) ||
  v.involves.length > 0 ||
  Boolean(v.involvesOther) ||
  Boolean(v.stage) ||
  Boolean(v.engagement) ||
  v.features.length > 0 ||
  Boolean(v.featuresOther) ||
  Boolean(v.name) ||
  Boolean(v.email) ||
  Boolean(v.details);

/* -------------------------------------------------------------------------
 * Left identity panel — big step number + vertical rail, inverted colors
 * ---------------------------------------------------------------------- */

const IdentityPanel = memo(function IdentityPanel({ step }: { step: number }) {
  const current = Math.min(step, STEP_LABELS.length - 1);
  return (
    <div className="bg-foreground text-background hidden h-full flex-col justify-between p-10 lg:flex">
      <div>
        <p className="text-background/50 text-sm font-medium">Project Estimator</p>
        <p className="mt-4 text-7xl font-semibold tabular-nums tracking-tight">
          {String(current + 1).padStart(2, "0")}
          <span className="text-background/35 text-2xl font-normal"> / {String(STEP_LABELS.length).padStart(2, "0")}</span>
        </p>
      </div>

      <ol className="flex flex-col gap-1">
        {STEP_LABELS.map((label, i) => {
          const state = i < current ? "done" : i === current ? "active" : "upcoming";
          return (
            <li key={label} className="flex items-center gap-3 py-2">
                            <span
                              className={cn(
                                "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                                state === "done" && "border-background bg-background text-foreground",
                                state === "active" && "border-background text-background",
                                state === "upcoming" && "border-background/25 text-background/40"
                              )}
                            >
                                {state === "done" ? <Check className="size-3.5" /> : i + 1}
                            </span>
              <span
                className={cn(
                  "text-sm transition-colors",
                  state === "active" ? "text-background font-medium" : "text-background/45"
                )}
              >
                                {label}
                            </span>
            </li>
          );
        })}
      </ol>

      <p className="text-background/40 text-xs">{AppSettings.COMPANY_NAME.toUpperCase()} · Built to evolve</p>
    </div>
  );
});

const MobileProgress = memo(function MobileProgress({ step }: { step: number }) {
  const pct = (Math.min(step, STEP_LABELS.length - 1) / (STEP_LABELS.length - 1)) * 100;
  return (
    <div className="mb-8 lg:hidden">
      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-muted-foreground mt-2 text-xs">
        Step {Math.min(step, STEP_LABELS.length - 1) + 1} of {STEP_LABELS.length}
      </p>
    </div>
  );
});

/* -------------------------------------------------------------------------
 * Shared step primitives
 * ---------------------------------------------------------------------- */

function SelectCard({
                      label,
                      description,
                      selected,
                      onClick,
                    }: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  const labelClasses = selected ? "text-foreground" : "text-foreground/90";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group cursor-pointer flex w-full items-center justify-between rounded-md border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200",
        selected
          ? "border-primary bg-primary/[0.06]"
          : "border-border bg-background hover:border-foreground/20 hover:bg-muted/40"
      )}
    >
      {description ? (
        <span className="pr-4">
                    <span className={cn("block", labelClasses)}>{label}</span>
                    <span className="text-muted-foreground mt-1 block text-xs font-normal leading-5">{description}</span>
                </span>
      ) : (
        <span className={labelClasses}>{label}</span>
      )}
      <span
        aria-hidden="true"
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
          selected
            ? "border-primary bg-primary text-primary-foreground scale-100"
            : "border-border scale-90 opacity-0 group-hover:opacity-40"
        )}
      >
                <Check className="size-3" />
            </span>
    </button>
  );
}

function StepFooter({
                      onBack,
                      onNext,
                      nextLabel = "Continue",
                      nextDisabled,
                      showBack,
                    }: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer text-muted-foreground hover:text-foreground text-sm font-medium transition-colors flex gap-2 items-center"
        >
          <MoveLeft />
          Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={cn(
          "rounded-md cursor-pointer px-6 py-2.5 text-sm font-medium transition-all duration-200 flex gap-2 items-center",
          nextDisabled
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md"
        )}
      >
        {nextLabel}
        <MoveRight />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * "How is this calculated?" dialog
 *
 * Uses the native <dialog> element: it renders in the browser's top layer
 * (so the panel's fade/translate can't clip it), traps focus, and makes the
 * rest of the page inert while open. Key events are stopped from bubbling so
 * Escape closes only this dialog, not the whole estimator behind it.
 * ---------------------------------------------------------------------- */

function EstimateInfoDialog({ service, onClose }: { service: ServiceDefinition; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    if (!dialog.open) dialog.showModal();

    return () => previouslyFocused?.focus?.();
  }, []);

  const { copy } = service;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        // Only close when clicking the backdrop
        if (event.target === event.currentTarget) onClose();
      }}
      className="
        bg-background text-foreground
        m-auto w-[calc(100%-2rem)] max-w-2xl
        rounded-md p-0 dark:shadow-md dark:border dark:border-dashed
        backdrop:bg-black/10 backdrop:backdrop-blur-sm duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0
      "
    >
      <div className="flex max-h-[85vh] flex-col overflow-y-auto">
        {/* Header */}
        <div className="border-border flex items-start justify-between gap-4 border-b border-dashed px-6 py-3">
          <h2 id={titleId} className="text-xl font-semibold tracking-tight">
            How your estimate is calculated
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground hover:bg-muted -mt-1 -mr-2 cursor-pointer rounded-full p-2 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 overflow-y-auto px-6 py-5 text-sm leading-relaxed">
          <p className="text-muted-foreground">
            This range is a quick, indicative guide based only on your answers. It isn&apos;t a quote.
          </p>

          <section>
            <h3 className="font-medium">What the numbers mean</h3>
            <p className="text-muted-foreground mt-1">{copy.meaning}</p>
          </section>

          <section>
            <h3 className="font-medium">How we work it out</h3>
            <ol className="text-muted-foreground mt-1 list-decimal space-y-2 pl-5">
              <li>We start with a base amount of effort for the service you chose.</li>
              <li>
                Everything you select under scope and features adds effort. Bigger items, such as
                payments or approval workflows, add more than smaller ones.
              </li>
              <li>{copy.stageNote}</li>
              <li>{copy.engagementNote}</li>
              <li>
                Finally, we show a range of roughly 15% either side of the result, rounded to{" "}
                {copy.rounding}.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="font-medium">What isn&apos;t included</h3>
            <ul className="text-muted-foreground mt-1 list-disc space-y-2 pl-5">
              <li>
                Anything you typed in your own words. We don&apos;t price that automatically, so
                we&apos;ll review it with you and it may move the range.
              </li>
              <li>{copy.excludes}</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium">What happens next</h3>
            <p className="text-muted-foreground mt-1">
              Share your details and we&apos;ll follow up with a proper assessment, based on what
              you&apos;ve told us and a conversation about your requirements.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-border flex border-t border-dashed px-6 py-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-primary text-primary-foreground ml-auto cursor-pointer rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
          >
            Got it
          </button>
        </div>
      </div>
    </dialog>
  );
}
/* -------------------------------------------------------------------------
 * The wizard
 * ---------------------------------------------------------------------- */

type LeadStatus = "idle" | "submitting" | "submitted" | "error";

export interface EstimateLead {
  name: string;
  email: string;
  details: string;
  /** Option ids, as stored in the form. */
  answers: EstimatorAnswers;
  /** The same answers as readable labels, handy for notification emails. */
  summary: AnswerSummary;
  estimate: Estimate;
}

export interface ProjectEstimatorWizardProps {
  className?: string;
  onSubmitLead?: (lead: EstimateLead) => void | Promise<void>;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ProjectEstimatorWizard({ className, onSubmitLead }: ProjectEstimatorWizardProps) {
  // The wizard only mounts client-side (after the dialog opens), so reading
  // localStorage in a lazy initialiser is safe and happens once per open.
  const [saved] = useState(readProgress);
  const [step, setStep] = useState(() =>
    saved ? Math.min(saved.step, firstIncompleteStep(saved.values)) : 0
  );
  const [leadStatus, setLeadStatus] = useState<LeadStatus>("idle");
  const [submitted, setSubmitted] = useState<{
    name: string;
    email: string;
    estimate: Estimate;
    unit: string;
  } | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [canSave, setCanSave] = useState(hasPreferencesConsent);

  const {
    register,
    control,
    getValues,
    setValue,
    clearErrors,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EstimatorFormValues>({
    // The schema output type is strict, while the form starts out partially filled.
    resolver: zodResolver(EstimatorSchema) as unknown as Resolver<EstimatorFormValues>,
    mode: "onTouched",
    defaultValues: { ...DEFAULT_VALUES, ...saved?.values },
  });

  // Targeted subscriptions: typing in the contact fields doesn't re-render
  // the choice steps, and vice versa.
  const [serviceId, involves, involvesOther, stage, engagement, features, featuresOther] = useWatch({
    control,
    name: ["service", "involves", "involvesOther", "stage", "engagement", "features", "featuresOther"],
  });
  const [name, email] = useWatch({ control, name: ["name", "email"] });

  const answers = useMemo<Partial<EstimatorAnswers>>(
    () => ({ service: serviceId, involves, involvesOther, stage, engagement, features, featuresOther }),
    [serviceId, involves, involvesOther, stage, engagement, features, featuresOther]
  );

  const service = getService(answers.service);
  const estimate = useMemo(() => estimateDays(answers), [answers]);
  const emailSuggestion = useMemo(() => suggestEmailFix(email ?? ""), [email]);

  const choice = useMemo(() => getChoiceStep(step, service), [step, service]);
  const choiceComplete = choice ? isChoiceStepComplete(choice.field, answers) : true;

  /* ----------------------------- Persistence ---------------------------- */

  const stepRef = useRef(step);
  const canPersistRef = useRef(false);
  const persistTimer = useRef<number | undefined>(undefined);
  const persistPending = useRef(false);

  useEffect(() => {
    stepRef.current = step;
    canPersistRef.current = canSave && leadStatus !== "submitted";
  });

  const cancelPendingSave = useCallback(() => {
    window.clearTimeout(persistTimer.current);
    persistPending.current = false;
  }, []);

  const flushProgress = useCallback(() => {
    window.clearTimeout(persistTimer.current);
    if (!persistPending.current) return;
    persistPending.current = false;

    if (!canPersistRef.current) return;

    // Re-check in case consent was withdrawn while the user was typing.
    if (!hasPreferencesConsent()) {
      clearProgress();
      return;
    }

    const values = getValues();
    if (!hasProgress(stepRef.current, values)) {
      clearProgress();
      return;
    }

    writeProgress(stepRef.current, values);
  }, [getValues]);

  const scheduleSave = useCallback(() => {
    persistPending.current = true;
    window.clearTimeout(persistTimer.current);
    persistTimer.current = window.setTimeout(flushProgress, SAVE_DEBOUNCE_MS);
  }, [flushProgress]);

  // Any field change (typing or setValue) schedules a debounced save.
  useEffect(() => {
    const subscription = watch(scheduleSave);
    return () => subscription.unsubscribe();
  }, [watch, scheduleSave]);

  useEffect(() => {
    scheduleSave();
  }, [step, scheduleSave]);

  // Closing the dialog unmounts the wizard: write anything still pending.
  useEffect(() => flushProgress, [flushProgress]);

  // Apply consent changes straight away.
  useEffect(() => {
    const refreshConsent = () => {
      const allowed = hasPreferencesConsent();
      setCanSave(allowed);
      if (!allowed) clearProgress();
    };

    window.addEventListener("focus", refreshConsent);
    window.addEventListener("cc:onConsent", refreshConsent);
    window.addEventListener("cc:onChange", refreshConsent);

    return () => {
      window.removeEventListener("focus", refreshConsent);
      window.removeEventListener("cc:onConsent", refreshConsent);
      window.removeEventListener("cc:onChange", refreshConsent);
    };
  }, []);

  /* ------------------------- Step transitions --------------------------- */

  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // A shorter step would otherwise leave the user scrolled past its content.
    scrollRef.current?.scrollTo({ top: 0 });

    const el = panelRef.current;
    if (!el || prefersReducedMotion()) return;

    // Quiet fade + rise, not a slide gimmick.
    const tween = gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
    return () => {
      tween.kill();
    };
  }, [step]);

  /* ------------------------------ Handlers ------------------------------ */

  const handleSelect = (view: ChoiceStepView, id: string) => {
    const options = { shouldDirty: true, shouldValidate: true } as const;

    if (view.field === "service") {
      if (id === answers.service) return;

      const next = getService(id);
      const keepStage = next?.stages.some((o) => o.id === answers.stage);
      const keepEngagement = next?.engagement.some((o) => o.id === answers.engagement);

      // `as never`: field/value pairing is driven by the step config, which TS can't correlate.
      setValue("service", id as never, { shouldDirty: true });

      // Everything below depends on the service: drop what no longer applies.
      setValue("involves", [], { shouldDirty: true });
      setValue("involvesOther", "", { shouldDirty: true });
      setValue("features", [], { shouldDirty: true });
      setValue("featuresOther", "", { shouldDirty: true });
      if (!keepStage) setValue("stage", undefined as never, { shouldDirty: true });
      if (!keepEngagement) setValue("engagement", undefined as never, { shouldDirty: true });

      clearErrors();
      return;
    }

    if (view.multiple) {
      const current = (getValues(view.field) as unknown as readonly string[] | undefined) ?? [];
      const next = current.includes(id) ? current.filter((v) => v !== id) : [...current, id];
      setValue(view.field, next as never, options);
    } else {
      setValue(view.field, id as never, options);
    }
  };

  const isSelected = (view: ChoiceStepView, id: string) => {
    const value = answers[view.field];
    return Array.isArray(value) ? (value as readonly string[]).includes(id) : value === id;
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, STEP_CONTACT));
  const previousStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: EstimatorFormValues) => {
    setLeadStatus("submitting");

    const leadAnswers: EstimatorAnswers = {
      service: data.service,
      involves: data.involves,
      involvesOther: data.involvesOther ?? "",
      stage: data.stage,
      engagement: data.engagement,
      features: data.features,
      featuresOther: data.featuresOther ?? "",
    };
    const leadEstimate = estimateDays(leadAnswers);

    try {
      await onSubmitLead?.({
        name: data.name,
        email: data.email,
        details: data.details ?? "",
        answers: leadAnswers,
        summary: describeAnswers(leadAnswers),
        estimate: leadEstimate,
      });
    } catch (error) {
      console.error("Estimator lead submission failed:", error);
      setLeadStatus("error");
      return;
    }

    // Stop any in-flight save from re-creating the entry we're about to remove.
    canPersistRef.current = false;
    cancelPendingSave();
    clearProgress();

    setSubmitted({
      name: data.name,
      email: data.email,
      estimate: leadEstimate,
      unit: getService(data.service)?.copy.unit ?? "Development days",
    });
    setLeadStatus("submitted");
  };

  const inputClasses =
    "border-border bg-background focus:border-primary w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors";

  return (
    <div className={cn("grid h-full w-full lg:grid-cols-[360px_1fr]", className)}>
      <IdentityPanel step={step} />

      <div ref={scrollRef} className="flex h-full flex-col overflow-y-auto px-6 py-12 sm:px-12 lg:px-20 lg:py-16">
        <MobileProgress step={step} />

        <div className="flex flex-1 items-center justify-center">
          <div ref={panelRef} className="w-full max-w-xl">
            {choice && (
              <fieldset key={choice.field}>
                <legend
                  className={cn(
                    "text-3xl font-semibold tracking-tight",
                    choice.hint ? "mb-1" : "mb-6"
                  )}
                >
                  {choice.title}
                </legend>
                {choice.hint && <p className="text-muted-foreground mb-6 text-sm">{choice.hint}</p>}
                <div className="grid gap-2.5">
                  {choice.options.map((opt) => (
                    <SelectCard
                      key={opt.id}
                      label={opt.label}
                      description={opt.description}
                      selected={isSelected(choice, opt.id)}
                      onClick={() => handleSelect(choice, opt.id)}
                    />
                  ))}
                </div>

                {choice.other && (
                  <div className="mt-2.5">
                    <input
                      key={choice.other.field}
                      type="text"
                      maxLength={300}
                      placeholder={choice.other.placeholder}
                      aria-label={choice.other.placeholder}
                      className={inputClasses}
                      {...register(choice.other.field)}
                    />
                  </div>
                )}

                <StepFooter
                  showBack={step > 0}
                  onBack={previousStep}
                  onNext={nextStep}
                  nextDisabled={!choiceComplete}
                  nextLabel={choice.field === "features" ? "See my estimate" : undefined}
                />
              </fieldset>
            )}

            {step === STEP_ESTIMATE && service && (
              <div>
                <p className="text-muted-foreground text-sm">{service.copy.estimateLabel}</p>
                <p className="mt-2 text-6xl font-semibold tracking-tight">
                  ~{estimate.low}–{estimate.high}
                </p>
                <p className="text-muted-foreground mt-1 text-xl">{service.copy.unit}</p>
                <p className="text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed">
                  <strong>Kindly Note:</strong> This is an indicative range based on what you&apos;ve told us so far, the final scope
                  depends on detailed requirements, integrations, design decisions, feedback rounds, and
                  any changes along the way. Share a few details below and we&apos;ll follow up with a proper
                  assessment.
                </p>
                <button
                  type="button"
                  onClick={() => setInfoOpen(true)}
                  className="text-muted-foreground hover:text-foreground mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium underline-offset-4 transition-colors hover:underline"
                >
                  <Info className="size-4" />
                  How is this calculated?
                </button>
                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="cursor-pointer flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                  >
                    <MoveLeft />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="cursor-pointer bg-primary text-primary-foreground rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
                  >
                    Get in touch
                  </button>
                </div>

                {infoOpen && <EstimateInfoDialog service={service} onClose={() => setInfoOpen(false)} />}
              </div>
            )}

            {step === STEP_CONTACT && leadStatus !== "submitted" && (
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-3xl font-semibold tracking-tight">Tell us how to reach you</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  We&apos;ll follow up with a proper assessment based on what you&apos;ve shared.
                </p>
                <div className="mt-7 grid gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      aria-label="Your name"
                      autoComplete="name"
                      aria-invalid={errors.name ? "true" : "false"}
                      className={cn(inputClasses, errors.name && "border-destructive focus:border-destructive")}
                      {...register("name")}
                    />
                    {errors.name?.message && (
                      <p role="alert" className="text-destructive mt-2 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      inputMode="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="Email address"
                      aria-label="Email address"
                      autoComplete="email"
                      aria-invalid={errors.email ? "true" : "false"}
                      className={cn(inputClasses, errors.email && "border-destructive focus:border-destructive")}
                      {...register("email")}
                    />
                    {errors.email?.message && (
                      <p role="alert" className="text-destructive mt-2 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                    {emailSuggestion && !errors.email && (
                      <p className="text-muted-foreground mt-2 text-sm">
                        Did you mean{" "}
                        <button
                          type="button"
                          onClick={() =>
                            setValue("email", emailSuggestion, {
                              shouldDirty: true,
                              shouldValidate: true,
                            })
                          }
                          className="text-foreground cursor-pointer font-medium underline underline-offset-4"
                        >
                          {emailSuggestion}
                        </button>
                        ?
                      </p>
                    )}
                  </div>
                  <textarea
                    placeholder="Anything else about your project we should know? (optional)"
                    aria-label="Project details (optional)"
                    rows={6}
                    className={cn(inputClasses, "resize-none")}
                    {...register("details")}
                  />
                </div>

                {leadStatus === "error" && (
                  <p role="alert" className="text-destructive mt-6 text-sm">
                    We couldn&apos;t send your details. Please try again.
                  </p>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="text-muted-foreground cursor-pointer hover:text-foreground text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <MoveLeft />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!name || !email || leadStatus === "submitting"}
                    className={cn(
                      "rounded-md cursor-pointer px-6 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-1",
                      !name || !email || leadStatus === "submitting"
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md"
                    )}
                  >
                    {leadStatus === "submitting" ? <> Sending...  <Loader2 className="size-4 animate-spin" /></> : "Send my details"}
                  </button>
                </div>
              </form>
            )}

            {step === STEP_CONTACT && leadStatus === "submitted" && submitted && (
              <div className="py-8">
                                <span className="border-primary text-primary mb-5 flex size-11 items-center justify-center rounded-full border">
                                    <Check className="size-5" />
                                </span>
                <h3 className="text-3xl font-semibold tracking-tight">Thanks, {submitted.name.split(" ")[0]}.</h3>
                <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                  We&apos;ve got your project details and your indicative estimate of{" "}
                  <strong>
                    ~{submitted.estimate.low}–{submitted.estimate.high}
                  </strong>{" "}
                  {submitted.unit}. We&apos;ll be in touch at {submitted.email} shortly.
                  <br /> <br />
                  You may now close this window and continue browsing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
