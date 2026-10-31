import { useMemo } from 'react';
import { ScrollStoryCard, type ScrollStoryItem } from '../../../components/sections';
import { CAPABILITIES_DATA } from '../../../data/about/aboutPageData';

export default function CapabilitiesSection() {
  const { eyebrow, headline, supportingCopy, items } = CAPABILITIES_DATA;

  const storyItems = useMemo<ScrollStoryItem[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        stepNumber: item.number,
        badge: item.badge,
        title: item.title,
        description: item.description,
        image: item.image,
        imageAlt: item.imageAlt,
        linkTo: item.linkTo,
        linkLabel: item.linkLabel,
        imageFit: 'cover',
      })),
    [items]
  );

  return (
    <ScrollStoryCard
      id="capabilities"
      eyebrow={eyebrow}
      headline={headline}
      supportingCopy={supportingCopy}
      items={storyItems}
    />
  );
}
