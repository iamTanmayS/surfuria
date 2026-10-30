import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { KitchensPanelData } from '../../brandEditorial.types';
import './BrandKitchenShowcase.css';

interface BrandKitchenShowcaseProps {
  kitchens: KitchensPanelData;
}

export default function BrandKitchenShowcase({ kitchens }: BrandKitchenShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      className="brand-editorial__kitchen-panel"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={panelTransition}
    >
      {/* Architectural Background Photography */}
      <div className="brand-editorial__kitchen-image-wrap">
        <img
          src={kitchens.image}
          alt={kitchens.imageAlt}
          className="brand-editorial__kitchen-image"
          style={{ objectPosition: kitchens.focalPoint || '50% 50%' }}
          loading="eager"
        />
      </div>

      {/* Scrims to preserve text and button legibility */}
      <div className="brand-editorial__kitchen-scrim-top" aria-hidden="true" />
      <div className="brand-editorial__kitchen-scrim-bottom" aria-hidden="true" />

      {/* Upper Action Pill: Explore Kitchens ↗ */}
      <Link
        to={kitchens.actionTo}
        className="brand-editorial-pill-action"
        aria-label={`${kitchens.actionLabel} - View modular kitchens`}
      >
        <span className="brand-editorial-pill-action__text">
          {kitchens.actionLabel}
        </span>
        <span className="brand-editorial-pill-action__icon" aria-hidden="true">
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12L12 4M12 4H6M12 4V10" />
          </svg>
        </span>
      </Link>

      {/* Bottom Descriptors: Compact 3-Part Strip */}
      <div
        className="brand-editorial__descriptors"
        role="list"
        aria-label="Kitchen design principles"
      >
        {kitchens.descriptors.map((desc, idx) => (
          <span
            key={desc}
            className="brand-editorial__descriptor-item"
            role="listitem"
          >
            {idx > 0 && (
              <span
                className="brand-editorial__descriptor-bullet"
                aria-hidden="true"
              >
                •
              </span>
            )}
            <span className="brand-editorial__descriptor-text">{desc}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}

