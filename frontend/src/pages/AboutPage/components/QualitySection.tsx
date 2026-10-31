import { PHILOSOPHY_PANELS } from '../../../data/about/aboutPageData';
import { ScrollStoryCard, type ScrollStoryItem } from '../../../components/sections';

export default function QualitySection() {
  const items: ScrollStoryItem[] = PHILOSOPHY_PANELS.map((panel) => ({
    id: panel.id,
    stepNumber: panel.number,
    badge: panel.title,
    title: panel.statement,
    description: panel.description,
    image: panel.image,
    imageAlt: panel.imageAlt,
    imageFit: 'cover',
  }));

  return (
    <ScrollStoryCard
      id="our-philosophy"
      eyebrow="OUR PHILOSOPHY"
      headline="Hinged on Quality."
      supportingCopy="Three guiding principles that shape how we source hardware, engineer modular kitchens, and deliver complete living environments."
      items={items}
    />
  );
}
