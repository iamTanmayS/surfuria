import './KitchenHero.css';

import { motion, useReducedMotion } from 'motion/react';

import HeroContent from '../../../../components/ui/HeroContent';

interface KitchenHeroProps {
  onExploreClick?: () => void;
}

export default function KitchenHero({ onExploreClick }: KitchenHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToConfigurations = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = document.getElementById('configurations');
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
    if (onExploreClick) onExploreClick();
  };

  return (
    <section className="kitchen-hero" aria-label="Surfuria Kitchens">
      {/* Background Architectural Media */}
      <div className="kitchen-hero__media" aria-hidden="true">
        <img
          src="https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750002/21_SURFURIA_KITCHEN_hv0bfl.png"
          alt="Surfuria architectural modular kitchen with monolithic island and bespoke cabinetry"
          className="kitchen-hero__img"
          loading="eager"
          decoding="async"
        />
        <div className="kitchen-hero__scrim" />
      </div>

      {/* Editorial Content Frame with Reusable Hero Content */}
      <div className="container--wide kitchen-hero__content-wrap">
        <motion.div
          className="kitchen-hero__content"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroContent
            title="Custom Kitchens & Furniture. Built For Your Space."
            subtitle="Thoughtfully crafted kitchens, premium materials, and lasting functionality."
            buttonLabel="Explore Configurations"
            buttonAction={handleScrollToConfigurations}
            secondaryButtonLabel="Book Consultation"
            secondaryButtonAction="/contact"
          />
        </motion.div>
      </div>
    </section>
  );
}
