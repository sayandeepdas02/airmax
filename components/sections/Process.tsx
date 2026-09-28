import { process } from "@/lib/content";
import { Pill } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Motion";
import { ProcessSteps } from "./ProcessSteps";
import styles from "./Process.module.css";

export function Process() {
  return (
    <section id="process" className="section section--bb" aria-labelledby="process-title">
      <span className="plus plus--l plus--b" />
      <span className="plus plus--r plus--b" />

      <div className={styles.container}>
        <div className="section-title">
          <Reveal y={16}>
            <Pill>{process.pill}</Pill>
          </Reveal>
          <div className="section-title__heading">
            <Reveal as="h2" id="process-title" className="t-h2" delay={0.08} blur>
              {process.title}
            </Reveal>
            <Reveal as="p" className={`t-body-16 ${styles.lede}`} delay={0.16} y={16}>
              {process.body}
            </Reveal>
          </div>
        </div>

        <ProcessSteps steps={process.steps} />
      </div>
    </section>
  );
}
