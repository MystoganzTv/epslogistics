import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo width={160} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-70">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest opacity-50">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest opacity-50">
            Clients
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/login" className="opacity-70 hover:opacity-100">
                Client portal
              </Link>
            </li>
            <li>
              <Link href="/contact" className="opacity-70 hover:opacity-100">
                Request a quote
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs opacity-60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-widest">{site.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
