"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {Check, MoveLeft, MoveRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import AppSettings from "@/utils/AppSettings";

/* -------------------------------------------------------------------------
 * Data + estimation logic
 * ---------------------------------------------------------------------- */

interface Option {
    id: string;
    label: string;
    /** Development-day weight this option contributes to the estimate */
    weight: number;
}

const PROJECT_TYPES: Option[] = [
    { id: "website", label: "Website", weight: 20 },
    { id: "web-app", label: "Web Application", weight: 45 },
    { id: "business-system", label: "Custom Business System", weight: 70 },
    { id: "automation", label: "Business Automation", weight: 55 },
    { id: "other", label: "Something Else", weight: 40 },
];

const PROJECT_INVOLVES: Option[] = [
    { id: "accounts", label: "User accounts & authentication", weight: 12 },
    // { id: "payments", label: "Payments & billing", weight: 18 },
    { id: "content", label: "Content management", weight: 10 },
    { id: "search", label: "Search & filtering", weight: 8 },
    { id: "integrations", label: "Third-party integrations", weight: 15 },
    { id: "workflows", label: "Custom workflows / automation", weight: 20 },
    { id: "reporting", label: "Reporting & analytics", weight: 14 },
    { id: "audit-logs", label: "Audit Logs", weight: 14 },
    // { id: "i18n", label: "Multi-language support", weight: 10 },
];

const STAGES: (Option & { multiplier: number })[] = [
    { id: "idea", label: "Just an idea", weight: 0, multiplier: 1.25 },
    { id: "requirements", label: "Requirements defined", weight: 0, multiplier: 1.1 },
    { id: "designs", label: "Designs ready", weight: 0, multiplier: 1.0 },
    { id: "existing", label: "Existing system", weight: 0, multiplier: 0.85 },
    { id: "replacing", label: "Replacing / improving an existing system", weight: 0, multiplier: 0.9 },
];

const ENGAGEMENT_TYPES: (Option & { multiplier: number })[] = [
    { id: "prototype", label: "Prototype", weight: 0, multiplier: 0.35 },
    { id: "development", label: "Development Only", weight: 0, multiplier: 0.75 },
    { id: "mvp", label: "MVP", weight: 0, multiplier: 0.6 },
    { id: "design-dev", label: "Full-cycle Design and Development", weight: 0, multiplier: 0.9 },
    { id: "improvements", label: "Existing System Improvements", weight: 0, multiplier: 0.5 },
];

const FEATURE_AREAS: Option[] = [
    { id: "users", label: "Users & Accounts", weight: 15 },
    { id: "database-apis", label: "Database, 3rd-party APIs & data", weight: 18 },
    { id: "notifications", label: "Notifications", weight: 12 },
    { id: "operations", label: "Business Operations", weight: 20 },
    { id: "data", label: "Data & Reporting", weight: 18 },
    { id: "integrations", label: "Integrations", weight: 16 },
    { id: "admin", label: "Administration", weight: 12 },
];

interface Answers {
    projectType: string | null;
    involves: string[];
    stage: string | null;
    engagement: string | null;
    features: string[];
}

const EMPTY_ANSWERS: Answers = {
    projectType: null,
    involves: [],
    stage: null,
    engagement: null,
    features: [],
};

function estimateDays(answers: Answers): { low: number; high: number } {
    const typeWeight = PROJECT_TYPES.find((o) => o.id === answers.projectType)?.weight ?? 0;
    const involvesWeight = answers.involves.reduce(
        (sum, id) => sum + (PROJECT_INVOLVES.find((o) => o.id === id)?.weight ?? 0),
        0
    );
    const featuresWeight = answers.features.reduce(
        (sum, id) => sum + (FEATURE_AREAS.find((o) => o.id === id)?.weight ?? 0),
        0
    );
    const stageMultiplier = STAGES.find((o) => o.id === answers.stage)?.multiplier ?? 1;
    const engagementMultiplier = ENGAGEMENT_TYPES.find((o) => o.id === answers.engagement)?.multiplier ?? 1;

    const base = (typeWeight + involvesWeight + featuresWeight) * stageMultiplier * engagementMultiplier;
    const floorBase = Math.max(base, 15);

    const low = Math.max(10, Math.round((floorBase * 0.85) / 5) * 5);
    const high = Math.max(low + 15, Math.round((floorBase * 1.15) / 5) * 5);

    return { low, high };
}

