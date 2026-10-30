import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../../components/ui/Button';
import { CAPABILITIES_DATA } from '../../../data/about/aboutPageData';
import './CapabilitiesSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { eyebrow, headline, supportingCopy, items } = CAPABILITIES_DATA;

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!containerRef.current || !pinnedRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const itemCount = items.length; // 4 capabilities

      // ----------------------------------------------------------------------
      // DESKTOP & TABLET (>= 769px): Pinned Architectural Showcase
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
          gsap.set(`.about-cap-img-layer-${i}`, {
            autoAlpha: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.about-cap-img-layer-${i} .about-cap-frame-img`, {
            scale: 1.07,
          });
          gsap.set(`.about-cap-text-layer-${i}`, {
            autoAlpha: 0,
            y: 20,
            pointerEvents: 'none',
          });
        }
        gsap.set('.about-cap-img-layer-0', {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set('.about-cap-img-layer-0 .about-cap-frame-img', {
          scale: 1.0,
        });
        gsap.set('.about-cap-text-layer-0', {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
        });

        // Hold initial panel 0 slightly before first transition
        tl.to({}, { duration: 0.35 });

        // Desktop transitions: 0 -> 1, 1 -> 2, 2 -> 3
        const desktopTransitions = [
          { from: 0, to: 1, start: 0.5 },
          { from: 1, to: 2, start: 1.65 },
          { from: 2, to: 3, start: 2.8 },
        ];

        desktopTransitions.forEach(({ from, to, start }) => {
          // Outgoing scene
          tl.to(
            `.about-cap-img-layer-${from}`,
            { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' },
            start
          )
            .to(
              `.about-cap-img-layer-${from} .about-cap-frame-img`,
              { scale: 0.98, duration: 0.6, ease: 'power2.inOut' },
              start
            )
            .to(
              `.about-cap-text-layer-${from}`,
              { autoAlpha: 0, y: -14, duration: 0.5, ease: 'power2.in', pointerEvents: 'none' },
              start
            );

          // Incoming scene
          tl.fromTo(
            `.about-cap-img-layer-${to}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out' },
            start + 0.1
          )
            .fromTo(
              `.about-cap-img-layer-${to} .about-cap-frame-img`,
              { scale: 1.07 },
              { scale: 1.0, duration: 0.9, ease: 'power2.out' },
              start + 0.1
            )
            .fromTo(
              `.about-cap-text-layer-${to}`,
              { autoAlpha: 0, y: 18, pointerEvents: 'none' },
              { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.65, ease: 'power2.out' },
              start + 0.18
            );
        });

        // Hold final panel 3 visibly before unpinning
        tl.to({}, { duration: 0.5 });
      });

      // ----------------------------------------------------------------------
      // MOBILE (<= 768px): Compact Touch-Tuned Pinned Sequence
      // Exact Match to HeroFeatureSequence / HeroScrollTransition
      // ----------------------------------------------------------------------
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=280%',
            pin: pinnedRef.current,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Setup initial state: Panel 0 active, Panels 1..N hidden
        for (let i = 1; i < itemCount; i++) {
          gsap.set(`.about-cap-img-layer-${i}`, {
            autoAlpha: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.about-cap-img-layer-${i} .about-cap-frame-img`, {
            scale: 1.07,
          });
          gsap.set(`.about-cap-text-layer-${i}`, {
            autoAlpha: 0,
            y: 10,
            pointerEvents: 'none',
          });
        }
        gsap.set('.about-cap-img-layer-0', {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set('.about-cap-img-layer-0 .about-cap-frame-img', {
          scale: 1.0,
        });
        gsap.set('.about-cap-text-layer-0', {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
        });

        // Hold panel 0 slightly before first step
        tl.to({}, { duration: 0.3 });

        // Mobile steps: 0 -> 1, 1 -> 2, 2 -> 3
        const mobileSteps = [
          { from: 0, to: 1, at: 1.0 },
          { from: 1, to: 2, at: 2.0 },
          { from: 2, to: 3, at: 3.0 },
        ];

        mobileSteps.forEach(({ from, to, at }) => {
          // 1. Outgoing scene: image fades & text drifts upward
          tl.to(`.about-cap-img-layer-${from}`, { autoAlpha: 0, duration: 0.35 }, at);
          tl.to(
            `.about-cap-text-layer-${from}`,
            { autoAlpha: 0, y: -8, duration: 0.3, pointerEvents: 'none' },
            at
          );

          // 2. Incoming image: architectural curtain wipe from bottom & scale settle
          tl.fromTo(
            `.about-cap-img-layer-${to}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 },
            at + 0.08
          );
          tl.fromTo(
            `.about-cap-img-layer-${to} .about-cap-frame-img`,
            { scale: 1.07 },
            { scale: 1.0, duration: 0.6 },
            at + 0.08
          );

          // 3. Incoming text: graceful reveal from below
          tl.fromTo(
            `.about-cap-text-layer-${to}`,
            { autoAlpha: 0, y: 10, pointerEvents: 'none' },
            { autoAlpha: 1, y: 0, duration: 0.4, pointerEvents: 'auto' },
            at + 0.18
          );
        });

        // Hold final panel 3 visibly before unpinning
        tl.to({}, { duration: 0.6 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion, items.length]);

  return (
    <section id="capabilities" className="about-capabilities" aria-label="Our Capabilities">
      {/* Intro Header */}
      <div className="container--wide about-capabilities__intro">
        <span className="about-capabilities__eyebrow">{eyebrow}</span>
        <h2 className="about-capabilities__headline">{headline}</h2>
        <p className="about-capabilities__supporting">{supportingCopy}</p>
      </div>

      {/* Pinned Architectural Showcase (Active on Desktop & Mobile unless reduced motion is preferred) */}
      {!shouldReduceMotion ? (
        <div ref={containerRef} className="about-capabilities__scroll-container">
          <div ref={pinnedRef} className="about-capabilities__pinned-stage">
            <div className="container--wide about-capabilities__frame-wrap">
              <div className="about-cap-frame">
                {/* Left / Top: Architectural Media Viewport */}
                <div className="about-cap-media-viewport">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`about-cap-img-layer about-cap-img-layer-${idx}`}
                      aria-hidden={idx !== 0}
                    >
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="about-cap-frame-img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <div className="about-cap-media-scrim" aria-hidden="true" />
                    </div>
                  ))}
                </div>

                {/* Right / Bottom: Editorial Content Viewport */}
                <div className="about-cap-content-viewport">
                  {items.map((item, idx) => (
                    <article
                      key={item.id}
                      className={`about-cap-text-layer about-cap-text-layer-${idx}`}
                      aria-label={`${item.title} — ${item.badge}`}
                    >
                      <div className="about-cap-text-header">
                        <span className="about-cap-badge-pill">{item.badge}</span>
                      </div>

                      <h3 className="about-cap-frame-title">{item.title}</h3>

                      <div className="about-cap-rule" aria-hidden="true" />

                      <p className="about-cap-frame-desc">{item.description}</p>

                      <div className="about-cap-action-wrap">
                        <Button
                          to={item.linkTo}
                          variant="bronze"
                          className="about-cap-cta-btn"
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

                      <div className="about-cap-frame-footer">
                        <span className="about-cap-counter">
                          0{idx + 1} <span style={{ opacity: 0.4 }}>/ 04</span>
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
        <div className="about-capabilities__mobile-flow container--wide">
          {items.map((item, idx) => (
            <motion.article
              key={item.id}
              className="about-cap-mobile-card"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="about-cap-mobile-media">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="about-cap-mobile-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-cap-mobile-scrim" aria-hidden="true" />
                <span className="about-cap-mobile-badge">{item.badge}</span>
              </div>
              <div className="about-cap-mobile-body">
                <div className="about-cap-mobile-header">
                  <span className="about-cap-mobile-index">0{idx + 1}</span>
                </div>
                <h3 className="about-cap-mobile-title">{item.title}</h3>
                <p className="about-cap-mobile-desc">{item.description}</p>
                <div className="about-cap-mobile-action">
                  <Button
                    to={item.linkTo}
                    variant="bronze"
                    className="about-cap-mobile-btn"
                    aria-label={`${item.title} — ${item.linkLabel}`}
                    icon={
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
