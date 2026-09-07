import { z } from "zod";
import { FREIGHT_TYPES, STATES } from "@/lib/site";

/**
 * Campo de texto obligatorio. `missing` cubre el caso de que el campo no
 * llegue en absoluto, para que el mensaje siga siendo legible.
 */
const trimmed = (max: number, missing: string) =>
  z.string({ error: missing }).trim().max(max);

/** Los numericos del formulario son opcionales: "" y ausente se guardan null. */
const optionalNumber = (max: number, label: string) =>
  z
    .union([z.literal(""), z.coerce.number()])
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v))
    .refine((v) => v === null || (Number.isFinite(v) && v >= 0), {
      message: `Enter a valid ${label}`,
    })
    .refine((v) => v === null || v <= max, {
      message: `That ${label} looks too high — call us instead`,
    });

export const quoteSchema = z.object({
  company: trimmed(200, "Company name is required").min(1, "Company name is required"),
  contact: trimmed(200, "Contact name is required").min(1, "Contact name is required"),
  email: trimmed(200, "Email is required")
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i, "Enter a valid email address"),
  phone: trimmed(40, "Phone is required")
    .min(1, "Phone is required")
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "Enter a 10-digit phone number",
    }),
  puCity: trimmed(120, "Pickup city is required").min(1, "Pickup city is required"),
  puState: z.enum(STATES, { message: "Select a pickup state" }),
  doCity: trimmed(120, "Delivery city is required").min(1, "Delivery city is required"),
  doState: z.enum(STATES, { message: "Select a delivery state" }),
  date: z
    .string({ error: "Pickup date is required" })
    .min(1, "Pickup date is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date"),
  freight: z.enum(FREIGHT_TYPES, { message: "Select a freight type" }),
  pallets: optionalNumber(100, "number"),
  weight: optionalNumber(200000, "weight"),
  notes: trimmed(4000, "Invalid notes").optional().or(z.literal("")),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteValues = z.output<typeof quoteSchema>;

/** Estado que la server action devuelve al formulario. */
export type QuoteFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export const EMPTY_QUOTE: QuoteInput = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  puCity: "",
  puState: "" as QuoteInput["puState"],
  doCity: "",
  doState: "" as QuoteInput["doState"],
  date: "",
  freight: "" as QuoteInput["freight"],
  pallets: "",
  weight: "",
  notes: "",
};
