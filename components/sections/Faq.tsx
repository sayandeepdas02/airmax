import { faq } from "@/lib/content";
import { Pill } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Interactive";
import { Reveal } from "@/components/motion/Motion";
import { Accordion } from "./Accordion";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section id="faq" className="section section--bb" aria-labelledby="faq-title">
      <span className="plus plus--l plus--b" />
      <span className="plus plus--r plus--b" />

      <div className={styles.container}>
        <div className={styles.intro}>
          <Reveal y={16}>
            <Pill>{faq.pill}</Pill>
          </Reveal>
          <Reveal as="h2" id="faq-title" className={`t-h2 ${styles.title}`} delay={0.08} blur>
            {faq.title}
          </Reveal>
          <Reveal as="p" className="t-body-16 muted" delay={0.16} y={16}>
            {faq.body}
          </Reveal>

          <Reveal className={styles.aside} delay={0.26} y={24}>
            <span className={styles.asideGlow} aria-hidden="true" />
            <p className={styles.asideTitle}>{faq.aside.title}</p>
            <p className="t-body-16 muted">{faq.aside.body}</p>
            <Button href="#contact" size="small">
              {faq.aside.cta}
            </Button>
          </Reveal>
        </div>

        <Accordion items={faq.items} />
      </div>
    </section>
  );
}
