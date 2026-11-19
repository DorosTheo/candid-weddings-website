/**
 * Privacy-conscious analytics helpers.
 * Nothing loads unless NEXT_PUBLIC_GA_ID and/or NEXT_PUBLIC_META_PIXEL_ID are
 * set AND the visitor has accepted cookies in the consent banner.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
export const analyticsEnabled = Boolean(GA_ID || META_PIXEL_ID);
export const CONSENT_KEY = "cwc-consent";

type Win = Window & { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };

/** Records a successful inquiry as a conversion (only if tracking is active). */
export function trackLead(eventType?: string) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  w.gtag?.("event", "generate_lead", { form: "inquiry", event_type: eventType });
  w.fbq?.("track", "Lead");
}
