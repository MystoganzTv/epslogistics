import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { AuthorityBadges } from "@/components/sections/authority-badges";
import { howWeWork, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "EPS Logistics is an owner-operated Virginia box truck carrier running under its own USDOT and MC authority — not a broker, not a dispatch service.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Delivering Opportunities Every Mile."
        intro="EPS Logistics is a Virginia-based freight transportation company built on a simple idea: shippers deserve a carrier that answers the phone, shows up on time, and treats every load like it matters."
      />

      <section className="bg-white">
        <div className="shell py-[76px]">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="display mb-[18px] text-[clamp(24px,3vw,32px)] leading-[1.14] text-ink">
                Who we are
              </h2>
              <p className="mb-4 text-base leading-[1.7] text-muted-strong">
                EPS Logistics is an owner-operated carrier running under its own
                USDOT and MC authority. That means the person you get on the phone
                is the person moving your freight — box truck transportation for
                palletized freight, commercial goods, retail products, equipment,
                and general cargo.
              </p>
              <p className="mb-4 text-base leading-[1.7] text-muted-strong">
                We haul out of Virginia into the Mid-Atlantic, Midwest, and
                Southern United States, and we haul back in — inbound freight to
                Virginia is just as much our lane as outbound.
              </p>
              <p className="mb-5 text-base leading-[1.7] text-muted-strong">
                We&rsquo;re intentionally focused. Instead of promising everything,
                we do a defined set of transportation work well — and equipment and
                lanes grow as our customers&rsquo; needs grow.
              </p>

              <div className="rounded-xl border border-tint-line bg-tint px-5 py-[18px]">
                <div className="font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand">
                  What we are — and aren&rsquo;t
                </div>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-slate">
                  We are the <strong className="font-bold">carrier</strong>: our
                  truck, our authority, our driver. We are not a broker or a
                  dispatch service, and we don&rsquo;t re-broker freight to anyone
                  else. When you book EPS, EPS moves the load.
                </p>
              </div>

              <p className="mt-5 font-display text-base font-bold leading-[1.5] tracking-[-0.015em] text-ink">
                Small enough to care. Professional enough to deliver. Built to
                grow.
              </p>

              <AuthorityBadges tone="light" extras className="mt-7" />
            </div>

            <div className="relative h-[380px] overflow-hidden rounded-[18px] bg-ink">
              <Image
                src="/photos/about-dock.webp"
                alt={`${site.name} loading freight at the dock at sunset`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[58%_center]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line-soft bg-canvas">
        <div className="shell py-[76px]">
          <h2 className="display mb-[34px] text-[clamp(24px,3vw,32px)] leading-[1.14] text-ink">
            How we work
          </h2>
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-line bg-white px-6 py-[26px]"
              >
                <div className="font-display text-[26px] font-black tracking-[-0.02em] text-[#c9d9f3]">
                  {step.n}
                </div>
                <h3 className="mb-2 mt-3.5 font-display text-[17px] font-bold text-ink">
                  {step.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
