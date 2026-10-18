import { z } from "zod";
import {DOMAIN_FIXES} from "@/utils/Site/domail-suggestions";

/* -------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------- */

export interface ChoiceOption {
  id: string;
  label: string;
  description?: string;
}

interface WeightedOption extends ChoiceOption {
  /** Effort this option adds (development days, or hours/month for support). */
  weight: number;
}

interface MultiplierOption extends ChoiceOption {
  multiplier: number;
}

interface OptionGroup {
  title: string;
  otherPlaceholder: string;
  options: readonly WeightedOption[];
}

export interface RangeRules {
  /** Smallest base figure the range is built around. */
  floor: number;
  /** Rounding step for the low/high figures. */
  step: number;
  minLow: number;
  /** The high figure is always at least this far above the low figure. */
  minSpread: number;
}

/** Copy that changes with the kind of estimate (build effort vs. support effort). */
export interface ServiceCopy {
  estimateLabel: string;
  unit: string;
  rounding: string;
  meaning: string;
  stageNote: string;
  engagementNote: string;
  excludes: string;
}

export interface ServiceDefinition {
  id: string;
  label: string;
  description: string;
  /** Base effort for choosing this service. */
  weight: number;
  copy: ServiceCopy;
  range: RangeRules;
  involves: OptionGroup;
  stages: readonly MultiplierOption[];
  engagement: readonly MultiplierOption[];
  features: OptionGroup;
}

/* -------------------------------------------------------------------------
 * Shared building blocks
 * ---------------------------------------------------------------------- */

const DEFAULT_RANGE = { floor: 15, step: 5, minLow: 10, minSpread: 15 } as const;
const SUPPORT_RANGE = { floor: 3, step: 1, minLow: 2, minSpread: 2 } as const;

const BUILD_COPY = {
  estimateLabel: "Estimated development time",
  unit: "development days",
  rounding: "the nearest 5 days",
  meaning:
    "Development days are days of focused work, not calendar days. Several people can work in parallel, so the calendar time is often shorter. It's a guide to effort, not a price or a deadline.",
  stageNote:
    "Your stage adjusts it. Clear requirements and designs mean fewer unknowns, so the figure shrinks. A rough idea needs more discovery, so it grows.",
  engagementNote:
    "How you want to work with us adjusts it again. A prototype or a discovery phase takes far less effort than a full build.",
  excludes:
    "Hosting, domain names, third-party licences or fees, content creation, and extra feedback rounds or changes to scope along the way.",
} as const;

const SUPPORT_COPY = {
  estimateLabel: "Estimated support effort",
  unit: "hours per month",
  rounding: "the nearest hour",
  meaning:
    "Hours are the support effort we'd expect in a typical month. It's a guide to workload, not a price, and we'll confirm the best arrangement with you.",
  stageNote:
    "The condition of your system adjusts it. A stable system needs less attention than one with frequent issues, or one that was built by another provider.",
  engagementNote:
    "The support plan adjusts it again. As-needed support uses fewer hours than a priority plan with faster response times.",
  excludes:
    "Hosting and third-party licence costs, and any work that falls outside the support you selected.",
} as const;

const STAGES = [
  { id: "idea", label: "Just an idea", multiplier: 1.25 },
  { id: "requirements", label: "Requirements defined", multiplier: 1.1 },
  { id: "designs", label: "Designs ready", multiplier: 1.0 },
  { id: "existing", label: "Existing system", multiplier: 0.85 },
  { id: "replacing", label: "Replacing / improving an existing system", multiplier: 0.9 },
] as const;

const SUPPORT_STAGES = [
  { id: "live", label: "System is live and stable", multiplier: 1.0 },
  { id: "built-by-us", label: "Built by SYNTAC", multiplier: 0.9 },
  { id: "handover", label: "Built by another provider", multiplier: 1.2 },
  { id: "unstable", label: "Having frequent issues", multiplier: 1.4 },
] as const;

