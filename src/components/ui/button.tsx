import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/icon";

type Variant = "primary" | "ink" | "outline" | "outlineLight" | "outlineBrand";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[9px] font-display font-bold tracking-[0.012em] whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_12px_30px_rgba(22,104,227,0.34)] hover:bg-brand-dark hover:-translate-y-0.5",
  ink: "bg-ink text-white hover:bg-brand",
  outline:
    "border-[1.5px] border-hairline text-ink hover:border-ink hover:bg-white",
  outlineLight:
    "border-[1.5px] border-white/50 text-white hover:border-white hover:bg-white/15",
  outlineBrand:
    "border-[1.5px] border-brand text-brand hover:bg-brand hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-[21px] py-[13px] text-[15.5px] rounded-lg",
  md: "px-[26px] py-[15px] text-[16.5px]",
  lg: "px-7 py-4 text-[17px]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  onClick,
  children,
}: Common & { href: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
      {arrow && <ArrowIcon />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  children,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], "cursor-pointer", className)}
      {...props}
    >
      {children}
      {arrow && <ArrowIcon />}
    </button>
  );
}

/** Enlace externo (tel:, mailto:) con el mismo lenguaje visual. */
export function ButtonAnchor({
  href,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  children,
}: Common & { href: string }) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
      {arrow && <ArrowIcon />}
    </a>
  );
}
