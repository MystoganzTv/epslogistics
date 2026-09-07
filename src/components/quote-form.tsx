"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitQuoteRequest } from "@/app/actions/quote";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { FREIGHT_TYPES, STATES, site } from "@/lib/site";
import type { QuoteFormState } from "@/lib/quote-schema";

const initialState: QuoteFormState = { status: "idle" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-faint">
      {children}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" arrow={!pending} disabled={pending}>
      {pending ? "Sending…" : "Request Freight Quote"}
    </Button>
  );
}

export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuoteRequest, initialState);

  if (state.status === "success") {
    return (
      <div className="animate-eps-enter mt-9 rounded-[18px] border border-[#bfe0c8] bg-white px-9 py-11 text-center">
        <div className="mx-auto flex size-15 items-center justify-center rounded-full bg-[#e8f6ec] text-ok">
          <Icon name="check" size={30} strokeWidth={2.2} />
        </div>
        <h2 className="display mt-[22px] text-[26px] tracking-[-0.025em] text-ink">
          Quote request received.
        </h2>
        <p className="mx-auto mb-[26px] mt-2.5 max-w-[470px] text-[15.5px] leading-[1.65] text-muted">
          Thanks — we have your shipment details. We&rsquo;ll review the lane
          directly and follow up with pricing and availability.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/quote"
            className="rounded-lg border-[1.5px] border-hairline px-[22px] py-[13px] font-display text-[14.5px] font-bold text-ink transition-colors hover:border-ink"
          >
            Submit another request
          </Link>
          <ButtonLink href="/" variant="ink" size="sm">
            Back to home
          </ButtonLink>
        </div>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  return (
    <form
      action={formAction}
      noValidate
      className="mt-9 rounded-[18px] border border-line bg-white px-[30px] pb-[34px] pt-8 shadow-[0_18px_46px_rgba(10,26,47,0.06)]"
    >
      {/* Honeypot — invisible para personas, irresistible para bots. */}
      <div aria-hidden className="hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <SectionLabel>Your company</SectionLabel>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Company Name" required error={errors.company}>
          <input
            name="company"
            type="text"
            placeholder="Acme Distribution"
            autoComplete="organization"
            className={inputClass(errors.company)}
          />
        </Field>
        <Field label="Contact Name" required error={errors.contact}>
          <input
            name="contact"
            type="text"
            placeholder="Jordan Ellis"
            autoComplete="name"
            className={inputClass(errors.contact)}
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <input
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            autoComplete="tel"
            className={inputClass(errors.phone)}
          />
        </Field>
      </div>

      <div className="mt-[26px] border-t border-line-soft pt-[26px]">
        <SectionLabel>The lane</SectionLabel>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Pickup City" required error={errors.puCity}>
          <input
            name="puCity"
            type="text"
            placeholder="Richmond"
            className={inputClass(errors.puCity)}
          />
        </Field>
        <Field label="Pickup State" required error={errors.puState}>
          <select
            name="puState"
            defaultValue=""
            className={inputClass(errors.puState)}
          >
            <option value="">Select state</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Delivery City" required error={errors.doCity}>
          <input
            name="doCity"
            type="text"
            placeholder="Charlotte"
            className={inputClass(errors.doCity)}
          />
        </Field>
        <Field label="Delivery State" required error={errors.doState}>
          <select
            name="doState"
            defaultValue=""
            className={inputClass(errors.doState)}
          >
            <option value="">Select state</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-[26px] border-t border-line-soft pt-[26px]">
        <SectionLabel>The shipment</SectionLabel>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Pickup Date" required error={errors.date}>
          <input name="date" type="date" className={inputClass(errors.date)} />
        </Field>
        <Field label="Freight Type" required error={errors.freight}>
          <select
            name="freight"
            defaultValue=""
            className={inputClass(errors.freight)}
          >
            <option value="">Select type</option>
            {FREIGHT_TYPES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Number of Pallets" error={errors.pallets}>
          <input
            name="pallets"
            type="number"
            min={0}
            placeholder="e.g. 6"
            className={inputClass(errors.pallets)}
          />
        </Field>
        <Field label="Approximate Weight (lbs)" error={errors.weight}>
          <input
            name="weight"
            type="number"
            min={0}
            placeholder="e.g. 4500"
            className={inputClass(errors.weight)}
          />
        </Field>
      </div>

      <Field label="Special Instructions" className="mt-2">
        <textarea
          name="notes"
          rows={4}
          placeholder="Dock hours, appointment requirements, liftgate needs, accessorials, anything we should know."
          className={textareaClass()}
        />
      </Field>

      {state.status === "error" && (
        <div className="mt-[22px] flex items-start gap-3 rounded-[10px] border border-danger-line bg-danger-bg px-4 py-3.5">
          <span className="mt-px shrink-0 text-danger">
            <Icon name="alert" size={19} strokeWidth={2} />
          </span>
          <span className="text-sm font-semibold leading-[1.5] text-[#8e2a20]">
            {state.message}
          </span>
        </div>
      )}

      <div className="mt-[26px] flex flex-wrap items-center gap-4">
        <SubmitButton />
        <span className="max-w-[320px] text-[13.5px] leading-[1.5] text-faint">
          We review every request by hand. No automated pricing, no spam. Prefer
          to call?{" "}
          <a href={site.phoneHref} className="font-semibold text-brand hover:underline">
            {site.phone}
          </a>
        </span>
      </div>
    </form>
  );
}
