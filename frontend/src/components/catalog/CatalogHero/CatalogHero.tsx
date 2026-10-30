import { motion, useReducedMotion } from 'motion/react';
import HeroContent from '../../ui/HeroContent';
import './CatalogHero.css';

export interface CatalogHeroProps {
  eyebrow?: string;
  headline?: string;
  supportingCopy?: string;
  image?: string;
  imageAlt?: string;
  processLineItems?: string[];
  primaryCtaLabel?: string;
  primaryCtaTargetId?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  onPrimaryCtaClick?: () => void;
  className?: string;
}

export default function CatalogHero({
  eyebrow,
  headline = 'Designed for Durability',
  supportingCopy = 'Premium furniture hardware engineered for modern kitchens, wardrobes, and furniture.',
  image = 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749955/6_1_SURFURIA_HARDWARE_xuab5u.png',
  imageAlt = 'Surfuria architectural hardware showcasing precision hinges, drawer slides, handles, and tandem systems',
  processLineItems,
  primaryCtaLabel = 'Explore Catalogue',
  primaryCtaTargetId = 'hardware-catalogue',
  secondaryCtaLabel = 'Request Specifications',
  secondaryCtaLink = '/contact',
  onPrimaryCtaClick,
  className = '',
}: CatalogHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const handlePrimaryClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (primaryCtaTargetId) {
      const target = document.getElementById(primaryCtaTargetId);
      if (target) {
        target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
      }
    }
    if (onPrimaryCtaClick) {
      onPrimaryCtaClick();
    }
  };

  return (
    <section className={`catalog-hero ${className}`.trim()} aria-label={headline}>
      {/* Background Architectural Media */}
      <div className="catalog-hero__media" aria-hidden="true">
        <img
          src={image}
          alt={imageAlt}
          className="catalog-hero__img"
          loading="eager"
          decoding="async"
        />
        <div className="catalog-hero__scrim" />
      </div>

      {/* Editorial Content Frame with Reusable Hero Content */}
      <div className="container--wide catalog-hero__content-wrap">
        <motion.div
          className="catalog-hero__content"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroContent
            eyebrow={eyebrow}
            title={headline}
            subtitle={supportingCopy}
            buttonLabel={primaryCtaLabel}
            buttonAction={handlePrimaryClick}
            secondaryButtonLabel={secondaryCtaLabel}
            secondaryButtonAction={secondaryCtaLink}
          >
            {processLineItems && processLineItems.length > 0 && (
              <div className="catalog-hero__process-line" aria-label="Hardware categories">
                {processLineItems.map((item, index) => (
                  <span key={item} className="catalog-hero__process-group">
                    <span className="catalog-hero__process-item">{item}</span>
                    {index < processLineItems.length - 1 && (
                      <span className="catalog-hero__process-dot" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </HeroContent>
        </motion.div>
      </div>
    </section>
  );
}
