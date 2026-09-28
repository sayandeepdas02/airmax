import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { faq, site } from "@/lib/content";
import { SvgDefs } from "@/components/ui/primitives";
import { MotionProvider } from "@/components/motion/Motion";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "AirMax — SEO & AEO agency for startups";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  keywords: [
    "SEO agency for startups",
    "AEO agency",
    "answer engine optimization",
    "generative engine optimization",
    "AI search optimization",
    "ChatGPT SEO",
    "Perplexity SEO",
    "Google AI Overviews",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060e0e",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      areaServed: "Worldwide",
      knowsAbout: [
        "Search engine optimization",
        "Answer engine optimization",
        "Generative engine optimization",
        "Technical SEO",
        "Content strategy",
        "Digital PR",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrument.variable} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SvgDefs />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
