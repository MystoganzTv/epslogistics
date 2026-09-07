import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const pill =
  "rounded-full border px-[17px] py-[9px] font-display text-xs font-bold tracking-[0.1em]";

/** Chips de USDOT / MC. `extras` anade los que solo aparecen en About. */
export function AuthorityBadges({
  tone = "dark",
  extras = false,
  className,
}: {
  tone?: "light" | "dark";
  extras?: boolean;
  className?: string;
}) {
  const base =
    tone === "dark"
      ? "border-white/25 text-[#cfddef]"
      : "border-hairline text-ink";

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      <span className={cn(pill, base)}>USDOT #{site.usdot}</span>
      <span className={cn(pill, base)}>MC #{site.mc}</span>
      {extras && (
        <>
          <span className={cn(pill, base)}>Virginia, USA</span>
          <span
            className={cn(
              pill,
              tone === "dark"
                ? "border-brand-pale/55 bg-brand/15 text-[#bfd9ff]"
                : "border-[#c9d9f3] bg-tint text-brand",
            )}
          >
            Owner-operator
          </span>
        </>
      )}
    </div>
  );
}
