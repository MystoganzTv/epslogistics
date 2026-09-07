import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Proporciones del simbolo recortado del logo oficial. */
const MARK = { w: 309, h: 451 };

/**
 * Marca del header/footer: el simbolo oficial de EPS mas "EPS / LOGISTICS".
 * `tagline` anade el lockup de tres lineas separado por una barra.
 */
export function Wordmark({
  tone = "dark",
  tagline = false,
  markHeight = 44,
  className,
  priority = false,
}: {
  /** "dark" = sobre fondo claro. "light" = sobre fondo oscuro. */
  tone?: "dark" | "light";
  tagline?: boolean;
  markHeight?: number;
  className?: string;
  priority?: boolean;
}) {
  const onDark = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("flex shrink-0 items-center gap-3.5", className)}
    >
      <Image
        src={onDark ? "/eps-mark-light.png" : "/eps-mark.png"}
        alt=""
        width={Math.round((markHeight * MARK.w) / MARK.h)}
        height={markHeight}
        priority={priority}
      />
      <span
        className={cn(
          "flex flex-col leading-[0.94]",
          onDark ? "text-white" : "text-ink",
        )}
      >
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
