import type React from 'react';

export interface ProductCategory {
  id: string;
  label: string;
  slug?: string;
  count?: number;
}

export interface ProductCategoryCardItem {
  id: string;
  categoryId: string; // The category it belongs to (or 'all' for flagship)
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  destination: string;
  badge?: string;
  actionText?: string;
  staggerIndex?: 0 | 1 | 2; // Position in the 3-card staggered composition
}

export interface ProductCategoriesProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  categories?: readonly ProductCategory[];
  cards?: readonly ProductCategoryCardItem[];
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId: string) => void;
  ctaLabel?: string;
  ctaTo?: string;
  className?: string;
}

export interface ProductCategoryCardProps {
  card: ProductCategoryCardItem;
  staggerIndex?: number;
  isDraggingRef?: React.RefObject<boolean>;
  className?: string;
}

export interface ProductCategoryFiltersProps {
  categories: readonly ProductCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  className?: string;
}
