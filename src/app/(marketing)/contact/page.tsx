import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Container className="grid gap-14 py-20 sm:py-24 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get a quote
        </h1>
        <p className="mt-4 max-w-md leading-relaxed opacity-70">
          Lanes, volumen y nivel de servicio. Respondemos el mismo dia habil.
        </p>
      </div>
      <QuoteForm />
    </Container>
  );
}
