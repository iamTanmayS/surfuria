import { describe, it, expect } from 'vitest';
import {
  getHardwareProductBySlug,
  getKitchenProductBySlug,
  getRelatedProducts,
  getProductBySlug,
} from '../src/data/products';

describe('Product Lookup & Canonical Routing Suite', () => {
  describe('Hardware Product Lookup', () => {
    it('resolves product and category when both slugs match exactly', () => {
      const { product, category } = getHardwareProductBySlug(
        'cabinet-hinges',
        'hydraulic-soft-close-hinge'
      );

      expect(product).toBeDefined();
      expect(product?.id).toBe('hydraulic-soft-close-hinge');
      expect(product?.name).toBe('Hydraulic Soft-Close Hinge');
      expect(category).toBeDefined();
      expect(category?.id).toBe('cabinet-hinges');
    });

    it('resolves product and repairs category when categorySlug is mismatched in URL', () => {
      // User lands on /hardware/drawer-systems/hydraulic-soft-close-hinge via cross-category link or stale URL
      const { product, category } = getHardwareProductBySlug(
        'drawer-systems',
        'hydraulic-soft-close-hinge'
      );

      expect(product).toBeDefined();
      expect(product?.id).toBe('hydraulic-soft-close-hinge');
      // Category is repaired to the product's true canonical category
      expect(category).toBeDefined();
      expect(category?.id).toBe('cabinet-hinges');
    });

    it('returns undefined product when product slug does not exist', () => {
      const { product, category } = getHardwareProductBySlug(
        'cabinet-hinges',
        'non-existent-hinge-xyz'
      );

      expect(product).toBeUndefined();
      expect(category).toBeDefined();
      expect(category?.id).toBe('cabinet-hinges');
    });
  });

  describe('Kitchen Product Lookup', () => {
    it('resolves kitchen product and category correctly', () => {
      const { product, category } = getKitchenProductBySlug(
        'modular-kitchens',
        'l-shaped-modular-suite'
      );

      expect(product).toBeDefined();
      expect(product?.id).toBe('modular-l-shaped');
      expect(category).toBeDefined();
      expect(category?.id).toBe('modular-kitchens');
    });

    it('resolves product and repairs category when kitchen categorySlug is mismatched', () => {
      const { product, category } = getKitchenProductBySlug(
        'parallel-kitchens',
        'l-shaped-modular-suite'
      );

      expect(product).toBeDefined();
      expect(product?.id).toBe('modular-l-shaped');
      expect(category).toBeDefined();
      expect(category?.id).toBe('modular-kitchens');
    });
  });

  describe('Related Products Resolution', () => {
    it('resolves related products without including the subject product itself', () => {
      const { product } = getHardwareProductBySlug(
        'cabinet-hinges',
        'hydraulic-soft-close-hinge'
      );
      expect(product).toBeDefined();

      const related = getRelatedProducts(product!, 3);
      expect(related.length).toBeGreaterThan(0);
      expect(related.length).toBeLessThanOrEqual(3);

      const subjectIncluded = related.some((r) => r.id === product!.id);
      expect(subjectIncluded).toBe(false);
    });

    it('resolves explicit relatedProductIds across hardware categories', () => {
      const { product } = getHardwareProductBySlug(
        'cabinet-hinges',
        'hydraulic-soft-close-hinge'
      );
      expect(product).toBeDefined();

      const related = getRelatedProducts(product!, 3);
      const relatedIds = related.map((r) => r.id);

      // Hydraulic Soft-Close Hinge configures relatedProductIds: ['gas-spring', 'tandem-drawer-system', 'telescopic-drawer-slide']
      expect(relatedIds).toContain('gas-spring');
      expect(relatedIds).toContain('tandem-drawer-system');
    });

    it('deduplicates related products and backfills when necessary', () => {
      const allProducts = [
        getProductBySlug('hydraulic-soft-close-hinge'),
        getProductBySlug('l-shaped-modular-suite'),
      ].filter(Boolean);

      for (const prod of allProducts) {
        const related = getRelatedProducts(prod!, 3);
        const ids = related.map((r) => r.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      }
    });
  });
});
