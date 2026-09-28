import { capabilities } from "@/lib/content";
import { Pill } from "@/components/ui/primitives";
import { Reveal, Stagger } from "@/components/motion/Motion";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { AnswerDemo, MentionsDemo, SchemaDemo, SerpDemo, VitalsDemo } from "./CapabilityVisuals";
import styles from "./Capabilities.module.css";

const { tiles } = capabilities;

const TILES = [
  { key: "answer", tile: tiles.answer, Visual: AnswerDemo, className: styles.wide },
  { key: "technical", tile: tiles.technical, Visual: VitalsDemo },
  { key: "schema", tile: tiles.schema, Visual: SchemaDemo },
  { key: "content", tile: tiles.content, Visual: SerpDemo },
  { key: "pr", tile: tiles.pr, Visual: MentionsDemo },
] as const;

export function Capabilities() {
  return (
    <section id="capabilities" className="section section--bb" aria-labelledby="capabilities-title">
      <span className="plus plus--l plus--b" />
      <span className="plus plus--r plus--b" />

      <div className={styles.container}>
        <div className="section-title">
          <Reveal y={16}>
            <Pill>{capabilities.pill}</Pill>
          </Reveal>
          <div className="section-title__heading">
            <Reveal as="h2" id="capabilities-title" className="t-h2" delay={0.08} blur>
              {capabilities.title}
            </Reveal>
            <Reveal as="p" className={`t-body-16 ${styles.lede}`} delay={0.16} y={16}>
              {capabilities.body}
            </Reveal>
          </div>
        </div>

        <Stagger className={styles.bento} stagger={0.1} amount={0.1}>
          {TILES.map(({ key, tile, Visual, ...rest }) => (
            <SpotlightCard
              key={key}
              className={`${styles.tile} ${"className" in rest ? rest.className : ""}`}
              glowClassName={styles.glow}
              lift={4}
              size={420}
            >
              <div className={styles.visual}>
                <Visual />
              </div>
              <div className={styles.copy}>
                <h3 className="t-body-20">{tile.title}</h3>
                <p className="t-body-16 muted">{tile.body}</p>
              </div>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
