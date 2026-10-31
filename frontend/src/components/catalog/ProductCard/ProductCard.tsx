import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../../data/products/types';
import { buildCloudinaryUrl, buildCloudinarySrcSet } from '../../../lib/cloudinary';
import './ProductCard.css';

export interface ProductCardData {
  id?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  destination: string;
  badge?: string;
  actionText?: string;
}

export interface ProductCardProps {
  /** Directly pass a Product model (used by Hardware, Kitchens, Related Products) */
  product?: Product;
  categorySlug?: string;

  /** Or pass a generic card data object (used by Home Product Categories) */
  card?: ProductCardData;

  /** Individual override props */
  id?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  destination?: string;
  badge?: string;
  actionText?: string;

  /** Stagger index (kept for compatibility; all indices now have equal dimensions) */
  staggerIndex?: number;

  /** Suppress link navigation when carousel is actively dragged */
  isDraggingRef?: React.RefObject<boolean | null>;

  className?: string;
}

export default function ProductCard({
  product,
  categorySlug,
  card,
  id,
  title: propTitle,
  subtitle: propSubtitle,
  image: propImage,
  imageAlt: propImageAlt,
  destination: propDestination,
  badge: propBadge,
  actionText: propActionText,
  staggerIndex,
  isDraggingRef,
  className = '',
}: ProductCardProps) {
  // Resolve unified fields across Product, card object, or individual props
  const cardId = id || card?.id || product?.id;
  const title = propTitle || card?.title || product?.name || '';
  const subtitle = propSubtitle || card?.subtitle || product?.shortDescription || '';
  const image = propImage || card?.image || product?.cardImage || '';
  const imageAlt = propImageAlt || card?.imageAlt || title;

  // Destination calculation: prioritize product's own canonical categoryId over inherited prop
  const resolvedCategorySlug = product?.categoryId || categorySlug;
  const destination =
    propDestination ||
    card?.destination ||
    (product && resolvedCategorySlug
      ? `/${product.catalogue}/${resolvedCategorySlug}/${product.slug}`
      : '#');

  const badge = propBadge || card?.badge || product?.badge;
  const actionText =
    propActionText ||
    card?.actionText ||
    (product ? 'View Details' : 'Explore Category');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDraggingRef?.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const staggerClass =
    staggerIndex !== undefined ? `product-category-card--stagger-${staggerIndex}` : '';

  return (
    <article
      className={`sf-product-card product-category-card ${staggerClass} ${className}`.trim()}
      data-card-id={cardId}
    >
      <Link
        to={destination}
        className="sf-product-card__link product-category-card__link"
        aria-label={`${title} - ${actionText}`}
        onClick={handleClick}
        draggable={false}
      >
        {/* Full-Bleed Architectural Product Image */}
        <div className="sf-product-card__media product-category-card__media">
          <img
            src={buildCloudinaryUrl(image, { width: 600, quality: 'auto', format: 'auto' })}
            srcSet={buildCloudinarySrcSet(image, [360, 480, 600, 800]) || undefined}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            alt={imageAlt}
            className="sf-product-card__image product-category-card__image"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div
            className="sf-product-card__scrim product-category-card__scrim"
            aria-hidden="true"
          />
        </div>

        {/* Optional Architectural Category / Feature Badge */}
        {badge && (
          <div className="sf-product-card__badge-wrapper product-category-card__badge-wrapper">
            <span className="sf-product-card__badge product-category-card__badge">
              {badge}
            </span>
          </div>
        )}

        {/* Translucent Frosted Glass Information Panel */}
        <div className="sf-product-card__panel product-category-card__panel">
          <div className="sf-product-card__meta product-category-card__meta">
            <h3 className="sf-product-card__title product-category-card__title">
              {title}
            </h3>
            {subtitle && (
              <p className="sf-product-card__subtitle product-category-card__subtitle">
                {subtitle}
              </p>
            )}
          </div>

          <div className="sf-product-card__action product-category-card__action">
            <span className="sf-product-card__action-text product-category-card__action-text">
              {actionText}
            </span>
            <span
              className="sf-product-card__arrow product-category-card__arrow"
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
