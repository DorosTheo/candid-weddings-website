"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { eventTypes, inquirySchema, referralSources, type InquiryField } from "@/lib/inquiry";
import { trackLead } from "@/lib/analytics";
import { NETLIFY_FORM_NAME, NETLIFY_FORM_PATH, NETLIFY_HONEYPOT, NETLIFY_SUBJECT, netlifyFieldNames } from "@/lib/netlify-form";
import { contactCopy } from "@/data/copy";
import { Button } from "@/components/ui/Button";

type Values = Record<InquiryField, string>;
type Errors = Partial<Record<InquiryField, string>>;

const initial: Values = {
  fullName: "",
  email: "",
  eventType: "",
  date: "",
  venue: "",
  planner: "",
  instagram: "",
  phone: "",
  guests: "",
  source: "",
  message: "",
};

const fieldBase =
  "peer block w-full rounded-none border-0 border-b bg-transparent px-1 pt-6 pb-2.5 text-[1rem] text-ink outline-none transition-colors duration-300 placeholder:text-transparent focus:border-ink";

function Field({
  id,
  label,
  required,
  error,
  filled,
  children,
  hint,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  filled: boolean;
  children: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} data-filled={filled || undefined}>
      {children}
      <label
        htmlFor={id}
        className={`body-sm pointer-events-none absolute left-1 origin-left transition-all duration-300 ease-editorial ${
          filled
            ? "top-0 text-[0.6875rem] tracking-[0.12em] text-muted"
            : "top-6 text-muted peer-focus:top-0 peer-focus:text-[0.6875rem] peer-focus:tracking-[0.12em]"
        }`}
      >
        {label}
        {required && <span aria-hidden>*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 px-1 text-[0.75rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 px-1 text-[0.8125rem] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Records the inquiry with Netlify Forms (URL-encoded POST to the static form file). */
async function submitToNetlify(data: Record<InquiryField, string>, honeypotValue: string) {
  const body = new URLSearchParams({ "form-name": NETLIFY_FORM_NAME, subject: NETLIFY_SUBJECT, [NETLIFY_HONEYPOT]: honeypotValue });
  for (const [key, name] of Object.entries(netlifyFieldNames)) {
    const value = data[key as InquiryField] ?? "";
    body.append(name, key === "date" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split("-").reverse().join("/") : value);
  }
  try {
    const res = await fetch(NETLIFY_FORM_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function InquiryForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [minDate, setMinDate] = useState<string>();
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const id = requestAnimationFrame(() => setMinDate(new Date().toISOString().slice(0, 10)));
    return () => cancelAnimationFrame(id);
  }, []);

  const id = (f: InquiryField) => `${uid}-${f}`;

  const validateField = (f: InquiryField, next: Values) => {
    const result = inquirySchema.safeParse(next);
    const issue = result.success ? undefined : result.error.issues.find((i) => i.path[0] === f);
    setErrors((e) => ({ ...e, [f]: issue?.message }));
  };

  const set = (f: InquiryField) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (errors[f]) validateField(f, next);
  };

  const blur = (f: InquiryField) => () => {
    if (values[f] !== "") validateField(f, values);
  };

  const a11y = (f: InquiryField) => ({
    id: id(f),
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${id(f)}-error` : undefined,
    onBlur: blur(f),
    onChange: set(f),
    value: values[f],
    className: `${fieldBase} ${errors[f] ? "border-error" : "border-line-strong"}`,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = inquirySchema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) next[issue.path[0] as InquiryField] ??= issue.message;
      setErrors(next);
      const first = Object.keys(initial).find((k) => next[k as InquiryField]);
      if (first) document.getElementById(id(first as InquiryField))?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage("");
    try {
      // 1. Server: authoritative validation + spam checks (+ Resend email if configured).
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        emailed?: boolean;
        spam?: boolean;
        error?: string;
        fieldErrors?: Errors;
      };
      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setServerMessage(data.error ?? "We couldn’t send your inquiry right now.");
        setStatus("error");
        return;
      }

      // 2. Netlify Forms: stores the inquiry in the Netlify dashboard and sends
      //    the email notification. Skipped only for submissions flagged as bots.
      const recorded = data.spam ? true : await submitToNetlify(result.data, honeypot.current?.value ?? "");

      // Success only when at least one channel actually received the inquiry.
      if (data.spam || data.emailed || recorded) {
        setStatus("success");
        trackLead(values.eventType);
        requestAnimationFrame(() => {
          successRef.current?.focus();
          successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
      setServerMessage("We couldn’t send your inquiry right now.");
      setStatus("error");
    } catch {
      setServerMessage("We couldn’t reach our server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const select = (f: "eventType" | "source", label: string, options: readonly string[], className = "") => (
    <Field id={id(f)} label={label} required error={errors[f]} filled={values[f] !== ""} className={className}>
      <select {...a11y(f)} required className={`${a11y(f).className} cursor-pointer pr-10 ${values[f] ? "" : "text-transparent"}`}>
        <option value="" disabled hidden />
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden strokeWidth={1.25} className="pointer-events-none absolute right-1 bottom-3 size-5 text-ink" />
    </Field>
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <m.div
          key="success"
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="mx-auto max-w-2xl scroll-mt-[calc(var(--header-h)+2rem)] py-16 text-center outline-none md:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-h1 italic font-light">{contactCopy.success.heading}</p>
          <p className="body-sm mx-auto mt-8 max-w-lg text-ink-soft">{contactCopy.success.body}</p>
          <p className="eyebrow mt-10 text-muted">— Doros &amp; George</p>
        </m.div>
      ) : (
        <m.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          aria-describedby={serverMessage ? `${uid}-server` : undefined}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="grid gap-x-9 gap-y-9 md:grid-cols-2"
        >
          <Field id={id("fullName")} label="Full name" required error={errors.fullName} filled={values.fullName !== ""}>
            <input {...a11y("fullName")} type="text" autoComplete="name" required placeholder="Full name" />
          </Field>
          <Field id={id("email")} label="Email" required error={errors.email} filled={values.email !== ""}>
            <input {...a11y("email")} type="email" autoComplete="email" inputMode="email" required placeholder="Email" />
          </Field>

          {select("eventType", "Event type", eventTypes)}
          <Field id={id("date")} label="Date" required error={errors.date} filled>
            <input {...a11y("date")} type="date" min={minDate} required className={`${a11y("date").className} min-h-[3.4rem] appearance-none`} />
          </Field>

          <Field id={id("venue")} label="Venue" required error={errors.venue} filled={values.venue !== ""} hint="Not decided yet? Write “TBC” or the area.">
            <input {...a11y("venue")} type="text" required placeholder="Venue" />
          </Field>
          <Field id={id("planner")} label="Event planner" error={errors.planner} filled={values.planner !== ""}>
            <input {...a11y("planner")} type="text" placeholder="Event planner" />
          </Field>

          <Field id={id("instagram")} label="Instagram" error={errors.instagram} filled={values.instagram !== ""}>
            <input {...a11y("instagram")} type="text" autoCapitalize="none" autoCorrect="off" placeholder="Instagram" />
          </Field>
          <Field id={id("phone")} label="Phone" required error={errors.phone} filled={values.phone !== ""}>
            <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" required placeholder="Phone" />
          </Field>

          <Field id={id("guests")} label="Guest number" required error={errors.guests} filled={values.guests !== ""} className="md:col-span-2">
            <input {...a11y("guests")} type="text" inputMode="numeric" pattern="[0-9]*" required placeholder="Guest number" />
          </Field>

          {select("source", "Where did you hear about us?", referralSources, "md:col-span-2")}

          <Field id={id("message")} label="Message" error={errors.message} filled={values.message !== ""} className="md:col-span-2">
            <textarea {...a11y("message")} rows={4} placeholder="Message" className={`${a11y("message").className} min-h-36 resize-y`} />
          </Field>

          {/* Honeypot — hidden from people and assistive technology */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={`${uid}-website`}>Website</label>
            <input ref={honeypot} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="md:col-span-2">
            {status === "error" && serverMessage && (
              <div id={`${uid}-server`} role="alert" className="mb-8 border-l border-error pl-5">
                <p className="body-sm text-error">{serverMessage}</p>
                <p className="body-sm mt-1 text-ink-soft">
                  You can also email us directly at{" "}
                  <a className="link-underline" href={`mailto:${contactCopy.email}`}>
                    {contactCopy.email}
                  </a>
                  .
                </p>
              </div>
            )}
            <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto sm:min-w-[19rem]">
              {status === "sending" ? "Sending…" : "Let’s connect"}
            </Button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}
