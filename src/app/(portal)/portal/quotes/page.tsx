import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card, CardTitle, CardBody } from "@/components/ui/card";

export const metadata: Metadata = { title: "Quotes" };

export default function QuotesPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold tracking-tight">Quotes</h1>
      <Card className="mt-8">
        <CardTitle>Placeholder</CardTitle>
        <CardBody>
          Historial de cotizaciones solicitadas desde el sitio publico.
        </CardBody>
      </Card>
    </Container>
  );
}
