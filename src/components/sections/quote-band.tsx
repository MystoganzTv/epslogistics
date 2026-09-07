import { ButtonLink } from "@/components/ui/button";

/** Banda oscura de cierre con un unico CTA. */
export function QuoteBand({ title }: { title: string }) {
  return (
    <section className="bg-ink">
      <div className="shell flex flex-wrap items-center justify-between gap-6 py-[66px]">
        <h2 className="display max-w-[560px] text-[clamp(24px,3vw,33px)] leading-[1.14] text-white">
          {title}
        </h2>
        <ButtonLink href="/quote" arrow>
          Request a Quote
        </ButtonLink>
      </div>
    </section>
  );
}
