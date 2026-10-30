import { useMemo } from 'react';
import HeroSection from './components/hero/HeroSection';
import HeroScrollTransition from './components/hero/HeroScrollTransition';
import { ProductCategories } from './components/ProductCategories';
import { BrandEditorialSection } from './components/BrandEditorialSection';
import { SEOHead, buildOrganizationSchema, buildWebSiteSchema } from '../../components/seo';

export default function HomePage() {
  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [buildOrganizationSchema(), buildWebSiteSchema()],
    };
  }, []);

  return (
    <div>
      <SEOHead
        title="Surfuria | Premium Furniture Hardware & Modular Kitchens"
        description="Surfuria designs and manufactures architectural furniture hardware, precision hydraulic hinges, tandem drawer systems, and factory-engineered modular kitchens."
        canonicalUrl="https://surfuria.com/"
        ogType="website"
        jsonLd={jsonLd}
      />

      {/* 1. Kabizzu-Inspired Scroll-Driven Hero Transition */}
      <HeroScrollTransition>
        <HeroSection scrollTargetId="collections-section" />
      </HeroScrollTransition>

      {/* 2. Editorial Product Categories Section */}
      <ProductCategories id="collections-section" />

      {/* 3. Kitchens & About Surfuria Editorial Section */}
      <BrandEditorialSection id="brand-editorial-section" />
    </div>
  );
}
