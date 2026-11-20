/**
 * Netlify Forms definition for the inquiry form.
 *
 * Netlify only accepts submissions for forms it detected at deploy time, so a
 * hidden static copy lives in public/__forms.html. That file is GENERATED from
 * this list by `scripts/generate-forms-html.ts` (runs before every build), so
 * the field names can never drift out of sync.
 *
 * Keys are the inquiry fields; values are the human-readable names shown in
 * the Netlify dashboard and in the notification email. "email" stays lowercase
 * so Netlify sets it as the notification's Reply-To.
 *
 * NOTE: imported by a Node script — keep it free of path aliases.
 */
export const NETLIFY_FORM_NAME = "wedding-inquiry";
export const NETLIFY_FORM_PATH = "/__forms.html";
export const NETLIFY_HONEYPOT = "website";
export const NETLIFY_SUBJECT = "New wedding inquiry — candidweddingsco.com (%{submissionId})";

// Order matters: Netlify titles each submission with the first text field (the name).
export const netlifyFieldNames = {
  fullName: "Name",
  email: "email",
  phone: "Phone",
  eventType: "Event type",
  date: "Wedding date",
  venue: "Venue",
  guests: "Guests",
  planner: "Event planner",
  instagram: "Instagram",
  source: "Heard about us via",
  message: "Message",
} as const;
