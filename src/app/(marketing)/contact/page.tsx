import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink, ButtonAnchor } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { AuthorityBadges } from "@/components/sections/authority-badges";
import { site } from "@/lib/site";
import type { IconName } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach EPS Logistics directly — ${site.phone} or ${site.email}. You get the owner-operator, not a call center.`,
  alternates: { canonical: "/contact" },
};

const cards: {
  icon: IconName;
  label: string;
  value: string;
  sub: string;
  href: string;
  internal?: boolean;
}[] = [
  {
    icon: "phone",
    label: "Phone",
    value: site.phone,
    sub: "Mon–Fri, business hours — you reach the owner-operator",
    href: site.phoneHref,
  },
  {
    icon: "mail",
    label: "Email",
    value: site.email,
    sub: "Quotes and freight requests",
    href: site.emailHref,
  },
  {
    icon: "pin",
    label: "Based in",
    value: site.region,
    sub: `USDOT #${site.usdot} · MC #${site.mc}`,
    href: "/coverage",
    internal: true,
  },
];

const cardClass =
  "block rounded-2xl border border-white/15 bg-white/5 px-[22px] py-6 text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s Get Your Freight Moving."
        intro="Send us the details of your shipment and we’ll come back with a quote. For anything time-sensitive, call directly — you’ll reach the owner-operator, not a call center."
      >
        <div className="mt-10 grid max-w-[900px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const inner = (
              <>
                <span className="text-brand-soft">
                  <Icon name={c.icon} size={24} />
                </span>
                <div className="mt-4 font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-onDark-soft">
                  {c.label}
                </div>
                <div className="mt-[7px] break-words font-display text-lg font-bold tracking-[-0.015em] text-white">
                  {c.value}
                </div>
                <div className="mt-[5px] text-[13.5px] text-onDark-soft">
                  {c.sub}
                </div>
              </>
            );
            return c.internal ? (
              <Link key={c.label} href={c.href} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <a key={c.label} href={c.href} className={cardClass}>
                {inner}
              </a>
            );
          })}
        </div>

        <div className="mt-[34px] flex flex-wrap gap-3">
          <ButtonLink href="/quote" arrow>
            Request a Quote
          </ButtonLink>
          <ButtonAnchor href={site.emailHref} variant="outlineLight">
            Email EPS Logistics
          </ButtonAnchor>
        </div>

        <AuthorityBadges className="mt-[30px]" />
      </PageHero>

      <section className="bg-white">
        <div className="shell py-[70px]">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="display text-[clamp(23px,2.8vw,30px)] leading-[1.16] text-ink">
                Prefer to send the details in a form?
              </h2>
              <p className="mb-6 mt-3.5 text-[15.5px] leading-[1.65] text-muted">
                The quote form captures pickup and delivery, dates, freight type,
                pallets, and weight — everything we need to price the lane
                properly. No instant pricing, no guessing.
              </p>
              <ButtonLink href="/quote" variant="ink">
                Open the quote form
              </ButtonLink>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-2xl bg-ink">
              <Image
                src="/photos/truck-detail.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[45%_40%]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
