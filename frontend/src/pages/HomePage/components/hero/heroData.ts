export interface HeroCta {
  label: string;
  destination: string;
}

export interface HeroSlide {
  id: string;
  slideNumber: string;
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  image: string;
  imageAlt: string;
  focalPoint?: string;
  overlayIntensity?: number; // Optional 0 to 1 scale
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: 'slide-hardware',
    slideNumber: '01',
    eyebrow: 'ARCHITECTURAL HARDWARE',
    headlineLine1: 'The Hardware Behind',
    headlineLine2: 'Better Furniture.',
    description:
      'Quality hardware for modular kitchens, cabinets and modern interiors',
    primaryCta: {
      label: 'Explore Hardware',
      destination: '/hardware',
    },
    secondaryCta: {
      label: 'Discuss Your Project',
      destination: '/contact',
    },
    image:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749953/1_1_Landing_Page_Image_dtpgdt.png',
    imageAlt:
      'The Hardware Behind Better Furniture — Quality hardware for modular kitchens, cabinets and modern interiors',
    focalPoint: '50% 50%',
    overlayIntensity: 0.52,
  },
  {
    id: 'slide-kitchens',
    slideNumber: '02',
    eyebrow: 'MODULAR KITCHENS',
    headlineLine1: 'From Components',
    headlineLine2: 'To Complete Kitchens.',
    description:
      'Custom kitchens designed with purpose, style and precision.',
    primaryCta: {
      label: 'Explore Kitchens',
      destination: '/kitchens',
    },
    secondaryCta: {
      label: 'Discuss Your Project',
      destination: '/contact',
    },
    image:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793212986/IMAGE_2_rvehgq.png',
    imageAlt:
      'From Components To Complete Kitchens — Custom kitchens designed with purpose, style and precision',
    focalPoint: '50% 50%',
    overlayIntensity: 0.52,
  },
  {
    id: 'slide-spaces',
    slideNumber: '03',
    eyebrow: 'CUSTOM STORAGE & SPACES',
    headlineLine1: 'Made For',
    headlineLine2: 'Every Space.',
    description:
      'From wardrobes to pantry units, choose the design, storage and finish that suits you.',
    primaryCta: {
      label: 'Our Story',
      destination: '/about',
    },
    secondaryCta: {
      label: 'Discuss Your Project',
      destination: '/contact',
    },
    image:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793213798/IMAGE_3_1_q9anpn.png',
    imageAlt:
      'Made For Every Space — From wardrobes to pantry units, choose the design, storage and finish that suits you',
    focalPoint: '50% 50%',
    overlayIntensity: 0.52,
  },
] as const;

export const HERO_SLIDE_DURATION_MS = 8000;
