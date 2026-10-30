import { useMemo } from 'react';
import KitchenHero from './components/KitchenHero/KitchenHero';
import MaterialsFinishesSection from '../AboutPage/components/MaterialsFinishesSection';
import {
  KITCHEN_SUBSTRATES_DATA,
  KITCHEN_FINISHES_DATA,
} from '../../data/kitchens/kitchenMaterialsData';
import KitchenProcessSteps from './components/KitchenProcessSteps/KitchenProcessSteps';
import KitchenConfigurationsShowcase from './components/KitchenConfigurationsShowcase/KitchenConfigurationsShowcase';
import KitchenEnquiryCTA from './components/KitchenEnquiryCTA/KitchenEnquiryCTA';
import { SEOHead, buildBreadcrumbSchema, buildCollectionSchema } from '../../components/seo';
import './KitchensPage.css';

export default function KitchensPage() {
  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildCollectionSchema(
          'Modular Kitchen Designs & Packages',
          'Discover factory-engineered modular kitchens in Single Wall, L-Shaped, Island, and U-Shaped formats with acrylic shutters, prelam carcasses, and precision hardware.',
          'https://surfuria.com/kitchens'
        ),
        buildBreadcrumbSchema([
          { name: 'Home', url: 'https://surfuria.com/' },
          { name: 'Kitchens', url: 'https://surfuria.com/kitchens' },
        ]),
      ],
    };
  }, []);

  return (
    <div className="kitchens-page">
      <SEOHead
        title="Modular Kitchen Designs & Configurations | Surfuria"
        description="Discover factory-engineered modular kitchens in Single Wall, L-Shaped, Island, and U-Shaped layouts with acrylic shutters, prelam carcasses, and precision hardware."
        canonicalUrl="https://surfuria.com/kitchens"
        ogType="website"
        jsonLd={jsonLd}
      />

      {/* 1. Architectural Hero with Large Photography & Process Line */}
      <KitchenHero />

      {/* 2. Considered Kitchen Materials & Finishes Selection Studio */}
      <MaterialsFinishesSection
        id="materials"
        eyebrow="KITCHEN MATERIALS & FINISHES"
        headline="Engineered Substrates. Distinctive Finishes."
        supportingCopy="SURFURIA kitchen cabinetry is precision-machined from certified moisture-resistant core boards and finished with premium architectural surfaces engineered for culinary longevity."
        substrates={KITCHEN_SUBSTRATES_DATA}
        finishes={KITCHEN_FINISHES_DATA}
      />

      {/* 3. Steps to Your Dream Kitchen — Primary Scroll-Driven Animation Section */}
      <KitchenProcessSteps />

      {/* 4. Factory-Engineered Packages: Modular Kitchen Configurations (Single Wall, L-Shaped, Island, U-Shaped) */}
      <KitchenConfigurationsShowcase />

      {/* 5. Closing Section and Enquiry CTA */}
      <KitchenEnquiryCTA />
    </div>
  );
}
