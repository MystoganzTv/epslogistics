import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Proporciones del simbolo recortado del logo oficial. */
const MARK = { w: 309, h: 451 };

/**
 * Marca del header/footer: el simbolo oficial de EPS mas "EPS / LOGISTICS".
 *
 * Las dos variantes del simbolo (oscura y clara) se pintan siempre, una encima
 * de la otra, y se cruzan por opacidad. Cambiar el `src` al vuelo provocaba un
 * parpadeo mientras el navegador cargaba la otra imagen.
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
  const markWidth = Math.round((markHeight * MARK.w) / MARK.h);

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("flex shrink-0 items-center gap-3.5", className)}
    >
      <span
        className="relative block shrink-0"
        style={{ width: markWidth, height: markHeight }}
      >
        <Image
          src="/eps-mark.png"
          alt=""
          width={markWidth}
          height={markHeight}
          priority={priority}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            onDark ? "opacity-0" : "opacity-100",
          )}
        />
        <Image
          src="/eps-mark-light.png"
          alt=""
          width={markWidth}
          height={markHeight}
          priority={priority}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            onDark ? "opacity-100" : "opacity-0",
          )}
        />
      </span>

      <span
        className={cn(
          "flex flex-col leading-[0.94] transition-colors duration-300",
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
          <span
            className={cn(
              "hidden h-8 w-px transition-colors duration-300 sm:block",
              onDark ? "bg-white/35" : "bg-hairline",
            )}
          />
          <span
            className={cn(
              "hidden font-display text-[8px] font-semibold uppercase leading-[1.5] tracking-[0.16em] transition-colors duration-300 sm:block",
              onDark ? "text-white/70" : "text-faint",
            )}
          >
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
