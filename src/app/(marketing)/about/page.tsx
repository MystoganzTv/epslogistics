import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container className="py-20 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        About EPS Logistics
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed opacity-70">
        Placeholder. Historia de la empresa, autoridad MC/DOT, equipo y valores.
      </p>
    </Container>
  );
}