/* -------------------------------------------------------------------------
 * localStorage persistence
 * ---------------------------------------------------------------------- */

const STORAGE_KEY = "syntac-project-estimator";

interface PersistedState {
    step: number;
    answers: Answers;
    name: string;
    email: string;
    details: string;
}

function loadPersisted(): PersistedState | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as PersistedState;
    } catch {
        return null;
    }
}

function savePersisted(state: PersistedState) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // storage full or unavailable — safe to ignore, progress just won't persist
    }
}

function clearPersisted() {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
}

/* -------------------------------------------------------------------------
 * Left identity panel — big step number + vertical rail, inverted colors
 * ---------------------------------------------------------------------- */

const STEP_LABELS = ["Type", "Scope", "Stage", "Engagement", "Features", "Estimate", "Contact"];

function IdentityPanel({ step }: { step: number }) {
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
}

function MobileProgress({ step }: { step: number }) {
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
}

/* -------------------------------------------------------------------------
 * Shared step primitives
 * ---------------------------------------------------------------------- */

function SelectCard({
                        label,
                        selected,
                        onClick,
                    }: {
    label: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group cursor-pointer flex w-full items-center justify-between rounded-md border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200",
                selected
                    ? "border-primary bg-primary/[0.06]"
                    : "border-border bg-background hover:border-foreground/20 hover:bg-muted/40"
            )}
        >
            <span className={selected ? "text-foreground" : "text-foreground/90"}>{label}</span>
            <span
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
 * The wizard
 * ---------------------------------------------------------------------- */

type LeadStatus = "idle" | "submitting" | "submitted";

interface ProjectEstimatorWizardProps {
    className?: string;
    onSubmitLead?: (lead: {
        name: string;
        email: string;
        details: string;
        answers: Answers;
        estimate: { low: number; high: number };
    }) => void | Promise<void>;
}

