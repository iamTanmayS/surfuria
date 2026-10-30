/**
 * SURFURIA — Centralized Product & Category API
 * Single source of truth for Hardware & Kitchens catalogues.
 */

import { HARDWARE_CATEGORIES } from './hardwareCategories';
import { KITCHEN_CATEGORIES } from './kitchenCategories';
import { HARDWARE_PRODUCTS } from './hardwareProducts';
import { KITCHEN_PRODUCTS } from './kitchenProducts';
import type { ProductCategory, Product, CatalogueType } from './types';

export * from './types';
export { HARDWARE_CATEGORIES } from './hardwareCategories';
export { KITCHEN_CATEGORIES } from './kitchenCategories';
export { HARDWARE_PRODUCTS } from './hardwareProducts';
export { KITCHEN_PRODUCTS } from './kitchenProducts';
export {
  SHARED_KITCHEN_INCLUDED_HARDWARE,
  KITCHEN_CONFIGURATIONS,
  getKitchenConfigurationBySlug,
  getAllKitchenConfigurations,
} from './kitchenConfigurations';

/**
 * Returns all products across both catalogues
 */
export function getAllProducts(): Product[] {
  return [...HARDWARE_PRODUCTS, ...KITCHEN_PRODUCTS];
}

/**
 * Hardware Category Lookup by Slug
 */
export function getHardwareCategoryBySlug(slug: string): ProductCategory | undefined {
  return HARDWARE_CATEGORIES.find((cat) => cat.slug === slug || cat.id === slug);
}

/**
 * Kitchen Category Lookup by Slug
 */
export function getKitchenCategoryBySlug(slug: string): ProductCategory | undefined {
  return KITCHEN_CATEGORIES.find((cat) => cat.slug === slug || cat.id === slug);
}

/**
 * Lookup Category by ID or Slug across both catalogues
 */
export function getCategoryById(idOrSlug: string): ProductCategory | undefined {
  return (
    getHardwareCategoryBySlug(idOrSlug) ||
    getKitchenCategoryBySlug(idOrSlug)
  );
}

/**
 * Hardware Product Lookup by Category Slug and Product Slug
 */
export function getHardwareProductBySlug(
  categorySlug: string,
  productSlug: string
): { product?: Product; category?: ProductCategory } {
  const category = getHardwareCategoryBySlug(categorySlug);
  const product = HARDWARE_PRODUCTS.find(
    (p) =>
      p.slug === productSlug &&
      (!category || p.categoryId === category.id || p.categoryId === categorySlug)
  );
  return { product, category };
}

/**
 * Kitchen Product Lookup by Category Slug and Product Slug
 */
export function getKitchenProductBySlug(
  categorySlug: string,
  productSlug: string
): { product?: Product; category?: ProductCategory } {
  const category = getKitchenCategoryBySlug(categorySlug);
  const product = KITCHEN_PRODUCTS.find(
    (p) =>
      p.slug === productSlug &&
      (!category || p.categoryId === category.id || p.categoryId === categorySlug)
  );
  return { product, category };
}

/**
 * General Product Lookup by Product Slug alone (useful for enquiries)
 */
export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug || p.id === slug);
}

/**
 * Filter Products by Category ID and optional Catalogue type
 */
export function getProductsByCategoryId(
  categoryId: string,
  catalogue?: CatalogueType
): Product[] {
  if (catalogue === 'hardware') {
    return HARDWARE_PRODUCTS.filter((p) => p.categoryId === categoryId);
  }
  if (catalogue === 'kitchens') {
    return KITCHEN_PRODUCTS.filter((p) => p.categoryId === categoryId);
  }
  return getAllProducts().filter((p) => p.categoryId === categoryId);
}

/**
 * Related Products calculation
 */
export function getRelatedProducts(product: Product, limit: number = 3): Product[] {
  const pool = product.catalogue === 'hardware' ? HARDWARE_PRODUCTS : KITCHEN_PRODUCTS;

  // 1. Explicit relatedProductIds if configured
  if (product.relatedProductIds && product.relatedProductIds.length > 0) {
    const explicit = pool.filter(
      (p) => product.relatedProductIds?.includes(p.id) && p.id !== product.id
    );
    if (explicit.length >= limit) {
      return explicit.slice(0, limit);
    }
  }

  // 2. Fallback to same category products
  const sameCategory = pool.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  );

  if (sameCategory.length > 0) {
    return sameCategory.slice(0, limit);
  }

  // 3. Fallback to any other product in same catalogue
  return pool.filter((p) => p.id !== product.id).slice(0, limit);
}
