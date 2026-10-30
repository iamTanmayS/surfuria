import type { BrandEditorialData } from './brandEditorial.types';

export const DEFAULT_BRAND_EDITORIAL_DATA: BrandEditorialData = {
  kitchens: {
    image: '/images/kitchen-editorial.jpg',
    imageAlt:
      'Architectural modern kitchen featuring natural marble island, warm custom millwork, and precision minimalist fittings',
    focalPoint: '50% 60%',
    actionLabel: 'Explore Kitchens',
    actionTo: '/kitchens',
    descriptors: ['Modern Form', 'Thoughtful Storage', 'Everyday Function'],
  },
  eyebrow: 'ABOUT SURFURIA',
  headline: 'Thoughtful details. Better spaces.',
  description:
    'We bring together considered hardware, kitchen fittings, and functional design to help create spaces that feel refined, intuitive, and built around everyday living.',
  cards: [
    {
      id: 'why-surfuria',
      label: 'WHY SURFURIA',
      heading: 'Details that matter',
      description: 'Thoughtful selection. Functional design. Considered finishes.',
      ctaLabel: 'Why Choose Us',
      ctaTo: '/about',
    },
    {
      id: 'our-approach',
      label: 'OUR APPROACH',
      heading: 'Designed around living',
      description: 'Explore our approach to hardware, kitchens, and contemporary interiors.',
      ctaLabel: 'Our Story',
      ctaTo: '/about',
    },
    {
      id: 'lets-connect',
      label: "LET'S CONNECT",
      heading: 'Start a conversation',
      description: 'Have a project or product enquiry? Talk to our team.',
      ctaLabel: 'Contact Us',
      ctaTo: '/contact',
    },
  ],
};
