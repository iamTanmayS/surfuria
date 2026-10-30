import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHILOSOPHY_PANELS } from '../../../data/about/aboutPageData';
import './QualitySection.css';

gsap.registerPlugin(ScrollTrigger);

export default function QualitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!containerRef.current || !pinnedRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const panelsCount = PHILOSOPHY_PANELS.length; // 3 panels

      // ----------------------------------------------------------------------
      // DESKTOP & TABLET (>= 769px): Pinned Architectural Showcase
      // ----------------------------------------------------------------------
      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${(panelsCount - 1) * 115}%`,
            pin: pinnedRef.current,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Setup initial state: Panel 0 active, Panels 1..N hidden
        for (let i = 1; i < panelsCount; i++) {
          gsap.set(`.about-philo-img-${i}`, {
            autoAlpha: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.about-philo-img-${i} .about-philo-img`, {
            scale: 1.07,
          });
          gsap.set(`.about-philo-text-${i}`, {
            autoAlpha: 0,
            y: 20,
            pointerEvents: 'none',
          });
        }
        gsap.set('.about-philo-img-0', {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set('.about-philo-img-0 .about-philo-img', {
          scale: 1.0,
        });
        gsap.set('.about-philo-text-0', {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
        });

        // Hold initial panel 0 slightly before first transition
        tl.to({}, { duration: 0.35 });

        // Desktop transitions: 0 -> 1, 1 -> 2
        const desktopTransitions = [
          { from: 0, to: 1, start: 0.5 },
          { from: 1, to: 2, start: 1.65 },
        ];

        desktopTransitions.forEach(({ from, to, start }) => {
          // Outgoing scene
          tl.to(
            `.about-philo-img-${from}`,
            { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' },
            start
          )
            .to(
              `.about-philo-img-${from} .about-philo-img`,
              { scale: 0.98, duration: 0.6, ease: 'power2.inOut' },
              start
            )
            .to(
              `.about-philo-text-${from}`,
              { autoAlpha: 0, y: -14, duration: 0.5, ease: 'power2.in', pointerEvents: 'none' },
              start
            );

          // Incoming scene
          tl.fromTo(
            `.about-philo-img-${to}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out' },
            start + 0.1
          )
            .fromTo(
              `.about-philo-img-${to} .about-philo-img`,
              { scale: 1.07 },
              { scale: 1.0, duration: 0.9, ease: 'power2.out' },
              start + 0.1
            )
            .fromTo(
              `.about-philo-text-${to}`,
              { autoAlpha: 0, y: 18, pointerEvents: 'none' },
              { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.65, ease: 'power2.out' },
              start + 0.18
            );
        });

        // Hold final panel 2 visibly before unpinning
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
            end: '+=200%',
            pin: pinnedRef.current,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Setup initial state: Panel 0 active, Panels 1..N hidden
        for (let i = 1; i < panelsCount; i++) {
          gsap.set(`.about-philo-img-${i}`, {
            autoAlpha: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.about-philo-img-${i} .about-philo-img`, {
            scale: 1.07,
          });
          gsap.set(`.about-philo-text-${i}`, {
            autoAlpha: 0,
            y: 10,
            pointerEvents: 'none',
          });
        }
        gsap.set('.about-philo-img-0', {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
        });
        gsap.set('.about-philo-img-0 .about-philo-img', {
          scale: 1.0,
        });
        gsap.set('.about-philo-text-0', {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
        });

        // Hold panel 0 slightly before first step
        tl.to({}, { duration: 0.3 });

        // Mobile steps: 0 -> 1, 1 -> 2
        const mobileSteps = [
          { from: 0, to: 1, at: 1.0 },
          { from: 1, to: 2, at: 2.0 },
        ];

        mobileSteps.forEach(({ from, to, at }) => {
          // 1. Outgoing scene: image fades & text drifts upward
          tl.to(`.about-philo-img-${from}`, { autoAlpha: 0, duration: 0.35 }, at);
          tl.to(
            `.about-philo-text-${from}`,
            { autoAlpha: 0, y: -8, duration: 0.3, pointerEvents: 'none' },
            at
          );

          // 2. Incoming image: architectural curtain wipe from bottom & scale settle
          tl.fromTo(
            `.about-philo-img-${to}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 },
            at + 0.08
          );
          tl.fromTo(
            `.about-philo-img-${to} .about-philo-img`,
            { scale: 1.07 },
            { scale: 1.0, duration: 0.6 },
            at + 0.08
          );

          // 3. Incoming text: graceful reveal from below
          tl.fromTo(
            `.about-philo-text-${to}`,
            { autoAlpha: 0, y: 10, pointerEvents: 'none' },
            { autoAlpha: 1, y: 0, duration: 0.4, pointerEvents: 'auto' },
            at + 0.18
          );
        });

        // Hold final panel 2 visibly before unpinning
        tl.to({}, { duration: 0.6 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section className="about-philosophy" aria-label="Our Philosophy">
      {/* Intro Header */}
      <div className="container--wide about-philosophy__intro">
        <span className="about-philosophy__eyebrow">OUR PHILOSOPHY</span>
        <h2 className="about-philosophy__headline">Hinged on Quality.</h2>
        <p className="about-philosophy__supporting">
          Three guiding principles that shape how we source hardware, engineer modular kitchens,
          and deliver complete living environments.
        </p>
      </div>

      {/* Pinned Scroll Container (Active on Desktop & Mobile unless reduced motion is preferred) */}
      {!shouldReduceMotion ? (
        <div ref={containerRef} className="about-philosophy__scroll-container">
          <div ref={pinnedRef} className="about-philosophy__pinned-stage">
            <div className="container--wide about-philosophy__frame-wrap">
              <div className="about-philo-frame">
                {/* Left / Top: Architectural Image Viewport */}
                <div className="about-philo-media-viewport">
                  {PHILOSOPHY_PANELS.map((panel, idx) => (
                    <div
                      key={panel.id}
                      className={`about-philo-img-layer about-philo-img-${idx}`}
                      aria-hidden={idx !== 0}
                    >
                      <img
                        src={panel.image}
                        alt={panel.imageAlt}
                        className="about-philo-img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <div className="about-philo-media-scrim" aria-hidden="true" />
                    </div>
                  ))}
                </div>

                {/* Right / Bottom: Editorial Text Viewport */}
                <div className="about-philo-text-viewport">
                  {PHILOSOPHY_PANELS.map((panel, idx) => (
                    <article
                      key={panel.id}
                      className={`about-philo-text-layer about-philo-text-${idx}`}
                      aria-label={`${panel.number} ${panel.title}`}
                    >
                      <div className="about-philo-text-header">
                        <span className="about-philo-number">{panel.number}</span>
                        <span className="about-philo-pill">{panel.title}</span>
                      </div>

                      <h3 className="about-philo-statement">{panel.statement}</h3>

                      <div className="about-philo-divider" aria-hidden="true" />

                      <p className="about-philo-description">{panel.description}</p>

                      <div className="about-philo-footer">
                        <span className="about-philo-step-index">
                          {panel.number} <span style={{ opacity: 0.4 }}>/ 03</span>
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
        <div className="about-philosophy__reduced-motion-flow container--wide">
          {PHILOSOPHY_PANELS.map((panel) => (
            <article key={panel.id} className="about-philo-reduced-card">
              <div className="about-philo-reduced-media">
                <img
                  src={panel.image}
                  alt={panel.imageAlt}
                  className="about-philo-reduced-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about-philo-reduced-body">
                <div className="about-philo-text-header">
                  <span className="about-philo-number">{panel.number}</span>
                  <span className="about-philo-pill">{panel.title}</span>
                </div>
                <h3 className="about-philo-statement">{panel.statement}</h3>
                <div className="about-philo-divider" aria-hidden="true" />
                <p className="about-philo-description">{panel.description}</p>
                <div className="about-philo-footer">
                  <span className="about-philo-step-index">{panel.number}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
