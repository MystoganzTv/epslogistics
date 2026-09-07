import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card, CardTitle, CardBody } from "@/components/ui/card";

export const metadata: Metadata = { title: "Shipments" };

export default function ShipmentsPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold tracking-tight">Shipments</h1>
      <Card className="mt-8">
        <CardTitle>Placeholder</CardTitle>
        <CardBody>
          Tabla de envios: referencia, origen, destino, equipo, ETA y estatus.
        </CardBody>
      </Card>
    </Container>
  );
}
