import type { Metadata } from "next";
import { Suspense } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas px-5 py-16">
      <div className="w-full max-w-sm">
        <Wordmark className="justify-center" markWidth={54} priority />
        <h1 className="display mt-9 text-center text-xl text-ink">
          Internal sign in
        </h1>
        <p className="mt-2 text-center text-sm text-muted">
          Quote requests submitted through the site.
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
