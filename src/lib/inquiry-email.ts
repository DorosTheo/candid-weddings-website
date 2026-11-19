import type { Inquiry } from "./inquiry";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function inquiryRows(i: Inquiry): [string, string][] {
  return [
    ["Full name", i.fullName],
    ["Email", i.email],
    ["Phone", i.phone],
    ["Event type", i.eventType],
    ["Date", formatDate(i.date)],
    ["Venue", i.venue],
    ["Event planner", i.planner || "—"],
    ["Instagram", i.instagram || "—"],
    ["Guest number", i.guests],
    ["Heard about us via", i.source],
  ];
}

export function inquirySubject(i: Inquiry) {
  return `New inquiry — ${i.fullName} · ${i.eventType} · ${formatDate(i.date)}`;
}

export function inquiryText(i: Inquiry) {
  return [
    "New inquiry from candidweddingsco.com",
    "",
    ...inquiryRows(i).map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    i.message || "—",
  ].join("\n");
}

export function inquiryHtml(i: Inquiry) {
  const rows = inquiryRows(i)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 16px 10px 0;border-bottom:1px solid #e4e4de;color:#6b6b66;font-size:12px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;vertical-align:top">${escape(k)}</td><td style="padding:10px 0;border-bottom:1px solid #e4e4de;font-size:15px;color:#171717">${escape(v)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#f6f5f1;font-family:Helvetica,Arial,sans-serif">
<div style="max-width:620px;margin:0 auto;padding:40px 28px">
<p style="font-family:Georgia,serif;font-style:italic;font-size:28px;margin:0 0 4px;color:#171717">New inquiry</p>
<p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#6b6b66;margin:0 0 28px">Candid Weddings Co. — website</p>
<table style="width:100%;border-collapse:collapse">${rows}</table>
<p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b6b66;margin:28px 0 8px">Message</p>
<p style="font-size:15px;line-height:1.7;color:#171717;white-space:pre-wrap;margin:0">${escape(i.message || "—")}</p>
<p style="font-size:12px;color:#8a8a84;margin-top:36px">Reply directly to this email to respond to ${escape(i.fullName)}.</p>
</div></body></html>`;
}
