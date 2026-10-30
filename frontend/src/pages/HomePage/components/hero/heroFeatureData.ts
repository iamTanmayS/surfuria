export interface HeroFeatureItem {
  id: string;
  stepNumber: string;
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  focalPoint?: string;
}

export const HERO_FEATURES: readonly HeroFeatureItem[] = [
  {
    id: 'feature-detail-driven',
    stepNumber: '01',
    eyebrow: '',
    heading: 'Detail Driven',
    description:
      'From hardware to finishes, every detail is considered with purpose.',
    image:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793212983/1_Detail_Driven_cpasyh.png',
    imageAlt:
      'Detail Driven — From hardware to finishes, every detail is considered with purpose',
    focalPoint: '50% 50%',
  },
  {
    id: 'feature-refined-craftsmanship',
    stepNumber: '02',
    eyebrow: '',
    heading: 'Refined Craftsmanship',
    description:
      'Carefully considered details that bring quality to every element.',
    image:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793212983/2_Refined_Craftsmanship_tvvkrq.png',
    imageAlt:
      'Refined Craftsmanship — Carefully considered details that bring quality to every element',
    focalPoint: '50% 50%',
  },
  {
    id: 'feature-effortless-function',
    stepNumber: '03',
    eyebrow: '',
    heading: 'Effortless Function',
    description:
      'Every movement is designed to feel natural, quiet and effortless.',
    image:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793212983/3_Effortless_Function_cfpe4r.png',
    imageAlt:
      'Effortless Function — Every movement is designed to feel natural, quiet and effortless',
    focalPoint: '50% 50%',
  },
  {
    id: 'feature-intelligent-space',
    stepNumber: '04',
    eyebrow: '',
    heading: 'Intelligent Space',
    description:
      'Make better use of every corner with purposeful storage solutions.',
    image:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793212984/4_Intelligent_Space_bghbc5.png',
    imageAlt:
      'Intelligent Space — Make better use of every corner with purposeful storage solutions',
    focalPoint: '50% 50%',
  },
] as const;
