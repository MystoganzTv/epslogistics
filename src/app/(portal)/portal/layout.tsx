import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { createClient } from "@/lib/supabase/server";

const links = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/shipments", label: "Shipments" },
  { href: "/portal/quotes", label: "Quotes" },
];

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border">
        <Container className="flex h-18 items-center justify-between gap-6 py-3">
          <div className="flex items-center gap-8">
            <Logo width={130} priority />
            <nav className="hidden gap-6 text-sm font-medium sm:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="opacity-70 hover:opacity-100"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm opacity-60 sm:inline">
              {user?.email}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-brand border border-border px-3 py-1.5 text-sm font-medium hover:bg-surface"
              >
                Sign out
              </button>
            </form>
          </div>
        </Container>
      </header>
      <main className="flex-1 py-10">{children}</main>
    </div>
  );
}
