import { Eyebrow } from "@/components/ui/eyebrow";
import { faq } from "@/lib/faq";

export function Faq() {
  return (
    <section className="border-t border-line-soft bg-canvas">
      <div className="shell py-[76px]">
        <Eyebrow>Common questions</Eyebrow>
        <h2 className="display mb-10 mt-3.5 max-w-2xl text-[clamp(24px,3vw,32px)] leading-[1.14] text-ink">
          What shippers ask before the first load
        </h2>
        <dl className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {faq.map((item) => (
            <div key={item.q}>
              <dt className="font-display text-[17px] font-bold tracking-[-0.012em] text-ink">
                {item.q}
              </dt>
              <dd className="mt-2.5 text-[15px] leading-[1.65] text-muted">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
