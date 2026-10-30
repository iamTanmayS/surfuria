export interface EditorialCardItem {
  id: string;
  label: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
}

export interface KitchensPanelData {
  image: string;
  imageAlt: string;
  focalPoint?: string;
  actionLabel: string;
  actionTo: string;
  descriptors: readonly string[];
}

export interface BrandEditorialData {
  kitchens: KitchensPanelData;
  eyebrow: string;
  headline: string;
  description: string;
  cards: readonly EditorialCardItem[];
}

export interface BrandEditorialProps {
  id?: string;
  data?: BrandEditorialData;
  className?: string;
}