const E = {
  discovery: {
    id: "discovery",
    label: "Discovery & Planning",
    description: "Workshops to define requirements, scope and a roadmap before anything is built.",
    multiplier: 0.15,
  },
  design: {
    id: "design",
    label: "UI/UX Design Only",
    description: "Wireframes, prototypes and a design system, ready to hand over for development.",
    multiplier: 0.3,
  },
  prototype: {
    id: "prototype",
    label: "Prototype / Proof of Concept",
    description: "A clickable or working prototype to test an idea before committing to a full build.",
    multiplier: 0.35,
  },
  mvp: {
    id: "mvp",
    label: "MVP",
    description: "The smallest version of your product that delivers real value and tests your idea.",
    multiplier: 0.6,
  },
  development: {
    id: "development",
    label: "Development Only",
    description: "You already have designs and specifications. We build it.",
    multiplier: 0.75,
  },
  designDev: {
    id: "design-dev",
    label: "Full-cycle Design and Development",
    description: "Discovery, design, development and launch, handled end to end.",
    multiplier: 0.9,
  },
  improvements: {
    id: "improvements",
    label: "Improvements to an Existing System",
    description: "New features, fixes or enhancements to something that's already built.",
    multiplier: 0.5,
  },
} as const;

const OTHER_PLACEHOLDER = "Something not listed? Describe it here";

/* -------------------------------------------------------------------------
 * Services: every later step (scope, stage, engagement, features) depends on
 * the service chosen first.
 * ---------------------------------------------------------------------- */

