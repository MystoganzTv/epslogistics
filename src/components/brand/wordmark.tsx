import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Marca del header/footer: simbolo + "EPS / LOGISTICS" apilado.
 * `tagline` anade el lockup de tres lineas separado por una barra.
 */
export function Wordmark({
  tone = "dark",
  tagline = false,
  markWidth = 50,
  className,
  priority = false,
}: {
  tone?: "dark" | "light";
  tagline?: boolean;
  markWidth?: number;
  className?: string;
  priority?: boolean;
}) {
  const text = tone === "dark" ? "text-ink" : "text-white";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("flex shrink-0 items-center gap-[13px]", className)}
    >
      <Image
        src="/eps-mark.png"
        alt=""
        width={markWidth}
        height={Math.round((markWidth * 280) / 352)}
        priority={priority}
        className="h-auto"
      />
      <span className={cn("flex flex-col leading-[0.94]", text)}>
        <span className="font-display text-[23px] font-black tracking-[-0.02em]">
          EPS
        </span>
        <span className="font-display text-[10px] font-bold tracking-[0.25em]">
          LOGISTICS
        </span>
      </span>

      {tagline && (
        <>
          <span className="hidden h-8 w-px bg-hairline sm:block" />
          <span className="hidden font-display text-[8px] font-semibold uppercase leading-[1.5] tracking-[0.16em] text-faint sm:block">
            Delivering
            <br />
            Opportunities
            <br />
            Every Mile
          </span>
        </>
      )}
    </Link>
  );
}
