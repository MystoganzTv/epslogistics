import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { QuoteTable } from "@/components/portal/quote-table";
import type { QuoteRequestRow, QuoteStatus } from "@/types/database";

export const metadata: Metadata = { title: "Quote requests" };

const STATUSES: QuoteStatus[] = [
  "new",
  "reviewing",
  "quoted",
  "won",
  "lost",
  "archived",
];

export default async function PortalHome({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = STATUSES.includes(status as QuoteStatus)
    ? (status as QuoteStatus)
    : null;

  const supabase = await createClient();
  let query = supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (active) query = query.eq("status", active);

  const { data, error } = await query;

  return (
    <div className="shell">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-2xl text-ink">Quote requests</h1>
          <p className="mt-1.5 text-sm text-muted">
            Everything submitted through the public form, newest first.
          </p>
        </div>
        <StatusFilter active={active} />
      </div>

      {error ? (
        <p className="mt-8 rounded-2xl border border-danger-line bg-danger-bg px-6 py-5 text-sm font-semibold text-[#8e2a20]">
          Couldn&rsquo;t load quote requests: {error.message}
        </p>
      ) : (
        <QuoteTable rows={(data ?? []) as QuoteRequestRow[]} />
      )}
    </div>
  );
}

function StatusFilter({ active }: { active: QuoteStatus | null }) {
  const chip = (href: string, label: string, on: boolean) => (
    <a
      key={label}
      href={href}
      className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold capitalize transition-colors ${
        on
          ? "border-brand bg-brand text-white"
          : "border-hairline text-muted hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </a>
  );

  return (
    <div className="flex flex-wrap gap-2">
      {chip("/portal", "all", active === null)}
      {STATUSES.map((s) => chip(`/portal?status=${s}`, s, active === s))}
    </div>
  );
}
