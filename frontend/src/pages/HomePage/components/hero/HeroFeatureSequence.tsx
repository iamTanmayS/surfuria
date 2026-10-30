import { HERO_FEATURES, type HeroFeatureItem } from './heroFeatureData';
import { buildCloudinaryUrl, buildCloudinarySrcSet } from '../../../../lib/cloudinary';
import './HeroFeatureSequence.css';

interface HeroFeatureSequenceProps {
  features?: readonly HeroFeatureItem[];
}

export default function HeroFeatureSequence({
  features = HERO_FEATURES,
}: HeroFeatureSequenceProps) {
  return (
    <div className="hero-feature-stage" aria-label="Surfuria Craftsmanship and Engineering">
      {/* Permanent, rock-solid architectural master frame */}
      <div className="hero-feature-frame">
        {/* Left 55%: Architectural Image Viewport */}
        <div className="hero-feature-media-viewport">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`hero-feature-image-layer hero-feature-image-layer-${index}`}
              data-index={index}
            >
              <img
                src={buildCloudinaryUrl(feature.image, { width: 1000, quality: 'auto', format: 'auto' })}
                srcSet={buildCloudinarySrcSet(feature.image, [480, 768, 1000]) || undefined}
                sizes="(max-width: 860px) 100vw, 55vw"
                alt={feature.imageAlt}
                className="hero-feature-image"
                style={{
                  objectPosition: feature.focalPoint || 'center center',
                }}
                loading="lazy"
                decoding="async"
              />
              <div className="hero-feature-media-overlay" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Right 45%: Editorial Text Viewport */}
        <div className="hero-feature-content-viewport">
          {features.map((feature, index) => (
            <article
              key={feature.id}
              className={`hero-feature-text-layer hero-feature-text-layer-${index}`}
              data-index={index}
              aria-label={`${feature.eyebrow} - ${feature.heading}`}
            >
              <div className="hero-feature-header">
                <span className="hero-feature-eyebrow">
                  <span className="hero-feature-eyebrow-pip" aria-hidden="true" />
                  {feature.eyebrow}
                </span>
              </div>

              <h3 className="hero-feature-heading">{feature.heading}</h3>

              <div className="hero-feature-rule" aria-hidden="true" />

              <p className="hero-feature-description">{feature.description}</p>

              <div className="hero-feature-footer">
                <span className="hero-feature-step-counter">
                  {feature.stepNumber} <span style={{ opacity: 0.5 }}>/ 0{features.length}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
