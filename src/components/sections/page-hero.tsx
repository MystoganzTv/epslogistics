import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

/** Cabecera oscura que abre las paginas interiores. */
export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Ruta de una foto de fondo, atenuada tras un degradado. */
  photo?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        photo ? "bg-abyss" : "bg-ink",
        className,
      )}
    >
      {photo && (
        <>
          <Image
            src={photo}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.38]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(95deg,rgba(5,16,31,0.96)_0%,rgba(5,16,31,0.78)_60%,rgba(5,16,31,0.9)_100%)]" />
        </>
      )}
      <div className="shell animate-eps-enter relative pb-[66px] pt-[74px]">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h1 className="display mt-3.5 max-w-[840px] text-[clamp(31px,4.6vw,52px)] leading-[1.06] tracking-[-0.032em] text-white">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-[660px] text-[17px] leading-[1.65] text-onDark">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
