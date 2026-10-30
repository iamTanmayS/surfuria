import React from 'react';
import { RESPONSE_TIME_MESSAGE, RESPONSE_TIME_SUPPORTING } from '../../../../config/whatsapp';
import './ContactHero.css';

/**
 * SURFURIA — Cinematic Contact Hero
 *
 * Immersive architectural studio presentation with editorial typography,
 * genuine project showcase imagery, and response-time reassurance.
 */
export default function ContactHero() {
  const handleScrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.getElementById('enquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sf-contact-hero" aria-labelledby="contact-hero-title">
      <div className="sf-contact-hero__badge">
        <span className="sf-contact-hero__dot" aria-hidden="true" />
        <span>SURFURIA ARCHITECTURAL STUDIO</span>
      </div>

      <h1 id="contact-hero-title" className="sf-contact-hero__title">
        Let's create a space that feels like yours.
      </h1>

      <p className="sf-contact-hero__lead">
        Tell us what you're planning. Whether it's a kitchen, furniture hardware, or a custom project, we'll help you find the right solution.
      </p>

      {/* Cinematic Architectural Image Panel */}
      <div className="sf-contact-hero__image-wrap">
        <img
          src="/images/kitchen-editorial.jpg"
          alt="Surfuria architectural modular kitchen showcase"
          className="sf-contact-hero__image"
          loading="eager"
        />
        <div className="sf-contact-hero__image-scrim" aria-hidden="true" />
        <div className="sf-contact-hero__image-caption">
          <span>Factory-Engineered Precision • Architectural Craft</span>
        </div>
      </div>

      {/* Reassurance Badge */}
      <div className="sf-contact-hero__reassurance" aria-label="Response time reassurance">
        <div className="sf-contact-hero__reassurance-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="sf-contact-hero__reassurance-body">
          <strong className="sf-contact-hero__reassurance-title">
            {RESPONSE_TIME_MESSAGE}
          </strong>
          <span className="sf-contact-hero__reassurance-sub">
            {RESPONSE_TIME_SUPPORTING}
          </span>
        </div>
      </div>

      {/* Mobile Jump to Form Button (Smooth Scroll) */}
      <a
        href="#enquiry-form"
        onClick={handleScrollToForm}
        className="sf-contact-hero__mobile-jump"
        aria-label="Scroll to enquiry form"
      >
        <span>Start Your Enquiry</span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </header>
  );
}
