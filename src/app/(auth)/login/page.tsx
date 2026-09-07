import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/brand/logo";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "Client login" };

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Logo width={170} priority className="mx-auto" />
        <h1 className="mt-10 text-center text-xl font-bold tracking-tight">
          Client portal
        </h1>
        <p className="mt-2 text-center text-sm opacity-60">
          Track shipments, pull documents and review quotes.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
