import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { SEOHead, buildBreadcrumbSchema } from '../../components/seo';
import './TermsPage.css';

/**
 * SURFURIA — Terms & Conditions Page
 *
 * Comprehensive commercial, architectural, fabrication, delivery, and warranty
 * terms governing product specifications, quotations, modular kitchen cabinetry,
 * and online catalogue usage for Surfuria.
 */
export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('agreement-acceptance');

  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildBreadcrumbSchema([
          { name: 'Home', url: 'https://surfuria.com/' },
          { name: 'Terms & Conditions', url: 'https://surfuria.com/terms' },
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
    { id: 'agreement-acceptance', label: '1. Acceptance of Terms' },
    { id: 'scope-services', label: '2. Scope & Catalog' },
    { id: 'intellectual-property', label: '3. Intellectual Property' },
    { id: 'material-tolerances', label: '4. Finishes & Natural Materials' },
    { id: 'quotations-pricing', label: '5. Estimates & Quotations' },
    { id: 'orders-fabrication', label: '6. Orders & Custom Fabrication' },
    { id: 'delivery-logistics', label: '7. Delivery & Site Readiness' },
    { id: 'warranties-guarantees', label: '8. Warranties & Guarantees' },
    { id: 'limitation-liability', label: '9. Limitation of Liability' },
    { id: 'prohibited-conduct', label: '10. Acceptable Website Use' },
    { id: 'governing-law', label: '11. Governing Law & Disputes' },
    { id: 'modifications', label: '12. Amendments to Terms' },
    { id: 'contact-notices', label: '13. Legal Inquiries & Notices' },
  ];

  return (
    <div className="sf-terms-page">
      <SEOHead
        title="Terms & Conditions | Surfuria Architectural Hardware & Modular Kitchens"
        description="Commercial, architectural, fabrication, quotation, delivery, and warranty terms governing Surfuria furniture hardware and modular kitchen cabinetry."
        canonicalUrl="https://surfuria.com/terms"
        ogType="website"
        jsonLd={jsonLd}
      />
      {/* Editorial Header */}
      <header className="sf-terms-header">
        <div className="sf-terms-header__inner container--wide">
          <nav className="sf-terms-breadcrumbs" aria-label="Breadcrumb navigation">
            <Link to="/" className="sf-terms-breadcrumbs__link">Home</Link>
            <span className="sf-terms-breadcrumbs__sep" aria-hidden="true">/</span>
            <span className="sf-terms-breadcrumbs__current">Terms &amp; Conditions</span>
          </nav>

          <div className="sf-terms-badge">
            <span className="sf-terms-badge__dot" aria-hidden="true" />
            <span>LEGAL &amp; COMMERCIAL TERMS</span>
          </div>

          <h1 className="sf-terms-title">Terms &amp; Conditions</h1>

          <div className="sf-terms-meta">
            <span className="sf-terms-meta__item">
              <strong>Effective Date:</strong> October 2026
            </span>
            <span className="sf-terms-meta__sep" aria-hidden="true">•</span>
            <span className="sf-terms-meta__item">
              <strong>Version:</strong> 2.4 (Architectural Hardware &amp; Modular Joinery)
            </span>
            <span className="sf-terms-meta__sep" aria-hidden="true">•</span>
            <span className="sf-terms-meta__item">
              <strong>Jurisdiction:</strong> India
            </span>
          </div>

          <p className="sf-terms-summary">
            These Terms &amp; Conditions govern your interaction with Surfuria&rsquo;s digital catalog, specification tools,
            formal project quotations, bespoke fabrication services, modular kitchen deliveries, and warranty commitments.
            Please review these terms before specifying or ordering our architectural fittings.
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="sf-terms-layout container--wide">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="sf-terms-sidebar" aria-label="Table of contents">
          <div className="sf-terms-sidebar__card">
            <h2 className="sf-terms-sidebar__title">Contents</h2>
            <nav className="sf-terms-sidebar__nav">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`sf-terms-sidebar__link ${
                    activeSection === item.id ? 'sf-terms-sidebar__link--active' : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="sf-terms-sidebar__help">
              <p className="sf-terms-sidebar__help-text">Need trade specification assistance or custom terms?</p>
              <Button to="/contact" variant="outline" className="sf-terms-sidebar__btn">
                Contact Legal &amp; Trade
              </Button>
            </div>
          </div>
        </aside>

        {/* Terms Text Body */}
        <main className="sf-terms-body" id="terms-content">
          {/* Section 1 */}
          <section id="agreement-acceptance" className="sf-terms-section">
            <span className="sf-terms-section__num">01</span>
            <h2 className="sf-terms-section__heading">Acceptance of Terms &amp; Agreement</h2>
            <div className="sf-terms-section__content">
              <p>
                By accessing our website (<code>surfuria.com</code>), reviewing our digital catalogues, requesting product samples,
                submitting architectural drawings for estimation, or confirming a commercial purchase order, you (&ldquo;Client,&rdquo;
                &ldquo;Specifier,&rdquo; or &ldquo;User&rdquo;) agree to be legally bound by these Terms and Conditions.
              </p>
              <p>
                If you are acting on behalf of an architectural firm, interior design practice, construction enterprise, or developer,
                you represent and warrant that you hold the legal authority to bind that corporate entity to these terms.
              </p>
              <div className="sf-terms-callout">
                <h3 className="sf-terms-callout__title">Important Note for Trade Specifiers</h3>
                <p>
                  Formal project contracts, tender documents, or customized corporate supply agreements executed in writing by authorized
                  officers of Surfuria shall take precedence over these general terms in the event of an explicit conflict.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="scope-services" className="sf-terms-section">
            <span className="sf-terms-section__num">02</span>
            <h2 className="sf-terms-section__heading">Scope of Services &amp; Catalogue Overview</h2>
            <div className="sf-terms-section__content">
              <p>
                Surfuria provides architectural hardware solutions, precision concealed hinges, synchronised drawer runners,
                pocket sliding doors, modular kitchen cabinetry, and custom joinery fittings designed for residential, hospitality,
                and commercial environments.
              </p>
              <p>
                Our digital platforms serve as an architectural specification portal and project consultation gateway. Online displays
                do not constitute a binding unilateral offer to sell; all orders are subject to technical verification, site suitability
                reviews, and formal acceptance by our engineering team.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="intellectual-property" className="sf-terms-section">
            <span className="sf-terms-section__num">03</span>
            <h2 className="sf-terms-section__heading">Intellectual Property &amp; Permitted Use</h2>
            <div className="sf-terms-section__content">
              <p>
                All content published by Surfuria—including product photography, CAD drawings, dimensional schematics, 3D render assets,
                branding marks, product designations, and website design—is the exclusive intellectual property of Surfuria and protected
                by copyright, trademark, and industrial design legislation.
              </p>
              <h3 className="sf-terms-subheading">Permitted Professional Use</h3>
              <p>
                Architects, interior designers, and general contractors are granted a revocable, non-exclusive license to download CAD
                specifications and dimensional schedules solely for incorporation into architectural drawings, client moodboards, and
                project tenders specifying Surfuria hardware.
              </p>
              <h3 className="sf-terms-subheading">Restrictions</h3>
              <p>
                You may not reproduce, redistribute, reverse-engineer, scrape, mirror, or commercially exploit any proprietary content,
                hardware mechanical designs, or visual brand assets without prior written consent from Surfuria.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="material-tolerances" className="sf-terms-section">
            <span className="sf-terms-section__num">04</span>
            <h2 className="sf-terms-section__heading">Product Specifications, Finishes &amp; Natural Materials</h2>
            <div className="sf-terms-section__content">
              <p>
                We take immense pride in our artisanal finishes and precision engineering. However, due to the bespoke nature of
                architectural metals and natural substrates, the following tolerances apply:
              </p>
              <div className="sf-terms-grid">
                <div className="sf-terms-grid__card">
                  <h4 className="sf-terms-grid__title">Living Finishes &amp; Patina</h4>
                  <p>Unlacquered brass, burnished bronze, and hand-rubbed patinas naturally evolve, oxidize, and develop depth over time. Tonal variations between production batches are authentic hallmarks of artisanal metallurgy rather than manufacturing defects.</p>
                </div>
                <div className="sf-terms-grid__card">
                  <h4 className="sf-terms-grid__title">Natural Timber &amp; Stone Variations</h4>
                  <p>Natural wood veneers, fluted hardwoods, and sintered stone surfaces exhibit distinctive grain variations, mineral streaks, and knot patterns that cannot be identically replicated between different cabinet leaves.</p>
                </div>
                <div className="sf-terms-grid__card">
                  <h4 className="sf-terms-grid__title">Digital Display Calibration</h4>
                  <p>While our studio photographs accurately represent finish tones under calibrated architectural lighting, screen resolutions and device color profiles may display subtle variances from physical tactile swatches.</p>
                </div>
                <div className="sf-terms-grid__card">
                  <h4 className="sf-terms-grid__title">Continuous Engineering Enhancements</h4>
                  <p>Surfuria reserves the right to make minor mechanical refinements, dampen dampener viscosities, or enhance load ratings to improve product longevity without prior public notification.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="quotations-pricing" className="sf-terms-section">
            <span className="sf-terms-section__num">05</span>
            <h2 className="sf-terms-section__heading">Quotations, Pricing &amp; Laser Site Measurements</h2>
            <div className="sf-terms-section__content">
              <p>
                Pricing published on our digital portal or communicated informally represents baseline indicative pricing for standard
                specifications.
              </p>
              <ul>
                <li><strong>Quotation Validity:</strong> Formal, itemized project quotations issued by Surfuria remain valid for thirty (30) calendar days from the date of issuance, after which they are subject to review based on prevailing raw material indices.</li>
                <li><strong>Laser Site Verification:</strong> All custom modular kitchen quotations are contingent upon an on-site laser dimension verification conducted by a certified Surfuria technician or certified partner prior to production sign-off.</li>
                <li><strong>Taxes &amp; Levies:</strong> Unless explicitly noted otherwise, quoted prices exclude applicable Goods and Services Tax (GST), state levies, custom crating fees, and destination freight charges.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="orders-fabrication" className="sf-terms-section">
            <span className="sf-terms-section__num">06</span>
            <h2 className="sf-terms-section__heading">Orders, Custom Fabrication &amp; Payment Milestones</h2>
            <div className="sf-terms-section__content">
              <p>
                Given that modular kitchens, custom wardrobe profiles, and bespoke handles are engineered specifically to order, the
                following commercial terms govern order commencement:
              </p>
              <ul>
                <li><strong>Drawing Sign-Off:</strong> Production commences exclusively upon receipt of the Client&rsquo;s written approval of technical elevation drawings, finish schedules, and hardware specifications.</li>
                <li><strong>Payment Milestones:</strong> Standard fabrication requires an advance booking deposit upon drawing approval, an interim manufacturing milestone payment prior to carcase assembly, and full settlement prior to dispatch.</li>
                <li><strong>Custom Fabrication Cancellation:</strong> Once raw materials have been precision-cut, CNC-machined, or chemically patinated, custom orders cannot be cancelled, returned, or refunded.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="delivery-logistics" className="sf-terms-section">
            <span className="sf-terms-section__num">07</span>
            <h2 className="sf-terms-section__heading">Delivery, Logistics &amp; Site Readiness</h2>
            <div className="sf-terms-section__content">
              <p>
                We coordinate freight and white-glove site delivery through accredited architectural logistics carriers. Delivery timelines
                provided are diligent commercial estimates based on manufacturing schedules and freight route availability.
              </p>
              <h3 className="sf-terms-subheading">Site Readiness Prerequisites for Kitchen Installation</h3>
              <p>
                To safeguard precision cabinetry from moisture and structural compromise, the Client is responsible for ensuring that the
                installation site satisfies all standard architectural readiness conditions prior to delivery:
              </p>
              <ul>
                <li>Floors must be fully screeded, leveled, and cured.</li>
                <li>Walls must be plumb, true (90-degree internal angles for corner carcases), and fully waterproofed.</li>
                <li>Electrical conduits, water supply inlets, and gas rough-ins must be completed per our architectural rough-in drawings.</li>
                <li>No wet plastering, masonry cutting, or chemical tiling may occur concurrently in the installation zone.</li>
              </ul>
              <h3 className="sf-terms-subheading">Inspection &amp; Claims Window</h3>
              <p>
                The Client or authorized site representative must inspect all crates upon delivery. Any physical transit damage, carton
                breakage, or component shortages must be noted on the consignment note and reported to Surfuria in writing within
                forty-eight (48) hours of delivery.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="warranties-guarantees" className="sf-terms-section">
            <span className="sf-terms-section__num">08</span>
            <h2 className="sf-terms-section__heading">Warranties &amp; Guarantee Conditions</h2>
            <div className="sf-terms-section__content">
              <p>
                Surfuria products are backed by robust structural warranties designed to provide peace of mind to homeowners and specifiers:
              </p>
              <ul>
                <li><strong>Concealed Hinge Mechanics:</strong> Ten (10) years structural and operational warranty against mechanical hinge failure or hydraulic damper leakage under normal residential cycling.</li>
                <li><strong>Synchronised Drawer Runners:</strong> Ten (10) years structural warranty covering smooth gliding performance within specified load capacities (up to 40kg or 70kg depending on runner model).</li>
                <li><strong>Modular Kitchen Carcases:</strong> Five (5) years manufacturer warranty against delamination or carcase joint failure when maintained in accordance with our care guidelines.</li>
                <li><strong>Architectural Handles &amp; Pulls:</strong> Two (2) years structural warranty against metal casting defects.</li>
              </ul>
              <div className="sf-terms-callout">
                <h3 className="sf-terms-callout__title">Warranty Exclusions</h3>
                <p>
                  Warranties do not cover: damage caused by water inundation or active wall dampness; harsh chemical cleaning agents
                  (ammonia, chlorine, or abrasive scouring pads); normal organic patina aging of living brass; overloading beyond rated
                  weight thresholds; or unauthorized site alterations made by third-party carpenters.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="limitation-liability" className="sf-terms-section">
            <span className="sf-terms-section__num">09</span>
            <h2 className="sf-terms-section__heading">Limitation of Liability &amp; Disclaimers</h2>
            <div className="sf-terms-section__content">
              <p>
                To the fullest extent permitted by applicable law, Surfuria shall not be liable for indirect, incidental, special,
                punitive, or consequential damages—including project delay penalties, site downtime expenses, loss of anticipated revenue,
                or third-party contractor wages—arising from the use, inability to use, or delivery delay of our products.
              </p>
              <p>
                In all events, Surfuria&rsquo;s aggregate financial liability under any contract, warranty claim, or tort shall be strictly
                limited to the total net purchase price actually received by Surfuria for the specific defective product or hardware unit giving
                rise to the claim.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="prohibited-conduct" className="sf-terms-section">
            <span className="sf-terms-section__num">10</span>
            <h2 className="sf-terms-section__heading">Acceptable Website Use &amp; Prohibited Conduct</h2>
            <div className="sf-terms-section__content">
              <p>When using our website, specification tools, or serverless API endpoints, you agree not to:</p>
              <ul>
                <li>Deploy automated scrapers, spiders, or crawlers to extract catalogue specifications, pricing structures, or photography.</li>
                <li>Submit fabricated, spam, or malicious enquiry payloads designed to overwhelm our serverless infrastructure or Brevo email gateways.</li>
                <li>Attempt to bypass API validation, penetrate authentication barriers, or test our systems for vulnerabilities without prior authorization.</li>
                <li>Impersonate any person, architect, or firm when requesting trade discounts or confidential pricing.</li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section id="governing-law" className="sf-terms-section">
            <span className="sf-terms-section__num">11</span>
            <h2 className="sf-terms-section__heading">Governing Law, Jurisdiction &amp; Dispute Resolution</h2>
            <div className="sf-terms-section__content">
              <p>
                These Terms and Conditions and any contractual relationships formed hereunder shall be governed by, construed, and enforced
                in accordance with the substantive laws of India, without regard to conflict of law principles.
              </p>
              <p>
                In the event of any commercial disagreement or interpretation dispute, the parties shall first attempt in good faith to
                resolve the matter amicably through direct executive consultation within thirty (30) days. Failing such resolution, the
                dispute shall be submitted to the exclusive jurisdiction of the competent courts in India.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="modifications" className="sf-terms-section">
            <span className="sf-terms-section__num">12</span>
            <h2 className="sf-terms-section__heading">Amendments to Terms</h2>
            <div className="sf-terms-section__content">
              <p>
                Surfuria reserves the right to revise, update, or modify these Terms and Conditions at any time. Changes will take effect
                immediately upon publication on this website, marked by the updated &ldquo;Effective Date.&rdquo; Continued use of the website or
                placement of orders following such updates constitutes affirmative acceptance of the revised terms.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section id="contact-notices" className="sf-terms-section">
            <span className="sf-terms-section__num">13</span>
            <h2 className="sf-terms-section__heading">Legal Inquiries &amp; Formal Notices</h2>
            <div className="sf-terms-section__content">
              <p>
                All formal legal notices, warranty claims, or specification questions regarding these terms should be addressed to:
              </p>
              <div className="sf-terms-card">
                <h4 className="sf-terms-card__title">Surfuria Legal &amp; Commercial Department</h4>
                <p className="sf-terms-card__line">Attn: Commercial Contracts Officer</p>
                <p className="sf-terms-card__line">Legal Inquiries: <a href="mailto:legal@surfuria.com" className="sf-terms-inline-link">legal@surfuria.com</a></p>
                <p className="sf-terms-card__line">Project Consultations: <a href="mailto:info@surfuria.com" className="sf-terms-inline-link">info@surfuria.com</a></p>
                <p className="sf-terms-card__line">Website: <a href="https://surfuria.com" className="sf-terms-inline-link">surfuria.com</a></p>
              </div>
            </div>
          </section>

          {/* Editorial Bottom Consultation Card */}
          <div className="sf-terms-cta">
            <div className="sf-terms-cta__content">
              <span className="sf-terms-cta__tag">SPECIFICATION &amp; COLLABORATION</span>
              <h3 className="sf-terms-cta__title">Planning an upcoming architectural development?</h3>
              <p className="sf-terms-cta__desc">
                Our technical team partners closely with developers, architects, and studio designers to tailor specifications, provide finish schedules, and ensure flawless handover.
              </p>
            </div>
            <div className="sf-terms-cta__actions">
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

