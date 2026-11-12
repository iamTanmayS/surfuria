import './ContactImageCarousel.css';

import { buildCloudinarySrcSet, buildCloudinaryUrl } from '../../../../lib/cloudinary';
import { useEffect, useState } from 'react';

/**
 * High-quality Surfuria kitchen and architectural interior photographs.
 * Automatically rotates every 2.5 seconds with smooth crossfade transitions.
 */
const CAROUSEL_IMAGES = [
  {
    url: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466196/L_SHAPED_ge1vws.png',
    alt: 'Surfuria L-Shaped architectural kitchen design with acrylic finish and kinematic hardware',
    caption: 'Factory-Engineered Precision · Architectural Craft',
  },
  {
    url: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466166/ISLAND_kn49pa.png',
    alt: 'Surfuria Island modular kitchen suite with monolithic stone finish and soft-close motion',
    caption: 'Monolithic Surface Design · Integrated Ergonomics',
  },
  {
    url: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466245/U_SHAPED_rpuh3w.png',
    alt: 'Surfuria U-Shaped modular kitchen configuration with high-capacity tandem storage',
    caption: 'Kinematic Storage Systems · Turnkey Manufacturing',
  },
  {
    url: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359601/1_ISLAND_vwyljd.png',
    alt: 'Surfuria architectural island kitchen lighting and cabinetry alignment',
    caption: 'Architectural Carcass Alignment · Daily Durability',
  },
  {
    url: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466243/SINGLE_WALL_gjh1lh.png',
    alt: 'Surfuria Single Wall contemporary modular kitchen',
    caption: 'Spatial Efficiency · Premium Architectural Finishes',
  },
];

export default function ContactImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Respect user's preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) return;

    // Tranquil 7-second rotation allowing the user to focus on the enquiry form
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % CAROUSEL_IMAGES.length;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="cp-image-carousel"
      aria-label="Surfuria architectural kitchen project gallery"
      role="region"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="cp-image-carousel__viewport">
        {CAROUSEL_IMAGES.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isPrevious = idx === prevIndex;
          return (
            <div
              key={item.url}
              className={`cp-image-carousel__slide ${isActive ? 'is-active' : isPrevious ? 'is-previous' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                src={buildCloudinaryUrl(item.url, { width: 1000, quality: 'auto', format: 'auto' })}
                srcSet={buildCloudinarySrcSet(item.url, [480, 768, 1000]) || undefined}
                sizes="(max-width: 768px) 100vw, 45vw"
                alt={item.alt}
                className="cp-image-carousel__img"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
              <div className="cp-image-carousel__scrim" aria-hidden="true" />
              <div className="cp-image-carousel__caption">
                <span className="cp-image-carousel__caption-dot" aria-hidden="true" />
               
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