export const SERVICES = [
  {
    id: "website",
    label: "Website",
    description: "Business sites, portfolios, content-driven sites and online stores.",
    weight: 8,
    copy: BUILD_COPY,
    range: DEFAULT_RANGE,
    involves: {
      title: "What should your website include?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "pages", label: "Standard pages (home, about, services, contact)", weight: 4 },
        { id: "blog", label: "Blog or news section", weight: 3 },
        { id: "store", label: "Online store / e-commerce", weight: 20 },
        { id: "booking", label: "Booking or appointments", weight: 10 },
        { id: "members", label: "Members-only or client area", weight: 10 },
        { id: "multilingual", label: "Multiple languages", weight: 5 },
        { id: "integrations", label: "Third-party integrations (CRM, newsletter, payments)", weight: 6 },
        { id: "migration", label: "Content migration from an existing site", weight: 4 },
      ],
    },
    stages: STAGES,
    engagement: [
      E.discovery,
      E.design,
      E.development,
      E.designDev,
      {
        ...E.improvements,
        label: "Redesign or Improve an Existing Website",
        description: "Refresh the design, fix problems or add new sections to a site you already have.",
      },
    ],
    features: {
      title: "What features do you need?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "cms", label: "Content management system (edit it yourself)", weight: 6 },
        { id: "seo", label: "SEO foundations (metadata, sitemap, structured data)", weight: 4 },
        { id: "forms", label: "Contact & enquiry forms with spam protection", weight: 2 },
        { id: "performance", label: "Speed & performance optimisation", weight: 3 },
        { id: "analytics", label: "Analytics & conversion tracking", weight: 2 },
        { id: "security", label: "Security setup (SSL, backups, secure admin login)", weight: 3 },
        { id: "newsletter", label: "Newsletter sign-up & email marketing", weight: 2 },
        { id: "consent", label: "Cookie consent & privacy compliance", weight: 2 },
      ],
    },
  },
  {
    id: "web-app",
    label: "Web Application",
    description: "Customer portals, dashboards and SaaS products that run in the browser.",
    weight: 45,
    copy: BUILD_COPY,
    range: DEFAULT_RANGE,
    involves: {
      title: "What does your web application involve?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "marketing", label: "Public marketing pages alongside the app", weight: 8 },
        { id: "customer-portal", label: "Customer-facing portal", weight: 18 },
        { id: "back-office", label: "Internal staff tools / back office", weight: 18 },
        { id: "roles", label: "Multiple user roles & permissions", weight: 14 },
        { id: "import-export", label: "Data import & export (CSV, Excel)", weight: 8 },
        { id: "pwa", label: "Mobile-friendly or installable (PWA)", weight: 10 },
        { id: "integrations", label: "Third-party integrations (payments, maps, CRM)", weight: 15 },
        { id: "saas", label: "Subscriptions or multiple customer accounts (SaaS)", weight: 25 },
      ],
    },
    stages: STAGES,
    engagement: [E.discovery, E.design, E.prototype, E.mvp, E.development, E.designDev, E.improvements],
    features: {
      title: "What features do you need?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "auth", label: "User accounts & authentication", weight: 12 },
        { id: "dashboard", label: "Dashboard & analytics", weight: 14 },
        { id: "admin", label: "Admin panel", weight: 12 },
        { id: "notifications", label: "Notifications (email, SMS, in-app)", weight: 10 },
        { id: "files", label: "File upload & document storage", weight: 8 },
        { id: "payments", label: "Payments & billing", weight: 18 },
        { id: "search", label: "Search, filtering & sorting", weight: 8 },
        { id: "api", label: "API for mobile apps or other systems", weight: 14 },
      ],
    },
  },
  {
    id: "custom-software",
    label: "Custom Software / Business System",
    description: "Internal systems for sales, operations, finance, HR or inventory.",
    weight: 70,
    copy: BUILD_COPY,
    range: DEFAULT_RANGE,
    involves: {
      title: "Which areas of your business should it cover?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "sales", label: "Sales & customers (CRM)", weight: 18 },
        { id: "orders", label: "Orders & inventory", weight: 22 },
        { id: "finance", label: "Finance, invoicing & billing", weight: 22 },
        { id: "hr", label: "HR, staff & scheduling", weight: 18 },
        { id: "jobs", label: "Projects, jobs & field work", weight: 18 },
        { id: "documents", label: "Documents, forms & approvals", weight: 14 },
        { id: "portal", label: "Client or supplier portal", weight: 16 },
        { id: "locations", label: "Multiple branches or locations", weight: 12 },
      ],
    },
    stages: STAGES,
    engagement: [E.discovery, E.design, E.prototype, E.mvp, E.development, E.designDev, E.improvements],
    features: {
      title: "What capabilities does it need?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "rbac", label: "Role-based access control", weight: 12 },
        { id: "workflows", label: "Workflow & approval engine", weight: 20 },
        { id: "reporting", label: "Reporting & dashboards", weight: 18 },
        { id: "audit", label: "Audit trail & activity logs", weight: 12 },
        { id: "integrations", label: "Integrations (accounting, email, payments, ERP)", weight: 16 },
        { id: "notifications", label: "Notifications & reminders", weight: 10 },
        { id: "migration", label: "Data import & migration from existing tools", weight: 14 },
        { id: "mobile", label: "Mobile or offline access", weight: 16 },
      ],
    },
  },
  {
    id: "automation",
    label: "Business Automation",
    description: "Replace manual processes, spreadsheets and re-typing between systems.",
    weight: 55,
    copy: BUILD_COPY,
    range: DEFAULT_RANGE,
    involves: {
      title: "What would you like to automate?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "approvals", label: "Approvals & internal requests", weight: 14 },
        { id: "documents", label: "Document & report generation", weight: 12 },
        { id: "data-sync", label: "Data entry & syncing between systems", weight: 16 },
        { id: "communication", label: "Email, SMS & customer communication", weight: 10 },
        { id: "invoicing", label: "Quotes, invoicing & payments", weight: 16 },
        { id: "onboarding", label: "Onboarding & HR processes", weight: 12 },
        { id: "scheduled", label: "Scheduled jobs & recurring tasks", weight: 8 },
        { id: "spreadsheets", label: "Replacing spreadsheets with a system", weight: 14 },
      ],
    },
    stages: STAGES,
    engagement: [E.discovery, E.prototype, E.development, E.designDev, E.improvements],
    features: {
      title: "What should the automation be able to do?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "rules", label: "Workflow builder / rules engine", weight: 20 },
        { id: "integrations", label: "Integrations & API connections", weight: 16 },
        { id: "alerts", label: "Automatic notifications & escalations", weight: 10 },
        { id: "routing", label: "Task assignment & routing", weight: 12 },
        { id: "dashboards", label: "Dashboards & KPI tracking", weight: 14 },
        { id: "errors", label: "Error handling, retries & alerts", weight: 8 },
        { id: "audit", label: "Audit trail & activity logs", weight: 10 },
        { id: "admin", label: "Admin controls (change rules without code)", weight: 14 },
      ],
    },
  },
  {
    id: "modernisation",
    label: "Modernise an Existing System",
    description: "Upgrade, migrate or extend software that's holding your business back.",
    weight: 40,
    copy: BUILD_COPY,
    range: DEFAULT_RANGE,
    involves: {
      title: "What needs modernising?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "ui", label: "User interface & experience", weight: 15 },
        { id: "database", label: "Database & data migration", weight: 20 },
        { id: "cloud", label: "Moving to the cloud or new hosting", weight: 14 },
        { id: "framework", label: "Upgrading the framework or language version", weight: 16 },
        { id: "api-layer", label: "Adding an API layer", weight: 14 },
        { id: "modules", label: "Replacing outdated modules", weight: 20 },
        { id: "integrations", label: "Connecting to newer tools", weight: 12 },
        { id: "stability", label: "Performance & stability problems", weight: 10 },
      ],
    },
    stages: STAGES,
    engagement: [
      {
        id: "assessment",
        label: "Assessment & Roadmap",
        description: "Review your current system and recommend whether to re-host, re-platform, refactor or rebuild.",
        multiplier: 0.15,
      },
      {
        id: "integration-layer",
        label: "API / Integration Layer",
        description: "Put an API in front of the old system so new tools can connect without touching its internals.",
        multiplier: 0.4,
      },
      {
        id: "phased",
        label: "Phased Modernisation",
        description: "Replace or upgrade one module at a time while the system keeps running.",
        multiplier: 0.7,
      },
      {
        id: "replatform",
        label: "Re-platform & Migrate",
        description: "Move to a supported framework, database or hosting platform, including data migration.",
        multiplier: 0.8,
      },
      {
        id: "rebuild",
        label: "Full Rebuild",
        description: "Start again on a modern architecture. The most effort and the highest risk.",
        multiplier: 1.0,
      },
    ],
    features: {
      title: "What do you want out of the modernisation?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "data-migration", label: "Data cleansing & migration with validation", weight: 18 },
        { id: "api", label: "API access to existing functionality", weight: 14 },
        { id: "redesign", label: "UI/UX redesign", weight: 16 },
        { id: "security", label: "Security hardening & compliance", weight: 12 },
        { id: "testing", label: "Automated testing & deployment pipeline", weight: 12 },
        { id: "phased", label: "Phased rollout with minimal downtime", weight: 14 },
        { id: "docs", label: "Documentation & knowledge handover", weight: 8 },
        { id: "performance", label: "Performance optimisation", weight: 10 },
      ],
    },
  },
  {
    id: "maintenance",
    label: "Maintenance & Support",
    description: "Keep a website or system secure, updated and running smoothly.",
    weight: 2,
    copy: SUPPORT_COPY,
    range: SUPPORT_RANGE,
    involves: {
      title: "What needs looking after?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "website", label: "Marketing website", weight: 2 },
        { id: "web-app", label: "Web application", weight: 4 },
        { id: "business-system", label: "Business or internal system", weight: 6 },
        { id: "store", label: "Online store", weight: 3 },
        { id: "hosting", label: "Hosting & servers", weight: 2 },
        { id: "database", label: "Databases & data", weight: 2 },
        { id: "integrations", label: "Third-party integrations", weight: 3 },
        { id: "content", label: "Content & user management", weight: 2 },
      ],
    },
    stages: SUPPORT_STAGES,
    engagement: [
      {
        id: "as-needed",
        label: "As-needed Support",
        description: "No monthly commitment. Get help when something breaks or needs changing.",
        multiplier: 0.5,
      },
      {
        id: "essential",
        label: "Essential Care Plan",
        description: "Proactive updates, backups, monitoring and security patches on a schedule.",
        multiplier: 0.8,
      },
      {
        id: "standard",
        label: "Standard Support Plan",
        description: "Essential care plus bug fixes and small changes every month.",
        multiplier: 1.0,
      },
      {
        id: "priority",
        label: "Priority Support Plan",
        description: "Faster response times, emergency fixes and regular improvements.",
        multiplier: 1.4,
      },
    ],
    features: {
      title: "What kind of support do you need?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "patches", label: "Security patches & software updates", weight: 2 },
        { id: "backups", label: "Automated backups & restore checks", weight: 1 },
        { id: "monitoring", label: "Uptime & performance monitoring", weight: 1 },
        { id: "bugfixes", label: "Bug fixes", weight: 4 },
        { id: "changes", label: "Small changes & content updates", weight: 4 },
        { id: "priority", label: "Priority & emergency support", weight: 3 },
        { id: "reports", label: "Monthly health & performance reports", weight: 1 },
        { id: "helpdesk", label: "Technical support for your team", weight: 3 },
      ],
    },
  },
  {
    id: "other",
    label: "Something Else",
    description: "Not sure where your idea fits? Tell us what you have in mind.",
    weight: 40,
    copy: BUILD_COPY,
    range: DEFAULT_RANGE,
    involves: {
      title: "What does your project involve?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "web", label: "A website or web application", weight: 20 },
        { id: "mobile", label: "A mobile app", weight: 35 },
        { id: "integrations", label: "Connecting to other systems", weight: 15 },
        { id: "data", label: "Data, reporting or analytics", weight: 14 },
        { id: "accounts", label: "User accounts & permissions", weight: 12 },
        { id: "automation", label: "Automating a manual process", weight: 14 },
        { id: "devices", label: "Hardware or device connectivity", weight: 25 },
        { id: "unsure", label: "Not sure yet, I'd like advice", weight: 0 },
      ],
    },
    stages: STAGES,
    engagement: [E.discovery, E.design, E.prototype, E.mvp, E.development, E.designDev, E.improvements],
    features: {
      title: "What features do you need?",
      otherPlaceholder: OTHER_PLACEHOLDER,
      options: [
        { id: "auth", label: "User accounts & authentication", weight: 12 },
        { id: "admin", label: "Admin panel", weight: 12 },
        { id: "reporting", label: "Reporting & dashboards", weight: 14 },
        { id: "notifications", label: "Notifications (email, SMS, in-app)", weight: 10 },
        { id: "integrations", label: "Integrations & APIs", weight: 16 },
        { id: "payments", label: "Payments & billing", weight: 18 },
        { id: "files", label: "File storage & document handling", weight: 8 },
        { id: "search", label: "Search & filtering", weight: 8 },
      ],
    },
  },
] as const satisfies readonly ServiceDefinition[];

