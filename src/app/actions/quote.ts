"use server";

import { quoteSchema, type QuoteFormState } from "@/lib/quote-schema";
import { sendQuoteEmail } from "@/lib/email";

const FALLBACK =
  "We couldn't send the form right now. Please call or email us and we'll take the details directly.";

/**
 * Formulario publico de cotizacion: valida y manda un correo a EPS.
 * No se guarda nada — la bandeja de entrada es el sistema de registro.
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

  const result = await sendQuoteEmail({
    ...parsed.data,
    email: parsed.data.email.toLowerCase(),
  });

  if (!result.ok) {
    // El detalle solo al log del servidor; al visitante, una salida util.
    console.error("[quote] envio fallido", result);
    return { status: "error", message: FALLBACK };
  }

  return { status: "success" };
}
