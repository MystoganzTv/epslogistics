import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Proporciones del lockup recortado del logo oficial. */
const LOCKUP = { w: 1105, h: 422 };

/**
 * La marca es el logo oficial, no una reconstruccion.
 *
 * Antes se redibujaba con Archivo: "EPS" y "LOGISTICS" no cuadraban de ancho
 * (en el logo real miden 744 y 740px, alineadas al pixel) y las letras no eran
 * las mismas. Un parecido razonable de una marca se lee como error.
 *
 * Las dos variantes se pintan siempre, superpuestas, y se cruzan por opacidad:
 * cambiar el `src` al vuelo provocaba un parpadeo mientras cargaba la otra.
 */
export function Wordmark({
  tone = "dark",
  height = 40,
  className,
  priority = false,
}: {
  /** "dark" = sobre fondo claro. "light" = sobre fondo oscuro. */
  tone?: "dark" | "light";
  /** Altura del lockup en px. */
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const onDark = tone === "light";
  const width = Math.round((height * LOCKUP.w) / LOCKUP.h);

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("relative block shrink-0", className)}
      style={{ width, height }}
    >
      <Image
        src="/eps-lockup.png"
        alt={site.name}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          onDark ? "opacity-0" : "opacity-100",
        )}
      />
      <Image
        src="/eps-lockup-light.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          onDark ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}
