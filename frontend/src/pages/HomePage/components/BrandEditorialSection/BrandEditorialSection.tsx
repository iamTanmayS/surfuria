import { motion, useReducedMotion } from 'motion/react';
import type { BrandEditorialProps } from './brandEditorial.types';
import { DEFAULT_BRAND_EDITORIAL_DATA } from './brandEditorialData';
import BrandKitchenShowcase from './components/BrandKitchenShowcase';
import BrandEditorialCard from './components/BrandEditorialCard';
import './BrandEditorialSection.css';

export default function BrandEditorialSection({
  id = 'brand-editorial',
  data = DEFAULT_BRAND_EDITORIAL_DATA,
  className = '',
}: BrandEditorialProps) {
  const shouldReduceMotion = useReducedMotion();
  const { kitchens, eyebrow, headline, description, cards } = data;

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id={id}
      className={`brand-editorial-wrapper ${className}`.trim()}
      aria-label="Kitchens and About Surfuria"
    >
      <div className="container--wide brand-editorial-grid">
        {/* --------------------------------------------------------------------
            LEFT PANEL: KITCHENS ARCHITECTURAL SHOWCASE
            -------------------------------------------------------------------- */}
        <BrandKitchenShowcase kitchens={kitchens} />

        {/* --------------------------------------------------------------------
            RIGHT PANEL: BRAND EDITORIAL & THREE COMPACT INFO CARDS
            -------------------------------------------------------------------- */}
        <motion.div
          className="brand-editorial__content-panel"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            ...panelTransition,
            delay: shouldReduceMotion ? 0 : 0.08,
          }}
        >
          {/* Main Brand Statement Area */}
          <div className="brand-editorial__statement-area">
            {eyebrow && (
              <div className="brand-editorial__eyebrow-badge">
                <span
                  className="brand-editorial__eyebrow-pip"
                  aria-hidden="true"
                />
                <span className="brand-editorial__eyebrow-text">{eyebrow}</span>
              </div>
            )}
            <h2 className="brand-editorial__headline">{headline}</h2>
            {description && (
              <p className="brand-editorial__description">{description}</p>
            )}
          </div>

          {/* Bottom Row: Three Information Cards */}
          <div
            className="brand-editorial__cards-grid"
            role="region"
            aria-label="Brand pillars and contact"
          >
            {cards.map((card, index) => (
              <BrandEditorialCard
                key={card.id}
                card={card}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
