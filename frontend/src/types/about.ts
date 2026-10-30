export interface AboutHeroData {
  eyebrow: string;
  headlineLines: string[];
  supportingCopy: string;
}

export interface BrandIntroData {
  eyebrow: string;
  headline: string;
  primaryParagraph: string;
  callouts: {
    number: string;
    title: string;
    detail: string;
  }[];
  video: {
    youtubeUrl: string;
    placeholderImage: string;
    placeholderAlt: string;
    durationLabel: string;
  };
}

export interface CapabilityItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  imageAlt: string;
  linkLabel: string;
  linkTo: string;
}

export interface CapabilitiesData {
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  items: CapabilityItem[];
}

export interface SubstrateItem {
  id: string;
  name: string;
  fullName: string;
  category: 'substrate';
  description: string;
  application: string;
  spec: string;
  image: string;
  imageAlt: string;
}

export interface FinishItem {
  id: string;
  name: string;
  fullName: string;
  category: 'finish';
  description: string;
  application: string;
  spec: string;
  image: string;
  imageAlt: string;
}

export interface PhilosophyCard {
  id: string;
  badge: string;
  title: string;
  statement: string;
  body: string;
  statNumber: string;
  statLabel: string;
  image: string;
  imageAlt: string;
}

export interface PhilosophyData {
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  cards: PhilosophyCard[];
}

export interface GlobalDestination {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  description: string;
  badge: string;
}

export interface GlobalReachData {
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  origin: {
    name: string;
    country: string;
    lat: number;
    lng: number;
  };
  destinations: GlobalDestination[];
  stats: {
    value: string;
    label: string;
  }[];
}

export interface ClosingSectionData {
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  ctaPrimary: {
    label: string;
    to: string;
  };
  ctaSecondary: {
    label: string;
    to: string;
  };
}

