import { Resend } from "resend";
import { inquirySchema, MIN_FILL_TIME_MS, spamSchema } from "@/lib/inquiry";
import { inquiryHtml, inquirySubject, inquiryText } from "@/lib/inquiry-email";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/data/site";

/**
 * POST /api/inquiry
 * Validates the inquiry server-side and applies spam protection. If Resend is
 * configured it also emails the inquiry and reports `emailed: true`.
 * The browser additionally records every inquiry with Netlify Forms (stored
 * in the Netlify dashboard + email notification), and only shows success when
 * at least one of the two channels confirms receipt.
 *
 * Optional environment variables for the Resend email (server-only, never exposed to the browser):
 *   RESEND_API_KEY       — from resend.com
 *   CONTACT_FROM_EMAIL   — a sender on a domain verified in Resend,
 *                          e.g. "Candid Weddings Co. <website@candidweddingsco.com>"
 *   CONTACT_TO_EMAIL     — optional, defaults to info@candidweddingsco.com
 */
const MAX_BODY_BYTES = 20_000;

function json(body: object, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // some privacy tools strip Origin; other checks still apply
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Invalid request." }, 403);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) {
    return json({ error: "You’ve sent several inquiries in a short time. Please try again later or email us directly." }, 429);
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Your message is too long." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Spam: honeypot filled or submitted implausibly fast → accept silently, send nothing.
  const spam = spamSchema.safeParse(body);
  if (spam.success) {
    const { website, startedAt } = spam.data;
    if ((website && website.length > 0) || (startedAt && Date.now() - startedAt < MIN_FILL_TIME_MS)) {
      return json({ ok: true, spam: true }, 200);
    }
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json({ error: "Please check the highlighted fields.", fieldErrors }, 422);
  }
  const inquiry = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (!apiKey || !from) {
    // Not an error: the browser also records the inquiry with Netlify Forms,
    // which stores it and emails a notification. `emailed: false` tells the
    // form to rely on that channel.
    return json({ ok: true, emailed: false }, 200);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: inquiry.email,
      subject: inquirySubject(inquiry),
      text: inquiryText(inquiry),
      html: inquiryHtml(inquiry),
    });
    if (error) {
      console.error("[inquiry] Resend error:", error.name, error.message);
      return json({ ok: true, emailed: false }, 200);
    }
  } catch (err) {
    console.error("[inquiry] Delivery failed:", err instanceof Error ? err.message : err);
    return json({ ok: true, emailed: false }, 200);
  }

  return json({ ok: true, emailed: true }, 200);
}
