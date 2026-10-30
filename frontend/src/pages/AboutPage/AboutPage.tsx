import { useMemo, lazy, Suspense } from 'react';
import AboutHero from './components/AboutHero';
import BrandIntroduction from './components/BrandIntroduction';
import CapabilitiesSection from './components/CapabilitiesSection';
import MaterialsFinishesSection from './components/MaterialsFinishesSection';
import QualitySection from './components/QualitySection';
import AboutClosingSection from './components/AboutClosingSection';
import { SEOHead, buildBreadcrumbSchema, buildOrganizationSchema } from '../../components/seo';
import './AboutPage.css';

// Lazy-load Three.js 3D Globe section to keep main initial bundle lightweight
const GlobalReachSection = lazy(() => import('./components/GlobalReachSection'));

export default function AboutPage() {
  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildOrganizationSchema(),
        buildBreadcrumbSchema([
          { name: 'Home', url: 'https://surfuria.com/' },
          { name: 'About', url: 'https://surfuria.com/about' },
        ]),
      ],
    };
  }, []);

  return (
    <div className="about-page">
      <SEOHead
        title="About Surfuria | Architectural Hardware & Modular Kitchen Craft"
        description="Explore Surfuria's commitment to precision kinematic hardware, factory-engineered modular cabinetry, durable substrates, and architectural excellence."
        canonicalUrl="https://surfuria.com/about"
        ogType="website"
        jsonLd={jsonLd}
      />

      {/* 1. Cinematic About Hero */}
      <AboutHero />

      {/* 2. Who We Are Editorial Split */}
      <BrandIntroduction />

      {/* 3. Our Capabilities Staggered Sequence */}
      <CapabilitiesSection />

      {/* 4. Materials and Finishes Showcase */}
      <MaterialsFinishesSection />

      {/* 5. Quality, Precision and Functionality Philosophy */}
      <QualitySection />

      {/* 6. Manufacturing, Sourcing & Global Reach (Lazy-loaded Three.js 3D Globe) */}
      <Suspense
        fallback={
          <section className="about-reach about-reach--loading" aria-label="Loading interactive globe">
            <div
              className="about-reach__container"
              style={{
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  color: 'var(--color-bronze, #b77b3f)',
                  fontSize: '0.95rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Loading Interactive Global Corridors...
              </div>
            </div>
          </section>
        }
      >
        <GlobalReachSection />
      </Suspense>

      {/* 7. Closing Statement & Dual Actions */}
      <AboutClosingSection />
    </div>
  );
}
