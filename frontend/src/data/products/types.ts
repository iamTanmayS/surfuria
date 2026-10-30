/**
 * SURFURIA — Product & Category Domain Models
 * Canonical TypeScript contracts for Hardware & Kitchens catalogues.
 */

export type CatalogueType = 'hardware' | 'kitchens';

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  title: string; // for compatibility with nav items
  shortDescription: string;
  subtitle: string; // for compatibility with nav items
  description: string;
  image: string;
  badge?: string;
  featured?: boolean;
  sortOrder: number;
  href?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  catalogue: CatalogueType;
  categoryId: string;
  shortDescription: string;
  description: string;
  cardImage: string;
  badge?: string;
  galleryImages?: string[];
  features?: string[];
  specifications?: ProductSpecification[];
  finishes?: string[];
  materials?: string[];
  relatedProductIds?: string[];
  published?: boolean;
  sortOrder?: number;
}

export interface ProductEnquiryContext {
  productName: string;
  categoryName: string;
  productSlug: string;
  productUrl: string;
  catalogue: CatalogueType;
}

/**
 * Measurement specification with explicit numeric value and unit
 */
export interface AreaMeasurement {
  value: number;
  unit: 'sq. ft.' | string;
  formatted: string;
}

/**
 * Monetary pricing structure with explicit numeric amount and currency
 */
export interface PackagePrice {
  amount: number;
  currency: 'INR';
  symbol: '₹';
  formatted: string;
}

/**
 * SURFURIA — Modular Kitchen Configuration Record
 * Authoritative data model for modular kitchen layout packages.
 */
export interface KitchenConfiguration {
  id: string;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  galleryImages?: readonly string[];
  doorPanelArea: AreaMeasurement;
  boxPanelArea: AreaMeasurement;
  doorPanelFinish: string;
  boxPanelMaterial: string;
  boxPanelDescription: string;
  totalPackagePrice: PackagePrice;
  packagePrice: number;
  formattedPrice: string;
  transportationIncluded: boolean;
  professionalInstallationIncluded: boolean;
  includedHardware: readonly string[];
}


