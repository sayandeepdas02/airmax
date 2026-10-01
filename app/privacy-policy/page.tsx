import type { Metadata } from "next";
import { site } from "@/lib/content";
import { JsonLd, Shell, fmtDate } from "@/components/blog/Shell";
import styles from "@/components/blog/blog.module.css";

const title = "Privacy Policy | AirMax";
const description = `How ${site.name} collects, uses and protects personal data when you visit ${site.url}, join our newsletter or book a free AEO audit.`;
const updated = "2026-10-02";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { type: "website", url: "/privacy-policy", siteName: site.name, title, description },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${site.url}/privacy-policy#page`, url: `${site.url}/privacy-policy`, name: title, description, dateModified: updated, isPartOf: { "@id": `${site.url}/#website` } },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${site.url}/privacy-policy` },
        ],
      },
    ],
  };

  return (
    <Shell>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb">
        <ol className={styles.crumbs}>
          <li>
            <a href="/">Home</a>
          </li>
          <li aria-current="page">Privacy Policy</li>
        </ol>
      </nav>

      <article style={{ maxWidth: 820 }}>
        <header className={styles.postHead}>
          <h1>Privacy Policy</h1>
          <p className={styles.lede}>
            Last updated <time dateTime={updated}>{fmtDate(updated)}</time>
          </p>
        </header>

        <div className={styles.prose}>
          <p>
            This policy explains what personal data {site.name} (“{site.name}”, “we”, “us”) collects when you use{" "}
            <a href="/">{site.url.replace("https://", "")}</a>, and what we do with it. We keep it short and plain on
            purpose. If anything is unclear, email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2 id="data-we-collect">Data we collect</h2>
          <ul>
            <li>
              <strong>Information you give us.</strong> If you subscribe to our newsletter we collect your email address.
              If you email us we collect your name, email address and whatever you choose to tell us.
            </li>
            <li>
              <strong>Booking details.</strong> When you book a free AEO audit, the booking is handled by Calendly. They
              collect your name, email address, any answers you provide and scheduling details, and share them with us
              so we can run the call.
            </li>
            <li>
              <strong>Technical data.</strong> Like most websites, our hosting provider may log your IP address, browser
              type, device, pages requested and timestamps for security and reliability.
            </li>
          </ul>

          <h2 id="how-we-use-data">How we use your data</h2>
          <ul>
            <li>To run your audit call and follow up on it.</li>
            <li>To send the newsletter you asked for. You can unsubscribe at any time.</li>
            <li>To answer your messages and requests.</li>
            <li>To keep the site secure, fix problems and understand how it is used.</li>
            <li>To meet legal obligations.</li>
          </ul>
          <p>We do not sell your personal data, and we do not use it for automated decisions that significantly affect you.</p>

          <h2 id="legal-bases">Legal bases (UK and EU visitors)</h2>
          <p>
            We rely on your <strong>consent</strong> for the newsletter, on <strong>steps taken at your request</strong>{" "}
            when you book an audit or contact us, on our <strong>legitimate interests</strong> in running and securing
            the site, and on <strong>legal obligation</strong> where the law requires us to keep records.
          </p>

          <h2 id="sharing">Who we share data with</h2>
          <p>
            We share data only with service providers that help us operate: scheduling (Calendly), email and
            newsletter delivery, website hosting and email hosting. They may process data only on our instructions and
            under their own privacy terms. We may also disclose data if the law requires it. Some providers are based
            outside your country, so your data may be transferred internationally with appropriate safeguards.
          </p>

          <h2 id="cookies">Cookies and analytics</h2>
          <p>
            This site does not set advertising cookies. If we add analytics or similar tools in future, we will update
            this policy and ask for consent where the law requires it. Calendly and other third-party pages you visit
            through our links have their own cookie policies.
          </p>

          <h2 id="retention">How long we keep data</h2>
          <p>
            We keep newsletter details until you unsubscribe, and enquiry and booking details for as long as needed to
            handle your request and for a reasonable period afterwards, normally no more than 24 months, unless we
            work together or the law requires us to keep them longer.
          </p>

          <h2 id="your-rights">Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct or delete your personal data, to
            object to or restrict how we use it, to withdraw consent, to receive a copy of your data, and to complain to
            your data protection authority. California residents may also ask what we collect and request deletion. We
            do not sell or share personal data for cross-context advertising. To use any of these rights, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will reply within 30 days.
          </p>

          <h2 id="security">Security</h2>
          <p>
            We use reasonable technical and organisational measures, including encrypted connections (HTTPS) and
            access controls. No system is perfectly secure, so we cannot guarantee absolute security.
          </p>

          <h2 id="children">Children</h2>
          <p>Our services are aimed at businesses. We do not knowingly collect data from anyone under 16.</p>

          <h2 id="changes">Changes to this policy</h2>
          <p>
            If we change this policy we will update the date above, and for significant changes we will tell you in a
            clear way, for example by email if you are a subscriber.
          </p>

          <h2 id="contact">Contact us</h2>
          <p>
            Questions or requests: <a href={`mailto:${site.email}`}>{site.email}</a>. To discuss your AEO visibility
            instead, you can <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">{site.auditLabel}</a>.
          </p>
        </div>
      </article>
    </Shell>
  );
}
