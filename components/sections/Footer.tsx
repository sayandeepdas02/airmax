import type { CSSProperties } from "react";
import { cta, footer, site } from "@/lib/content";
import { Logo, LogoMark } from "@/components/ui/primitives";
import { Button, RollLink } from "@/components/ui/Interactive";
import { SocialIcon } from "@/components/ui/icons";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { Float, SocialLink } from "@/components/motion/Micro";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./Footer.module.css";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const auditHref = `mailto:${site.email}?subject=${encodeURIComponent("Free AI visibility audit")}`;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <GridBackdrop variant="footer" />

      <div className={styles.container}>
        {/* ---------- CTA ---------- */}
        <section id="contact" className={styles.ctaWrap} aria-labelledby="cta-title">
          <Reveal className={styles.cta} y={40} scale={0.97} amount={0.3}>
            <span className={styles.ctaFrame} aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <div className={styles.ctaCard}>
              <GridBackdrop variant="cta" cell={52} spotlight />
              <div className={styles.ctaHeading}>
                <Float className={styles.ctaIcon}>
                  <LogoMark size={28} className={styles.ctaMark} />
                </Float>
                <div className={styles.ctaText}>
                  <Reveal as="h2" id="cta-title" className="t-h4" delay={0.15} blur>
                    {cta.title}
                  </Reveal>
                  <Reveal as="p" className="t-body-16" delay={0.25} y={20}>
                    {cta.body}
                  </Reveal>
                </div>
              </div>
              <Reveal className={styles.ctaButton} delay={0.35} y={18}>
                <Button href={auditHref} magnetic>
                  {cta.button.label}
                </Button>
              </Reveal>
            </div>
          </Reveal>
        </section>

        {/* ---------- Footer main ---------- */}
        <div className={styles.main}>
          <span className="plus plus--l plus--t" style={{ "--plus-bg": "#0b1919" } as Vars} />
          <span className="plus plus--r plus--t" style={{ "--plus-bg": "#0b1919" } as Vars} />
          <span className="plus plus--l plus--b" style={{ "--plus-bg": "#08211b" } as Vars} />
          <span className="plus plus--r plus--b" style={{ "--plus-bg": "#08211b" } as Vars} />

          <Stagger className={styles.content} stagger={0.08} amount={0.25}>
            <Item className={styles.brand} y={32}>
              <Logo />
              <p className="t-body-16 muted">{footer.blurb}</p>
              <NewsletterForm />
            </Item>

            <div className={styles.cols}>
              {footer.columns.map((col) => (
                <Item as="nav" key={col.title} className={styles.col} aria-label={col.title} y={32}>
                  <p className={`t-body-20 ${styles.colTitle}`}>{col.title}</p>
                  <ul className={styles.links}>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <RollLink href={l.href} text={l.label} className={styles.link} />
                      </li>
                    ))}
                  </ul>
                </Item>
              ))}

              <Item className={styles.col} y={32}>
                <p className={`t-body-20 ${styles.colTitle}`}>{footer.contact.title}</p>
                <div className={styles.contact}>
                  <ul className={styles.links}>
                    <li>
                      <RollLink href={`mailto:${footer.contact.email}`} text={footer.contact.email} className={styles.link} />
                    </li>
                    <li>
                      <RollLink href={footer.contact.call.href} text={footer.contact.call.label} className={styles.link} />
                    </li>
                  </ul>
                  <ul className={styles.social}>
                    {footer.social.map((s) => (
                      <li key={s.label}>
                        <SocialLink href={s.href} label={`AirMax on ${s.label}`}>
                          <SocialIcon name={s.icon} size={17} />
                        </SocialLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
            </div>
          </Stagger>

          <div className={styles.bottom}>
            <Reveal className={styles.bottomInner} y={12} amount={0}>
              <p className="t-body-16 muted">© {new Date().getFullYear()} AirMax. All rights reserved.</p>
              <ul className={styles.legal}>
                {footer.legal.map((l) => (
                  <li key={l.label}>
                    <RollLink href={l.href} text={l.label} className={styles.link} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </footer>
  );
}
