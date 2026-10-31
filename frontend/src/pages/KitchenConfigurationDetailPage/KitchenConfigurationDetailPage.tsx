import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getKitchenConfigurationBySlug,
  KITCHEN_CONFIGURATIONS,
} from '../../data/products';
import { buildWhatsAppUrl } from '../../config/whatsapp';
import { buildCloudinaryUrl, buildCloudinarySrcSet } from '../../lib/cloudinary';
import { ProductGallery } from '../../components/product';
import ProductCard from '../../components/catalog/ProductCard/ProductCard';
import Button from '../../components/ui/Button';
import { SEOHead, buildBreadcrumbSchema, buildKitchenPackageSchema } from '../../components/seo';
import './KitchenConfigurationDetailPage.css';

/**
 * Technical schematic for Minifix Set joinery fastener.
 * Provides a crisp, authentic architectural technical illustration.
 */
function MinifixSchematic() {
  return (
    <svg
      viewBox="0 0 140 100"
      fill="none"
      className="config-hw-schematic"
      aria-hidden="true"
    >
      <rect width="140" height="100" rx="8" fill="#f6f3ed" />
      {/* Cam housing */}
      <circle cx="45" cy="50" r="20" stroke="#7c7267" strokeWidth="2.5" fill="#ffffff" />
      <circle cx="45" cy="50" r="13" stroke="#b77b3f" strokeWidth="1.75" strokeDasharray="3 3" />
      <path d="M39 50h12M45 44v12" stroke="#7c7267" strokeWidth="2" strokeLinecap="round" />
      {/* Steel connecting dowel */}
      <path d="M62 50h44" stroke="#171715" strokeWidth="3" strokeLinecap="round" />
      <rect x="80" y="43" width="12" height="14" rx="2" fill="#b77b3f" />
      {/* Expandable socket head */}
      <path d="M106 46v8l10-4z" fill="#7c7267" />
      {/* Technical label */}
      <path d="M25 82h90" stroke="#ded6c9" strokeWidth="1" strokeDasharray="2 2" />
      <text
        x="70"
        y="91"
        textAnchor="middle"
        fontSize="7.5"
        fill="#7c7267"
        fontFamily="sans-serif"
        letterSpacing="0.08em"
        fontWeight="600"
      >
        CAM &amp; CONNECTING DOWEL
      </text>
    </svg>
  );
}

/**
 * Technical schematic for Shelf Support Pin joinery fitting.
 * Provides a crisp, authentic architectural technical illustration.
 */
function ShelfPinSchematic() {
  return (
    <svg
      viewBox="0 0 140 100"
      fill="none"
      className="config-hw-schematic"
      aria-hidden="true"
    >
      <rect width="140" height="100" rx="8" fill="#f6f3ed" />
      {/* Carcass side panel profile */}
      <rect x="24" y="24" width="18" height="52" rx="2" fill="#e8e2d8" stroke="#7c7267" strokeWidth="2" />
      <circle cx="33" cy="50" r="4.5" fill="#b77b3f" />
      {/* Steel support pin */}
      <rect x="40" y="44" width="46" height="12" rx="2" fill="#ffffff" stroke="#171715" strokeWidth="2.5" />
      <path d="M63 32v12" stroke="#b77b3f" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Shelf resting above */}
      <rect x="52" y="28" width="54" height="8" rx="1.5" fill="#b77b3f" opacity="0.85" />
      {/* Technical label */}
      <path d="M25 82h90" stroke="#ded6c9" strokeWidth="1" strokeDasharray="2 2" />
      <text
        x="70"
        y="91"
        textAnchor="middle"
        fontSize="7.5"
        fill="#7c7267"
        fontFamily="sans-serif"
        letterSpacing="0.08em"
        fontWeight="600"
      >
        5mm STEEL SHELF PIN
      </text>
    </svg>
  );
}

interface HardwareTile {
  id: string;
  name: string;
  label: string;
  image?: string;
  imageAlt?: string;
  isSchematic?: 'minifix' | 'pin';
}

