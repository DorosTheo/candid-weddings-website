"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY, GA_ID, META_PIXEL_ID, analyticsEnabled } from "@/lib/analytics";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Loads Google Analytics 4 and/or the Meta Pixel only after explicit consent.
 * Renders nothing at all when no tracking IDs are configured.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    const id = requestAnimationFrame(() => {
      setConsent(readConsent());
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!analyticsEnabled || !ready) return null;

  const choose = (value: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === "granted" && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}

      {consent === null && (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-[70] border border-line bg-paper p-5 text-ink shadow-[0_20px_60px_-30px_rgb(0_0_0/0.35)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm sm:p-6"
        >
          <p className="caps">
            We use optional cookies to understand how visitors use our site. You can accept or decline.{" "}
            <Link href="/privacy" className="link-underline">
              Privacy
            </Link>
          </p>
          <div className="mt-5 flex gap-3">
            <button type="button" onClick={() => choose("granted")} className="eyebrow min-h-11 flex-1 rounded-full bg-black px-5 text-white">
              Accept
            </button>
            <button type="button" onClick={() => choose("denied")} className="eyebrow min-h-11 flex-1 rounded-full border border-ink px-5">
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
