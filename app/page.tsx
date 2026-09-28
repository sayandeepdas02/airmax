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

export default function Home() {
  return (
    <div className="page">
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
