import { site } from "@/lib/site";

/**
 * Preguntas reales de un shipper. Todas se responden con lo que ya dice el
 * sitio — nada inventado. Se pintan visibles Y como JSON-LD: Google exige que
 * el contenido este a la vista para dar el resultado enriquecido.
 */
export const faq = [
  {
    q: "Are you a broker or a carrier?",
    a: `${site.name} is the carrier. Our truck, our authority (USDOT #${site.usdot} / MC #${site.mc}), our driver. We do not broker freight and we do not re-broker it to anyone else — when you book EPS, EPS moves the load.`,
  },
  {
    q: "What areas do you cover?",
    a: "We are based in Virginia and run lanes in both directions across the East Coast, Southeast, Great Lakes, Midwest and Southern United States — from Boston and New York down to Jacksonville, and west to Chicago, Minneapolis, St. Louis and Dallas. Outbound freight and inbound backhauls are both our lane.",
  },
  {
    q: "What kind of freight do you haul?",
    a: "Box truck freight: palletized freight, commercial goods, retail products, equipment and general cargo. If it fits a 26-foot box and moves on a dock, we can move it.",
  },
  {
    q: "Do you run dedicated or recurring routes?",
    a: "Yes. Businesses that ship on a schedule can move to a dedicated route, with the same truck and the same driver on a consistent pickup and delivery window.",
  },
  {
    q: "How fast do I get a quote?",
    a: `Send the lane, dates, freight type, pallets and weight through the quote form or call ${site.phone}. Every request is reviewed by hand by the owner-operator running the truck — no automated rates — and we come back the same business day whenever we can.`,
  },
] as const;