/**
 * Authoritative 8-item hardware breakdown with verified catalogue images
 * and precise technical joinery schematics.
 */
const INCLUDED_HARDWARE_TILES: readonly HardwareTile[] = [
  {
    id: 'bar-handles',
    name: 'Bar Handles',
    label: 'Cabinet & drawer pulls',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749985/10_1_ibry4j.png',
    imageAlt: 'Architectural bar handles for cabinet doors and drawers',
  },
  {
    id: 'tandem-drawers',
    name: 'Tandem Drawers',
    label: 'Drawer storage system',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749976/8_1_Tandem_Drawer_cromwz.png',
    imageAlt: 'Tandem drawer runner system with soft-close motion',
  },
  {
    id: 'ss-baskets',
    name: 'Stainless-Steel Baskets',
    label: 'Basket storage included',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749965/11_1_ls3d8a.png',
    imageAlt: 'High-grade stainless steel wire pullout storage basket',
  },
  {
    id: 'soft-close-hinges',
    name: 'Soft-Close Hinges',
    label: 'Hinges included in package',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749954/7_1_Hinge_Close_Up_kxjfmg.png',
    imageAlt: 'Hydraulic soft-close cabinet hinge',
  },
  {
    id: 'plate-rack',
    name: 'Plate Rack',
    label: 'Plate storage included',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749996/15_fimljl.png',
    imageAlt: 'Stainless steel dish rack and plate organizer with drip tray',
  },
  {
    id: 'pvc-tray',
    name: 'PVC Tray',
    label: 'Cutlery organizer insert',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749972/16_iynvab.png',
    imageAlt: 'Modular PVC cutlery organizer drawer insert',
  },
  {
    id: 'minifix-set',
    name: 'Minifix Set',
    label: 'Minifix, dowel & screw assembly',
    isSchematic: 'minifix',
    imageAlt: 'Architectural minifix cam, connecting dowel and socket fastener assembly schematic',
  },
  {
    id: 'shelf-support-pins',
    name: 'Shelf Support Pins',
    label: 'Internal shelf support pins',
    isSchematic: 'pin',
    imageAlt: 'Nickel-plated steel carcass shelf support pin schematic',
  },
];

