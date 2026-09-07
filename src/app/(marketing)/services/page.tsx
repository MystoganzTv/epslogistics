import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card, CardTitle, CardBody } from "@/components/ui/card";

export const metadata: Metadata = { title: "Services" };

const services = [
  {
    title: "Dry van",
    body: "53' capacity for palletized and floor-loaded freight, LTL through full truckload.",
  },
  {
    title: "Refrigerated",
    body: "Temperature-controlled lanes with continuous monitoring and documented reefer downloads.",
  },
  {
    title: "Flatbed & step deck",
    body: "Open-deck freight, securement and permitting handled end to end.",
  },
  {
    title: "Expedited",
    body: "Team drivers and dedicated equipment when the delivery window is the whole job.",
  },
  {
    title: "Drayage",
    body: "Port and rail ramp pulls with container tracking and per-diem management.",
  },
  {
    title: "Managed transportation",
    body: "Lane strategy, carrier sourcing and reporting for shippers without an internal traffic desk.",
  },
];

export default function ServicesPage() {
  return (
    <Container className="py-20 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Services</h1>
      <p className="mt-4 max-w-xl leading-relaxed opacity-70">
        One point of contact across every mode. Placeholder copy — reemplazar con
        la oferta real de EPS Logistics.
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title}>
            <CardTitle>{s.title}</CardTitle>
            <CardBody>{s.body}</CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
}
