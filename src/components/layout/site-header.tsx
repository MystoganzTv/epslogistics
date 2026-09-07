"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-60 border-b border-line-header bg-white/95 backdrop-blur-[14px]">
      <div className="shell flex items-center gap-[22px] py-[13px]">
        <Wordmark tagline priority />

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative px-[13px] py-2.5 text-[14.5px] font-semibold transition-colors hover:text-brand",
                isActive(item.href) ? "text-ink" : "text-muted-strong",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-[13px] bottom-px h-[2.5px] rounded-sm bg-brand transition-opacity",
                  isActive(item.href) ? "opacity-100" : "opacity-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <ButtonLink
          href="/quote"
          variant="ink"
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
          className="ml-auto flex cursor-pointer flex-col gap-[5px] rounded-lg border border-hairline px-2.5 py-[11px] lg:hidden"
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
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
