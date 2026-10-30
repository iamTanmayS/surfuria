import { motion, AnimatePresence } from 'motion/react';
import type { HeroSlide } from './heroData';
import { buildCloudinaryUrl, buildCloudinarySrcSet } from '../../../../lib/cloudinary';

interface HeroBackgroundProps {
  currentSlide: HeroSlide;
  direction: number;
  shouldReduceMotion: boolean | null;
}

export default function HeroBackground({
  currentSlide,
  direction,
  shouldReduceMotion,
}: HeroBackgroundProps) {
  const isInitialSlide = currentSlide.id === 'slide-hardware';

  // Architectural filmic crossfade
  const imageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.05,
      x: shouldReduceMotion ? 0 : dir * 15,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        opacity: { duration: shouldReduceMotion ? 0.05 : 0.9, ease: 'easeOut' as const },
        scale: { duration: shouldReduceMotion ? 0.05 : 1.6, ease: 'easeOut' as const },
        x: { duration: shouldReduceMotion ? 0.05 : 1.1, ease: 'easeOut' as const },
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      x: shouldReduceMotion ? 0 : dir * -15,
      transition: {
        opacity: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: 'easeIn' as const },
        scale: { duration: shouldReduceMotion ? 0.05 : 1.1, ease: 'easeOut' as const },
      },
    }),
  };

  const optimizedSrc = buildCloudinaryUrl(currentSlide.image, {
    width: 1600,
    quality: 'auto',
    format: 'auto',
  });

  const srcSet = buildCloudinarySrcSet(currentSlide.image, [640, 1024, 1440, 1920]);

  return (
    <div className="hero__background-wrapper" aria-hidden="true">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={imageVariants}
          initial={false}
          animate="animate"
          exit="exit"
          className="hero__background-image-container"
        >
          <img
            src={optimizedSrc}
            srcSet={srcSet || undefined}
            sizes="100vw"
            alt={currentSlide.imageAlt}
            className="hero__background-image"
            loading={isInitialSlide ? 'eager' : 'lazy'}
            fetchPriority={isInitialSlide ? 'high' : 'low'}
            decoding={isInitialSlide ? 'sync' : 'async'}
            style={{
              objectPosition: currentSlide.focalPoint || 'center center',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Layer 2: Editorial Architectural Contrast Overlays */}
      {/* 1. Base dark tint overlay */}
      <div
        className="hero__overlay-base"
        style={{
          opacity: currentSlide.overlayIntensity ?? 0.52,
        }}
      />

      {/* 2. Directional vignette & text legibility gradient from left */}
      <div className="hero__overlay-gradient" />

      {/* 3. Bottom subtle blend into following section */}
      <div className="hero__overlay-bottom" />
    </div>
  );
}
