import type { QuoteRequestRow, QuoteStatus } from "@/types/database";

const statusStyle: Record<QuoteStatus, string> = {
  new: "border-brand/30 bg-tint text-brand",
  reviewing: "border-amber-300 bg-amber-50 text-amber-800",
  quoted: "border-hairline bg-canvas text-ink",
  won: "border-emerald-300 bg-emerald-50 text-emerald-800",
  lost: "border-hairline bg-canvas text-faint",
  archived: "border-hairline bg-canvas text-faint",
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function QuoteTable({ rows }: { rows: QuoteRequestRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-line bg-white px-8 py-14 text-center">
        <p className="font-display text-lg font-bold text-ink">
          No requests here yet.
        </p>
        <p className="mt-2 text-sm text-muted">
          New submissions from the quote form land on this page.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-[11.5px] uppercase tracking-[0.12em] text-faint">
            <th className="px-5 py-3.5 font-semibold">Received</th>
            <th className="px-5 py-3.5 font-semibold">Company</th>
            <th className="px-5 py-3.5 font-semibold">Lane</th>
            <th className="px-5 py-3.5 font-semibold">Pickup</th>
            <th className="px-5 py-3.5 font-semibold">Freight</th>
            <th className="px-5 py-3.5 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-line-soft last:border-0">
              <td className="whitespace-nowrap px-5 py-4 text-muted">
                {dateFmt.format(new Date(r.created_at))}
              </td>
              <td className="px-5 py-4">
                <div className="font-semibold text-ink">{r.company}</div>
                <div className="text-[13px] text-muted">{r.contact_name}</div>
                <a
                  href={`mailto:${r.email}`}
                  className="text-[13px] text-brand hover:underline"
                >
                  {r.email}
                </a>
                <div className="text-[13px] text-muted">{r.phone}</div>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-ink">
                {r.pickup_city}, {r.pickup_state}
                <span className="mx-1.5 text-faint">→</span>
                {r.delivery_city}, {r.delivery_state}
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-muted">
                {r.pickup_date}
              </td>
              <td className="px-5 py-4 text-muted">
                <div>{r.freight_type}</div>
                <div className="text-[13px]">
                  {[
                    r.pallets != null && `${r.pallets} pallets`,
                    r.weight_lbs != null &&
                      `${r.weight_lbs.toLocaleString("en-US")} lbs`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </td>
              <td className="px-5 py-4">
                <span
                  className={`inline-block rounded-full border px-2.5 py-1 text-[12px] font-semibold capitalize ${statusStyle[r.status]}`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
