import type { CSSProperties } from "react";
import { hero } from "@/lib/content";
import { Check } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Interactive";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Item, Reveal, SplitWords, Stagger } from "@/components/motion/Motion";
import { HeroVisual } from "./HeroVisual";
import { Dashboard } from "./Dashboard";
import styles from "./Hero.module.css";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export function Hero() {
  const title = `${hero.titleBefore} ${hero.titleAccent} ${hero.titleAfter}`;

  return (
    <section className={`${styles.hero} section--bb`} aria-labelledby="hero-title">
      <GridBackdrop variant="hero" spotlight />
      <span className="plus plus--l" style={{ top: 70, "--plus-bg": "#0a281f" } as Vars} />
      <span className="plus plus--r" style={{ top: 70, "--plus-bg": "#0a281f" } as Vars} />
      <span className="plus plus--l plus--b" />
      <span className="plus plus--r plus--b" />

      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <div className={styles.content}>
            <div className={styles.heading}>
              <div className={styles.textWrap}>
                <h1 id="hero-title" className={`t-h1 ${styles.title}`}>
                  <SplitWords
                    text={title}
                    accent={hero.titleAccent}
                    breakAfter={hero.titleBefore.split(" ").length - 1}
                    delay={0.25}
                    onLoad
                  />
                </h1>
                <Reveal as="p" className={`t-body-16 ${styles.body}`} y={16} delay={0.7} amount={0}>
                  {hero.body}
                </Reveal>
              </div>
            </div>

            <Reveal className={styles.ctaWrap} y={16} delay={0.85} amount={0}>
              <Button href={hero.cta.href} className={styles.cta} magnetic>
                {hero.cta.label}
              </Button>
            </Reveal>
          </div>

          <Stagger as="ul" className={styles.features} delay={1} stagger={0.1} amount={0}>
            {hero.features.map((f) => (
              <Item as="li" key={f} y={12}>
                <Check size={20} />
                <span className="t-body-16m">{f}</span>
              </Item>
            ))}
          </Stagger>
        </div>

        <HeroVisual>
          <Dashboard />
        </HeroVisual>
      </div>
    </section>
  );
}