// export type ServiceId = (typeof SERVICES)[number]["id"];

export const STEP_LABELS = [
  "Service",
  "Scope",
  "Stage",
  "Engagement",
  "Features",
  "Estimate",
  "Contact",
] as const;

export const TOTAL_STEPS: number = STEP_LABELS.length;

/** The five choice steps, in order. Estimate and Contact follow. */
export const CHOICE_KEYS = ["service", "involves", "stage", "engagement", "features"] as const;
export type ChoiceKey = (typeof CHOICE_KEYS)[number];

/* -------------------------------------------------------------------------
 * Lookups (built once at module load)
 * ---------------------------------------------------------------------- */

interface ServiceLookup {
  service: ServiceDefinition;
  involves: Map<string, number>;
  features: Map<string, number>;
  stage: Map<string, number>;
  engagement: Map<string, number>;
}

const toMap = <T extends { id: string }>(list: readonly T[], pick: (option: T) => number) =>
  new Map<string, number>(list.map((option) => [option.id, pick(option)] as const));

const LOOKUPS = new Map<string, ServiceLookup>(
  SERVICES.map(
    (service: ServiceDefinition) =>
      [
        service.id,
        {
          service,
          involves: toMap(service.involves.options, (o) => o.weight),
          features: toMap(service.features.options, (o) => o.weight),
          stage: toMap(service.stages, (o) => o.multiplier),
          engagement: toMap(service.engagement, (o) => o.multiplier),
        },
      ] as const
  )
);

