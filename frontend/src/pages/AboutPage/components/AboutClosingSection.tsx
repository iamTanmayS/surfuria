import './AboutClosingSection.css';

import { motion, useReducedMotion } from 'motion/react';

import { ABOUT_CLOSING_DATA } from '../../../data/about/aboutPageData';
import Button from '../../../components/ui/Button';

export default function AboutClosingSection() {
  const shouldReduceMotion = useReducedMotion();
  const { mainStatement, brandSignature, cta } = ABOUT_CLOSING_DATA;

  return (
    <section className="about-closing" aria-label="Closing Brand Statement">
      <div className="container--wide about-closing__container">
        <motion.div
          className="about-closing__surface"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle architectural ambient highlight */}
          <div className="about-closing__glow" aria-hidden="true" />

          <div className="about-closing__content">
            {/* Brand Signature */}
            <span className="about-closing__signature">{brandSignature}</span>

            {/* Main Statement */}
            <h2 className="about-closing__statement">{mainStatement}</h2>

            {/* Single Contact Us Action using Established Button Animation */}
            <div className="about-closing__actions">
              <Button
                to={cta.to}
                variant="bronze"
                className="about-closing__btn"
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                }
              >
                {cta.label}
              </Button>
            </div>
          </div>

          {/* Restrained Architectural Low-Contrast Wordmark Background */}
          <div className="about-closing__wordmark-wrap" aria-hidden="true">
            <span className="about-closing__wordmark">SURFURIA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
