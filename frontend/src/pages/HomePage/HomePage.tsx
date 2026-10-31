import { useMemo } from 'react';
import HeroSection from './components/hero/HeroSection';
import HeroFeatureSequence from './components/hero/HeroFeatureSequence';
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

      {/* 1. Cinematic Full-Bleed Hero Slideshow */}
      <HeroSection scrollTargetId="hero-features" />

      {/* 2. Craftsmanship & Engineering Pinned Feature Story */}
      <HeroFeatureSequence />

      {/* 3. Editorial Product Categories Section */}
      <ProductCategories id="collections-section" />

      {/* 4. Kitchens & About Surfuria Editorial Section */}
      <BrandEditorialSection id="brand-editorial-section" />
    </div>
  );
}
