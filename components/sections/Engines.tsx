import { engines } from "@/lib/content";
import { EngineGlyph } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Motion";
import { Ticker } from "@/components/motion/Ticker";
import styles from "./Engines.module.css";

export function Engines() {
  return (
    <section className={styles.section} aria-labelledby="engines-title">
      <div className={styles.container}>
        <Reveal as="h2" id="engines-title" className={`t-body-20 ${styles.title}`} y={16}>
          {engines.title}
        </Reveal>
        <Reveal y={0} delay={0.15}>
          <Ticker className={styles.ticker} trackClassName={styles.track}>
            <ul className={styles.set}>
              {engines.items.map((e) => (
                <li key={e.name} className={styles.item}>
                  <EngineGlyph name={e.glyph} size={22} />
                  <span>{e.name}</span>
                </li>
              ))}
            </ul>
          </Ticker>
        </Reveal>
      </div>
    </section>
  );
}
