import { cn } from "@/lib/utils";

/** Etiqueta pequena en mayusculas que abre cada seccion. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "eyebrow",
        tone === "light" ? "text-brand" : "text-brand-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
