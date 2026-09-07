import { redirect } from "next/navigation";
import { Wordmark } from "@/components/brand/wordmark";
import { createClient } from "@/lib/supabase/server";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // El middleware ya bloquea el acceso; esto cubre el caso de sesion caducada
  // entre la comprobacion del middleware y el render.
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <header className="border-b border-line bg-white">
        <div className="shell flex items-center justify-between gap-6 py-[13px]">
          <div className="flex items-center gap-8">
            <Wordmark markWidth={44} priority />
            <span className="hidden font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-faint sm:block">
              Internal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">
              {user.email}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="cursor-pointer rounded-lg border border-hairline px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-canvas"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 py-10">{children}</main>
    </div>
  );
}
