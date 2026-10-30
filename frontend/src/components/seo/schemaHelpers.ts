/**
 * SURFURIA — Schema.org JSON-LD Structured Data Generators
 * Compliant with Google Search Central guidelines.
 * Never fabricates reviews, fake ratings, or unverified claims.
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://surfuria.com/#organization',
    name: 'Surfuria',
    url: 'https://surfuria.com',
    logo: 'https://surfuria.com/logo.png',
    email: 'info@surfuria.com',
    telephone: '+919424602091',
    description:
      'Surfuria designs and manufactures architectural furniture hardware, precision hinges, tandem drawer systems, and factory-engineered modular kitchens.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+919424602091',
        contactType: 'customer service',
        email: 'info@surfuria.com',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://surfuria.com/#website',
    url: 'https://surfuria.com',
    name: 'Surfuria',
    description:
      'Premium furniture hardware and factory-engineered modular kitchen architectures.',
    publisher: {
      '@id': 'https://surfuria.com/#organization',
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  image: string;
  url: string;
  categoryName?: string;
  sku?: string;
}

export function buildProductSchema(input: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: [input.image],
    url: input.url,
    sku: input.sku || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: input.categoryName,
    brand: {
      '@type': 'Brand',
      name: 'Surfuria',
    },
  };
}

export interface KitchenPackageSchemaInput {
  name: string;
  description: string;
  image: string;
  url: string;
  priceAmount: number;
  currency?: string;
}

export function buildKitchenPackageSchema(input: KitchenPackageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${input.name} Modular Kitchen Configuration`,
    description: input.description,
    image: [input.image],
    url: input.url,
    brand: {
      '@type': 'Brand',
      name: 'Surfuria',
    },
    offers: {
      '@type': 'Offer',
      price: input.priceAmount.toString(),
      priceCurrency: input.currency || 'INR',
      availability: 'https://schema.org/InStock',
      url: input.url,
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

export function buildCollectionSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@id': 'https://surfuria.com/#website',
    },
  };
}

