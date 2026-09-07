"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { quoteSchema, type QuoteFormState } from "@/lib/quote-schema";

/**
 * Recibe el formulario publico de cotizacion.
 * La insercion va con la anon key: la policy de RLS solo permite INSERT con
 * status = 'new' y source = 'website', asi que el cliente no puede escribir
 * campos internos ni leer nada.
 */
export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Honeypot: los bots rellenan el campo oculto, las personas no.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const parsed = quoteSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message:
        "Please complete the highlighted fields so we can quote the lane accurately.",
      fieldErrors,
    };
  }

  const v = parsed.data;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error("[quote] Falta NEXT_PUBLIC_SUPABASE_URL");
    return {
      status: "error",
      message:
        "We couldn't submit the form right now. Please call or email us and we'll take the details directly.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("quote_requests").insert({
    company: v.company,
    contact_name: v.contact,
    email: v.email.toLowerCase(),
    phone: v.phone,
    pickup_city: v.puCity,
    pickup_state: v.puState,
    delivery_city: v.doCity,
    delivery_state: v.doState,
    pickup_date: v.date,
    freight_type: v.freight,
    pallets: v.pallets,
    weight_lbs: v.weight,
    notes: v.notes?.trim() ? v.notes.trim() : null,
  });

  if (error) {
    // El detalle solo al log del servidor; al visitante, una salida util.
    const ua = (await headers()).get("user-agent") ?? "";
    console.error("[quote] insert fallo", { code: error.code, message: error.message, ua });
    return {
      status: "error",
      message:
        "We couldn't submit the form right now. Please call or email us and we'll take the details directly.",
    };
  }

  return { status: "success" };
}
