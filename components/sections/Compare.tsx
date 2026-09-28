import { compare } from "@/lib/content";
import { Check, LogoMark, Pill } from "@/components/ui/primitives";
import { Cross, Partial } from "@/components/ui/icons";
import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import styles from "./Compare.module.css";

const LABEL = { yes: "Yes", no: "No", partial: "Partially" } as const;

function Mark({ v }: { v: keyof typeof LABEL }) {
  const icon = v === "yes" ? <Check size={22} /> : v === "partial" ? <Partial size={22} /> : <Cross size={22} />;
  return (
    <Item as="span" className={styles.mark} y={0} scale={0.5}>
      {icon}
      <span className="sr-only">{LABEL[v]}</span>
    </Item>
  );
}

export function Compare() {
  return (
    <section id="compare" className="section section--bb" aria-labelledby="compare-title">
      <span className="plus plus--l plus--b" />
      <span className="plus plus--r plus--b" />

      <div className={styles.container}>
        <div className="section-title">
          <Reveal y={16}>
            <Pill>{compare.pill}</Pill>
          </Reveal>
          <div className="section-title__heading">
            <Reveal as="h2" id="compare-title" className="t-h2" delay={0.08} blur>
              {compare.title}
            </Reveal>
            <Reveal as="p" className={`t-body-16 ${styles.lede}`} delay={0.16} y={16}>
              {compare.body}
            </Reveal>
          </div>
        </div>

        <Reveal className={styles.table} y={32} amount={0.15}>
          <Reveal className={styles.highlight} y={0} scale={0.96} delay={0.3} aria-hidden="true" />

          <div className={styles.head} role="presentation">
            <span />
            <span className={styles.them}>{compare.columns[0]}</span>
            <span className={styles.us}>
              <LogoMark size={18} />
              {compare.columns[1]}
            </span>
          </div>

          <Stagger as="ul" className={styles.rows} stagger={0.08} delay={0.2} amount={0.2}>
            {compare.rows.map((row) => (
              <Item as="li" key={row.label} className={styles.row} y={12}>
                <span className={styles.label}>{row.label}</span>
                <span className={styles.cell}>
                  <span className="sr-only">{compare.columns[0]}: </span>
                  <Mark v={row.them} />
                </span>
                <span className={`${styles.cell} ${styles.cellUs}`}>
                  <span className="sr-only">{compare.columns[1]}: </span>
                  <Mark v={row.us} />
                </span>
              </Item>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
