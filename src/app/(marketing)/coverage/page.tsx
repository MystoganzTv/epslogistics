import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Coverage" };

export default function CoveragePage() {
  return (
    <Container className="py-20 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Coverage</h1>
      <p className="mt-4 max-w-xl leading-relaxed opacity-70">
        Placeholder. Aqui van los mapas de lanes, regiones cubiertas y tiempos de
        transito tipicos.
      </p>
    </Container>
  );
}
