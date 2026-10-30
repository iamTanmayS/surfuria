import type { ProductCategoryCardProps } from './productCategory.types';
import ProductCard from '../../../../components/catalog/ProductCard';

export default function ProductCategoryCard({
  card,
  staggerIndex = 0,
  isDraggingRef,
  className = '',
}: ProductCategoryCardProps) {
  return (
    <ProductCard
      card={card}
      staggerIndex={staggerIndex}
      isDraggingRef={isDraggingRef}
      className={className}
    />
  );
}

export type { ProductCategoryCardProps };
