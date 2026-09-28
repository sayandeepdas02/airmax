import { services } from "@/lib/content";
import { Check, Pill } from "@/components/ui/primitives";
import { ServiceIcon } from "@/components/ui/icons";
import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="services" className="section section--bt section--bb" aria-labelledby="services-title">
      <span className="plus plus--l plus--t" />
      <span className="plus plus--r plus--t" />
      <span className="plus plus--l plus--b" />
      <span className="plus plus--r plus--b" />

      <div className={styles.container}>
        <div className={`section-title ${styles.title}`}>
          <Reveal y={16}>
            <Pill>{services.pill}</Pill>
          </Reveal>
          <div className="section-title__heading">
            <Reveal as="h2" id="services-title" className="t-h2" delay={0.08} blur>
              {services.title}
            </Reveal>
            <Reveal as="p" className={`t-body-16 ${styles.lede}`} delay={0.16} y={16}>
              {services.body}
            </Reveal>
          </div>
        </div>

        <Stagger className={styles.cards} stagger={0.14} amount={0.15}>
          {services.cards.map((card) => (
            <SpotlightCard key={card.title} className={styles.card} glowClassName={styles.glow}>
              <span className={styles.frame} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <div className={styles.content}>
                <div className={styles.textWrap}>
                  <span className={styles.iconWrap}>
                    <ServiceIcon name={card.icon} />
                  </span>
                  <div className={styles.heading}>
                    <h3 className="t-body-20">{card.title}</h3>
                    <p className="t-body-16 muted">{card.body}</p>
                  </div>
                </div>
                <Stagger as="ul" className={styles.features} stagger={0.08} delay={0.35} amount={0.5}>
                  {card.features.map((f) => (
                    <Item as="li" key={f} x={-10} y={0}>
                      <Check />
                      <span className="t-body-16 muted">{f}</span>
                    </Item>
                  ))}
                </Stagger>
              </div>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
