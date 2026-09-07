import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card, CardTitle, CardBody } from "@/components/ui/card";

export const metadata: Metadata = { title: "Portal" };

const stats = [
  { label: "In transit", value: "—" },
  { label: "Delivered (30d)", value: "—" },
  { label: "Open quotes", value: "—" },
  { label: "On-time rate", value: "—" },
];

export default function PortalHome() {
  return (
    <Container>
      <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-50">
              {s.label}
            </p>
            <p className="mt-3 text-3xl font-bold tracking-tight">{s.value}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardTitle>Sin datos todavia</CardTitle>
        <CardBody>
          Conecta Supabase y crea las tablas de shipments y quotes para poblar
          esta vista.
        </CardBody>
      </Card>
    </Container>
  );
}
