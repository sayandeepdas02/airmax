import type { ReactNode } from "react";
import { Rails } from "@/components/motion/Rails";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import styles from "./blog.module.css";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <Rails />
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
