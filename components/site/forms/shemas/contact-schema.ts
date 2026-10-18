import { z } from "zod";

/* -------------------------------------------------------------------------- */
/* Options (single source of truth, imported by the form as well)             */
/* -------------------------------------------------------------------------- */

export const NOT_SURE_SERVICE = "I'm not sure, I need advice" as const;

export const services = [
  "Website",
  "Web Application",
  "MVP Development",
  "Custom Software",
  "Legacy System Modernisation",
  "Support & Maintenance",
  NOT_SURE_SERVICE,
] as const;

export const budgets = [
  "Under R10,000",
  "R10,000 – R25,000",
  "R25,000 – R50,000",
  "R50,000 – R100,000",
  "R100,000+",
  "Not sure yet",
] as const;

export const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible",
] as const;

export type Service = (typeof services)[number];
export type Budget = (typeof budgets)[number];
export type Timeline = (typeof timelines)[number];
export type EnquiryType = "project" | "general";

/* -------------------------------------------------------------------------- */
/* Schemas                                                                    */
/* -------------------------------------------------------------------------- */

const baseContactSchema = z.object({
  enquiryType: z.enum(["project", "general"]),

  name: z.string().trim().min(2, "Please enter your name."),

  email: z.string().trim().email("Please enter a valid email address."),

  company: z.string().trim().optional().or(z.literal("")),
});

const projectContactSchema = baseContactSchema.extend({
  enquiryType: z.literal("project"),

  services: z
    .array(z.enum(services))
    .min(1, "Please select at least one option."),

  projectDescription: z
    .string()
    .trim()
    .min(
      20,
      "Please provide a little more information about your project."
    ),

  budget: z.enum(budgets, {
    message: "Please select your estimated budget.",
  }),

  timeline: z.enum(timelines, {
    message: "Please select your preferred timeline.",
  }),
});

const generalContactSchema = baseContactSchema.extend({
  enquiryType: z.literal("general"),

  subject: z.string().trim().min(3, "Please enter a subject."),

  message: z
    .string()
    .trim()
    .min(10, "Please provide some details about your enquiry."),
});

export const ContactSchema = z.discriminatedUnion("enquiryType", [
  projectContactSchema,
  generalContactSchema,
]);

/** Validated payload, use this type in the API route. */
export type ContactSubmission = z.infer<typeof ContactSchema>;

/* -------------------------------------------------------------------------- */
/* Form state type                                                            */
/* -------------------------------------------------------------------------- */

export type ContactFormValues = {
  enquiryType?: EnquiryType;

  name: string;
  email: string;
  company?: string;

  services: Service[];
  projectDescription?: string;
  budget?: Budget;
  timeline?: Timeline;

  subject?: string;
  message?: string;
};