export const getService = (id?: string): ServiceDefinition | undefined =>
  id ? LOOKUPS.get(id)?.service : undefined;

/* -------------------------------------------------------------------------
 * Schema
 * ---------------------------------------------------------------------- */

/** Typed tuple of ids, which is what z.enum() needs. */
const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((o) => o.id) as unknown as [T[number]["id"], ...T[number]["id"][]];

const serviceField = z.enum(ids(SERVICES), { message: "Please choose a service." });

const otherText = z.string().trim().max(300, "Please keep this under 300 characters.").optional();

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Please enter your email address.")
  .max(254, "That email address is too long.")
  .email("Please enter a valid email address, e.g. name@company.co.za.");

const EstimatorBaseSchema = z.object({
  service: serviceField,
  involves: z.array(z.string()),
  involvesOther: otherText,
  stage: z.string({ message: "Please choose your current stage." }),
  engagement: z.string({ message: "Please choose what you need from us." }),
  features: z.array(z.string()),
  featuresOther: otherText,

  name: z.string().trim().min(2, "Please enter your name."),
  email: emailField,
  details: z.string().trim().optional(),
});

/**
 * Option ids are only meaningful for the chosen service, so they are checked
 * here rather than with fixed enums. Runs on the final submit (and on the
 * server) once every field is present.
 */
