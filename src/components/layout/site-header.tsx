"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-6 py-3">
        <Logo width={150} priority />

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Client login
          </ButtonLink>
          <ButtonLink href="/contact" size="sm">
            Get a quote
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-brand p-2 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-brand px-2 py-2.5 text-sm font-medium hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-3">
              <ButtonLink href="/login" variant="ghost" size="sm" className="flex-1">
                Client login
              </ButtonLink>
              <ButtonLink href="/contact" size="sm" className="flex-1">
                Get a quote
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
