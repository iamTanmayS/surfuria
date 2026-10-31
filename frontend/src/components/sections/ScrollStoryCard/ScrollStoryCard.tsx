import './ScrollStoryCard.css';

import { buildCloudinarySrcSet, buildCloudinaryUrl } from '../../../lib/cloudinary';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

import Button from '../../ui/Button';
import type { ScrollStoryCardProps } from './types';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStoryCard({
  id,
  eyebrow,
  headline,
  supportingCopy,
  items,
  className = '',
}: ScrollStoryCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const itemCount = items.length;

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!containerRef.current || !pinnedRef.current || itemCount <= 1) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ----------------------------------------------------------------------
      // DESKTOP & TABLET (>= 769px): Pinned Architectural Film Sequence
      // ----------------------------------------------------------------------
      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${(itemCount - 1) * 115}%`,
            pin: pinnedRef.current,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Setup initial state: Panel 0 active, Panels 1..N hidden
        for (let i = 1; i < itemCount; i++) {
          gsap.set(`.ssc-img-layer-${i}`, {
            autoAlpha: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.ssc-img-layer-${i} .scroll-story-frame-img`, {
            scale: 1.07,
          });
          gsap.set(`.ssc-text-layer-${i}`, {
            autoAlpha: 0,
            y: 20,
            pointerEvents: 'none',
          });
        }
        gsap.set('.ssc-img-layer-0', {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set('.ssc-img-layer-0 .scroll-story-frame-img', {
          scale: 1.0,
        });
        gsap.set('.ssc-text-layer-0', {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
        });

        // Hold initial panel 0 slightly before first transition
        tl.to({}, { duration: 0.35 });

        // Sequence transitions: 0 -> 1, 1 -> 2, ..., (N-2) -> (N-1)
        for (let i = 0; i < itemCount - 1; i++) {
          const stepStart = 0.5 + i * 1.15;

          // Outgoing scene
          tl.to(
            `.ssc-img-layer-${i}`,
            { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' },
            stepStart
          )
            .to(
              `.ssc-img-layer-${i} .scroll-story-frame-img`,
              { scale: 0.98, duration: 0.6, ease: 'power2.inOut' },
              stepStart
            )
            .to(
              `.ssc-text-layer-${i}`,
              { autoAlpha: 0, y: -14, duration: 0.5, ease: 'power2.in', pointerEvents: 'none' },
              stepStart
            );

          // Incoming scene
          tl.fromTo(
            `.ssc-img-layer-${i + 1}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out' },
            stepStart + 0.1
          )
            .fromTo(
              `.ssc-img-layer-${i + 1} .scroll-story-frame-img`,
              { scale: 1.07 },
              { scale: 1.0, duration: 0.9, ease: 'power2.out' },
              stepStart + 0.1
            )
            .fromTo(
              `.ssc-text-layer-${i + 1}`,
              { autoAlpha: 0, y: 18, pointerEvents: 'none' },
              { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.65, ease: 'power2.out' },
              stepStart + 0.18
            );
        }

        // Hold final panel visibly before unpinning
        tl.to({}, { duration: 0.5 });
      });

      // ----------------------------------------------------------------------
      // MOBILE (<= 768px): Compact Touch-Tuned Pinned Sequence
      // Exact Match to HeroFeatureSequence / CapabilitiesSection Mobile Flow
      // ----------------------------------------------------------------------
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${(itemCount - 1) * 85}%`,
            pin: pinnedRef.current,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Setup initial state: Panel 0 active, Panels 1..N hidden
        for (let i = 1; i < itemCount; i++) {
          gsap.set(`.ssc-img-layer-${i}`, {
            autoAlpha: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.ssc-img-layer-${i} .scroll-story-frame-img`, {
            scale: 1.07,
          });
          gsap.set(`.ssc-text-layer-${i}`, {
            autoAlpha: 0,
            y: 10,
            pointerEvents: 'none',
          });
        }
        gsap.set('.ssc-img-layer-0', {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set('.ssc-img-layer-0 .scroll-story-frame-img', {
          scale: 1.0,
        });
        gsap.set('.ssc-text-layer-0', {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
        });

        // Hold panel 0 slightly before first step
        tl.to({}, { duration: 0.3 });

        // Mobile steps: 0 -> 1, 1 -> 2, ..., (N-2) -> (N-1)
        for (let i = 0; i < itemCount - 1; i++) {
          const stepAt = 1.0 + i * 1.0;

          // 1. Outgoing scene: image fades & text drifts upward
          tl.to(`.ssc-img-layer-${i}`, { autoAlpha: 0, duration: 0.35 }, stepAt);
          tl.to(
            `.ssc-text-layer-${i}`,
            { autoAlpha: 0, y: -8, duration: 0.3, pointerEvents: 'none' },
            stepAt
          );

          // 2. Incoming image: curtain wipe from bottom & scale settle
          tl.fromTo(
            `.ssc-img-layer-${i + 1}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 },
            stepAt + 0.08
          );
          tl.fromTo(
            `.ssc-img-layer-${i + 1} .scroll-story-frame-img`,
            { scale: 1.07 },
            { scale: 1.0, duration: 0.6 },
            stepAt + 0.08
          );

          // 3. Incoming text: graceful reveal from below
          tl.fromTo(
            `.ssc-text-layer-${i + 1}`,
            { autoAlpha: 0, y: 10, pointerEvents: 'none' },
            { autoAlpha: 1, y: 0, duration: 0.4, pointerEvents: 'auto' },
            stepAt + 0.18
          );
        }

        // Hold final panel visibly before unpinning
        tl.to({}, { duration: 0.6 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion, itemCount]);

  return (
    <section
      id={id}
      className={`scroll-story-section ${className}`.trim()}
      aria-label={headline || eyebrow || 'Process Showcase'}
    >
      {/* Intro Header */}
      {(eyebrow || headline || supportingCopy) && (
        <div className="container--wide scroll-story-intro">
          {eyebrow && <span className="scroll-story-eyebrow">{eyebrow}</span>}
          {headline && <h2 className="scroll-story-headline">{headline}</h2>}
          {supportingCopy && <p className="scroll-story-supporting">{supportingCopy}</p>}
        </div>
      )}

      {/* Pinned Architectural Showcase (Active on Desktop & Mobile unless reduced motion is preferred) */}
      {!shouldReduceMotion ? (
        <div ref={containerRef} className="scroll-story-container">
          <div ref={pinnedRef} className="scroll-story-pinned-stage">
            <div className="container--wide scroll-story-frame-wrap">
              <div className="scroll-story-frame">
                {/* Left / Top: Architectural Media Viewport */}
                <div className="scroll-story-media-viewport">
                  {items.map((item, idx) => {
                    const isContain = item.imageFit === 'contain';
                    return (
                      <div
                        key={item.id}
                        className={`scroll-story-img-layer ssc-img-layer-${idx} ${
                          isContain ? 'is-contain' : ''
                        }`}
                        aria-hidden={idx !== 0}
                      >
                        <img
                          src={buildCloudinaryUrl(item.image, { width: 1000, quality: 'auto', format: 'auto' })}
                          srcSet={buildCloudinarySrcSet(item.image, [480, 768, 1000]) || undefined}
                          sizes="(max-width: 768px) 100vw, 55vw"
                          alt={item.imageAlt || item.title}
                          className="scroll-story-frame-img"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                        <div className="scroll-story-media-scrim" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>

                {/* Right / Bottom: Editorial Content Viewport */}
                <div className="scroll-story-content-viewport">
                  {items.map((item, idx) => (
                    <article
                      key={item.id}
                      className={`scroll-story-text-layer ssc-text-layer-${idx}`}
                      aria-label={`${item.title} — ${item.badge || item.stepNumber || idx + 1}`}
                    >
                     

                      <h3 className="scroll-story-title">{item.title}</h3>

                      <div className="scroll-story-rule" aria-hidden="true" />

                      <p className="scroll-story-desc">{item.description}</p>
                      {item.detail && <p className="scroll-story-detail">{item.detail}</p>}

                      {item.linkTo && item.linkLabel && (
                        <div className="scroll-story-action-wrap">
                          <Button
                            to={item.linkTo}
                            variant="bronze"
                            className="scroll-story-cta-btn"
                            aria-label={`${item.title} — ${item.linkLabel}`}
                            icon={
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            }
                          >
                            {item.linkLabel}
                          </Button>
                        </div>
                      )}

                      <div className="scroll-story-footer">
                        <span className="scroll-story-counter">
                          {item.stepNumber || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)}{' '}
                          <span style={{ opacity: 0.4 }}>
                            / {itemCount < 10 ? `0${itemCount}` : `${itemCount}`}
                          </span>
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Accessible fallback for reduced motion preference */
        <div className="scroll-story-fallback-flow container--wide">
          {items.map((item) => {
            const isContain = item.imageFit === 'contain';
            return (
              <motion.article
                key={item.id}
                className={`scroll-story-fallback-card ${isContain ? 'is-contain' : ''}`}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="scroll-story-fallback-media">
                  <img
                    src={buildCloudinaryUrl(item.image, { width: 700, quality: 'auto', format: 'auto' })}
                    srcSet={buildCloudinarySrcSet(item.image, [360, 520, 700]) || undefined}
                    sizes="(max-width: 680px) 100vw, 50vw"
                    alt={item.imageAlt || item.title}
                    className="scroll-story-fallback-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="scroll-story-fallback-body">
                  {item.badge && (
                    <span className="scroll-story-fallback-badge">{item.badge}</span>
                  )}
                  <h3 className="scroll-story-fallback-title">{item.title}</h3>
                  <p className="scroll-story-fallback-desc">{item.description}</p>
                  {item.detail && <p className="scroll-story-detail">{item.detail}</p>}
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}
