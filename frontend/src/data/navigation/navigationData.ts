import { HARDWARE_CATEGORIES, KITCHEN_CATEGORIES } from '../products';
import { KITCHEN_CONFIGURATIONS } from '../products/kitchenConfigurations';
import type { ProductCategory } from '../products/types';

export type NavCategoryItem = ProductCategory;

/**
 * Authoritative navbar dropdown items for Kitchens.
 * Only displays the 4 standardized packages from FACTORY-ENGINEERED PACKAGES.
 */
export const KITCHEN_CONFIGURATION_NAV_ITEMS: NavCategoryItem[] = KITCHEN_CONFIGURATIONS.map(
  (cfg, idx) => ({
    id: cfg.id,
    slug: cfg.slug,
    name: `${cfg.name} Layout`,
    title: `${cfg.name} Layout`,
    shortDescription: 'Modular Kitchen Package · Custom Cabinetry',
    subtitle: 'Modular Kitchen Package · Custom Cabinetry',
    description: `Complete turnkey kitchen package with ${cfg.doorPanelArea.formatted} door area and ${cfg.boxPanelArea.formatted} box area.`,
    image: cfg.image,
    featured: true,
    sortOrder: idx + 1,
    href: `/kitchens/configurations/${cfg.slug}`,
  })
);

export { HARDWARE_CATEGORIES, KITCHEN_CATEGORIES };
