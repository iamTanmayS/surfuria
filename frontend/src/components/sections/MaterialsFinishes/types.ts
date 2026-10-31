export interface MaterialOrFinishItem {
  id: string;
  category?: 'substrate' | 'finish';
  name: string;
  fullName?: string;
  description?: string;
  application?: string;
  spec?: string;
  image: string;
  imageAlt?: string;
  character?: string;
}

export interface MaterialsFinishesProps {
  /** Main section title (e.g. "MATERIALS & FINISHES" or "KITCHEN MATERIALS & FINISHES") */
  title?: string;
  /** Optional section eyebrow label */
  eyebrow?: string;
  /** Core substrates dataset */
  substrates?: MaterialOrFinishItem[];
  /** Surface finishes dataset */
  finishes?: MaterialOrFinishItem[];
  /** Unified dataset containing substrates and/or finishes */
  items?: MaterialOrFinishItem[];
  /** Optional custom CSS class name */
  className?: string;
  /** HTML element ID for anchor linking (e.g. "materials") */
  id?: string;
}

