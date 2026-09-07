import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { Icon } from "@/components/ui/icon";
import { nav, site } from "@/lib/site";

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#5f7694]">
      {children}
    </div>
  );
}

const footerLink =
  "text-[14.5px] font-medium text-onDark-strong transition-colors hover:text-white";

export function SiteFooter() {
  const socials = site.socials.filter((s) => /^https?:\/\//i.test(s.href));

  return (
    <footer className="bg-deep text-white">
      <div className="shell pb-[30px] pt-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark tone="light" markHeight={40} />
            <p className="mt-5 font-display text-[15px] font-bold tracking-[-0.01em] text-brand-soft">
              {site.tagline}.
            </p>
            <p className="mt-3.5 text-sm leading-[1.6] text-onDark-soft">
              {site.region}
              <br />
              {site.regionSub}
            </p>
          </div>

          <div>
            <ColTitle>Company</ColTitle>
            <div className="mt-4 flex flex-col gap-[11px]">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <ColTitle>Get in touch</ColTitle>
            <div className="mt-4 flex flex-col gap-[11px]">
              <Link href="/quote" className={footerLink}>
                Request a Quote
              </Link>
              <a href={site.phoneHref} className={footerLink}>
                {site.phone}
              </a>
              <a href={site.emailHref} className={`${footerLink} break-words`}>
                {site.email}
              </a>
            </div>

            {socials.length > 0 && (
              <div className="mt-5 flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex size-[38px] items-center justify-center rounded-[9px] border border-white/20 transition-colors hover:border-white hover:bg-white/10"
                  >
                    <Icon name={s.icon} size={18} strokeWidth={1.7} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <ColTitle>Authority &amp; legal</ColTitle>
            <div className="mt-4 flex flex-col gap-2.5">
              <span className="font-display text-[14.5px] font-bold tracking-[0.04em]">
                USDOT #{site.usdot}
              </span>
              <span className="font-display text-[14.5px] font-bold tracking-[0.04em]">
                MC #{site.mc}
              </span>
              <span className="text-[13.5px] leading-[1.55] text-onDark-soft">
                Owner-operated carrier running under its own authority. Not a
                broker or dispatch service.
              </span>
            </div>
            <div className="mt-[18px] flex flex-col gap-[11px]">
              <Link href="/privacy" className={`${footerLink} text-sm`}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={`${footerLink} text-sm`}>
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-[22px] text-[13px] text-[#7a8da6]">
          <span>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Virginia box truck &amp; regional freight transportation.</span>
        </div>
      </div>
    </footer>
  );
}
