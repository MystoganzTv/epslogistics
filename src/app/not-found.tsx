import Link from "next/link";
import type { Metadata } from "next";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";
import { nav, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col bg-ink">
      <div className="shell py-6">
        <Wordmark tone="light" height={42} priority />
      </div>

      <div className="shell flex flex-1 flex-col justify-center py-16">
        <p className="eyebrow text-brand-soft">Error 404</p>
        <h1 className="display mt-3.5 max-w-2xl text-[clamp(30px,4.4vw,52px)] leading-[1.06] text-white">
          This one took a wrong exit.
        </h1>
        <p className="mt-4 max-w-md text-[17px] leading-[1.65] text-onDark">
          The page you were looking for isn&rsquo;t here. Everything else is
          still where you left it.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/quote" arrow>
            Request a Quote
          </ButtonLink>
          <ButtonLink href="/" variant="outlineLight">
            Back to home
          </ButtonLink>
        </div>

        <nav className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-onDark-strong transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="mt-8 text-sm text-onDark-soft">
          Or just call us —{" "}
          <a href={site.phoneHref} className="font-semibold text-brand-soft hover:underline">
            {site.phone}
          </a>
        </p>
      </div>
    </main>
  );
}
