import { useMemo } from 'react';
import {
  HARDWARE_CATEGORIES,
  HARDWARE_PRODUCTS,
  getProductsByCategoryId,
} from '../../data/products';
import {
  CatalogHero,
  CategoryPillNavigation,
  CatalogueCategorySection,
  useCategoryScrollSync,
} from '../../components/catalog';
import { SEOHead, buildBreadcrumbSchema, buildCollectionSchema } from '../../components/seo';
import './HardwarePage.css';

export default function HardwarePage() {
  // Filter only categories that have active products
  const publishedCategories = useMemo(() => {
    return HARDWARE_CATEGORIES.filter((cat) => {
      const prods = getProductsByCategoryId(cat.id, 'hardware');
      return prods.length > 0;
    }).sort((a, b) => a.sortOrder - b.sortOrder);
  }, []);

  const categorySlugs = useMemo(
    () => publishedCategories.map((c) => c.slug),
    [publishedCategories]
  );

  const { activeSlug, scrollToCategory } = useCategoryScrollSync({
    categorySlugs,
    initialActiveSlug: 'all',
  });

  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildCollectionSchema(
          'Architectural Furniture Hardware Catalogue',
          'Explore precision hydraulic soft-close hinges, tandem drawer systems, telescopic slides, architectural handles, and ergonomic corner storage accessories.',
          'https://surfuria.com/hardware'
        ),
        buildBreadcrumbSchema([
          { name: 'Home', url: 'https://surfuria.com/' },
          { name: 'Hardware', url: 'https://surfuria.com/hardware' },
        ]),
      ],
    };
  }, []);

  return (
    <div className="hardware-page">
      <SEOHead
        title="Architectural Furniture Hardware & Fittings | Surfuria"
        description="Explore precision hydraulic soft-close hinges, tandem drawer systems, telescopic slides, architectural handles, and ergonomic corner storage accessories."
        canonicalUrl="https://surfuria.com/hardware"
        ogType="website"
        jsonLd={jsonLd}
      />

      {/* 1. Large Impactful Editorial Hero with Over-Image Text */}
      <CatalogHero
        headline="Designed for Durability"
        supportingCopy="Premium furniture hardware engineered for modern kitchens, wardrobes, and furniture."
        image="https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749955/6_1_SURFURIA_HARDWARE_xuab5u.png"
        imageAlt="Surfuria architectural hardware showcasing precision hinges, drawer slides, handles, and tandem systems"
        primaryCtaTargetId="hardware-catalogue"
        primaryCtaLabel="Explore Catalogue"
        secondaryCtaLabel="Request Specifications"
        secondaryCtaLink="/contact"
      />

      {/* 2. Reusable Swipeable Category Pill Navigation (Sticky) & Catalogue Sections */}
      <div id="hardware-catalogue">
        <CategoryPillNavigation
          categories={publishedCategories}
          activeSlug={activeSlug}
          onSelectCategory={scrollToCategory}
          allLabel="All Hardware"
        />

        {/* 3. Reusable Category-by-Category Catalogue Sections with Independent Product Carousels */}
        <div className="hardware-catalogue-content">
          {publishedCategories.map((cat) => {
            const categoryProducts = HARDWARE_PRODUCTS.filter(
              (p) => p.categoryId === cat.id
            ).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

            return (
              <CatalogueCategorySection
                key={cat.id}
                category={cat}
                products={categoryProducts}
                variant="standard"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
