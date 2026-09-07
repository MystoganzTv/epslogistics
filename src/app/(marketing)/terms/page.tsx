import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        intro="The terms that apply to this website and to quote requests submitted through it."
      />
      <section className="bg-white">
        <div className="shell max-w-3xl py-[76px]">
          {/* TODO: reemplazar con los terminos revisados legalmente. */}
          <p className="text-base leading-[1.7] text-muted-strong">
            Quotes issued by {site.name} are estimates based on the shipment
            details provided and remain subject to equipment availability,
            accurate weight and dimensions, and confirmation in writing. Carriage
            is performed under {site.name}&rsquo;s own operating authority (USDOT
            #{site.usdot} / MC #{site.mc}) and is governed by the rate
            confirmation and bill of lading for each shipment.
          </p>
          <p className="mt-8 text-sm text-faint">
            This page is a placeholder pending legal review.
          </p>
        </div>
      </section>
    </>
  );
}
