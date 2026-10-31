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
  let category = getHardwareCategoryBySlug(categorySlug);
  let product = HARDWARE_PRODUCTS.find(
    (p) =>
      (p.slug === productSlug || p.id === productSlug) &&
      (category ? p.categoryId === category.id || p.categoryId === categorySlug : false)
  );

  // Fallback: If not found under specified category (e.g. cross-category navigation or mismatched link),
  // locate product across hardware catalogue and resolve its true canonical category.
  if (!product) {
    product = HARDWARE_PRODUCTS.find((p) => p.slug === productSlug || p.id === productSlug);
  }

  if (product && (!category || category.id !== product.categoryId)) {
    category = getHardwareCategoryBySlug(product.categoryId);
  }

  return { product, category };
}

/**
 * Kitchen Product Lookup by Category Slug and Product Slug
 */
export function getKitchenProductBySlug(
  categorySlug: string,
  productSlug: string
): { product?: Product; category?: ProductCategory } {
  let category = getKitchenCategoryBySlug(categorySlug);
  let product = KITCHEN_PRODUCTS.find(
    (p) =>
      (p.slug === productSlug || p.id === productSlug) &&
      (category ? p.categoryId === category.id || p.categoryId === categorySlug : false)
  );

  // Fallback: If not found under specified category, locate across kitchen catalogue and resolve true category.
  if (!product) {
    product = KITCHEN_PRODUCTS.find((p) => p.slug === productSlug || p.id === productSlug);
  }

  if (product && (!category || category.id !== product.categoryId)) {
    category = getKitchenCategoryBySlug(product.categoryId);
  }

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
  const result: Product[] = [];
  const seenIds = new Set<string>([product.id]);

  // 1. Explicit relatedProductIds if configured (match by either id or slug)
  if (product.relatedProductIds && product.relatedProductIds.length > 0) {
    for (const relId of product.relatedProductIds) {
      const match = pool.find((p) => (p.id === relId || p.slug === relId) && !seenIds.has(p.id));
      if (match) {
        result.push(match);
        seenIds.add(match.id);
        if (result.length >= limit) {
          return result;
        }
      }
    }
  }

  // 2. Fallback to same category products
  const sameCategory = pool.filter(
    (p) => p.categoryId === product.categoryId && !seenIds.has(p.id)
  );
  for (const p of sameCategory) {
    result.push(p);
    seenIds.add(p.id);
    if (result.length >= limit) {
      return result;
    }
  }

  // 3. Fallback to any other product in same catalogue
  const others = pool.filter((p) => !seenIds.has(p.id));
  for (const p of others) {
    result.push(p);
    seenIds.add(p.id);
    if (result.length >= limit) {
      return result;
    }
  }

  return result.slice(0, limit);
}
