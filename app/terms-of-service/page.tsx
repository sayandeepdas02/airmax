import type { Metadata } from "next";
import { site } from "@/lib/content";
import { JsonLd, Shell, fmtDate } from "@/components/blog/Shell";
import styles from "@/components/blog/blog.module.css";

const title = "Terms of Service | AirMax";
const description = `The terms that apply when you use ${site.url} or engage ${site.name} for answer engine optimization (AEO) and SEO services.`;
const updated = "2026-10-02";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms-of-service" },
  openGraph: { type: "website", url: "/terms-of-service", siteName: site.name, title, description },
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${site.url}/terms-of-service#page`, url: `${site.url}/terms-of-service`, name: title, description, dateModified: updated, isPartOf: { "@id": `${site.url}/#website` } },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${site.url}/terms-of-service` },
        ],
      },
    ],
  };
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <Shell>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb">
        <ol className={styles.crumbs}>
          <li>
            <a href="/">Home</a>
          </li>
          <li aria-current="page">Terms of Service</li>
        </ol>
      </nav>

      <article style={{ maxWidth: 820 }}>
        <header className={styles.postHead}>
          <h1>Terms of Service</h1>
          <p className={styles.lede}>
            Last updated <time dateTime={updated}>{fmtDate(updated)}</time>
          </p>
        </header>

        <div className={styles.prose}>
          <p>
            These terms apply when you visit <a href="/">{site.url.replace("https://", "")}</a> (the “Site”) or book a
            call with {site.name} (“{site.name}”, “we”, “us”). By using the Site you agree to them. If you hire us for
            services, the written proposal or agreement we sign with you applies as well, and if it conflicts with these
            terms, that agreement wins.
          </p>

          <h2 id="what-we-do">What we do</h2>
          <p>
            {site.name} is an answer engine optimization (AEO) and SEO agency for startups. We audit, plan and carry out
            work to improve how your brand appears in search results and in AI-generated answers. The Site and our blog
            provide general information, not legal, financial or investment advice.
          </p>

          <h2 id="free-audit">Free AEO audit</h2>
          <p>
            The free AEO audit is a 30-minute introductory call booked through Calendly. It carries no obligation to buy.
            We may stop offering it, or decline a booking, at any time. Our observations on the call reflect the
            information available to us then, and AI engines change often.
          </p>

          <h2 id="no-guarantees">No guaranteed results</h2>
          <p>
            Search engines and AI systems are run by third parties, and we do not control them. We commit to the work we
            agree to do, to clear reporting and to honest advice. We do not guarantee any ranking, citation, mention,
            traffic level or revenue outcome, and any figures or examples on the Site are illustrative, not promises.
          </p>

          <h2 id="paid-services">Paid services</h2>
          <ul>
            <li>Scope, deliverables, fees, billing schedule and term are set out in a written proposal or agreement.</li>
            <li>Unless that agreement says otherwise, invoices are due within 14 days, and late amounts may be suspended or charged interest as allowed by law.</li>
            <li>You agree to give us the access, information and approvals we reasonably need. Delays on your side can move timelines.</li>
            <li>Either party can end an engagement with written notice as set out in the agreement. You pay for work done up to the end date.</li>
          </ul>

          <h2 id="your-content">Your content and access</h2>
          <p>
            You keep ownership of your brand, website content and data. You give us permission to use them to deliver the
            services. You confirm you have the rights to anything you provide. We keep your non-public business
            information confidential and use it only for your engagement.
          </p>

          <h2 id="our-content">Our content</h2>
          <p>
            The Site, including text, blog posts, graphics and code, belongs to {site.name} or its licensors and is
            protected by copyright. You may read it, share links to it and quote short excerpts with attribution and a
            link back. You may not copy it wholesale, republish it or use it to build a competing product without our
            written permission. Unless an agreement says otherwise, deliverables we create for you become yours once
            you have paid for them, except for our pre-existing tools, templates and methods, which we keep.
          </p>

          <h2 id="acceptable-use">Acceptable use</h2>
          <p>
            Do not misuse the Site. That includes trying to break or overload it, probing it for vulnerabilities without
            permission, scraping it in ways that disrupt it, or using it to break the law or infringe someone’s rights.
            Search and AI crawlers that follow our <a href="/robots.txt">robots.txt</a> are welcome.
          </p>

          <h2 id="third-party">Third-party links and services</h2>
          <p>
            The Site links to third parties such as Calendly. We do not control them and are not responsible for their
            content or practices. Their own terms and privacy policies apply when you use them. See our{" "}
            <a href="/privacy-policy">Privacy Policy</a> for how we handle personal data.
          </p>

          <h2 id="disclaimers">Disclaimers</h2>
          <p>
            The Site and its content are provided “as is” and “as available”. To the fullest extent allowed by law we
            disclaim all warranties, including fitness for a particular purpose and accuracy or completeness of content.
          </p>

          <h2 id="liability">Limitation of liability</h2>
          <p>
            To the fullest extent allowed by law, {site.name} is not liable for indirect, incidental, special or
            consequential losses, or for lost profits, revenue, data or goodwill, arising from your use of the Site or
            our services. Our total liability for any claim relating to paid services is limited to the fees you paid us
            for those services in the three months before the claim arose. Nothing in these terms limits liability that
            cannot be limited by law, such as for fraud or for death or personal injury caused by negligence.
          </p>

          <h2 id="law">Governing law</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which {site.name} is registered, and the courts
            there have jurisdiction, unless mandatory consumer law in your country says otherwise.
          </p>

          <h2 id="changes">Changes</h2>
          <p>
            We may update these terms. The date above shows the latest version, and continuing to use the Site after a
            change means you accept it.
          </p>

          <h2 id="contact">Contact</h2>
          <p>Questions about these terms: {mail}.</p>
        </div>
      </article>
    </Shell>
  );
}
