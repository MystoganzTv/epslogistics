import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { MapLegend } from "@/components/ui/map-legend";
import { CoverageMap } from "@/components/coverage-map";
import { PartnersSection } from "@/components/sections/partners";
import { services, site, trust, values } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero: la foto a sangre, el header flota encima ---------- */}
      <section className="relative isolate -mt-[74px] flex min-h-[620px] flex-col justify-end overflow-hidden pt-[74px] lg:min-h-[min(88vh,880px)]">
        <Image
          src="/photos/hero-truck.webp"
          alt="EPS Logistics box truck on the interstate, headed for Washington DC, Richmond, Raleigh and Atlanta"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[68%_center]"
        />
        {/* Oscurecido general + caida hacia la izquierda, para que lea el texto. */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(6,17,33,0.92)_0%,rgba(6,17,33,0.72)_38%,rgba(6,17,33,0.28)_62%,rgba(6,17,33,0.35)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,17,33,0.55)_0%,rgba(6,17,33,0)_28%,rgba(6,17,33,0)_62%,rgba(6,17,33,0.8)_100%)]" />

        <div className="shell absolute right-0 top-[96px] hidden text-right lg:block">
          <p className="font-display text-[12.5px] font-bold uppercase leading-[1.7] tracking-[0.22em] text-white">
            Virginia based.
            <br />
            Further together.
          </p>
          <span className="ml-auto mt-3 block h-[3px] w-14 rounded-full bg-brand-bright" />
        </div>

        <div className="shell animate-eps-up flex flex-1 flex-col justify-center py-12 lg:py-20">
          <h1 className="hero-title display max-w-[15ch] uppercase leading-[1.02] tracking-[-0.03em] text-white">
            Reliable Freight.
            <br />
            Real Solutions.
            <br />
            <span className="text-brand-bright">Every Mile.</span>
          </h1>
          <p className="mt-7 max-w-[540px] text-[17px] leading-[1.62] text-onDark-strong sm:text-[18px]">
            {site.shortDescription}
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <ButtonLink href="/quote" size="lg" arrow className="uppercase tracking-[0.06em]">
              Request a Quote
            </ButtonLink>
            <ButtonLink
              href="/services"
              variant="outlineLight"
              size="lg"
              className="uppercase tracking-[0.06em]"
            >
              Explore Services
            </ButtonLink>
          </div>
        </div>

        {/* Franja de confianza, pegada al borde inferior del hero. */}
        <div className="relative border-t border-white/15 bg-[rgba(6,17,33,0.55)]">
          <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5">
            <ul className="flex flex-wrap items-center gap-y-4">
              {trust.map((t, i) => (
                <li
                  key={t.label}
                  className={cn(
                    "flex items-center gap-2.5 whitespace-nowrap pr-4 sm:pr-5",
                    i > 0 && "sm:border-l sm:border-white/20 sm:pl-4 lg:pl-5",
                  )}
                >
                  <span className="shrink-0 text-brand-bright">
                    <Icon name={t.icon} size={21} strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-[11.5px] font-bold uppercase leading-[1.3] tracking-[0.08em] text-white">
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="whitespace-nowrap font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
              USDOT #{site.usdot} · MC #{site.mc}
            </p>
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
            <CoverageMap
              labels={false}
              className="overflow-hidden rounded-2xl bg-abyss"
            />
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
