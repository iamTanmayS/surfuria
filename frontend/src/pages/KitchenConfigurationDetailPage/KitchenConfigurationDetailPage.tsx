import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getKitchenConfigurationBySlug,
  KITCHEN_CONFIGURATIONS,
} from '../../data/products';
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

  const gallery = useMemo(() => {
    if (configuration?.galleryImages && configuration.galleryImages.length > 0) {
      return configuration.galleryImages;
    }
    return configuration ? [configuration.image] : [];
  }, [configuration]);

  const [selectedImage, setSelectedImage] = useState<{ slug: string; index: number }>({
    slug: configSlug,
    index: 0,
  });
  const activeImageIndex = selectedImage.slug === configSlug ? selectedImage.index : 0;
  const setActiveImageIndex = (index: number) => setSelectedImage({ slug: configSlug, index });

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

  return (
    <article className="config-detail-page">
      <SEOHead
        title={`${configuration.name} Modular Kitchen Configuration | Surfuria`}
        description={`Explore the Surfuria ${configuration.name} kitchen package: ${configuration.doorPanelArea.formatted} acrylic finish door panels, ${configuration.boxPanelArea.formatted} prelam carcasses, inclusive of 8 essential hardware fittings. ₹${configuration.totalPackagePrice.amount.toLocaleString('en-IN')}.`}
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
              <Link to="/" className="config-breadcrumbs__link">
                Home
              </Link>
            </li>
            <li className="config-breadcrumbs__sep" aria-hidden="true">
              /
            </li>
            <li className="config-breadcrumbs__item">
              <Link to="/kitchens" className="config-breadcrumbs__link">
                Kitchens
              </Link>
            </li>
            <li className="config-breadcrumbs__sep" aria-hidden="true">
              /
            </li>
            <li className="config-breadcrumbs__item">
              <Link to="/kitchens#configurations" className="config-breadcrumbs__link">
                Modular Configurations
              </Link>
            </li>
            <li className="config-breadcrumbs__sep" aria-hidden="true">
              /
            </li>
            <li className="config-breadcrumbs__item is-current" aria-current="page">
              <span>{configuration.name} Layout</span>
            </li>
          </ol>
        </nav>

        {/* ==================================================================
            2. CONFIGURATION HERO: COMPLETE IMAGE ON LEFT & PROMINENT PRICE
            ================================================================== */}
        <section className="config-hero" aria-labelledby="config-hero-title">
          <div className="config-hero__grid">
            {/* Left Column: Complete Uncropped Kitchen Image & Gallery */}
            <div className="config-hero__visual">
              <div className="config-hero__stage">
                <img
                  src={gallery[activeImageIndex] || configuration.image}
                  alt={`${configuration.name} Kitchen photo ${activeImageIndex + 1}`}
                  className="config-hero__img"
                  loading="eager"
                  decoding="async"
                />
                <div className="config-hero__stage-caption">
                  <span className="config-hero__stage-dot" aria-hidden="true" />
                  <span>
                    {configuration.name} Modular Layout · Complete Architectural Package
                    {gallery.length > 1 ? ` · Photo ${activeImageIndex + 1} of ${gallery.length}` : ''}
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {gallery.length > 1 && (
                <div
                  className="config-hero__thumbs"
                  role="tablist"
                  aria-label={`${configuration.name} photo gallery`}
                >
                  {gallery.map((imgSrc, idx) => {
                    const isSelected = idx === activeImageIndex;
                    return (
                      <button
                        key={`${imgSrc}-${idx}`}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-label={`View ${configuration.name} photo ${idx + 1}`}
                        className={`config-hero__thumb ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img
                          src={imgSrc}
                          alt={`${configuration.name} thumbnail ${idx + 1}`}
                          className="config-hero__thumb-img"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Concise Package Information & Primary CTA */}
            <div className="config-hero__content">
              <div className="config-hero__eyebrow-row">
                <span className="config-hero__eyebrow">FACTORY-ENGINEERED PACKAGE</span>
                <span className="config-hero__status-badge">Turnkey Modular</span>
              </div>

              <h1 id="config-hero-title" className="config-hero__title">
                {configuration.name} Modular Kitchen
              </h1>

              <p className="config-hero__subtitle">
                A standardized, ready-to-build modular kitchen package inclusive of exterior acrylic-finish
                door panels, full prelam box carcass, 8 essential hardware items, transportation, and
                on-site installation.
              </p>

              {/* Prominent Price Presentation */}
              <div className="config-hero__price-box">
                <span className="config-hero__price-label">Package Price</span>
                <div className="config-hero__price-row">
                  <span className="config-hero__price-val">{configuration.formattedPrice}</span>
                  <span className="config-hero__price-tag">All-Inclusive Fixed Cost</span>
                </div>
                <p className="config-hero__price-subtext">
                  Covers full package specifications · Inclusive of GST · No hidden charges
                </p>
              </div>

              {/* Key Dimensions: Door & Box Areas */}
              <div className="config-hero__specs-row">
                <div className="config-hero__spec-item">
                  <span className="config-hero__spec-label">Door Panel Area</span>
                  <span className="config-hero__spec-val">{configuration.doorPanelArea.formatted}</span>
                  <span className="config-hero__spec-note">Acrylic finish shutters</span>
                </div>
                <div className="config-hero__spec-divider" aria-hidden="true" />
                <div className="config-hero__spec-item">
                  <span className="config-hero__spec-label">Box Panel Area</span>
                  <span className="config-hero__spec-val">{configuration.boxPanelArea.formatted}</span>
                  <span className="config-hero__spec-note">Prelam board carcass</span>
                </div>
              </div>

              {/* Summary of Inclusions */}
              <div className="config-hero__summary-pills">
                <span className="config-hero__summary-pill">✓ Acrylic Finish Doors</span>
                <span className="config-hero__summary-pill">✓ Prelam Carcass</span>
                <span className="config-hero__summary-pill">✓ 8 Hardware Items</span>
                <span className="config-hero__summary-pill">✓ Transport &amp; Installation</span>
              </div>

              {/* Action Buttons */}
              <div className="config-hero__actions">
                <Button to={enquiryUrl} variant="bronze" className="config-hero__primary-cta">
                  Enquire About This Kitchen
                </Button>
                <a href="#everything-included" className="config-hero__scroll-link">
                  <span>See Everything Included</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M8 3.33334V12.6667M8 12.6667L12.6667 8.00001M8 12.6667L3.33334 8.00001"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. EVERYTHING INCLUDED IN YOUR KITCHEN: VISUAL BREAKDOWN
            ================================================================== */}
        <section
          id="everything-included"
          className="config-inclusions-section"
          aria-labelledby="inclusions-heading"
        >
          <div className="config-section-header">
            <span className="config-section-eyebrow">PACKAGE INCLUSIONS</span>
            <h2 id="inclusions-heading" className="config-section-title">
              Everything Included in Your Kitchen
            </h2>
            <p className="config-section-subtitle">
              See the materials, storage systems, and hardware included in this package.
            </p>
          </div>

          {/* A & B: Door Panels and Box Panels (2 Large Visual Cards) */}
          <div className="config-materials-row">
            {/* A. Door Panels */}
            <div className="config-material-card">
              <div className="config-material-card__image-frame">
                <img
                  src="/images/materials/acrylic.jpg"
                  alt="Solid acrylic finish kitchen door panel shutter"
                  className="config-material-card__image"
                  loading="lazy"
                />
                <span className="config-material-card__badge">
                  {configuration.doorPanelArea.formatted} Coverage
                </span>
              </div>
              <div className="config-material-card__content">
                <div className="config-material-card__header">
                  <h3 className="config-material-card__title">Door Panels</h3>
                  <span className="config-material-card__spec-highlight">
                    Acrylic finish · Included in this package
                  </span>
                </div>
                <p className="config-material-card__desc">
                  Exterior cabinet shutters and drawer fronts finished with mirror-smooth, high-clarity
                  acrylic. Offers deep color saturation, UV stability, and scratch-resistant daily
                  durability.
                </p>
                <div className="config-material-card__meta">
                  <span>
                    Door panel area: <strong>{configuration.doorPanelArea.formatted}</strong>
                  </span>
                  <span>
                    Finish: <strong>Acrylic Finish</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* B. Box Panels */}
            <div className="config-material-card">
              <div className="config-material-card__image-frame">
                <img
                  src="/images/materials/laminate.jpg"
                  alt="Prelaminated board cabinet box carcass sample"
                  className="config-material-card__image"
                  loading="lazy"
                />
                <span className="config-material-card__badge">
                  {configuration.boxPanelArea.formatted} Coverage
                </span>
              </div>
              <div className="config-material-card__content">
                <div className="config-material-card__header">
                  <h3 className="config-material-card__title">Box Panels</h3>
                  <span className="config-material-card__spec-highlight">
                    Prelaminated board · Top, bottom, sides, back panel, and one shelf
                  </span>
                </div>
                <p className="config-material-card__desc">
                  Complete structural cabinet carcass manufactured with high-density prelaminated board.
                  Engineered for dimensional stability, screw holding capacity, and kitchen moisture resistance.
                </p>
                <div className="config-material-card__meta">
                  <span>
                    Box panel area: <strong>{configuration.boxPanelArea.formatted}</strong>
                  </span>
                  <span>
                    Construction: <strong>Full Cabinet Carcass</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* C. Included Hardware (Visual Grid of 8 Image Tiles) */}
          <div className="config-hardware-block">
            <div className="config-hardware-block__header">
              <h3 className="config-hardware-block__title">Included Hardware Suite</h3>
              <span className="config-hardware-block__count">8 Factory Items Included</span>
            </div>

            <div className="config-hardware-grid">
              {INCLUDED_HARDWARE_TILES.map((tile) => (
                <div key={tile.id} className="config-hw-tile">
                  <div className="config-hw-tile__visual">
                    {tile.image ? (
                      <img
                        src={tile.image}
                        alt={tile.imageAlt || tile.name}
                        className="config-hw-tile__img"
                        loading="lazy"
                      />
                    ) : tile.isSchematic === 'minifix' ? (
                      <MinifixSchematic />
                    ) : (
                      <ShelfPinSchematic />
                    )}
                    <span className="config-hw-tile__check" title="Included in package">
                      ✓ Included
                    </span>
                  </div>
                  <div className="config-hw-tile__body">
                    <h4 className="config-hw-tile__name">{tile.name}</h4>
                    <p className="config-hw-tile__label">{tile.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. WHAT YOUR PACKAGE COVERS: VISUAL SUMMARY FIGURES
            ================================================================== */}
        <section className="config-covers-section" aria-labelledby="covers-heading">
          <div className="config-section-header">
            <span className="config-section-eyebrow">PACKAGE ARCHITECTURE</span>
            <h2 id="covers-heading" className="config-section-title">
              What Your Package Covers
            </h2>
            <p className="config-section-subtitle">
              A transparent breakdown of coverage areas, board substrates, and turnkey services included under
              the {configuration.formattedPrice} package.
            </p>
          </div>

          <div className="config-covers-grid">
            <div className="config-cover-card">
              <span className="config-cover-card__val">{configuration.doorPanelArea.formatted}</span>
              <h3 className="config-cover-card__label">Door Panel Area</h3>
              <p className="config-cover-card__sub">{configuration.doorPanelFinish}</p>
              <span className="config-cover-card__detail">Exterior front shutters &amp; drawer fascias</span>
            </div>

            <div className="config-cover-card">
              <span className="config-cover-card__val">{configuration.boxPanelArea.formatted}</span>
              <h3 className="config-cover-card__label">Box Panel Area</h3>
              <p className="config-cover-card__sub">{configuration.boxPanelMaterial}</p>
              <span className="config-cover-card__detail">Top, bottom, sides, back panel &amp; one shelf</span>
            </div>

            <div className="config-cover-card">
              <span className="config-cover-card__val">8 Items</span>
              <h3 className="config-cover-card__label">Included Hardware</h3>
              <p className="config-cover-card__sub">Turnkey Kinematics</p>
              <span className="config-cover-card__detail">Hinges, tandem drawers, baskets, organizers, fasteners</span>
            </div>

            <div className="config-cover-card">
              <span className="config-cover-card__val">Included</span>
              <h3 className="config-cover-card__label">Transportation to Site</h3>
              <p className="config-cover-card__sub">Factory Logistics</p>
              <span className="config-cover-card__detail">Direct factory-to-project transport included</span>
            </div>

            <div className="config-cover-card">
              <span className="config-cover-card__val">Included</span>
              <h3 className="config-cover-card__label">Professional Installation</h3>
              <p className="config-cover-card__sub">On-Site Assembly</p>
              <span className="config-cover-card__detail">Plumb alignment, carcass leveling, and hardware calibration</span>
            </div>

            <div className="config-cover-card config-cover-card--price">
              <span className="config-cover-card__val config-cover-card__val--price">
                {configuration.formattedPrice}
              </span>
              <h3 className="config-cover-card__label">Net Package Price</h3>
              <p className="config-cover-card__sub">Turnkey Total · Inclusive of GST</p>
              <span className="config-cover-card__detail">Single verified baseline package cost</span>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. SECONDARY ENQUIRY CTA
            ================================================================== */}
        <section className="config-enquiry-banner" aria-labelledby="secondary-enquiry-heading">
          <div className="config-enquiry-banner__card">
            <div className="config-enquiry-banner__content">
              <span className="config-enquiry-banner__eyebrow">TAILORED QUOTATION</span>
              <h2 id="secondary-enquiry-heading" className="config-enquiry-banner__title">
                Planning a kitchen like this?
              </h2>
              <p className="config-enquiry-banner__desc">
                Tell us about your space and requirements to get a quotation for your kitchen.
              </p>
            </div>
            <div className="config-enquiry-banner__action">
              <Button to={enquiryUrl} variant="bronze" className="config-enquiry-banner__btn">
                Get a Kitchen Quote
              </Button>
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. CROSS-COMPARISON: OTHER STANDARDIZED PACKAGES
            ================================================================== */}
        <section className="config-other-section" aria-labelledby="other-packages-heading">
          <div className="config-section-header">
            <span className="config-section-eyebrow">EXPLORE ALTERNATIVES</span>
            <h2 id="other-packages-heading" className="config-section-title">
              Compare Other Kitchen Packages
            </h2>
            <p className="config-section-subtitle">
              Review our alternative standardized layouts to find the ideal modular configuration for your home.
            </p>
          </div>

          <div className="config-other-grid">
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
                className="config-other-card"
              />
            ))}
          </div>
        </section>

        {/* ==================================================================
            7. FINAL CLOSING CTA
            ================================================================== */}
        <section className="config-closing-cta" aria-labelledby="final-cta-heading">
          <div className="config-closing-cta__box">
            <h2 id="final-cta-heading" className="config-closing-cta__title">
              Let's plan your kitchen.
            </h2>
            <p className="config-closing-cta__desc">
              Whether you select the standardized {configuration.name} package or wish to customize
              finishes, countertop materials, and spatial modules for your site, our team is ready to
              collaborate with you.
            </p>
            <Button to={enquiryUrl} variant="bronze" className="config-closing-cta__btn">
              Discuss Your Kitchen
            </Button>
          </div>
        </section>
      </div>
    </article>
  );
}
