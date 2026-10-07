"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useForm,
  useWatch,
  type FieldErrors,
  type FieldPath,
  type Resolver,
  type UseFormRegister,
} from "react-hook-form";
import {
  Info,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Send,
  CircleX
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import {
  ContactSchema,
  NOT_SURE_SERVICE,
  budgets,
  services,
  timelines,
  type Budget,
  type ContactFormValues,
  type EnquiryType,
  type Service,
  type Timeline,
} from "@/components/site/forms/shemas/contact-schema";

const CONTACT_FORM_STORAGE_KEY = "syntac-contact-form-progress";
// v2: `projectType` was removed, so older saved progress is discarded.
const FORM_STORAGE_VERSION = 2;
const SAVE_DEBOUNCE_MS = 400;

const DEFAULT_BUDGET: Budget = "Not sure yet";
const DEFAULT_TIMELINE: Timeline = "Flexible";

const DEFAULT_VALUES: ContactFormValues = {
  enquiryType: undefined,

  name: "",
  email: "",
  company: "",

  services: [],
  projectDescription: "",
  budget: DEFAULT_BUDGET,
  timeline: DEFAULT_TIMELINE,

  subject: "",
  message: "",
};

/**
 * Fields validated when leaving each step.
 * Step 1 (choosing the enquiry type) has no fields.
 */
const STEP_FIELDS: Record<
  EnquiryType,
  Record<number, FieldPath<ContactFormValues>[]>
> = {
  project: {
    2: ["services"],
    3: ["projectDescription", "budget", "timeline"],
    4: ["name", "email", "company"],
  },
  general: {
    2: ["subject", "message"],
    3: ["name", "email", "company"],
  },
};

/* -------------------------------------------------------------------------- */
/* Cookie / storage helpers                                                   */
/* -------------------------------------------------------------------------- */

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? cookie.slice(name.length + 1) : null;
};

const hasPreferencesConsent = (): boolean => {
  const rawCookie = getCookie("cc_cookie");
  if (!rawCookie) return false;

  try {
    const cookie = JSON.parse(decodeURIComponent(rawCookie));
    return (
      Array.isArray(cookie?.categories) &&
      cookie.categories.includes("preferences")
    );
  } catch {
    return false;
  }
};

const removeSavedProgress = () => {
  try {
    localStorage.removeItem(CONTACT_FORM_STORAGE_KEY);
  } catch {
    // localStorage may be unavailable.
  }
};

type SavedFormProgress = {
  version: number;
  step: number;
  enquiryType: EnquiryType | null;
  values: Partial<ContactFormValues>;
  savedAt: string;
};

/** True only when the user has actually typed / chosen something. */
const hasUserData = (
  enquiryType: EnquiryType | null,
  v: Partial<ContactFormValues>
): boolean =>
  Boolean(enquiryType) ||
  Boolean(v.name) ||
  Boolean(v.email) ||
  Boolean(v.company) ||
  Boolean(v.projectDescription) ||
  Boolean(v.subject) ||
  Boolean(v.message) ||
  (v.services?.length ?? 0) > 0 ||
  (v.budget !== undefined && v.budget !== DEFAULT_BUDGET) ||
  (v.timeline !== undefined && v.timeline !== DEFAULT_TIMELINE);

