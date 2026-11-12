import './PrivacyPolicyPage.css';

import React, { useMemo, useState } from 'react';
import { SEOHead, buildBreadcrumbSchema } from '../../components/seo';

import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

/**
 * SURFURIA — Privacy Policy Page
 *
 * Dedicated, architecturally styled privacy policy detailing data collection,
 * storage security, third-party processing, cookie management, and user rights
 * for Surfuria's architectural hardware, modular kitchens, and custom joinery.
 */
export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildBreadcrumbSchema([
          { name: 'Home', url: 'https://surfuria.com/' },
          { name: 'Privacy Policy', url: 'https://surfuria.com/privacy' },
        ]),
      ],
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const navItems = [
    { id: 'introduction', label: '1. Overview & Scope' },
    { id: 'information-collected', label: '2. Information We Collect' },
    { id: 'how-we-use-data', label: '3. How We Use Data' },
    { id: 'legal-basis', label: '4. Legal Bases' },
    { id: 'sharing-third-parties', label: '5. Sharing & Processors' },
    { id: 'cookies-tracking', label: '6. Cookies & Tracking' },
    { id: 'retention-security', label: '7. Retention & Security' },
    { id: 'your-rights', label: '8. Your Rights' },
    { id: 'children-privacy', label: '9. Minors’ Privacy' },
    { id: 'policy-updates', label: '10. Policy Updates' },
    { id: 'contact-dpo', label: '11. Contact & Controller' },
  ];

  return (
    <div className="sf-legal-page">
      <SEOHead
        title="Privacy Policy | Surfuria Architectural Hardware & Modular Kitchens"
        description="Surfuria's commitment to user privacy, transparent specification data collection, Brevo communications processing, and data security."
        canonicalUrl="https://surfuria.com/privacy"
        ogType="website"
        jsonLd={jsonLd}
      />
      {/* Editorial Header */}
      <header className="sf-legal-header">
        <div className="sf-legal-header__inner container--wide">
          <nav className="sf-legal-breadcrumbs" aria-label="Breadcrumb navigation">
            <Link to="/" className="sf-legal-breadcrumbs__link">Home</Link>
            <span className="sf-legal-breadcrumbs__sep" aria-hidden="true">/</span>
            <span className="sf-legal-breadcrumbs__current">Privacy Policy</span>
          </nav>

          <div className="sf-legal-badge">
            <span className="sf-legal-badge__dot" aria-hidden="true" />
            <span>LEGAL &amp; DATA PROTECTION</span>
          </div>

          <h1 className="sf-legal-title">Privacy Policy</h1>

          <div className="sf-legal-meta">
            <span className="sf-legal-meta__item">
              <strong>Effective Date:</strong> October 2026
            </span>
            <span className="sf-legal-meta__sep" aria-hidden="true">•</span>
            <span className="sf-legal-meta__item">
              <strong>Version:</strong> 2.4 (Architectural Hardware &amp; Modular Joinery)
            </span>
            <span className="sf-legal-meta__sep" aria-hidden="true">•</span>
            <span className="sf-legal-meta__item">
              <strong>Entity:</strong> Surfuria India
            </span>
          </div>

          <p className="sf-legal-summary">
            At Surfuria, we craft architectural hardware and modular kitchen environments with precision and
            discretion. This Privacy Policy outlines transparently how we collect, handle, safeguard, and respect
            your personal data across our digital catalogue, project consultation channels, and delivery touchpoints.
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="sf-legal-layout container--wide">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="sf-legal-sidebar" aria-label="Table of contents">
          <div className="sf-legal-sidebar__card">
            <h2 className="sf-legal-sidebar__title">Contents</h2>
            <nav className="sf-legal-sidebar__nav">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`sf-legal-sidebar__link ${
                    activeSection === item.id ? 'sf-legal-sidebar__link--active' : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="sf-legal-sidebar__help">
              <p className="sf-legal-sidebar__help-text">Have a specific question about your project data?</p>
              <Button to="/contact" variant="outline" className="sf-legal-sidebar__btn">
                Contact Data Team
              </Button>
            </div>
          </div>
        </aside>

        {/* Legal Text Body */}
        <main className="sf-legal-body" id="privacy-content">
          {/* Section 1 */}
          <section id="introduction" className="sf-legal-section">
            <span className="sf-legal-section__num">01</span>
            <h2 className="sf-legal-section__heading">Introduction &amp; Scope</h2>
            <div className="sf-legal-section__content">
              <p>
                Surfuria (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) designs, engineers, and supplies architectural
                fittings, precision drawer systems, concealed hinge mechanics, modular kitchens, and custom architectural joinery.
                We recognize that your architectural floor plans, residential specifications, and personal contact details deserve
                the highest standard of confidentiality.
              </p>
              <p>
                This Privacy Policy applies to all personal information submitted through our website (
                <code>surfuria.com</code> and related subdomains), our Vercel-hosted serverless endpoints, project specification
                enquiry forms, newsletter subscriptions, physical showroom appointments, and direct trade consultations.
              </p>
              <div className="sf-legal-callout">
                <h3 className="sf-legal-callout__title">Our Foundational Principle</h3>
                <p>
                  We treat personal data with the same uncompromising standard of craftsmanship as our hardware. We do not sell,
                  rent, or monetize client lists or project specifications under any circumstances.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="information-collected" className="sf-legal-section">
            <span className="sf-legal-section__num">02</span>
            <h2 className="sf-legal-section__heading">Information We Collect</h2>
            <div className="sf-legal-section__content">
              <p>
                We gather only the information strictly necessary to fulfill your enquiries, provide technical specification
                guidance, engineer custom kitchens, and maintain dependable commercial relationships:
              </p>

              <h3 className="sf-legal-subheading">A. Direct Inquiries &amp; Consultation Requests</h3>
              <p>When you contact us via our enquiry forms or WhatsApp channels, we collect:</p>
              <ul>
                <li><strong>Identification Details:</strong> Full name, professional title (e.g., Architect, Interior Designer, Contractor, Homeowner).</li>
                <li><strong>Contact Coordinates:</strong> Email address, mobile telephone number, and preferred communication method.</li>
                <li><strong>Project Context:</strong> Scope of project, site location, timeline expectations, and targeted hardware categories (e.g., modular kitchen carcase, pocket doors, wardrobe profiles).</li>
              </ul>

              <h3 className="sf-legal-subheading">B. Architectural Drawings &amp; Technical Submissions</h3>
              <p>
                For custom kitchen planning and architectural hardware schedules, you may provide CAD drawings, PDF floor plans,
                cabinet elevations, moodboards, or material finish selections. These files are treated as proprietary client assets
                and are stored in secure repositories accessible solely to our engineering and specification personnel.
              </p>

              <h3 className="sf-legal-subheading">C. Architectural Dispatch &amp; Newsletter Subscriptions</h3>
              <p>
                When you subscribe to our architectural newsletter, we collect your verified email address and subscription timestamp
                to send curated collection releases and technical whitepapers.
              </p>

              <h3 className="sf-legal-subheading">D. Technical Device &amp; Browsing Telemetry</h3>
              <p>
                As you navigate our digital catalogue, our hosting infrastructure automatically collects anonymized technical logs,
                including IP addresses, browser types, screen resolutions, referring URLs, and user journey interactions to optimize
                render performance and guard against malicious automated attacks.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="how-we-use-data" className="sf-legal-section">
            <span className="sf-legal-section__num">03</span>
            <h2 className="sf-legal-section__heading">How We Utilize Your Information</h2>
            <div className="sf-legal-section__content">
              <p>We process collected information exclusively for legitimate architectural and commercial purposes:</p>
              <div className="sf-legal-grid">
                <div className="sf-legal-grid__card">
                  <h4 className="sf-legal-grid__title">Project Engineering &amp; Quotations</h4>
                  <p>Calculating bills of materials, scheduling laser site measurements, generating 3D renders, and issuing detailed hardware estimates.</p>
                </div>
                <div className="sf-legal-grid__card">
                  <h4 className="sf-legal-grid__title">Manufacturing &amp; Logistics</h4>
                  <p>Coordinating bespoke factory fabrication, quality inspection, freight delivery, and white-glove site installation.</p>
                </div>
                <div className="sf-legal-grid__card">
                  <h4 className="sf-legal-grid__title">Responsive Support</h4>
                  <p>Answering specification questions within our target response commitment and providing warranty servicing over the lifespan of our mechanisms.</p>
                </div>
                <div className="sf-legal-grid__card">
                  <h4 className="sf-legal-grid__title">Editorial Dispatches</h4>
                  <p>Sending new finish catalogues and engineering updates to opted-in subscribers, with an instant one-click unsubscribe mechanism in every email.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="legal-basis" className="sf-legal-section">
            <span className="sf-legal-section__num">04</span>
            <h2 className="sf-legal-section__heading">Legal Bases for Processing</h2>
            <div className="sf-legal-section__content">
              <p>In accordance with applicable international data privacy standards and data protection legislation, we process your information under the following legal frameworks:</p>
              <ul>
                <li><strong>Contractual Performance:</strong> Processing required to prepare estimates, supply manufactured hardware, deliver kitchen cabinetry, or honor warranties.</li>
                <li><strong>Legitimate Interests:</strong> Improving catalogue performance, preventing fraudulent spam, and communicating with registered trade specifiers.</li>
                <li><strong>Explicit Consent:</strong> Voluntary opt-in for our architectural newsletters, marketing dispatches, or optional cookies.</li>
                <li><strong>Statutory Compliance:</strong> Retaining financial transaction records, invoices, and tax documentation as required by law.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sharing-third-parties" className="sf-legal-section">
            <span className="sf-legal-section__num">05</span>
            <h2 className="sf-legal-section__heading">Information Sharing &amp; Third-Party Processors</h2>
            <div className="sf-legal-section__content">
              <p>
                <strong>We never sell, trade, or rent personal information to data brokers or advertising exchanges.</strong>
              </p>
              <p>
                To provide high-reliability digital services and physical order fulfillment, we partner with vetted third-party service providers bound by strict data processing and non-disclosure agreements:
              </p>
              <ul>
                <li><strong>Brevo (Sendinblue SAS):</strong> Transactional email delivery and newsletter dispatch infrastructure. Brevo operates under strict data security protocols to transmit client enquiries and notifications securely.</li>
                <li><strong>Vercel Inc.:</strong> Cloud hosting and edge serverless computation provider powering our website infrastructure and serverless API endpoints.</li>
                <li><strong>Logistics &amp; White-Glove Couriers:</strong> Trusted regional and national freight carriers strictly for the physical transport of hardware and kitchen carcases to your designated project site.</li>
                <li><strong>Regulatory Authorities:</strong> We may disclose information only if required by a court subpoena, search warrant, or mandatory statutory regulation.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="cookies-tracking" className="sf-legal-section">
            <span className="sf-legal-section__num">06</span>
            <h2 className="sf-legal-section__heading">Cookies &amp; Tracking Technologies</h2>
            <div className="sf-legal-section__content">
              <p>
                Our digital platform utilizes lightweight cookies and local browser storage to provide a seamless browsing experience:
              </p>
              <ul>
                <li><strong>Strictly Necessary Cookies:</strong> Required for fundamental website routing, secure form submission tokens, and session maintenance.</li>
                <li><strong>Functional Cookies:</strong> Remember client interface preferences, such as previously viewed kitchen configurations or active drawer filters.</li>
                <li><strong>Performance Telemetry:</strong> Aggregated, non-personally identifiable metrics on page load times, device types, and bounce rates to optimize asset delivery.</li>
              </ul>
              <p>
                You may disable or clear cookies at any time through your browser settings. Doing so will not prevent you from browsing our collections or submitting project enquiries.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="retention-security" className="sf-legal-section">
            <span className="sf-legal-section__num">07</span>
            <h2 className="sf-legal-section__heading">Data Retention &amp; Security Architecture</h2>
            <div className="sf-legal-section__content">
              <p>
                We employ layered architectural security to protect your confidential information against unauthorized access, loss, or alteration:
              </p>
              <ul>
                <li><strong>Encryption in Transit:</strong> All HTTP traffic between your browser and our edge servers is encrypted using modern TLS 1.3 / SSL protocols.</li>
                <li><strong>Restricted Access Controls:</strong> Access to customer enquiry records is restricted to authorized project consultants with multi-factor authentication.</li>
                <li><strong>API Key Isolation:</strong> All sensitive credentials (such as Brevo API keys) reside exclusively in secure server-side environment variables and are never exposed to browser clients.</li>
              </ul>
              <h3 className="sf-legal-subheading">Retention Guidelines</h3>
              <p>
                Project enquiries and specification records are retained for the active lifecycle of your architectural project and the subsequent product warranty period (up to 10 years for structural hardware). Newsletter email addresses are retained until you request removal or unsubscribe.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="your-rights" className="sf-legal-section">
            <span className="sf-legal-section__num">08</span>
            <h2 className="sf-legal-section__heading">Your Rights &amp; Choices</h2>
            <div className="sf-legal-section__content">
              <p>Regardless of your geographic location, we extend full respect to your digital privacy rights:</p>
              <ul>
                <li><strong>Right of Access:</strong> You may request a copy of the personal data and architectural records we hold concerning you.</li>
                <li><strong>Right to Rectification:</strong> You may request corrections to any inaccurate, outdated, or incomplete contact details.</li>
                <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You may request the deletion of your personal information, subject to statutory tax and warranty record-keeping obligations.</li>
                <li><strong>Right to Withdraw Consent:</strong> You may unsubscribe from our architectural dispatches at any time via the link located in each email footer.</li>
                <li><strong>Right to Data Portability:</strong> You may request your project CAD specifications and submission history in a standard structured format.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact our data team at{' '}
                <a href="mailto:info@surfuria.com" className="sf-legal-inline-link">info@surfuria.com</a> or submit a request via our{' '}
                <Link to="/contact" className="sf-legal-inline-link">Contact Us</Link> page.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="children-privacy" className="sf-legal-section">
            <span className="sf-legal-section__num">09</span>
            <h2 className="sf-legal-section__heading">Minors’ Privacy Protection</h2>
            <div className="sf-legal-section__content">
              <p>
                Surfuria&rsquo;s architectural products, specification tools, and commercial quotations are intended exclusively for trade professionals, architects, designers, and adult property owners (18 years of age or older). We do not knowingly solicit or collect personal information from individuals under the age of 18. If you believe a minor has submitted information to us, please notify us immediately for prompt deletion.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="policy-updates" className="sf-legal-section">
            <span className="sf-legal-section__num">10</span>
            <h2 className="sf-legal-section__heading">Changes to This Privacy Policy</h2>
            <div className="sf-legal-section__content">
              <p>
                As our architectural collections grow and legal frameworks evolve, we may update this Privacy Policy from time to time. Any material changes will be announced on this page with an updated &ldquo;Effective Date&rdquo; timestamp. We encourage you to review this page periodically to remain informed about our privacy practices.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="contact-dpo" className="sf-legal-section">
            <span className="sf-legal-section__num">11</span>
            <h2 className="sf-legal-section__heading">Contact &amp; Data Controller</h2>
            <div className="sf-legal-section__content">
              <p>
                The data controller responsible for the processing of your personal data under this policy is:
              </p>
              <div className="sf-legal-card">
                <h4 className="sf-legal-card__title">Surfuria Architectural Hardware</h4>
                <p className="sf-legal-card__line">Attn: Privacy &amp; Data Governance</p>
                <p className="sf-legal-card__line">Email: <a href="mailto:info@surfuria.com" className="sf-legal-inline-link">info@surfuria.com</a></p>
                <p className="sf-legal-card__line">General Enquiries: <a href="mailto:info@surfuria.com" className="sf-legal-inline-link">info@surfuria.com</a></p>
                <p className="sf-legal-card__line">Official Website: <a href="https://surfuria.com" className="sf-legal-inline-link">surfuria.com</a></p>
              </div>
            </div>
          </section>

          {/* Editorial Bottom Consultation Card */}
          <div className="sf-legal-cta">
            <div className="sf-legal-cta__content">
              <span className="sf-legal-cta__tag">SPECIFICATION &amp; PRIVACY</span>
              <h3 className="sf-legal-cta__title">Ready to discuss your architectural project?</h3>
              <p className="sf-legal-cta__desc">
                Our specification consultants are available to review floor plans, prepare finish samples, and assist with your hardware schedule under complete confidentiality.
              </p>
            </div>
            <div className="sf-legal-cta__actions">
              <Button to="/contact" variant="bronze">
                Discuss Your Project →
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