export const EstimatorSchema = EstimatorBaseSchema.superRefine((values, ctx) => {
  const lookup = LOOKUPS.get(values.service);
  if (!lookup) return;

  const selectionInvalid = (
    selected: readonly string[],
    valid: Map<string, number>,
    other: string | undefined
  ) => selected.some((id) => !valid.has(id)) || (selected.length === 0 && !other);

  if (selectionInvalid(values.involves, lookup.involves, values.involvesOther)) {
    ctx.addIssue({
      code: "custom",
      path: ["involves"],
      message: "Select at least one option or describe it in your own words.",
    });
  }

  if (selectionInvalid(values.features, lookup.features, values.featuresOther)) {
    ctx.addIssue({
      code: "custom",
      path: ["features"],
      message: "Select at least one option or describe it in your own words.",
    });
  }

  if (!lookup.stage.has(values.stage)) {
    ctx.addIssue({ code: "custom", path: ["stage"], message: "Please choose your current stage." });
  }

  if (!lookup.engagement.has(values.engagement)) {
    ctx.addIssue({ code: "custom", path: ["engagement"], message: "Please choose what you need from us." });
  }
});

export type EstimatorFormValues = z.infer<typeof EstimatorSchema>;

export type EstimatorAnswers = Pick<
  EstimatorFormValues,
  "service" | "involves" | "involvesOther" | "stage" | "engagement" | "features" | "featuresOther"
>;

/**
 * Lenient schema used only when restoring saved progress. Each field falls
 * back to an empty value on its own; `sanitizeValues` then drops any option
 * that no longer exists for the saved service.
 */
export const PersistedProgressSchema = z.object({
  version: z.number(),
  step: z
    .number()
    .int()
    .min(0)
    .max(TOTAL_STEPS - 1)
    .catch(0),
  values: z.object({
    service: serviceField.optional().catch(undefined),
    involves: z.array(z.string()).catch([]),
    involvesOther: z.string().catch(""),
    stage: z.string().optional().catch(undefined),
    engagement: z.string().optional().catch(undefined),
    features: z.array(z.string()).catch([]),
    featuresOther: z.string().catch(""),
    name: z.string().catch(""),
    email: z.string().catch(""),
    details: z.string().catch(""),
  }),
});

// export type PersistedProgress = z.infer<typeof PersistedProgressSchema>;

/* -------------------------------------------------------------------------
 * Step helpers
 * ---------------------------------------------------------------------- */

type PartialAnswers = Partial<EstimatorAnswers>;

