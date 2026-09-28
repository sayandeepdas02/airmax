import { benefits } from "@/lib/content";
import { Pill } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Motion";
import { Timeline } from "./Timeline";
import styles from "./Benefits.module.css";

export function Benefits() {
  return (
    <section id="why-airmax" className="section section--bb" aria-labelledby="benefits-title">
      <span className="plus plus--l plus--b" />
      <span className="plus plus--r plus--b" />

      <div className={styles.container}>
        <div className="section-title">
          <Reveal y={16}>
            <Pill>{benefits.pill}</Pill>
          </Reveal>
          <div className="section-title__heading">
            <Reveal as="h2" id="benefits-title" className="t-h2" delay={0.08} blur>
              {benefits.title}
            </Reveal>
            <Reveal as="p" className={`t-body-16 ${styles.lede}`} delay={0.16} y={16}>
              {benefits.body}
            </Reveal>
          </div>
        </div>

        <Timeline items={benefits.items} />
      </div>
    </section>
  );
}
