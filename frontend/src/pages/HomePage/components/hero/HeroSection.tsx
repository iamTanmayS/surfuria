import './HeroSection.css';

import { HERO_SLIDES, HERO_SLIDE_DURATION_MS } from './heroData';
import { useCallback, useEffect, useRef, useState } from 'react';

import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroScrollCue from './HeroScrollCue';
import { useReducedMotion } from 'motion/react';

interface HeroSectionProps {
  scrollTargetId?: string;
}

export default function HeroSection({
  scrollTargetId = 'collections-section',
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSlides = HERO_SLIDES.length;

  // Slide navigation callbacks
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    startTimeRef.current = Date.now();
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    startTimeRef.current = Date.now();
  }, [totalSlides]);

  // Clean, robust autoplay loop without below-button UI dependency
  useEffect(() => {
    if (shouldReduceMotion || isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      goToNext();
    }, HERO_SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, shouldReduceMotion, goToNext]);

  // Pause autoplay when document/tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrev();
    }
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="hero"
      aria-label="Surfuria Showcase"
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* 1. Full-Bleed Background Images & Overlays */}
      <HeroBackground
        currentSlide={currentSlide}
        direction={direction}
        shouldReduceMotion={shouldReduceMotion}
      />

      {/* 2. Content Container (animated by GSAP on scroll) */}
      <div className="hero__container">
        <HeroContent
          currentSlide={currentSlide}
          direction={direction}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>

      {/* 3. Bottom Row: Dedicated Scroll Cue (animated by GSAP on scroll) */}
      <div className="hero__bottom-bar">
        <HeroScrollCue targetId={scrollTargetId} />
      </div>
    </section>
  );
}
