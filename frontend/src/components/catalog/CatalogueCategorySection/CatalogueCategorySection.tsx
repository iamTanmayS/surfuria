import type { ProductCategory, Product } from '../../../data/products/types';
import ProductCarousel from '../ProductCarousel/ProductCarousel';
import './CatalogueCategorySection.css';

export interface CatalogueCategorySectionProps {
  category: ProductCategory;
  products: Product[];
  variant?: 'standard' | 'editorial';
  className?: string;
}

export default function CatalogueCategorySection({
  category,
  products,
  variant = 'standard',
  className = '',
}: CatalogueCategorySectionProps) {
  // If a category has no products, omit it gracefully from the public catalogue
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      id={category.slug}
      className={`catalog-category-section catalog-category-section--${variant} ${className}`.trim()}
      aria-labelledby={`heading-${category.slug}`}
      data-category-slug={category.slug}
    >
      <div className="container--wide">
        {/* Category Header */}
        <div className="catalog-category-header">
          {category.badge && (
            <span className="catalog-category-eyebrow">{category.badge}</span>
          )}
          <h2 id={`heading-${category.slug}`} className="catalog-category-title">
            {category.name}
          </h2>
          {category.description && (
            <p className="catalog-category-desc">{category.description}</p>
          )}
        </div>

        {/* Swipeable Product Carousel / Grid Track */}
        <ProductCarousel
          products={products}
          categorySlug={category.slug}
          variant={variant}
        />
      </div>
    </section>
  );
}

