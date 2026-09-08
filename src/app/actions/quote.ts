"use server";

import { headers } from "next/headers";
import { quoteSchema, type QuoteFormState } from "@/lib/quote-schema";
import { sendQuoteEmail } from "@/lib/email";
import { allowRequest, clientKey } from "@/lib/rate-limit";

const FALLBACK =
  "We couldn't send the form right now. Please call or email us and we'll take the details directly.";

const TOO_MANY =
  "That's a few requests in a short time. Give it a few minutes, or call us and we'll take the details on the phone.";

/** Un humano tarda mas que esto en rellenar trece campos. */
const MIN_FILL_MS = 2_000;

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

  // Trampa de tiempo. El campo lo rellena el cliente al montar el formulario,
  // asi que exige ejecutar JS y ademas haber tardado algo en escribir. A un
  // bot se le devuelve exito para no ensenarle que ha sido detectado.
  // Si el campo falta del todo (navegador sin JS) se deja pasar: prefiero que
  // un bot ciego llegue al rate limit antes que tragarme la cotizacion de una
  // persona real y decirle que si.
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  if (!allowRequest(clientKey(await headers()))) {
    return { status: "error", message: TOO_MANY };
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
