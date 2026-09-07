"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * En la home el header flota sobre la foto del hero y se vuelve solido al
 * hacer scroll. En el resto de paginas es solido desde el principio.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const overHero = pathname === "/";

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    // rAF en vez de llamar directo: evita un setState sincrono en el efecto.
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [overHero]);

  const floating = overHero && !scrolled && !open;
  const close = () => setOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-60 transition-colors duration-300",
        floating
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line-header bg-white/95 backdrop-blur-[14px]",
      )}
    >
      <div className="shell flex h-[74px] items-center gap-[22px]">
        <Wordmark tone={floating ? "light" : "dark"} tagline priority />

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative px-[13px] py-2.5 text-[14.5px] font-semibold transition-colors",
                floating
                  ? isActive(item.href)
                    ? "text-white"
                    : "text-white/75 hover:text-white"
                  : isActive(item.href)
                    ? "text-ink"
                    : "text-muted-strong hover:text-brand",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-[13px] bottom-px h-[2.5px] rounded-sm transition-opacity",
                  floating ? "bg-white" : "bg-brand",
                  isActive(item.href) ? "opacity-100" : "opacity-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <ButtonLink
          href="/quote"
          variant={floating ? "primary" : "ink"}
          size="sm"
          arrow
          className="ml-3 hidden lg:inline-flex"
        >
          Request a Quote
        </ButtonLink>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "ml-auto flex cursor-pointer flex-col gap-[5px] rounded-lg border px-2.5 py-[11px] lg:hidden",
            floating ? "border-white/40" : "border-hairline",
          )}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn("block h-0.5 w-5", floating ? "bg-white" : "bg-ink")}
            />
          ))}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="animate-eps-enter border-t border-line-header bg-white px-[22px] pb-[22px] pt-2 lg:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={cn(
                "block border-b border-[#f1f4f9] px-0.5 py-3.5 font-display text-[17px] font-bold",
                isActive(item.href) ? "text-ink" : "text-muted-strong",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/quote" onClick={close} className="mt-[18px] w-full">
            Request a Quote
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
