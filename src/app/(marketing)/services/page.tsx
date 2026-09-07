import type { Metadata } from "next";
import Link from "next/link";
import { FeatureCard } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { QuoteBand } from "@/components/sections/quote-band";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Box truck freight, local and regional delivery, long-distance lanes, dedicated routes and last-mile business delivery — moved by EPS Logistics under its own authority.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Transportation Solutions That Keep Your Business Moving"
        intro="Box truck freight built around real schedules, real lanes, and real communication — throughout Virginia and across the Mid-Atlantic, Central, and Southern United States, outbound and inbound. We move the freight ourselves, under our own authority."
      />

      <section className="bg-white">
        <div className="shell pb-[84px] pt-[70px]">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <FeatureCard
                key={s.slug}
                icon={s.icon}
                title={s.title}
                body={s.body}
                as="h2"
              />
            ))}
          </div>

          <p className="mt-[30px] rounded-2xl border border-line bg-canvas px-6 py-[22px] text-[14.5px] leading-[1.6] text-muted">
            Need something that isn&rsquo;t listed here? Equipment and lanes are
            added as the fleet grows —{" "}
            <Link href="/contact" className="font-bold text-brand hover:underline">
              tell us what you ship
            </Link>{" "}
            and we&rsquo;ll confirm what we can cover.
          </p>
        </div>
      </section>

      <QuoteBand title="Tell us about your freight and we’ll get you a quote." />
    </>
  );
}
