import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import HeroFeatureSequence from './HeroFeatureSequence';
import './HeroScrollTransition.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollTransitionProps {
  children: ReactNode;
}

export default function HeroScrollTransition({ children }: HeroScrollTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!containerRef.current || !pinnedRef.current) return;

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
            end: '+=420%',
            pin: pinnedRef.current,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // --------------------------------------------------------------------
        // Stage B: Hero Composition Transition & Seamless Overlap (0.0 -> 1.50)
        // --------------------------------------------------------------------
        // 1. Hero text and CTAs exit progressively with subtle upward movement
        tl.to(
          '.hero__container',
          {
            opacity: 0,
            y: -32,
            duration: 1.1,
            ease: 'power2.inOut',
          },
          0
        );

        // 2. Scroll cue fades promptly
        tl.to(
          '.hero__bottom-bar',
          {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out',
          },
          0
        );

        // 3. Background lighting overlay shifts gradually to frame the panel
        tl.to(
          '.hero-transition-backdrop-overlay',
          {
            opacity: 0.78,
            duration: 1.2,
            ease: 'power1.inOut',
          },
          0.1
        );

        // 4. Background image participates with subtle framing drift and scale
        tl.to(
          '.hero__background-image',
          {
            scale: 1.06,
            y: -24,
            duration: 10.0,
            ease: 'none',
          },
          0
        );

        // 5. Seamless overlap: Master frame begins crystallizing BEFORE hero has vanished
        tl.fromTo(
          '.hero-feature-frame',
          { autoAlpha: 0, scale: 0.985 },
          { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'power2.out' },
          0.4
        );

        // --------------------------------------------------------------------
        // Stage C: Feature 1 Reveal (Panel 0: Durability)
        // --------------------------------------------------------------------
        // Image reveals with architectural curtain wipe from left-to-right
        tl.fromTo(
          '.hero-feature-image-layer-0',
          { autoAlpha: 1, clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out' },
          0.6
        );
        tl.fromTo(
          '.hero-feature-image-layer-0 .hero-feature-image',
          { scale: 1.08 },
          { scale: 1.0, duration: 1.05, ease: 'power2.out' },
          0.6
        );

        // Text layer reveals smoothly in sync with the image
        tl.fromTo(
          '.hero-feature-text-layer-0',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          0.68
        );

        // Feature 1 holds from 1.35 to 2.60

        // --------------------------------------------------------------------
        // Stage D: Transitions between Features 1 -> 2 -> 3 -> 4
        // --------------------------------------------------------------------
        const transitions = [
          { from: 0, to: 1, start: 2.60 },
          { from: 1, to: 2, start: 4.40 },
          { from: 2, to: 3, start: 6.20 },
        ];

        transitions.forEach(({ from, to, start }) => {
          // 1. Outgoing scene: image fades slightly and text drifts upward
          tl.to(
            `.hero-feature-image-layer-${from}`,
            { autoAlpha: 0, scale: 0.98, duration: 0.5, ease: 'power2.inOut' },
            start
          );
          tl.to(
            `.hero-feature-text-layer-${from}`,
            { autoAlpha: 0, y: -10, duration: 0.4, ease: 'power2.in' },
            start
          );

          // 2. Incoming scene: image reveals with downward architectural wipe & settles
          tl.fromTo(
            `.hero-feature-image-layer-${to}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power3.out' },
            start + 0.08
          );
          tl.fromTo(
            `.hero-feature-image-layer-${to} .hero-feature-image`,
            { scale: 1.07 },
            { scale: 1.0, duration: 0.9, ease: 'power2.out' },
            start + 0.08
          );

          // 3. Incoming text: complete editorial panel reveals gracefully
          tl.fromTo(
            `.hero-feature-text-layer-${to}`,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
            start + 0.15
          );
        });

        // Feature 4 holds from 6.95 to 7.90

        // --------------------------------------------------------------------
        // Stage E: Final Feature Exit & Collections Handoff (7.90 -> 8.75)
        // --------------------------------------------------------------------
        // 1. Final Feature softens and drifts upward smoothly
        tl.to(
          '.hero-feature-frame',
          { autoAlpha: 0, y: -24, scale: 0.985, duration: 0.8, ease: 'power2.inOut' },
          7.90
        );

        // 2. Ambient transitional lighting veil rises, warming the lower stage into #ebe7df
        tl.to(
          '.hero-transition-exit-veil',
          {
            opacity: 1,
            duration: 0.85,
            ease: 'power1.inOut',
          },
          7.90
        );
      });

      // ----------------------------------------------------------------------
      // MOBILE (<= 768px): Compact Touch-Tuned Pinned Sequence
      // ----------------------------------------------------------------------
      mm.add('(max-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=240%',
            pin: pinnedRef.current,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Hero Exit & Overlap
        tl.to('.hero__container', { opacity: 0, y: -20, duration: 0.6 }, 0);
        tl.to('.hero__bottom-bar', { opacity: 0, duration: 0.3 }, 0);
        tl.to('.hero-transition-backdrop-overlay', { opacity: 0.82, duration: 0.7 }, 0.1);
        tl.to('.hero__background-image', { scale: 1.05, duration: 5.5, ease: 'none' }, 0);

        // Frame emergence with overlap
        tl.fromTo(
          '.hero-feature-frame',
          { autoAlpha: 0, scale: 0.98 },
          { autoAlpha: 1, scale: 1, duration: 0.5 },
          0.3
        );

        // Reveal Scene 0
        tl.fromTo(
          '.hero-feature-image-layer-0',
          { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55 },
          0.4
        );
        tl.fromTo(
          '.hero-feature-text-layer-0',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.5
        );

        // Steps 0 -> 1, 1 -> 2, 2 -> 3
        const mobileSteps = [
          { from: 0, to: 1, at: 1.4 },
          { from: 1, to: 2, at: 2.5 },
          { from: 2, to: 3, at: 3.6 },
        ];

        mobileSteps.forEach(({ from, to, at }) => {
          tl.to(`.hero-feature-image-layer-${from}`, { autoAlpha: 0, duration: 0.35 }, at);
          tl.to(`.hero-feature-text-layer-${from}`, { autoAlpha: 0, y: -8, duration: 0.3 }, at);

          tl.fromTo(
            `.hero-feature-image-layer-${to}`,
            { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 },
            at + 0.08
          );
          tl.fromTo(
            `.hero-feature-text-layer-${to}`,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            at + 0.18
          );
        });

        // Exit at end & Collections Handoff
        tl.to('.hero-feature-frame', { autoAlpha: 0, y: -16, duration: 0.6, ease: 'power2.inOut' }, 4.5);
        tl.to('.hero-transition-exit-veil', { opacity: 1, duration: 0.7, ease: 'power1.inOut' }, 4.5);
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="hero-scroll-static">
        {children}
        <HeroFeatureSequence />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="hero-scroll-container">
      <div ref={pinnedRef} className="hero-scroll-pinned">
        {/* 1. Full-screen Hero Slideshow Component */}
        {children}

        {/* 2. Atmospheric lighting backdrop */}
        <div className="hero-transition-backdrop-overlay" aria-hidden="true" />

        {/* 3. 5-Scene Editorial Storytelling Sequence */}
        <HeroFeatureSequence />

        {/* 4. Ambient transitional lighting veil to prepare for Product Categories */}
        <div className="hero-transition-exit-veil" aria-hidden="true" />
      </div>
    </div>
  );
}
