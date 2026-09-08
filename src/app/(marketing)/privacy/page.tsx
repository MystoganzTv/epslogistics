import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How EPS Logistics handles the information you send through this site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How EPS Logistics handles the information you send through this site."
      />
      <section className="bg-white">
        <div className="shell max-w-3xl py-[76px]">
          {/* TODO: reemplazar con la politica revisada legalmente. */}
          <p className="text-base leading-[1.7] text-muted-strong">
            {site.name} collects only the information you submit through the quote
            and contact forms — company, contact name, email, phone, and the
            shipment details needed to price a lane. We use it to respond to your
            request and to move your freight. We do not sell it, and we do not
            share it with third parties except where required to complete a
            shipment or comply with the law.
          </p>
          <p className="mt-5 text-base leading-[1.7] text-muted-strong">
            To ask what we hold about you or to have it deleted, write to{" "}
            <a href={site.emailHref} className="font-semibold text-brand hover:underline">
              {site.email}
            </a>
            .
          </p>
          <p className="mt-8 text-sm text-faint">
            This page is a placeholder pending legal review.
          </p>
        </div>
      </section>
    </>
  );
}
