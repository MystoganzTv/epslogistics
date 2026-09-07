import { Truck, ShieldCheck, Radar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: Truck,
    title: "Multi-mode capacity",
    body: "Dry van, refrigerated and flatbed — contracted carriers vetted before a single load moves.",
  },
  {
    icon: Radar,
    title: "Real-time visibility",
    body: "Track every shipment from pickup to POD in the client portal, no phone tag required.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance first",
    body: "Continuous authority, insurance and safety-rating monitoring on every carrier in the network.",
  },
  {
    icon: Clock,
    title: "Answers in minutes",
    body: "Quotes same day, dispatch support around the clock, one named contact per account.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-electric-500/10 blur-3xl"
        />
        <Container className="relative py-24 sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-500">
            {site.tagline}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-6xl">
            Freight that shows up.{" "}
            <span className="text-electric-500">Every mile, every time.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-70 sm:text-lg">
            {site.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              Get a quote
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="lg">
              See what we haul
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            Built for shippers who are done chasing status updates
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, body }) => (
              <Card key={title}>
                <Icon size={22} className="text-electric-500" />
                <div className="mt-4">
                  <CardTitle>{title}</CardTitle>
                  <CardBody>{body}</CardBody>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="rounded-3xl bg-navy-900 px-8 py-14 text-white sm:px-14">
            <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
              Tell us what you move. We&apos;ll tell you what it costs.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-navy-100/80">
              Lanes, volume and service level — that&apos;s all we need to come
              back with real numbers, usually the same business day.
            </p>
            <ButtonLink href="/contact" size="lg" className="mt-8">
              Start a conversation
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
