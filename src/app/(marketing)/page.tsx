import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { MapLegend } from "@/components/ui/map-legend";
import { CoverageMap } from "@/components/coverage-map";
import { AuthorityBadges } from "@/components/sections/authority-badges";
import { PartnersSection } from "@/components/sections/partners";
import { services, site, trust, values } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-abyss">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_620px_at_78%_18%,rgba(22,104,227,0.22)_0%,rgba(7,21,39,0)_70%)]" />
        <div className="shell relative grid items-center gap-11 pb-[78px] pt-[70px] lg:grid-cols-2">
          <div className="animate-eps-up">
            <h1 className="display text-[clamp(36px,4.6vw,62px)] leading-[1.04] tracking-[-0.032em] text-white">
              Reliable Freight.
              <br />
              Real Solutions.
              <br />
              <span className="text-brand-bright">Every Mile.</span>
            </h1>
            <p className="mt-[26px] max-w-[500px] text-[17.5px] leading-[1.62] text-onDark-strong">
              {site.shortDescription}
            </p>

            <div className="mt-[34px] flex flex-wrap gap-3.5">
              <ButtonLink href="/quote" size="lg" arrow>
                Request a Quote
              </ButtonLink>
              <ButtonLink href="/contact" variant="outlineLight" size="lg">
                Contact Us
              </ButtonLink>
            </div>

            <ul className="mt-[50px] grid max-w-[620px] grid-cols-2 gap-x-4 gap-y-[22px] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {trust.map((t) => (
                <li key={t.label} className="flex items-center gap-[11px]">
                  <span className="shrink-0 text-brand-pale">
                    <Icon name={t.icon} size={23} strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-[13.5px] font-semibold leading-[1.28] text-[#e7eef8]">
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-[30px] flex flex-wrap gap-2.5">
              <AuthorityBadges />
              <span className="rounded-full border border-brand-pale/55 bg-brand/15 px-[15px] py-[7px] font-display text-[11.5px] font-bold tracking-[0.12em] text-[#bfd9ff]">
                OWNER-OPERATOR · OUR OWN AUTHORITY
              </span>
            </div>
          </div>

          <div className="animate-eps-in relative min-h-[430px] overflow-hidden rounded-[20px] border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.42)] lg:min-h-[470px]">
            <Image
              src="/photos/hero-truck.webp"
              alt="EPS Logistics box truck on the interstate, headed for Washington DC, Richmond, Raleigh and Atlanta"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[62%_center]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,38,0)_48%,rgba(6,20,38,0.72)_100%)]" />
            <div className="pointer-events-none absolute bottom-6 left-7">
              <p className="font-script text-[31px] font-semibold leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(6,20,38,0.6)]">
                More Than Freight
                <br />— Progress.
              </p>
              <svg
                width="128"
                height="14"
                viewBox="0 0 150 16"
                fill="none"
                className="mt-0.5 block"
                aria-hidden
              >
                <path
                  d="M4 11C40 3 100 3 146 8"
                  stroke="#3B8BFF"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Servicios ---------- */}
      <section className="border-b border-line-soft bg-canvas">
        <div className="shell py-[84px]">
          <div className="grid items-end gap-[30px] lg:grid-cols-2">
            <div>
              <Eyebrow>Our Services</Eyebrow>
              <h2 className="display mt-3.5 text-[clamp(27px,3.5vw,39px)] text-ink">
                Transportation Solutions That Keep Your Business Moving
              </h2>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-[370px] text-[15.5px] leading-[1.65] text-muted">
                From local Virginia deliveries to long-distance freight, we build
                transportation around how your business actually ships.
              </p>
              <ButtonLink href="/services" variant="outlineBrand" size="sm" arrow>
                View All Services
              </ButtonLink>
            </div>
          </div>

          <div className="mt-[46px] grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s) => (
              <Card key={s.slug} className="p-6 pb-7">
                <span className="text-brand">
                  <Icon name={s.icon} size={34} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold tracking-[-0.012em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">
                  {s.short}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why EPS ---------- */}
      <section className="relative overflow-hidden bg-abyss">
        <Image
          src="/photos/road.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,16,31,0.96)_0%,rgba(5,16,31,0.7)_55%,rgba(5,16,31,0.92)_100%)]" />
        <div className="shell relative py-[84px]">
          <div className="grid items-start gap-13 lg:grid-cols-2">
            <div>
              <Eyebrow tone="dark">Why Choose EPS</Eyebrow>
              <h2 className="display mt-3.5 mb-9 text-[clamp(27px,3.5vw,39px)] text-white">
                A Transportation Partner You Can Count On.
              </h2>
              <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title}>
                    <span className="text-white">
                      <Icon name={v.icon} size={30} strokeWidth={1.5} />
                    </span>
                    <h3 className="mb-[7px] mt-4 font-display text-base font-bold text-white">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-[1.58] text-onDark">
                      {v.short}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="border-l border-white/20 pl-9">
              <p className="font-display text-[clamp(21px,2.5vw,28px)] font-medium italic leading-[1.36] tracking-[-0.02em] text-white">
                &ldquo;Small enough to care. Professional enough to deliver. Built
                to grow.&rdquo;
              </p>
              <footer className="mt-[22px] font-display text-[12.5px] font-bold uppercase tracking-[0.18em] text-onDark-soft">
                — {site.name}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ---------- Cobertura ---------- */}
      <section className="bg-white">
        <div className="shell py-[84px]">
          <div className="grid items-center gap-[46px] lg:grid-cols-2">
            <div>
              <Eyebrow>Coverage</Eyebrow>
              <h2 className="display mb-[18px] mt-3.5 text-[clamp(27px,3.5vw,39px)] text-ink">
                Based in Virginia. Built to Move Beyond It.
              </h2>
              <p className="mb-[22px] text-base leading-[1.66] text-muted">
                From local Virginia deliveries to long-distance freight across the
                Midwest and Southern United States, EPS Logistics connects
                businesses with dependable transportation solutions —{" "}
                <strong className="font-bold text-ink">
                  freight moving out of Virginia and freight coming back in
                </strong>
                .
              </p>
              <MapLegend className="mb-6" />
              <p className="rounded-xl border border-tint-line bg-tint px-[19px] py-[17px] text-[14.5px] leading-[1.6] text-slate">
                Have a destination outside our typical service area?{" "}
                <Link href="/contact" className="font-bold text-brand hover:underline">
                  Contact us
                </Link>{" "}
                to discuss your shipment.
              </p>
            </div>
            <CoverageMap className="min-h-[330px] overflow-hidden rounded-2xl bg-abyss" />
          </div>
        </div>
      </section>

      <PartnersSection tone="dark" />

      {/* ---------- CTA final ---------- */}
      <section className="border-t border-line-soft bg-canvas">
        <div className="shell grid items-center gap-9 py-[62px] lg:grid-cols-3">
          <div>
            <Eyebrow>Ready to Move Forward?</Eyebrow>
            <h2 className="display mb-2 mt-3 text-[clamp(25px,3vw,34px)] leading-[1.12] text-ink">
              Let&rsquo;s Get Your Freight Moving.
            </h2>
            <p className="text-[15.5px] leading-[1.6] text-muted">
              Request a quote or get in touch with our team today.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/quote" arrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Us
            </ButtonLink>
          </div>

          <div className="flex flex-col gap-3.5">
            <ContactLine
              icon="phone"
              href={site.phoneHref}
              main={site.phone}
              sub="Mon–Fri, business hours"
            />
            <ContactLine
              icon="mail"
              href={site.emailHref}
              main={site.email}
              sub="Quotes and freight requests"
            />
            <ContactLine
              icon="pin"
              href="/coverage"
              main={site.region}
              sub={site.regionSub}
              internal
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactLine({
  icon,
  href,
  main,
  sub,
  internal = false,
}: {
  icon: "phone" | "mail" | "pin";
  href: string;
  main: string;
  sub: string;
  internal?: boolean;
}) {
  const inner = (
    <>
      <span className="mt-0.5 shrink-0">
        <Icon name={icon} size={19} strokeWidth={1.7} />
      </span>
      <span>
        <span className="block text-[15px] font-semibold">{main}</span>
        <span className="block text-[13.5px] text-faint">{sub}</span>
      </span>
    </>
  );

  const className =
    "flex items-start gap-3 text-ink transition-colors hover:text-brand";

  return internal ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}