export default function KitchenConfigurationDetailPage() {
  const { configSlug = '' } = useParams<{ configSlug: string }>();

  // Look up configuration from authoritative dataset
  const configuration = useMemo(
    () => getKitchenConfigurationBySlug(configSlug),
    [configSlug]
  );

  // Gallery images list (reused by ProductGallery)
  const gallery = useMemo(() => {
    if (configuration?.galleryImages && configuration.galleryImages.length > 0) {
      return configuration.galleryImages;
    }
    return configuration ? [configuration.image] : [];
  }, [configuration]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [configSlug]);

  // Other configurations for cross-comparison
  const otherConfigurations = useMemo(() => {
    if (!configuration) return [];
    return KITCHEN_CONFIGURATIONS.filter((cfg) => cfg.slug !== configuration.slug);
  }, [configuration]);

  const jsonLd = useMemo(() => {
    if (!configuration) return undefined;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildKitchenPackageSchema({
          name: configuration.name,
          description: `Standardized ${configuration.name} modular kitchen configuration package. Features ${configuration.doorPanelArea.formatted} acrylic finish door panels and ${configuration.boxPanelArea.formatted} prelam board carcasses, inclusive of 8 essential hardware items, transportation, and installation.`,
          image: configuration.image,
          url: `https://surfuria.com/kitchens/configurations/${configuration.slug}`,
          priceAmount: configuration.totalPackagePrice.amount,
          currency: configuration.totalPackagePrice.currency,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', url: 'https://surfuria.com/' },
          { name: 'Kitchens', url: 'https://surfuria.com/kitchens' },
          {
            name: `${configuration.name} Kitchen`,
            url: `https://surfuria.com/kitchens/configurations/${configuration.slug}`,
          },
        ]),
      ],
    };
  }, [configuration]);

  // --------------------------------------------------------------------------
  // NOT FOUND STATE
  // --------------------------------------------------------------------------
  if (!configuration) {
    return (
      <div className="config-not-found container--wide">
        <SEOHead
          title="Kitchen Configuration Not Found | Surfuria"
          description="The requested modular kitchen configuration could not be located in our catalogue."
          canonicalUrl="https://surfuria.com/kitchens"
          robots="noindex, follow"
        />
        <div className="config-not-found__card">
          <span className="config-not-found__eyebrow">CONFIGURATION NOT FOUND</span>
          <h1 className="config-not-found__title">Package Not Found</h1>
          <p className="config-not-found__desc">
            The requested kitchen configuration package may have been updated or relocated.
            Browse our verified modular kitchen packages below.
          </p>
          <Button to="/kitchens#configurations" variant="bronze">
            Return to Kitchen Packages
          </Button>
        </div>
      </div>
    );
  }

  const enquiryUrl = `/contact?type=kitchen-config&product=${configuration.slug}`;
  const whatsAppUrl = buildWhatsAppUrl(
    `Hi Surfuria! I'm interested in the ${configuration.name} modular kitchen package (${configuration.formattedPrice}). Can you share specifications and project timelines?`
  );

  return (
    <article className="config-detail-page">
      <SEOHead
        title={`${configuration.name} Modular Kitchen Configuration | Surfuria`}
        description={`Explore the Surfuria ${configuration.name} kitchen package: ${configuration.doorPanelArea.formatted} acrylic finish door panels, ${configuration.boxPanelArea.formatted} prelam carcasses, inclusive of 8 essential hardware fittings. ${configuration.formattedPrice}.`}
        canonicalUrl={`https://surfuria.com/kitchens/configurations/${configuration.slug}`}
        ogType="product"
        ogImage={configuration.image}
        ogImageAlt={configuration.imageAlt}
        jsonLd={jsonLd}
      />

      <div className="container--wide">
        {/* ==================================================================
            1. BREADCRUMBS
            ================================================================== */}
        <nav className="config-breadcrumbs" aria-label="Breadcrumb">
          <ol className="config-breadcrumbs__list">
            <li className="config-breadcrumbs__item">
              <Link to="/" className="config-breadcrumbs__link">Home</Link>
            </li>
            <li className="config-breadcrumbs__sep" aria-hidden="true">/</li>
            <li className="config-breadcrumbs__item">
              <Link to="/kitchens" className="config-breadcrumbs__link">Kitchens</Link>
            </li>
            <li className="config-breadcrumbs__sep" aria-hidden="true">/</li>
            <li className="config-breadcrumbs__item">
              <Link to="/kitchens#configurations" className="config-breadcrumbs__link">Modular Configurations</Link>
            </li>
            <li className="config-breadcrumbs__sep" aria-hidden="true">/</li>
            <li className="config-breadcrumbs__item is-current" aria-current="page">
              <span>{configuration.name} Layout</span>
            </li>
          </ol>
        </nav>

        {/* ==================================================================
            2. CONFIGURATION OVERVIEW (TWO-COLUMN DESKTOP / STRUCTURED MOBILE)
            ================================================================== */}
        <div className="config-detail-overview">
          {/* Mobile Title & Lead (Rendered before gallery on mobile <= 1024px) */}
          <div className="config-mobile-header">
            <span className="config-info-tag">FACTORY-ENGINEERED PACKAGE</span>
            <h1 className="config-info-title">{configuration.name} Modular Kitchen</h1>
            <p className="config-info-lead">
              Standardized modular package featuring {configuration.doorPanelArea.formatted} acrylic shutters,{' '}
              {configuration.boxPanelArea.formatted} prelam carcass, 8 essential hardware items, transportation, and on-site assembly.
            </p>
          </div>

          {/* Left Column: Shared Reusable Gallery (4:3 aspect ratio suited to kitchen architecture) */}
          <div className="config-gallery-col">
            <ProductGallery
              images={gallery}
              productName={`${configuration.name} Modular Kitchen`}
              speciality="Turnkey Modular"
              aspectRatio="4/3"
            />
          </div>

          {/* Right Column: Configuration Information & Specifications */}
          <div className="config-info-panel">
            {/* Desktop Title & Lead (Rendered on desktop >= 1025px) */}
            <div className="config-desktop-header">
              <span className="config-info-tag">FACTORY-ENGINEERED PACKAGE</span>
              <h1 className="config-info-title">{configuration.name} Modular Kitchen</h1>
              <p className="config-info-lead">
                Standardized, ready-to-build modular kitchen package inclusive of exterior acrylic-finish
                door panels, full prelam box carcass, 8 essential hardware items, transportation, and
                on-site installation.
              </p>
            </div>

            {/* Clear Starting Price */}
            <div className="config-price-block">
              <span className="config-price-label">Complete Package Price</span>
              <div className="config-price-row">
                <span className="config-price-val">{configuration.formattedPrice}</span>
                <span className="config-price-tag">All-Inclusive Fixed Cost</span>
              </div>
              <p className="config-price-subtext">
                Covers complete package specifications · Inclusive of GST · Direct factory pricing
              </p>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="config-actions">
              <Button
                to={enquiryUrl}
                variant="bronze"
                className="config-enquire-btn"
                icon={
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 3l5 5-5 5" />
                  </svg>
                }
              >
                Enquire About This Kitchen
              </Button>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="config-whatsapp-link"
                aria-label={`Chat on WhatsApp about ${configuration.name} Modular Kitchen`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.085-1.802-.401-.986-.411-1.638-1.393-1.687-1.458-.049-.066-.401-.533-.401-1.017 0-.484.254-.722.344-.82.09-.098.197-.123.262-.123.066 0 .131.002.188.005.06.002.139-.023.217.164.082.197.279.68.303.73.025.049.041.107.008.172-.033.066-.049.107-.098.164-.049.057-.103.128-.148.172-.05.049-.102.103-.044.202.057.098.256.423.55.685.378.337.697.441.796.49.098.049.156.041.213-.025.057-.066.246-.287.311-.385.066-.098.131-.082.222-.049.09.033.574.271.672.32.098.049.164.074.188.115.025.041.025.238-.119.643z" />
                </svg>
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Compact Key Specifications Summary (Verified data only) */}
            <div className="config-specs-summary">
              <h2 className="config-specs-summary__title">Package Specifications</h2>
              <dl className="config-specs-dl">
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Configuration Type</dt>
                  <dd className="config-specs-dd">{configuration.name} Modular Layout</dd>
                </div>
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Door Panel Area</dt>
                  <dd className="config-specs-dd">{configuration.doorPanelArea.formatted} (Acrylic Finish)</dd>
                </div>
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Box Panel Area</dt>
                  <dd className="config-specs-dd">{configuration.boxPanelArea.formatted} (Prelam Carcass)</dd>
                </div>
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Door Finish</dt>
                  <dd className="config-specs-dd">{configuration.doorPanelFinish}</dd>
                </div>
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Box Material</dt>
                  <dd className="config-specs-dd">{configuration.boxPanelMaterial}</dd>
                </div>
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Included Hardware</dt>
                  <dd className="config-specs-dd">8 Essential Hardware Items</dd>
                </div>
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Transportation</dt>
                  <dd className="config-specs-dd">Factory Logistics to Site Included</dd>
                </div>
                <div className="config-specs-row">
                  <dt className="config-specs-dt">Installation</dt>
                  <dd className="config-specs-dd">Professional On-Site Assembly Included</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* ==================================================================
            3. INCLUDED HARDWARE SUITE (4 COLS DESKTOP, 2 COLS MOBILE)
            ================================================================== */}
        <section className="config-section" id="included-hardware" aria-labelledby="hardware-heading">
          <div className="config-section__header">
            <span className="config-section__eyebrow">INCLUDED HARDWARE</span>
            <h2 id="hardware-heading" className="config-section__title">
              8-Piece Kinematic Hardware Suite
            </h2>
            <p className="config-section__subtitle">
              Every modular package is delivered with genuine factory-fitted kinematic hardware, storage organizers, and precision fasteners.
            </p>
          </div>

          <div className="config-hardware-grid">
            {INCLUDED_HARDWARE_TILES.map((tile) => (
              <div key={tile.id} className="config-hw-card">
                <div className="config-hw-card__media">
                  {tile.image ? (
                    <img
                      src={buildCloudinaryUrl(tile.image, { width: 320, quality: 'auto', format: 'auto' })}
                      srcSet={buildCloudinarySrcSet(tile.image, [160, 240, 320]) || undefined}
                      sizes="(max-width: 768px) 45vw, 220px"
                      alt={tile.imageAlt || tile.name}
                      className="config-hw-card__img"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : tile.isSchematic === 'minifix' ? (
                    <MinifixSchematic />
                  ) : (
                    <ShelfPinSchematic />
                  )}
                  <span className="config-hw-card__check" aria-hidden="true">
                    ✓ Included
                  </span>
                </div>
                <div className="config-hw-card__content">
                  <h3 className="config-hw-card__name">{tile.name}</h3>
                  <p className="config-hw-card__label">{tile.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            4. MATERIALS AND FINISHES (2 COLUMNS)
            ================================================================== */}
        <section className="config-section" id="materials-finishes" aria-labelledby="materials-heading">
          <div className="config-section__header">
            <span className="config-section__eyebrow">SPECIFIED MATERIALS</span>
            <h2 id="materials-heading" className="config-section__title">
              Architectural Substrates &amp; Exterior Finishes
            </h2>
            <p className="config-section__subtitle">
              Manufactured with moisture-resistant prelam carcasses and mirror-clarity acrylic shutters for long-term daily performance.
            </p>
          </div>

          <div className="config-materials-grid">
            {/* Door Panels */}
            <div className="config-material-card">
              <div className="config-material-card__visual">
                <img
                  src="/images/materials/acrylic.jpg"
                  alt="Solid acrylic finish kitchen door panel shutter"
                  className="config-material-card__img"
                  loading="lazy"
                  decoding="async"
                />
                <span className="config-material-card__tag">
                  {configuration.doorPanelArea.formatted} Coverage
                </span>
              </div>
              <div className="config-material-card__body">
                <h3 className="config-material-card__title">Acrylic Finish Shutters</h3>
                <p className="config-material-card__desc">
                  Exterior cabinet shutters and drawer fascias finished with mirror-smooth, high-clarity
                  acrylic. Offers deep color saturation, UV stability, and scratch-resistant daily durability.
                </p>
                <div className="config-material-card__specs">
                  <span className="config-material-card__spec-item">
                    Finish: <strong>{configuration.doorPanelFinish}</strong>
                  </span>
                  <span className="config-material-card__spec-item">
                    Area: <strong>{configuration.doorPanelArea.formatted}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Box Panels */}
            <div className="config-material-card">
              <div className="config-material-card__visual">
                <img
                  src="/images/materials/laminate.jpg"
                  alt="Prelaminated board cabinet box carcass sample"
                  className="config-material-card__img"
                  loading="lazy"
                  decoding="async"
                />
                <span className="config-material-card__tag">
                  {configuration.boxPanelArea.formatted} Coverage
                </span>
              </div>
              <div className="config-material-card__body">
                <h3 className="config-material-card__title">Prelaminated Board Carcass</h3>
                <p className="config-material-card__desc">
                  Complete structural cabinet carcass manufactured with high-density prelaminated board.
                  Engineered for dimensional stability, screw holding capacity, and kitchen moisture resistance.
                </p>
                <div className="config-material-card__specs">
                  <span className="config-material-card__spec-item">
                    Material: <strong>{configuration.boxPanelMaterial}</strong>
                  </span>
                  <span className="config-material-card__spec-item">
                    Area: <strong>{configuration.boxPanelArea.formatted}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. ADDITIONAL CONFIGURATION INFORMATION (TURNKEY SCOPE & LOGISTICS)
            ================================================================== */}
        <section className="config-section" id="turnkey-scope" aria-labelledby="scope-heading">
          <div className="config-section__header">
            <span className="config-section__eyebrow">PACKAGE ARCHITECTURE</span>
            <h2 id="scope-heading" className="config-section__title">
              What Your Package Covers
            </h2>
            <p className="config-section__subtitle">
              A transparent breakdown of coverage areas, logistics, and assembly services included under the {configuration.formattedPrice} package.
            </p>
          </div>

          <div className="config-scope-grid">
            <div className="config-scope-card">
              <div className="config-scope-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="config-scope-card__title">Direct Site Transportation</h3>
              <p className="config-scope-card__desc">
                Factory-to-project transport included across standard regional zones with protective edge crating to prevent transit damage.
              </p>
              <span className="config-scope-card__meta">Factory Logistics Included</span>
            </div>

            <div className="config-scope-card">
              <div className="config-scope-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3 className="config-scope-card__title">Professional Installation</h3>
              <p className="config-scope-card__desc">
                On-site plumb alignment, carcass leveling, shutter calibration, and hardware installation executed by trained specialists.
              </p>
              <span className="config-scope-card__meta">On-Site Assembly Included</span>
            </div>

            <div className="config-scope-card config-scope-card--price">
              <div className="config-scope-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="config-scope-card__title">Fixed Net Pricing</h3>
              <p className="config-scope-card__desc">
                Single net package cost of {configuration.formattedPrice} inclusive of GST, materials, hardware, and installation without hidden escalation.
              </p>
              <span className="config-scope-card__meta config-scope-card__meta--price">{configuration.formattedPrice} Net Total</span>
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. RELATED KITCHEN CONFIGURATIONS (BOTTOM OF PAGE)
            ================================================================== */}
        <section className="config-section" id="other-configurations" aria-labelledby="related-heading">
          <div className="config-section__header">
            <span className="config-section__eyebrow">EXPLORE ALTERNATIVES</span>
            <h2 id="related-heading" className="config-section__title">
              Compare Other Kitchen Packages
            </h2>
            <p className="config-section__subtitle">
              Review our alternative standardized layouts to find the ideal modular configuration for your home.
            </p>
          </div>

          <div className="config-related-grid">
            {otherConfigurations.map((other) => (
              <ProductCard
                key={other.id}
                title={`${other.name} Layout`}
                subtitle={`Complete package · ${other.doorPanelArea.formatted} door area`}
                badge={other.formattedPrice}
                image={other.image}
                imageAlt={other.imageAlt}
                destination={`/kitchens/configurations/${other.slug}`}
                actionText="View Package"
                className="config-related-card"
              />
            ))}
          </div>
        </section>

        {/* ==================================================================
            7. EDITORIAL CLOSING CONSULTATION BANNER
            ================================================================== */}
        <section className="config-closing-banner" aria-labelledby="closing-banner-title">
          <div className="config-closing-banner__inner">
            <span className="config-closing-banner__eyebrow">TAILORED KITCHEN PLANNING</span>
            <h2 id="closing-banner-title" className="config-closing-banner__title">
              Planning your dream kitchen?
            </h2>
            <p className="config-closing-banner__desc">
              Whether you select the standardized {configuration.name} package or require tailored adaptations
              for your site, our modular kitchen specialists are ready to collaborate with you.
            </p>
            <div className="config-closing-banner__actions">
              <Button to={enquiryUrl} variant="bronze" className="config-closing-btn">
                Discuss Your Kitchen
              </Button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
