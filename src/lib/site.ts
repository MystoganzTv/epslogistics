import type { IconName } from "@/lib/icons";

/** Numero crudo (10 digitos). Cambiar aqui y se propaga a todo el sitio. */
const PHONE_RAW = "3056102811";

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length === 11 && d[0] === "1")
    return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  return raw;
}

const phoneDigits = PHONE_RAW.replace(/\D/g, "");

export const site = {
  name: "EPS Logistics",
  legalName: "EPS Logistics",
  tagline: "Delivering Opportunities Every Mile",
  headline: "Reliable Freight. Real Solutions. Every Mile.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eps-logistics.com",
  description:
    "EPS Logistics is a Virginia-based, owner-operated box truck carrier (USDOT #6997514 / MC #66625517) moving freight outbound and inbound across the Mid-Atlantic, Midwest and Southern United States. Local and regional delivery, dedicated routes and long-distance freight.",
  shortDescription:
    "Virginia-based transportation solutions serving businesses across the Mid-Atlantic, Midwest, and Southern United States.",
  phone: formatPhone(PHONE_RAW),
  phoneHref: `tel:+${phoneDigits.length === 10 ? "1" + phoneDigits : phoneDigits}`,
  email: "info@eps-logistics.com",
  get emailHref() {
    return `mailto:${this.email}`;
  },
  region: "Virginia, USA",
  regionSub: "Serving the Mid-Atlantic, Midwest & Southern U.S.",
  usdot: "6997514",
  mc: "66625517",
  /** Solo se muestran los que tengan URL. */
  socials: [
    { name: "LinkedIn", href: "", icon: "linkedin" as IconName },
    { name: "Instagram", href: "", icon: "instagram" as IconName },
    { name: "Facebook", href: "", icon: "facebook" as IconName },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Coverage" },
  { href: "/about", label: "About" },
  { href: "/why-eps", label: "Why EPS" },
  { href: "/contact", label: "Contact" },
] as const;

export const trust = [
  { label: "On-Time Delivery", icon: "clock" },
  { label: "Safe & Insured", icon: "shield" },
  { label: "Regional + Long-Distance", icon: "pin" },
  { label: "Business Focused", icon: "users" },
] satisfies { label: string; icon: IconName }[];

export const services = [
  {
    slug: "box-truck-freight",
    title: "Box Truck Freight",
    short:
      "Palletized freight, commercial goods, retail products, and general cargo.",
    body: "Professional transportation for palletized freight, commercial goods, retail products, equipment, and general cargo.",
    icon: "box",
  },
  {
    slug: "local-regional",
    title: "Local & Regional Delivery",
    short: "Flexible transportation throughout Virginia and surrounding markets.",
    body: "Flexible transportation throughout Virginia and surrounding markets, sized for businesses that ship regularly but not by the truckload.",
    icon: "store",
  },
  {
    slug: "long-distance",
    title: "Long-Distance Freight",
    short: "Virginia connected to the Midwest and Southern U.S. — both ways.",
    body: "Reliable transportation connecting Virginia with destinations throughout the Midwest and Southern United States — outbound loads and inbound freight returning to Virginia.",
    icon: "route",
  },
  {
    slug: "dedicated-routes",
    title: "Dedicated Routes",
    short: "Consistent, recurring pickup and delivery schedules.",
    body: "Recurring transportation solutions for businesses requiring consistent pickup and delivery schedules.",
    icon: "pin",
  },
  {
    slug: "last-mile",
    title: "Last-Mile & Business Delivery",
    short: "Commercial delivery for warehouses, distributors, and retailers.",
    body: "Commercial delivery solutions for businesses, warehouses, distributors, and retailers.",
    icon: "truck",
  },
  {
    slug: "custom",
    title: "Custom Transportation Solutions",
    short: "Freight solutions built around your routes and schedules.",
    body: "Flexible freight solutions based on shipment requirements, routes, schedules, and business needs.",
    icon: "sliders",
  },
] satisfies {
  slug: string;
  title: string;
  short: string;
  body: string;
  icon: IconName;
}[];

export const values = [
  {
    title: "Reliability",
    short: "Dependable pickups, deliveries, and communication.",
    long: "We understand that freight schedules matter. We focus on dependable pickups, deliveries, and communication.",
    icon: "shield",
  },
  {
    title: "Professional Service",
    short: "Every shipment represents both businesses.",
    long: "Every shipment represents our company and our customer's business — and it gets handled that way.",
    icon: "star",
  },
  {
    title: "Communication",
    short: "Clear updates from pickup through delivery.",
    long: "Clear communication from pickup through delivery, so you always know where your freight stands.",
    icon: "chat",
  },
  {
    title: "Flexible Solutions",
    short: "Built around growing businesses.",
    long: "Transportation solutions designed around the needs of growing businesses.",
    icon: "chart",
  },
] satisfies {
  title: string;
  short: string;
  long: string;
  icon: IconName;
}[];

export const legend = [
  { color: "#1668E3", label: "Home base — Virginia" },
  {
    color: "#5C9BFF",
    label: "Core lanes — East Coast & Southeast, outbound and inbound",
  },
  {
    color: "#A8C9FF",
    label: "Extended lanes — Midwest, Great Lakes & South, outbound and inbound",
  },
] as const;

export const regions = [
  {
    tag: "Home base",
    title: "Virginia",
    body: "Local pickups and deliveries statewide, from the Richmond and Hampton Roads corridors to Northern Virginia.",
  },
  {
    tag: "Core lanes",
    title: "Northeast",
    body: "Runs up the I-95 corridor into New Jersey, New York and New England, and back down with return freight.",
  },
  {
    tag: "Core lanes",
    title: "Mid-Atlantic",
    body: "Regular runs to and from Maryland, D.C., Delaware, Pennsylvania, New Jersey, North Carolina, and West Virginia.",
  },
  {
    tag: "Core lanes",
    title: "Southeast",
    body: "Freight south into the Carolinas, Georgia, Tennessee, Alabama, and Florida — and backhauls returning to Virginia.",
  },
  {
    tag: "Extended lanes",
    title: "Midwest",
    body: "Long-distance lanes into Michigan, Ohio, Indiana, Illinois, Wisconsin, and the surrounding Great Lakes markets — outbound and back.",
  },
  {
    tag: "Extended lanes",
    title: "Central & Southern U.S.",
    body: "Selected long-distance lanes reaching Kentucky, Missouri, Mississippi, Louisiana, and Texas markets, outbound or inbound.",
  },
] as const;

export const partners = [
  "Shippers",
  "Brokers",
  "Warehouses",
  "Distributors",
  "Retailers",
  "Manufacturers",
  "E-commerce",
] as const;

export const howWeWork = [
  {
    n: "01",
    title: "You send the details",
    body: "Lane, dates, freight type, pallets, and weight — through the form or a phone call.",
  },
  {
    n: "02",
    title: "We confirm capacity",
    body: "A person reviews the lane and confirms what we can actually cover, and when.",
  },
  {
    n: "03",
    title: "We move the freight",
    body: "Professional pickup and delivery, with updates along the way.",
  },
  {
    n: "04",
    title: "We keep the lane",
    body: "Recurring shipments become dedicated routes as your volume grows.",
  },
] as const;

/** Estados que el formulario ofrece, alineados con las lanes reales. */
export const STATES = [
  "AL", "AR", "CT", "DC", "DE", "FL", "GA", "IA", "IL", "IN", "KS", "KY",
  "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "NC", "NE", "NH", "NJ",
  "NY", "OH", "OK", "PA", "RI", "SC", "TN", "TX", "VA", "VT", "WI", "WV",
] as const;

export const FREIGHT_TYPES = [
  "Palletized freight",
  "Commercial goods",
  "Retail products",
  "Equipment",
  "General cargo",
  "Other",
] as const;

/** Nodos del mapa de cobertura. tier 1 = lane principal. */
export const VIRGINIA: [number, number] = [-77.46, 37.54];

export const HUBS = [
  // Nucleo: Noreste, Mid-Atlantic y Sureste.
  { name: "New York, NY", coords: [-74.01, 40.71], tier: 1 },
  { name: "Philadelphia, PA", coords: [-75.16, 39.95], tier: 1 },
  { name: "Baltimore, MD", coords: [-76.61, 39.29], tier: 1 },
  { name: "Pittsburgh, PA", coords: [-79.99, 40.44], tier: 1 },
  { name: "Charlotte, NC", coords: [-80.84, 35.23], tier: 1 },
  { name: "Atlanta, GA", coords: [-84.39, 33.75], tier: 1 },
  // Extendido: Nueva Inglaterra, Grandes Lagos, Medio Oeste y Sur.
  { name: "Boston, MA", coords: [-71.06, 42.36], tier: 2 },
  { name: "Cleveland, OH", coords: [-81.69, 41.5], tier: 2 },
  { name: "Detroit, MI", coords: [-83.05, 42.33], tier: 2 },
  { name: "Columbus, OH", coords: [-83.0, 39.96], tier: 2 },
  { name: "Indianapolis, IN", coords: [-86.16, 39.77], tier: 2 },
  { name: "Chicago, IL", coords: [-87.63, 41.88], tier: 2 },
  { name: "Minneapolis, MN", coords: [-93.27, 44.98], tier: 2 },
  { name: "St. Louis, MO", coords: [-90.2, 38.63], tier: 2 },
  { name: "Nashville, TN", coords: [-86.78, 36.16], tier: 2 },
  { name: "Memphis, TN", coords: [-90.05, 35.15], tier: 2 },
  { name: "Jacksonville, FL", coords: [-81.66, 30.33], tier: 2 },
  { name: "Dallas, TX", coords: [-96.8, 32.78], tier: 2 },
] satisfies { name: string; coords: [number, number]; tier: 1 | 2 }[];
