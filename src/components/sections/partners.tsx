import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { partners } from "@/lib/site";
import { cn } from "@/lib/utils";

/** "Looking for a Reliable Transportation Partner?" — variante clara y oscura. */
export function PartnersSection({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <section className={dark ? "bg-ink" : "border-t border-line-soft bg-canvas"}>
      <div className="shell grid items-center gap-11 py-[70px] lg:grid-cols-2">
        <div>
          <Eyebrow tone={dark ? "dark" : "light"}>Business Partners</Eyebrow>
          <h2
            className={cn(
              "display mt-3.5 text-[clamp(24px,3vw,33px)] leading-[1.14]",
              dark ? "text-white" : "text-ink",
            )}
          >
            Looking for a Reliable Transportation Partner?
          </h2>
          <p
            className={cn(
              "mt-4 max-w-[480px] text-base leading-[1.66]",
              dark ? "text-onDark" : "text-muted",
            )}
          >
            EPS Logistics works with businesses and logistics partners that need
            dependable transportation capacity without unnecessary complexity. We
            work directly as the carrier on the load — no brokering, no dispatch
            layer, no handoffs.
          </p>
          <ButtonLink href="/quote" arrow className="mt-6">
            Partner With EPS
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-[11px] sm:grid-cols-3">
          {partners.map((p) => (
            <div
              key={p}
              className={cn(
                "rounded-[10px] border px-3.5 py-4 font-display text-sm font-semibold transition-colors",
                dark
                  ? "border-white/15 text-[#dce6f3] hover:border-white/35 hover:bg-white/5"
                  : "border-line bg-white text-slate",
              )}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
