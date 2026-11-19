import { z } from "zod";

/** Shared between the browser (instant feedback) and the server (authoritative validation). */

export const eventTypes = ["Wedding", "Destination Wedding", "Engagement", "Other"] as const;
export const referralSources = ["Instagram", "Google", "Recommendation", "Wedding Planner", "Other"] as const;

const text = (label: string, min: number, max: number) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .trim()
    .min(min, { error: `Please enter your ${label}.` })
    .max(max, { error: `Please keep this under ${max} characters.` });

const optionalText = (max: number) =>
  z.string().trim().max(max, { error: `Please keep this under ${max} characters.` }).optional().default("");

export const inquirySchema = z.object({
  fullName: text("full name", 2, 120),
  email: z.string({ error: "Please enter a valid email address." }).trim().max(200).pipe(z.email({ error: "Please enter a valid email address." })),
  eventType: z.enum(eventTypes, { error: "Please choose an event type." }),
  date: z
    .string({ error: "Please choose your date." })
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Please choose your date." })
    .refine((v) => !Number.isNaN(Date.parse(v)), { error: "Please choose a valid date." }),
  venue: text("venue (or ‘TBC’)", 2, 200),
  planner: optionalText(200),
  instagram: optionalText(100),
  phone: z
    .string({ error: "Please enter your phone number." })
    .trim()
    .regex(/^\+?[\d\s().-]{6,24}$/, { error: "Please enter a valid phone number, including country code." }),
  guests: z
    .string({ error: "Please enter an approximate number of guests." })
    .trim()
    .regex(/^\d{1,4}$/, { error: "Please enter an approximate number of guests." }),
  source: z.enum(referralSources, { error: "Please let us know how you found us." }),
  message: optionalText(5000),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryField = keyof Inquiry;

/** Anti-spam fields — never shown to people. */
export const spamSchema = z.object({
  website: z.string().optional(), // honeypot: must stay empty
  startedAt: z.number().optional(), // time the form was rendered (ms)
});

export const MIN_FILL_TIME_MS = 3000;
