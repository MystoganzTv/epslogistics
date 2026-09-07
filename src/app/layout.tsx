import type { Metadata } from "next";
import { Archivo, Manrope, Caveat } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Virginia Freight & Box Truck Transportation`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Virginia Freight & Box Truck Transportation`,
    description: `${site.headline} ${site.shortDescription}`,
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Virginia Freight & Box Truck Transportation`,
    description: `${site.headline} ${site.shortDescription}`,
    images: ["/og.png"],
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

/** Schema.org — el carrier, su autoridad y el area que sirve. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  description:
    "Virginia-based, owner-operated box truck carrier running under its own USDOT and MC authority. Local and regional delivery, dedicated routes and long-distance freight moving outbound from and inbound to Virginia across the Mid-Atlantic, Midwest and Southern United States. A carrier, not a broker or dispatch service.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "VA",
    addressCountry: "US",
  },
  identifier: [
    { "@type": "PropertyValue", name: "USDOT", value: site.usdot },
    { "@type": "PropertyValue", name: "MC", value: site.mc },
  ],
  areaServed: [
    { "@type": "State", name: "Virginia" },
    { "@type": "Place", name: "Mid-Atlantic United States" },
    { "@type": "Place", name: "Southern United States" },
    { "@type": "Place", name: "Midwest United States" },
    { "@type": "Place", name: "Central United States" },
  ],
  knowsAbout: [
    "box truck freight",
    "regional freight transportation",
    "dedicated freight routes",
    "last-mile business delivery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
