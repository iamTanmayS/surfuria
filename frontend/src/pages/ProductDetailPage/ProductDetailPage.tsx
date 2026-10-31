import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getHardwareProductBySlug,
  getKitchenProductBySlug,
  getRelatedProducts,
  type CatalogueType,
} from '../../data/products';
import { buildWhatsAppUrl } from '../../config/whatsapp';
import { ProductGallery } from '../../components/product';
import ProductCard from '../../components/catalog/ProductCard/ProductCard';
import Button from '../../components/ui/Button';
import { SEOHead, buildBreadcrumbSchema, buildProductSchema } from '../../components/seo';
import './ProductDetailPage.css';

interface ProductDetailPageProps {
  catalogue: CatalogueType;
}

export default function ProductDetailPage({ catalogue }: ProductDetailPageProps) {
  const { categorySlug = '', productSlug = '' } = useParams<{
    categorySlug: string;
    productSlug: string;
  }>();

  // Resolve product and category data
  const { product, category } = useMemo(() => {
    if (catalogue === 'hardware') {
      return getHardwareProductBySlug(categorySlug, productSlug);
    }
    return getKitchenProductBySlug(categorySlug, productSlug);
  }, [catalogue, categorySlug, productSlug]);

  // Gallery images list
  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    return [product.cardImage];
  }, [product]);

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product, 3);
  }, [product]);

  // Deduplicate lead sentence from extended description to avoid repetitive copy
  const detailedDescription = useMemo(() => {
    if (!product?.description) return '';
    const trimmedDesc = product.description.trim();
    const trimmedLead = (product.shortDescription || '').trim();
    if (!trimmedLead || trimmedDesc === trimmedLead) return '';
    if (trimmedDesc.startsWith(trimmedLead)) {
      return trimmedDesc.slice(trimmedLead.length).replace(/^[.\s-]+/, '').trim();
    }
    return trimmedDesc;
  }, [product]);

  // --------------------------------------------------------------------------
  // ERROR / NOT FOUND STATE
  // --------------------------------------------------------------------------
  if (!product || !category) {
    const fallbackPath = catalogue === 'hardware' ? '/hardware' : '/kitchens';
    const fallbackLabel = catalogue === 'hardware' ? 'Hardware Catalogue' : 'Kitchens Catalogue';

    return (
      <div className="product-not-found container--wide">
        <SEOHead
          title="Product Not Found | Surfuria"
          description="The requested product could not be located in our catalogue."
          canonicalUrl={`https://surfuria.com/${catalogue}`}
          robots="noindex, follow"
        />
        <div className="product-not-found__card">
          <span className="product-not-found__eyebrow">CATALOGUE NAVIGATION</span>
          <h1 className="product-not-found__title">Product Not Found</h1>
          <p className="product-not-found__desc">
            The requested item may have been relocated or updated in our catalogue.
            Browse our verified collections below.
          </p>
          <Button to={fallbackPath} variant="bronze">
            Return to {fallbackLabel}
          </Button>
        </div>
      </div>
    );
  }

  const catalogueName = catalogue === 'hardware' ? 'Hardware' : 'Kitchens';
  const catalogueUrl = catalogue === 'hardware' ? '/hardware' : '/kitchens';
  const categoryUrl = `${catalogueUrl}#${category.slug}`;
  const enquiryUrl = `/contact?type=hardware-product&product=${product.slug}`;
  const canonicalUrl = `https://surfuria.com/${catalogue}/${category.slug}/${product.slug}`;
  const whatsAppUrl = buildWhatsAppUrl(
    `Hi Surfuria! I'm interested in the ${product.name}. Can you share specifications and pricing?`
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      buildProductSchema({
        name: product.name,
        description: product.description || product.shortDescription,
        image: product.cardImage,
        url: canonicalUrl,
        categoryName: category.name,
        sku: product.slug,
      }),
      buildBreadcrumbSchema([
        { name: 'Home', url: 'https://surfuria.com/' },
        { name: catalogueName, url: `https://surfuria.com/${catalogue}` },
        { name: category.name, url: `https://surfuria.com/${catalogue}#${category.slug}` },
        { name: product.name, url: canonicalUrl },
      ]),
    ],
  };

  return (
    <article className="product-detail-page">
      <SEOHead
        title={`${product.name} | ${category.name} | Surfuria`}
        description={product.shortDescription || product.description}
        canonicalUrl={canonicalUrl}
        ogType="product"
        ogImage={product.cardImage}
        ogImageAlt={product.name}
        jsonLd={jsonLd}
      />
      <div className="container--wide">
        {/* ==================================================================
            A. BREADCRUMBS
            ================================================================== */}
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <ol className="product-breadcrumbs__list">
            <li className="product-breadcrumbs__item">
              <Link to="/" className="product-breadcrumbs__link">Home</Link>
            </li>
            <li className="product-breadcrumbs__sep" aria-hidden="true">/</li>
            <li className="product-breadcrumbs__item">
              <Link to={catalogueUrl} className="product-breadcrumbs__link">{catalogueName}</Link>
            </li>
            <li className="product-breadcrumbs__sep" aria-hidden="true">/</li>
            <li className="product-breadcrumbs__item">
              <Link to={categoryUrl} className="product-breadcrumbs__link">{category.name}</Link>
            </li>
            <li className="product-breadcrumbs__sep" aria-hidden="true">/</li>
            <li className="product-breadcrumbs__item is-current" aria-current="page">
              <span>{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* ==================================================================
            B. PRODUCT OVERVIEW (EDITORIAL SPLIT)
            ================================================================== */}
        <div className="product-detail-overview">
          {/* Left: Reusable Shared Gallery (Minimal Pagination & Non-Pill Speciality) */}
          <ProductGallery
            images={gallery}
            productName={product.name}
            speciality={product.badge}
          />

          {/* Right: Product Meta & Architectural Overview */}
          <div className="product-info-panel">
            <div className="product-info-header">
              <Link to={categoryUrl} className="product-info-category-tag">
                {category.name}
              </Link>
              <h1 className="product-info-title">{product.name}</h1>
              <p className="product-info-lead">{product.shortDescription}</p>
            </div>

            <div className="product-info-rule" aria-hidden="true" />

            {/* Extended Architectural / Engineering Description */}
            {detailedDescription && (
              <div className="product-info-description">
                <h2 className="product-info-section-title">Architectural Overview</h2>
                <p>{detailedDescription}</p>
              </div>
            )}

            {/* Available Finishes */}
            {product.finishes && product.finishes.length > 0 && (
              <div className="product-info-finishes">
                <h3 className="product-info-subtitle">Available Finishes</h3>
                <div className="product-finish-tags">
                  {product.finishes.map((finish) => (
                    <span key={finish} className="product-finish-tag">
                      <span className="product-finish-dot" aria-hidden="true" />
                      {finish}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Section */}
            <div className="product-info-actions">
              <Button
                to={enquiryUrl}
                variant="bronze"
                className="product-enquire-btn"
                icon={
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 3l5 5-5 5" />
                  </svg>
                }
              >
                Enquire About This Product
              </Button>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-whatsapp-link"
                aria-label={`Chat on WhatsApp about ${product.name}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>

              <div className="product-assurances">
                <span className="product-assurance-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Direct Factory Export Supply
                </span>
                <span className="product-assurance-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  CAD & Specification Data Sheets Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            C. VERIFIED FEATURES & SPECIFICATIONS
            ================================================================== */}
        {((product.features && product.features.length > 0) ||
          (product.specifications && product.specifications.length > 0)) && (
          <section className="product-tech-specs" aria-label="Technical Details and Specifications">
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="product-features-block">
                <h2 className="product-specs-heading">Key Features & Engineering</h2>
                <ul className="product-features-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="product-feature-item">
                      <span className="product-feature-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3.5 8.5l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="product-specs-table-block">
                <h2 className="product-specs-heading">Technical Specifications</h2>
                <dl className="product-specs-dl">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="product-specs-row">
                      <dt className="product-specs-dt">{spec.label}</dt>
                      <dd className="product-specs-dd">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </section>
        )}

        {/* ==================================================================
            D. RELATED PRODUCTS
            ================================================================== */}
        {relatedProducts.length > 0 && (
          <section className="product-related-section" aria-labelledby="related-products-heading">
            <div className="product-related-header">
              <span className="product-related-eyebrow">RELATED SELECTIONS</span>
              <h2 id="related-products-heading" className="product-related-title">
                Complementary Architectural Solutions
              </h2>
            </div>

            <div className="product-related-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

