"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const field =
  "w-full rounded-brand border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-electric-500";

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8">
        <p className="font-semibold">Gracias — recibimos tu solicitud.</p>
        <p className="mt-2 text-sm opacity-70">
          Un representante de EPS Logistics te contactara en breve.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: enviar a Supabase (tabla quote_requests) o a un endpoint /api.
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={field} name="name" placeholder="Full name" required />
        <input className={field} name="company" placeholder="Company" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={field}
          name="email"
          type="email"
          placeholder="Work email"
          required
        />
        <input className={field} name="phone" placeholder="Phone" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={field} name="origin" placeholder="Origin (city, ST)" />
        <input
          className={field}
          name="destination"
          placeholder="Destination (city, ST)"
        />
      </div>
      <textarea
        className={field}
        name="details"
        rows={5}
        placeholder="Commodity, weight, equipment, frequency…"
      />
      <Button type="submit" size="lg">
        Send request
      </Button>
    </form>
  );
}