export function isChoiceStepComplete(key: ChoiceKey, values: PartialAnswers): boolean {
  const lookup = values.service ? LOOKUPS.get(values.service) : undefined;
  if (key === "service") return Boolean(lookup);
  if (!lookup) return false;

  switch (key) {
    case "involves":
      return (
        (values.involves ?? []).some((id) => lookup.involves.has(id)) ||
        Boolean(values.involvesOther?.trim())
      );
    case "stage":
      return lookup.stage.has(values.stage ?? "");
    case "engagement":
      return lookup.engagement.has(values.engagement ?? "");
    case "features":
      return (
        (values.features ?? []).some((id) => lookup.features.has(id)) ||
        Boolean(values.featuresOther?.trim())
      );
  }
}

/** Drops anything that doesn't belong to the saved service (e.g. a removed option). */
export function sanitizeValues(values: Partial<EstimatorFormValues>): Partial<EstimatorFormValues> {
  const lookup = values.service ? LOOKUPS.get(values.service) : undefined;

  if (!lookup) {
    return {
      ...values,
      service: undefined,
      involves: [],
      involvesOther: "",
      stage: undefined,
      engagement: undefined,
      features: [],
      featuresOther: "",
    };
  }

  return {
    ...values,
    involves: (values.involves ?? []).filter((id) => lookup.involves.has(id)),
    features: (values.features ?? []).filter((id) => lookup.features.has(id)),
    stage: values.stage && lookup.stage.has(values.stage) ? values.stage : undefined,
    engagement:
      values.engagement && lookup.engagement.has(values.engagement) ? values.engagement : undefined,
  };
}

/** Returns a corrected address when the domain looks like a common typo. */
export function suggestEmailFix(email: string): string | null {
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2 || !parts[0]) return null;

  const fix: string = DOMAIN_FIXES[parts[1]];
  return fix ? `${parts[0]}@${fix}` : null;
}

/* -------------------------------------------------------------------------
 * Estimation
 * ---------------------------------------------------------------------- */

export interface Estimate {
  low: number;
  high: number;
}

const sumWeights = (weights: Map<string, number>, selected: readonly string[] = []) =>
  selected.reduce((sum, id) => sum + (weights.get(id) ?? 0), 0);

export function estimateDays(input: PartialAnswers): Estimate {
  const lookup = input.service ? LOOKUPS.get(input.service) : undefined;
  const rules = lookup?.service.range ?? DEFAULT_RANGE;

  const base = lookup
    ? (lookup.service.weight +
      sumWeights(lookup.involves, input.involves) +
      sumWeights(lookup.features, input.features)) *
    (lookup.stage.get(input.stage ?? "") ?? 1) *
    (lookup.engagement.get(input.engagement ?? "") ?? 1)
    : 0;

  const floorBase = Math.max(base, rules.floor);

  const low = Math.max(rules.minLow, Math.round((floorBase * 0.85) / rules.step) * rules.step);
  const high = Math.max(low + rules.minSpread, Math.round((floorBase * 1.15) / rules.step) * rules.step);

  return { low, high };
}

/* -------------------------------------------------------------------------
 * Human-readable summary (handy for the notification email)
 * ---------------------------------------------------------------------- */

export interface AnswerSummary {
  service: string;
  involves: string[];
  involvesOther: string;
  stage: string;
  engagement: string;
  features: string[];
  featuresOther: string;
}

export function describeAnswers(answers: EstimatorAnswers): AnswerSummary {
  const service = getService(answers.service);
  const labelOf = (list: readonly ChoiceOption[] | undefined, id: string) =>
    list?.find((option) => option.id === id)?.label ?? id;

  return {
    service: service?.label ?? answers.service,
    involves: answers.involves.map((id) => labelOf(service?.involves.options, id)),
    involvesOther: answers.involvesOther ?? "",
    stage: labelOf(service?.stages, answers.stage),
    engagement: labelOf(service?.engagement, answers.engagement),
    features: answers.features.map((id) => labelOf(service?.features.options, id)),
    featuresOther: answers.featuresOther ?? "",
  };
}
