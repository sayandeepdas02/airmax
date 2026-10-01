import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { site } from "@/lib/content";
import { SvgDefs } from "@/components/ui/primitives";
import { MotionProvider } from "@/components/motion/Motion";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "AirMax | AEO Agency for Startups: Get Cited by AI";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  keywords: [
    "AEO agency for startups",
    "AEO agency",
    "SEO agency for startups",
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
      slogan: "AEO visibility for ambitious startups.",
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
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrument.variable} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site guide" />
      </head>
      <body>
        <SvgDefs />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
