import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { MapLegend } from "@/components/ui/map-legend";
import { CoverageMap } from "@/components/coverage-map";
import { PageHero } from "@/components/sections/page-hero";
import { regions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "EPS Logistics runs lanes in both directions between Virginia and Boston, New York, Philadelphia, Baltimore, Charlotte, Atlanta, Chicago, Detroit, Nashville, Memphis, Dallas and beyond.",
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Based in Virginia. Built to Move Beyond It."
        intro={
          <>
            From local Virginia deliveries to long-distance freight across the
            Midwest and Southern United States, EPS Logistics connects businesses
            with dependable transportation solutions. Lanes run{" "}
            <strong className="font-bold text-white">in both directions</strong> —
            outbound from Virginia and inbound back home.
          </>
        }
        className="pb-0"
      >
        <div className="mt-11">
          <CoverageMap className="min-h-[380px] overflow-hidden rounded-[18px] border border-white/15 bg-[#08182c]" />
          <MapLegend tone="dark" className="mt-[22px] sm:flex-row sm:flex-wrap sm:gap-x-8" />
        </div>
      </PageHero>

      <section className="bg-white">
        <div className="shell py-[76px]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-line px-6 py-[26px] transition-[border-color,box-shadow] duration-200 hover:border-[#c9d9f3] hover:shadow-[0_16px_36px_rgba(10,26,47,0.08)]"
              >
                <div className="font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand">
                  {r.tag}
                </div>
                <h2 className="mb-2.5 mt-3 font-display text-[19px] font-extrabold tracking-[-0.018em] text-ink">
                  {r.title}
                </h2>
                <p className="text-[14.5px] leading-[1.6] text-muted">{r.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-[18px] rounded-2xl border border-tint-line bg-tint px-[26px] py-6">
            <p className="max-w-[620px] text-[15.5px] leading-[1.6] text-slate">
              Have a destination outside our typical service area? Contact us to
              discuss your shipment — lanes are reviewed case by case.
            </p>
            <ButtonLink href="/contact" variant="ink" size="sm">
              Contact EPS Logistics
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
