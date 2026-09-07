import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Send EPS Logistics your lane, dates, freight type, pallets and weight. Every quote is reviewed by the owner-operator running the truck.",
};

export default function QuotePage() {
  return (
    <section className="bg-form">
      <div className="mx-auto w-full max-w-[1000px] px-[22px] pb-[84px] pt-16">
        <div className="animate-eps-enter">
          <Eyebrow>Request a Quote</Eyebrow>
          <h1 className="display mb-3.5 mt-3.5 text-[clamp(29px,4.2vw,46px)] leading-[1.07] tracking-[-0.032em] text-ink">
            Tell us about your freight.
          </h1>
          <p className="max-w-[620px] text-[16.5px] leading-[1.65] text-muted">
            Send the shipment details and we&rsquo;ll follow up with pricing and
            availability. Every quote is reviewed by the owner-operator running
            the truck — no automated rates, no broker in the middle.
          </p>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
