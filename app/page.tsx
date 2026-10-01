import { Rails } from "@/components/motion/Rails";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Engines } from "@/components/sections/Engines";
import { Services } from "@/components/sections/Services";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Benefits } from "@/components/sections/Benefits";
import { Compare } from "@/components/sections/Compare";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { faq } from "@/lib/content";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <div className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {/* Full-height dashed rails that frame every section */}
      <Rails />

      <Navbar />
      <main>
        <Hero />
        <Engines />
        <Services />
        <Capabilities />
        <Process />
        <Benefits />
        <Compare />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
