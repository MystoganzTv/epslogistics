import { Resend } from "resend";
import { site } from "@/lib/site";
import type { QuoteValues } from "@/lib/quote-schema";

/**
 * Cliente perezoso: si la key no esta puesta no queremos reventar en el
 * import, sino devolver un error manejable desde la server action.
 */
function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const TO = process.env.QUOTE_TO_EMAIL ?? site.email;
/** Hasta verificar eps-logistics.com en Resend, sirve su dominio de pruebas. */
const FROM = process.env.QUOTE_FROM_EMAIL ?? "EPS Logistics <onboarding@resend.dev>";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

function rows(v: QuoteValues): [string, string][] {
  return [
    ["Company", v.company],
    ["Contact", v.contact],
    ["Email", v.email],
    ["Phone", v.phone],
    ["Pickup", `${v.puCity}, ${v.puState}`],
    ["Delivery", `${v.doCity}, ${v.doState}`],
    ["Pickup date", formatDate(v.date)],
    ["Freight type", v.freight],
    ["Pallets", v.pallets != null ? String(v.pallets) : "—"],
    ["Weight", v.weight != null ? `${v.weight.toLocaleString("en-US")} lbs` : "—"],
    ["Notes", v.notes?.trim() || "—"],
  ];
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(v: QuoteValues) {
  const body = rows(v)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:11px 16px;border-bottom:1px solid #eef1f6;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#7c8aa0;white-space:nowrap;vertical-align:top">${label}</td>
        <td style="padding:11px 16px;border-bottom:1px solid #eef1f6;font:400 15px/1.55 -apple-system,Segoe UI,Roboto,sans-serif;color:#0a1a2f">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;background:#f7f9fc;padding:28px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5eaf2;border-radius:16px;overflow:hidden">
    <tr>
      <td style="background:#0a1a2f;padding:26px 24px">
        <div style="font:700 11px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#5c9bff">New quote request</div>
        <div style="margin-top:9px;font:800 22px/1.2 -apple-system,Segoe UI,Roboto,sans-serif;color:#fff">${escapeHtml(v.puCity)}, ${escapeHtml(v.puState)} &rarr; ${escapeHtml(v.doCity)}, ${escapeHtml(v.doState)}</div>
        <div style="margin-top:6px;font:400 14px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;color:#b7c6da">${escapeHtml(v.company)} &middot; ${formatDate(v.date)}</div>
      </td>
    </tr>
    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>
    </td></tr>
    <tr>
      <td style="padding:20px 24px;background:#fafbfd">
        <a href="mailto:${encodeURIComponent(v.email)}" style="display:inline-block;background:#1668e3;color:#fff;padding:12px 22px;border-radius:8px;font:700 14px/1 -apple-system,Segoe UI,Roboto,sans-serif;text-decoration:none">Reply to ${escapeHtml(v.contact)}</a>
        <div style="margin-top:14px;font:400 12px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#7c8aa0">Sent from the quote form at ${escapeHtml(site.url)}</div>
      </td>
    </tr>
  </table>
</body></html>`;
}

function buildText(v: QuoteValues) {
  return [
    "NEW QUOTE REQUEST",
    `${v.puCity}, ${v.puState} -> ${v.doCity}, ${v.doState}`,
    "",
    ...rows(v).map(([label, value]) => `${label}: ${value}`),
    "",
    `Sent from the quote form at ${site.url}`,
  ].join("\n");
}

/** El correo tal cual se envia. Separado del envio para poder previsualizarlo. */
export function renderQuoteEmail(v: QuoteValues) {
  return {
    subject: `Quote request — ${v.company} · ${v.puCity}, ${v.puState} → ${v.doCity}, ${v.doState}`,
    html: buildHtml(v),
    text: buildText(v),
  };
}

export async function sendQuoteEmail(v: QuoteValues) {
  const resend = client();
  if (!resend) {
    return { ok: false as const, reason: "missing-key" };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    // Responder al correo va directo al cliente, no a Resend.
    replyTo: v.email,
    ...renderQuoteEmail(v),
  });

  if (error) return { ok: false as const, reason: "send-failed", error };
  return { ok: true as const };
}
