import { motion, AnimatePresence } from 'motion/react';
import { HeroContent as ReusableHeroContent } from '../../../../components/ui/HeroContent';
import type { HeroSlide } from './heroData';

interface HeroContentProps {
  currentSlide: HeroSlide;
  direction: number;
  shouldReduceMotion: boolean | null;
}

export default function HeroContent({
  currentSlide,
  direction,
  shouldReduceMotion,
}: HeroContentProps) {
  // Coordinated editorial text reveal sequence
  const contentVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      x: shouldReduceMotion ? 0 : dir * 12,
    }),
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.65,
        ease: 'easeOut' as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : -14,
      x: shouldReduceMotion ? 0 : dir * -12,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.35,
        ease: 'easeIn' as const,
      },
    }),
  };

  const itemVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.55,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.25, ease: 'easeIn' as const },
    },
  };

  return (
    <div className="hero__content-wrapper">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="hero__content-slide"
        >
          {/* Reusable Hero Content (Title, Subtitle, and Dual Action CTAs) */}
          <ReusableHeroContent
            title={currentSlide.headlineLine1}
            titleAccent={currentSlide.headlineLine2}
            subtitle={currentSlide.description}
            primaryCta={{
              label: currentSlide.primaryCta.label,
              to: currentSlide.primaryCta.destination,
            }}
            secondaryCta={{
              label: currentSlide.secondaryCta.label,
              to: currentSlide.secondaryCta.destination,
            }}
            itemVariants={itemVariants}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

