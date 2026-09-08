import type { Metadata } from "next";
import { FeatureCard } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { PartnersSection } from "@/components/sections/partners";
import { values } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why EPS",
  description:
    "One truck, one point of contact, one authority. Why shippers work with EPS Logistics directly instead of through a broker or dispatch layer.",
  alternates: { canonical: "/why-eps" },
};

const proofs = [
  "Our own USDOT and MC authority — the load never gets re-brokered.",
  "Direct updates from the road, not relayed through a third party.",
  "Outbound and inbound Virginia lanes — we quote both directions.",
];

export default function WhyEpsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why EPS Logistics"
        title="A Transportation Partner You Can Count On"
        intro="Freight schedules matter. Our job is to make sure yours holds — with dependable pickups, deliveries, and communication on every mile."
        photo="/photos/road.webp"
      />

      <section className="bg-white">
        <div className="shell py-[76px]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <FeatureCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                body={v.long}
                as="h2"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="shell grid gap-9 py-[58px] lg:grid-cols-2">
          <div>
            <h2 className="display text-[clamp(22px,2.6vw,29px)] leading-[1.16] text-white">
              One truck. One point of contact.
            </h2>
            <p className="mt-3 text-[15.5px] leading-[1.65] text-onDark">
              EPS Logistics is owner-operated. The person quoting your load is the
              person driving it, so nothing gets lost between a dispatcher, a
              broker, and a driver.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {proofs.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-[3px] shrink-0 text-brand-soft">
                  <Icon name="check" size={20} strokeWidth={2.2} />
                </span>
                <span className="text-[15px] leading-[1.6] text-[#dce6f3]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PartnersSection tone="light" />
    </>
  );
}
