export const site = {
  name: "EPS Logistics",
  tagline: "Delivering Opportunities Every Mile",
  description:
    "Full-service freight and logistics. Dry van, reefer and flatbed capacity across the continental U.S., with real-time visibility from pickup to delivery.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "",
  email: "",
  address: "",
  nav: [
    { href: "/services", label: "Services" },
    { href: "/coverage", label: "Coverage" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
