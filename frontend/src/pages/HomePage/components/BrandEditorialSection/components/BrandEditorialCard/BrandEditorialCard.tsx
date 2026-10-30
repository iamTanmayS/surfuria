import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { EditorialCardItem } from '../../brandEditorial.types';
import './BrandEditorialCard.css';

interface BrandEditorialCardProps {
  card: EditorialCardItem;
  index: number;
}

export default function BrandEditorialCard({ card, index }: BrandEditorialCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="brand-editorial-card"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : 0.1 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Top Row: Circular Arrow Button on Right */}
      <div className="brand-editorial-card__top">
        <Link
          to={card.ctaTo}
          className="brand-editorial-card__arrow-btn"
          aria-label={`${card.ctaLabel} - ${card.heading}`}
        >
          <span
            className="brand-editorial-card__arrow-icon"
            aria-hidden="true"
          >
            <svg
              width="11"
              height="11"
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
      </div>

      {/* Content Area */}
      <div className="brand-editorial-card__body">
        <h3 className="brand-editorial-card__heading">{card.heading}</h3>
        <p className="brand-editorial-card__description">
          {card.description}
        </p>
      </div>

      {/* Card Footer: Outlined Pill Button matching Contact Us Interaction Language */}
      <div className="brand-editorial-card__footer">
        <Link
          to={card.ctaTo}
          className="brand-editorial-cta-btn"
          aria-label={`${card.ctaLabel} - Navigate to ${card.heading}`}
        >
          <span className="brand-editorial-cta-btn__text">
            {card.ctaLabel}
          </span>
          <span
            className="brand-editorial-cta-btn__icon"
            aria-hidden="true"
          >
            <svg
              width="10"
              height="10"
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
      </div>
    </motion.article>
  );
}

