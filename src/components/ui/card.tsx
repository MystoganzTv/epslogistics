import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";

/** Tarjeta blanca con borde y elevacion al hover. */
export function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-200",
        hover &&
          "hover:-translate-y-1 hover:border-[#c9d9f3] hover:shadow-[0_22px_46px_rgba(10,26,47,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Tarjeta de servicio / valor: icono en tile azul claro, titulo y cuerpo. */
export function FeatureCard({
  icon,
  title,
  body,
  as: Heading = "h3",
}: {
  icon: IconName;
  title: string;
  body: string;
  as?: "h2" | "h3";
}) {
  return (
    <Card>
      <div className="flex size-13 items-center justify-center rounded-xl bg-icon-tile text-brand">
        <Icon name={icon} size={27} />
      </div>
      <Heading className="mt-[22px] font-display text-xl font-extrabold tracking-[-0.02em] text-ink">
        {title}
      </Heading>
      <p className="mt-2.5 text-[15px] leading-[1.62] text-muted">{body}</p>
    </Card>
  );
}
