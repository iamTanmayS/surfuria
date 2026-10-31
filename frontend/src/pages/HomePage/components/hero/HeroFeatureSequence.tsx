import { HERO_FEATURES, type HeroFeatureItem } from './heroFeatureData';
import { ScrollStoryCard, type ScrollStoryItem } from '../../../../components/sections';

interface HeroFeatureSequenceProps {
  features?: readonly HeroFeatureItem[];
}

export default function HeroFeatureSequence({
  features = HERO_FEATURES,
}: HeroFeatureSequenceProps) {
  const items: ScrollStoryItem[] = features.map((feature, idx) => ({
    id: feature.id,
    stepNumber: feature.stepNumber || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`),
    badge: feature.eyebrow || undefined,
    title: feature.heading,
    description: feature.description,
    image: feature.image,
    imageAlt: feature.imageAlt,
    imageFit: 'cover',
  }));

  return (
    <ScrollStoryCard
      id="hero-features"
      eyebrow="CRAFTSMANSHIP & ENGINEERING"
      headline="Engineered for Everyday Living"
      supportingCopy="From kinematic hardware to factory-engineered modular cabinetry, every detail is considered with purpose."
      items={items}
    />
  );
}
