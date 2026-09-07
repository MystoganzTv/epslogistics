"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/portal";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-1">
      <Field label="Email" error={error ? " " : undefined}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@epslogistics.com"
          className={inputClass()}
        />
      </Field>
      <Field label="Password" error={error ?? undefined}>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass(error ?? undefined)}
        />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