/* -------------------------------------------------------------------------- */
/* Contact Form                                                               */
/* -------------------------------------------------------------------------- */

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [enquiryType, setEnquiryType] = useState<EnquiryType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [canSaveProgress, setCanSaveProgress] = useState(false);
  // Becomes true once the restore attempt has finished, so we never
  // overwrite saved data with an untouched form.
  const [hydrated, setHydrated] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(false);

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<ContactFormValues>({
    // The schema is a discriminated union, the form state is a flat type.
    // The cast bridges the two; runtime validation is still the full schema.
    resolver: zodResolver(
      ContactSchema
    ) as unknown as Resolver<ContactFormValues>,
    mode: "onTouched",
    defaultValues: DEFAULT_VALUES,
  });

  const formValues = useWatch({ control }) as Partial<ContactFormValues>;
  const selectedServices: Service[] = formValues.services ?? [];

  const totalSteps = enquiryType === "general" ? 4 : 5;
  const isLastStep = enquiryType !== null && step === totalSteps;

  /* ------------------------------------------------------------------------ */
  /* Step changes without page jumps                                          */
  /* ------------------------------------------------------------------------ */

  const goToStep = (next: number) => {
    shouldScroll.current = true;
    setStep(next);
  };

  /*
   * When a step is shorter than the previous one the page collapses and the
   * browser leaves the user somewhere random. After a step change we only
   * scroll if the top of the form has been pushed above the viewport.
   */
  useEffect(() => {
    if (!shouldScroll.current) return;
    shouldScroll.current = false;

    const el = containerRef.current;
    if (!el) return;

    if (el.getBoundingClientRect().top < 0) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [step, submitState]);

  /* ------------------------------------------------------------------------ */
  /* Consent                                                                  */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const refreshConsent = () => {
      const allowed = hasPreferencesConsent();
      setCanSaveProgress(allowed);
      if (!allowed) removeSavedProgress();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") refreshConsent();
    };

    refreshConsent();

    window.addEventListener("focus", refreshConsent);
    // vanilla-cookieconsent v3 events, so changes apply without a refocus.
    window.addEventListener("cc:onConsent", refreshConsent);
    window.addEventListener("cc:onChange", refreshConsent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", refreshConsent);
      window.removeEventListener("cc:onConsent", refreshConsent);
      window.removeEventListener("cc:onChange", refreshConsent);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Restore progress                                                         */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!canSaveProgress) return;

    try {
      const saved = localStorage.getItem(CONTACT_FORM_STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as SavedFormProgress;

      if (
        parsed.version !== FORM_STORAGE_VERSION ||
        (parsed.enquiryType !== "project" &&
          parsed.enquiryType !== "general")
      ) {
        removeSavedProgress();
        return;
      }

      setEnquiryType(parsed.enquiryType);
      reset({ ...DEFAULT_VALUES, ...parsed.values });

      const maxStep = parsed.enquiryType === "project" ? 5 : 4;
      setStep(Math.min(Math.max(parsed.step || 1, 1), maxStep));
    } catch {
      removeSavedProgress();
    } finally {
      setHydrated(true);
    }
  }, [canSaveProgress, reset]);

  /* ------------------------------------------------------------------------ */
  /* Save progress (debounced)                                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!canSaveProgress || !hydrated || submitState === "success") return;

    if (!hasUserData(enquiryType, formValues)) {
      removeSavedProgress();
      return;
    }

    const timeout = window.setTimeout(() => {
      // Re-check in case consent was withdrawn while typing.
      if (!hasPreferencesConsent()) {
        removeSavedProgress();
        setCanSaveProgress(false);
        return;
      }

      const progress: SavedFormProgress = {
        version: FORM_STORAGE_VERSION,
        step,
        enquiryType,
        values: formValues,
        savedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(
          CONTACT_FORM_STORAGE_KEY,
          JSON.stringify(progress)
        );
      } catch {
        // localStorage may be unavailable.
      }
    }, SAVE_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [canSaveProgress, hydrated, enquiryType, step, formValues, submitState]);

  /* ------------------------------------------------------------------------ */
  /* Selections                                                               */
  /* ------------------------------------------------------------------------ */

  const selectEnquiryType = (type: EnquiryType) => {
    if (type === enquiryType) return;

    setEnquiryType(type);
    setValue("enquiryType", type, { shouldDirty: true });
    clearErrors();
    /*
     * Fields from the other flow are left alone so switching back doesn't
     * wipe what the user typed. The schema strips them on submit.
     */
  };

  /*
   * "Not sure" is exclusive: choosing it clears every other service, and
   * choosing any other service removes it.
   */
  const toggleService = (service: Service) => {
    let next: Service[];

    if (service === NOT_SURE_SERVICE) {
      next = selectedServices.includes(service) ? [] : [service];
    } else {
      const without = selectedServices.filter((s) => s !== NOT_SURE_SERVICE);

      next = without.includes(service)
        ? without.filter((s) => s !== service)
        : [...without, service];
    }

    setValue("services", next, { shouldDirty: true, shouldValidate: true });
  };

  const selectBudget = (value: Budget) =>
    setValue("budget", value, { shouldDirty: true, shouldValidate: true });

  const selectTimeline = (value: Timeline) =>
    setValue("timeline", value, { shouldDirty: true, shouldValidate: true });

  /* ------------------------------------------------------------------------ */
  /* Navigation                                                               */
  /* ------------------------------------------------------------------------ */

  const nextStep = async () => {
    if (!enquiryType) {
      await trigger("enquiryType");
      return;
    }

    if (step < totalSteps) {
      const fields = STEP_FIELDS[enquiryType][step];

      if (fields) {
        const valid = await trigger(fields);
        if (!valid) return;
      }

      goToStep(step + 1);
    }
  };

  const previousStep = () => goToStep(Math.max(step - 1, 1));

  /* ------------------------------------------------------------------------ */
  /* Submit                                                                   */
  /* ------------------------------------------------------------------------ */

  const resetForm = () => {
    reset(DEFAULT_VALUES);
    setEnquiryType(null);
    setStep(1);
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Unable to send contact form.");

      removeSavedProgress();
      shouldScroll.current = true;
      resetForm();
      setSubmitState("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * Pressing Enter inside a text input would otherwise submit the form from
   * any step (e.g. the single "Subject" input). Enter now means "Continue".
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") return;

    const tag = (event.target as HTMLElement).tagName;
    if (tag === "TEXTAREA" || tag === "BUTTON") return;

    event.preventDefault();
    if (!isLastStep) void nextStep();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!isLastStep) {
      event.preventDefault();
      return;
    }

    void handleSubmit(onSubmit)(event);
  };

  /* ------------------------------------------------------------------------ */
  /* Success                                                                  */
  /* ------------------------------------------------------------------------ */

  if (submitState === "success") {
    return (
      <div
        ref={containerRef}
        className="mx-auto max-w-2xl scroll-mt-24 bg-background p-8 text-start sm:p-12"
      >
        <span className="border-primary text-primary mb-5 flex size-11 items-center justify-center rounded-full border">
          <Check className="size-5" />
        </span>

        <h2 className="text-3xl font-semibold tracking-tight">
          Message received.
        </h2>

        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
          Thank you for getting in touch. We&apos;ve received your enquiry and
          will get back to you as soon as possible.
        </p>

        <button
          type="button"
          onClick={() => {
            shouldScroll.current = true;
            resetForm();
            setSubmitState("idle");
          }}
          className="mt-8 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-90"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Form                                                                     */
  /* ------------------------------------------------------------------------ */

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-2xl scroll-mt-24">
      {/* Progress */}
      <div
        className="mb-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={step}
        aria-label={`Step ${step} of ${totalSteps}`}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Step {step} of {totalSteps}
          </span>

          {enquiryType && (
            <span className="text-xs text-muted-foreground">
              {enquiryType === "project"
                ? "Project enquiry"
                : "General enquiry"}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((item) => (
            <div
              key={item}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                item <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Saved progress notice */}
      {canSaveProgress && (
        <p className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Info size={15} />{" "}
          <span>
            <strong>Kindly Note:</strong> Your progress is saved on this device.
          </span>
        </p>
      )}

      {/* Error */}
      {submitState === "error" && (
        <div
          role="alert"
          className="mb-6 flex items-start justify-between gap-4 rounded-md border border-destructive/30 bg-destructive/[0.05] px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-destructive">
              Something went wrong.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              We couldn&apos;t send your enquiry. Please try again.
            </p>
          </div>

          <button
            type="button"
            aria-label="Dismiss error"
            onClick={() => setSubmitState("idle")}
            className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <CircleX size={18} />
          </button>
        </div>
      )}

      <form
        noValidate
        onSubmit={handleFormSubmit}
        onKeyDown={handleKeyDown}
      >
        {/*
          Minimum height keeps short steps from collapsing the page and
          pulling the footer up between steps.
        */}
        <div className="min-h-[28rem] sm:min-h-[32rem]">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-8">
              <StepHeading
                title="What can we help you with?"
                description="Choose the type of enquiry that best describes what you need."
              />

              <div className="space-y-3">
                <ChoiceButton
                  selected={enquiryType === "project"}
                  label="I have a project in mind"
                  description="Tell us about a website, application, software solution, or system you need."
                  onClick={() => selectEnquiryType("project")}
                />

                <ChoiceButton
                  selected={enquiryType === "general"}
                  label="I have a general enquiry"
                  description="Ask a question, request more information, or get in touch about something else."
                  onClick={() => selectEnquiryType("general")}
                />
              </div>

              {errors.enquiryType && (
                <ErrorMessage
                  message={
                    errors.enquiryType.message ??
                    "Please select an enquiry type."
                  }
                />
              )}

              <NavigationButton
                type="button"
                onClick={nextStep}
                disabled={!enquiryType}
              >
                Continue
                <ArrowRight className="size-4" />
              </NavigationButton>
            </div>
          )}

          {/* PROJECT STEP 2 */}
          {step === 2 && enquiryType === "project" && (
            <div className="space-y-8">
              <StepHeading
                title="What do you need help with?"
                description="Select everything that applies. You can choose more than one."
              />

              <FieldGroup
                label="Services"
                required
                error={errors.services?.message}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {services.map((service) => (
                    <ChoiceButton
                      key={service}
                      selected={selectedServices.includes(service)}
                      label={service}
                      onClick={() => toggleService(service)}
                    />
                  ))}
                </div>
              </FieldGroup>

              <Navigation onBack={previousStep} onNext={nextStep} />
            </div>
          )}

          {/* PROJECT STEP 3 */}
          {step === 3 && enquiryType === "project" && (
            <div className="space-y-8">
              <StepHeading
                title="Tell us about the project"
                description="Give us enough context to understand what you're trying to achieve."
              />

              <TextareaField
                label="Project description"
                required
                placeholder="Tell us what you are looking to build, the problem you are trying to solve, and anything else that may be useful."
                error={errors.projectDescription?.message}
                {...register("projectDescription")}
              />

              <FieldGroup
                label="Estimated budget"
                required
                error={errors.budget?.message}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {budgets.map((budget) => (
                    <ChoiceButton
                      key={budget}
                      selected={formValues.budget === budget}
                      label={budget}
                      onClick={() => selectBudget(budget)}
                    />
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup
                label="Preferred timeline"
                required
                error={errors.timeline?.message}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {timelines.map((timeline) => (
                    <ChoiceButton
                      key={timeline}
                      selected={formValues.timeline === timeline}
                      label={timeline}
                      onClick={() => selectTimeline(timeline)}
                    />
                  ))}
                </div>
              </FieldGroup>

              <Navigation onBack={previousStep} onNext={nextStep} />
            </div>
          )}

          {/* GENERAL STEP 2 */}
          {step === 2 && enquiryType === "general" && (
            <div className="space-y-8">
              <StepHeading
                title="How can we help?"
                description="Tell us what you would like to know or discuss."
              />

              <InputField
                label="Subject"
                required
                error={errors.subject?.message}
                {...register("subject")}
              />

              <TextareaField
                label="Message"
                required
                placeholder="Tell us how we can help..."
                error={errors.message?.message}
                {...register("message")}
              />

              <Navigation onBack={previousStep} onNext={nextStep} />
            </div>
          )}

          {/* PROJECT STEP 4 */}
          {step === 4 && enquiryType === "project" && (
            <div className="space-y-8">
              <StepHeading
                title="Tell us about yourself"
                description="Almost there. Let us know who we should contact about your project."
              />

              <ContactDetails register={register} errors={errors} />

              <Navigation onBack={previousStep} onNext={nextStep} />
            </div>
          )}

          {/* GENERAL STEP 3 */}
          {step === 3 && enquiryType === "general" && (
            <div className="space-y-8">
              <StepHeading
                title="Tell us about yourself"
                description="Let us know who we should contact about your enquiry."
              />

              <ContactDetails register={register} errors={errors} />

              <Navigation onBack={previousStep} onNext={nextStep} />
            </div>
          )}

          {/* PROJECT STEP 5 / GENERAL STEP 4 */}
          {isLastStep && enquiryType && (
            <ConfirmationStep
              type={enquiryType}
              values={formValues}
              selectedServices={selectedServices}
              isSubmitting={isSubmitting}
              onBack={previousStep}
            />
          )}
        </div>
      </form>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Contact Details                                                            */
/* -------------------------------------------------------------------------- */

type ContactDetailsProps = {
  register: UseFormRegister<ContactFormValues>;
  errors: FieldErrors<ContactFormValues>;
};

const ContactDetails = ({ register, errors }: ContactDetailsProps) => (
  <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <InputField
        label="Name"
        required
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />

      <InputField
        label="Email"
        type="email"
        required
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
    </div>

    <InputField
      label="Company"
      optional
      autoComplete="organization"
      error={errors.company?.message}
      {...register("company")}
    />
  </div>
);

/* -------------------------------------------------------------------------- */
/* Choice Button                                                              */
/* -------------------------------------------------------------------------- */

type ChoiceButtonProps = {
  selected: boolean;
  label: string;
  description?: string;
  onClick: () => void;
};

const ChoiceButton = ({
                        selected,
                        label,
                        description,
                        onClick,
                      }: ChoiceButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={cn(
      "group flex w-full cursor-pointer items-center justify-between rounded-md border px-4 py-3.5 text-left text-sm font-medium outline-none transition-all duration-200",
      "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
      selected
        ? "border-primary bg-primary/[0.06]"
        : "border-border bg-background hover:border-foreground/20 hover:bg-muted/40"
    )}
  >
    <span className="pr-4">
      <span className="block text-foreground">{label}</span>

      {description && (
        <span className="mt-1 block text-xs font-normal leading-5 text-muted-foreground">
          {description}
        </span>
      )}
    </span>

    <span
      aria-hidden="true"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
        selected
          ? "scale-100 border-primary bg-primary text-primary-foreground"
          : "scale-90 border-border opacity-0 group-hover:opacity-40"
      )}
    >
      <Check className="size-3" />
    </span>
  </button>
);

/* -------------------------------------------------------------------------- */
/* Input                                                                      */
/* -------------------------------------------------------------------------- */

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  optional?: boolean;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, optional, className, required, id, ...props }, ref) => {
    const inputId =
      id ?? `contact-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const errorId = `${inputId}-error`;

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}

          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}

          {optional && (
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              (optional)
            </span>
          )}
        </label>

        <input
          {...props}
          ref={ref}
          id={inputId}
          aria-required={required || undefined}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus:border-destructive",
            className
          )}
        />

        {error && <ErrorMessage id={errorId} message={error} />}
      </div>
    );
  }
);

InputField.displayName = "InputField";

/* -------------------------------------------------------------------------- */
/* Textarea                                                                   */
/* -------------------------------------------------------------------------- */

type TextareaFieldProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, className, required, id, ...props }, ref) => {
    const textareaId =
      id ?? `contact-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const errorId = `${textareaId}-error`;

    return (
      <div className="space-y-2">
        <label htmlFor={textareaId} className="text-sm font-medium">
          {label}

          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <textarea
          {...props}
          ref={ref}
          id={textareaId}
          aria-required={required || undefined}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "min-h-32 w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus:border-destructive",
            className
          )}
        />

        {error && <ErrorMessage id={errorId} message={error} />}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

/* -------------------------------------------------------------------------- */
/* Field Group                                                                */
/* -------------------------------------------------------------------------- */

type FieldGroupProps = {
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

const FieldGroup = ({
                      label,
                      description,
                      required,
                      error,
                      children,
                    }: FieldGroupProps) => (
  <div className="space-y-3">
    <div>
      <p className="text-sm font-medium">
        {label}

        {required && (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </p>

      {description && (
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      )}
    </div>

    {children}

    {error && <ErrorMessage message={error} />}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Step Heading                                                               */
/* -------------------------------------------------------------------------- */

type StepHeadingProps = {
  title: string;
  description: string;
};

const StepHeading = ({ title, description }: StepHeadingProps) => (
  <div className="space-y-1">
    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
      {description}
    </p>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

type NavigationProps = {
  onBack: () => void;
  onNext: () => void;
};

const Navigation = ({ onBack, onNext }: NavigationProps) => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <button
      type="button"
      onClick={onBack}
      className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted/40"
    >
      <ArrowLeft className="size-4" />
      Back
    </button>

    <NavigationButton type="button" onClick={onNext} className="flex-1">
      Continue
      <ArrowRight className="size-4" />
    </NavigationButton>
  </div>
);

type NavigationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const NavigationButton = ({
                            children,
                            className,
                            ...props
                          }: NavigationButtonProps) => (
  <button
    {...props}
    className={cn(
      "flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-90",
      "focus-visible:ring-2 focus-visible:ring-primary/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
  >
    {children}
  </button>
);

/* -------------------------------------------------------------------------- */
/* Confirmation                                                               */
/* -------------------------------------------------------------------------- */

type ConfirmationStepProps = {
  type: EnquiryType;
  values: Partial<ContactFormValues>;
  selectedServices: Service[];
  isSubmitting: boolean;
  onBack: () => void;
};

const ConfirmationStep = ({
                            type,
                            values,
                            selectedServices,
                            isSubmitting,
                            onBack,
                          }: ConfirmationStepProps) => {
  const isProject = type === "project";

  return (
    <div className="space-y-8">
      <StepHeading
        title="Ready to send?"
        description="Review your information before sending your enquiry."
      />

      <div className="rounded-md border border-border bg-muted/30 p-5">
        <p className="text-sm leading-6 text-muted-foreground">
          Once submitted, our team will review your enquiry and get back to you
          as soon as possible.
        </p>
      </div>

      <div className="space-y-4">
        <SummaryRow
          label="Enquiry"
          value={isProject ? "Project request" : "General enquiry"}
        />
        <SummaryRow label="Name" value={values.name} />
        <SummaryRow label="Email" value={values.email} />

        {values.company && (
          <SummaryRow label="Company" value={values.company} />
        )}

        {isProject ? (
          <>
            <SummaryRow
              label="Services"
              value={selectedServices.join(", ")}
            />
            <SummaryRow label="Budget" value={values.budget} />
            <SummaryRow label="Timeline" value={values.timeline} />
          </>
        ) : (
          <SummaryRow label="Subject" value={values.subject} />
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              Sending...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Send enquiry
              <Send className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Summary Row                                                                */
/* -------------------------------------------------------------------------- */

type SummaryRowProps = {
  label: string;
  value?: string;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
  <div className="flex flex-col gap-1 border-b border-dashed border-border pb-3 last:border-0">
    <span className="text-xs font-medium text-muted-foreground">{label}</span>
    <span className="text-sm">{value || "——"}</span>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Error Message                                                              */
/* -------------------------------------------------------------------------- */

type ErrorMessageProps = {
  id?: string;
  message: string;
};

const ErrorMessage = ({ id, message }: ErrorMessageProps) => (
  <p id={id} role="alert" className="text-sm text-destructive">
    {message}
  </p>
);

export default ContactForm;