export function ProjectEstimatorWizard({ className, onSubmitLead }: ProjectEstimatorWizardProps) {
    const persisted = useRef<PersistedState | null>(null);
    if (persisted.current === null) persisted.current = loadPersisted() ?? null;

    const [step, setStep] = useState(persisted.current?.step ?? 0);
    const [answers, setAnswers] = useState<Answers>(persisted.current?.answers ?? EMPTY_ANSWERS);
    const [name, setName] = useState(persisted.current?.name ?? "");
    const [email, setEmail] = useState(persisted.current?.email ?? "");
    const [details, setDetails] = useState(persisted.current?.details ?? "");
    const [leadStatus, setLeadStatus] = useState<LeadStatus>("idle");

    const estimate = useMemo(() => estimateDays(answers), [answers]);

    // Persist progress on every change, except once a lead has been submitted.
    useEffect(() => {
        if (leadStatus === "submitted") return;
        savePersisted({ step, answers, name, email, details });
    }, [step, answers, name, email, details, leadStatus]);

    // Smooth, premium step transitions — a quiet fade + rise, not a slide gimmick.
    const panelRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const el = panelRef.current;
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
    }, [step]);

    const toggleMulti = (key: "involves" | "features", id: string) => {
        setAnswers((prev) => {
            const list = prev[key];
            const next = list.includes(id) ? list.filter((v) => v !== id) : [...list, id];
            return { ...prev, [key]: next };
        });
    };

    const canAdvance = () => {
        if (step === 0) return !!answers.projectType;
        if (step === 1) return answers.involves.length > 0;
        if (step === 2) return !!answers.stage;
        if (step === 3) return !!answers.engagement;
        if (step === 4) return answers.features.length > 0;
        return true;
    };

    const handleLeadSubmit = async () => {
        if (!name || !email) return;
        setLeadStatus("submitting");
        try {
            await onSubmitLead?.({ name, email, details, answers, estimate });
        } finally {
            setLeadStatus("submitted");
            clearPersisted();
        }
    };

    return (
        <div className={cn("grid h-full w-full lg:grid-cols-[360px_1fr]", className)}>
            <IdentityPanel step={step} />

            <div className="flex h-full flex-col overflow-y-auto px-6 py-12 sm:px-12 lg:px-20 lg:py-16">
                <MobileProgress step={step} />

                <div className="flex flex-1 items-center justify-center">
                    <div ref={panelRef} className="w-full max-w-xl">
                        {step === 0 && (
                            <fieldset>
                                <legend className="mb-6 text-3xl font-semibold tracking-tight">
                                    What are you looking to build?
                                </legend>
                                <div className="grid gap-2.5">
                                    {PROJECT_TYPES.map((opt) => (
                                        <SelectCard
                                            key={opt.id}
                                            label={opt.label}
                                            selected={answers.projectType === opt.id}
                                            onClick={() => setAnswers((a) => ({ ...a, projectType: opt.id }))}
                                        />
                                    ))}
                                </div>
                                <StepFooter showBack={false} onNext={() => setStep(1)} nextDisabled={!canAdvance()} />
                            </fieldset>
                        )}

                        {step === 1 && (
                            <fieldset>
                                <legend className="mb-1 text-3xl font-semibold tracking-tight">
                                    What does your project involve?
                                </legend>
                                <p className="text-muted-foreground mb-6 text-sm">Select everything that applies.</p>
                                <div className="grid gap-2.5">
                                    {PROJECT_INVOLVES.map((opt) => (
                                        <SelectCard
                                            key={opt.id}
                                            label={opt.label}
                                            selected={answers.involves.includes(opt.id)}
                                            onClick={() => toggleMulti("involves", opt.id)}
                                        />
                                    ))}
                                </div>
                                <StepFooter showBack onBack={() => setStep(0)} onNext={() => setStep(2)} nextDisabled={!canAdvance()} />
                            </fieldset>
                        )}

                        {step === 2 && (
                            <fieldset>
                                <legend className="mb-6 text-3xl font-semibold tracking-tight">What stage are you at?</legend>
                                <div className="grid gap-2.5">
                                    {STAGES.map((opt) => (
                                        <SelectCard
                                            key={opt.id}
                                            label={opt.label}
                                            selected={answers.stage === opt.id}
                                            onClick={() => setAnswers((a) => ({ ...a, stage: opt.id }))}
                                        />
                                    ))}
                                </div>
                                <StepFooter showBack onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!canAdvance()} />
                            </fieldset>
                        )}

                        {step === 3 && (
                            <fieldset>
                                <legend className="mb-6 text-3xl font-semibold tracking-tight">
                                    What do you need from SYNTAC?
                                </legend>
                                <div className="grid gap-2.5">
                                    {ENGAGEMENT_TYPES.map((opt) => (
                                        <SelectCard
                                            key={opt.id}
                                            label={opt.label}
                                            selected={answers.engagement === opt.id}
                                            onClick={() => setAnswers((a) => ({ ...a, engagement: opt.id }))}
                                        />
                                    ))}
                                </div>
                                <StepFooter showBack onBack={() => setStep(2)} onNext={() => setStep(4)} nextDisabled={!canAdvance()} />
                            </fieldset>
                        )}

                        {step === 4 && (
                            <fieldset>
                                <legend className="mb-1 text-3xl font-semibold tracking-tight">
                                    What features do you need?
                                </legend>
                                <p className="text-muted-foreground mb-6 text-sm">Select everything that applies.</p>
                                <div className="grid gap-2.5">
                                    {FEATURE_AREAS.map((opt) => (
                                        <SelectCard
                                            key={opt.id}
                                            label={opt.label}
                                            selected={answers.features.includes(opt.id)}
                                            onClick={() => toggleMulti("features", opt.id)}
                                        />
                                    ))}
                                </div>
                                <StepFooter
                                    showBack
                                    onBack={() => setStep(3)}
                                    onNext={() => setStep(5)}
                                    nextDisabled={!canAdvance()}
                                    nextLabel="See my estimate"
                                />
                            </fieldset>
                        )}

                        {step === 5 && (
                            <div>
                                <p className="text-muted-foreground text-sm">Estimated development time</p>
                                <p className="mt-2 text-6xl font-semibold tracking-tight">
                                    ~{estimate.low}–{estimate.high}
                                </p>
                                <p className="text-muted-foreground mt-1 text-xl">development days</p>
                                <p className="text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed">
                                    <strong>Kindly Note:</strong> This is an indicative range based on what you've told us so far, the final scope
                                    depends on detailed requirements, integrations, design decisions, feedback rounds, and
                                    any changes along the way. Share a few details below and we'll follow up with a proper
                                    assessment.
                                </p>
                                <div className="mt-10 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(4)}
                                        className="cursor-pointer flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                                    >
                                        <MoveLeft />
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(6)}
                                        className="cursor-pointer bg-primary text-primary-foreground rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
                                    >
                                        Get in touch
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 6 && leadStatus !== "submitted" && (
                            <div>
                                <h3 className="text-3xl font-semibold tracking-tight">Tell us how to reach you</h3>
                                <p className="text-muted-foreground mt-2 text-sm">
                                    We'll follow up with a proper assessment based on what you've shared.
                                </p>
                                <div className="mt-7 grid gap-3">
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border-border bg-background focus:border-primary w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border-border bg-background focus:border-primary w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors"
                                    />
                                    <textarea
                                        placeholder="Anything else about your project we should know? (optional)"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        rows={6}
                                        className="border-border bg-background focus:border-primary w-full resize-none rounded-md border px-4 py-3 text-sm outline-none transition-colors"
                                    />
                                </div>
                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(5)}
                                        className="text-muted-foreground cursor-pointer hover:text-foreground text-sm font-medium transition-colors flex items-center gap-2"
                                    >
                                        <MoveLeft />
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleLeadSubmit}
                                        disabled={!name || !email || leadStatus === "submitting"}
                                        className={cn(
                                            "rounded-md cursor-pointer px-6 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-1",
                                            !name || !email || leadStatus === "submitting"
                                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                                : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md"
                                        )}
                                    >
                                        {leadStatus === "submitting" ? "Sending…" : "Send my details"}
                                        {/*{leadStatus !== "submitting" ? <LoaderCircle className={'animate-spin'} /> : <Send /> }*/}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 6 && leadStatus === "submitted" && (
                            <div className="py-8">
                                <span className="border-primary text-primary mb-5 flex size-11 items-center justify-center rounded-full border">
                                  <Check className="size-5" />
                                </span>
                                <h3 className="text-3xl font-semibold tracking-tight">Thanks, {name.split(" ")[0]}.</h3>
                                <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                                    We've got your project details and your indicative estimate of <strong>~{estimate.low}–
                                    {estimate.high}</strong> development days. We'll be in touch at {email} shortly.
                                    <br />      <br />
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

/* -------------------------------------------------------------------------
 * Trigger + full-screen dialog
 * ---------------------------------------------------------------------- */

interface StartYourProjectProps {
    className?: string;
    onSubmitLead?: ProjectEstimatorWizardProps["onSubmitLead"];
}

export function StartYourProject({ className, onSubmitLead }: StartYourProjectProps) {
    const [open, setOpen] = useState(false);
    // Bumped every time the overlay opens, forcing ProjectEstimatorWizard to
    // fully remount — which guarantees its localStorage read (and therefore
    // pre-population of saved progress) happens fresh on every open.
    const [instanceKey, setInstanceKey] = useState(0);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Lock page scroll while the overlay is open.
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    // Close on Escape.
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    // Quiet fade-in on open, rather than an abrupt appearance.
    useEffect(() => {
        if (open && overlayRef.current) {
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
        }
    }, [open]);

    const handleOpen = () => {
        setInstanceKey((k) => k + 1);
        setOpen(true);
    };

    return (
        <div className={className}>
            <button
                type="button"
                onClick={handleOpen}
                className="cursor-pointer focus-visible:border-ring mx-auto focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 has-[&gt;svg]:px-4 gap-2 rounded-lg px-6! text-base shadow-sm max-[400px]:flex-1"
            >
                Estimate my project
            </button>

            {open && (
                <div
                    ref={overlayRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Project Estimator"
                    className="bg-background fixed inset-0 z-50"
                >
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                        className="text-muted-foreground cursor-pointer hover:text-foreground hover:bg-muted absolute top-6 right-6 z-10 rounded-full p-2.5 transition-colors"
                    >
                        <X className="size-5" />
                    </button>
                    <ProjectEstimatorWizard key={instanceKey} className="h-screen" onSubmitLead={onSubmitLead} />
                </div>
            )}
        </div>
    );
}