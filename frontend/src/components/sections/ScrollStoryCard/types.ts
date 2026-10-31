export interface ScrollStoryItem {
  id: string | number;
  stepNumber?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  detail?: string;
  image: string;
  imageAlt?: string;
  imageFit?: 'contain' | 'cover';
  linkTo?: string;
  linkLabel?: string;
}

export interface ScrollStoryCardProps {
  id?: string;
  eyebrow?: string;
  headline?: string;
  supportingCopy?: string;
  items: ScrollStoryItem[];
  className?: string;
}

