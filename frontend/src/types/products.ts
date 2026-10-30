export type CategoryId = 'all' | 'hardware' | 'kitchens' | 'modular' | 'exports';

export interface ProductCategory {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  image: string;
  tag: string;
  specs: string[];
  link: string;
}

export interface CategoryFilter {
  id: CategoryId;
  label: string;
  count: number;
}

