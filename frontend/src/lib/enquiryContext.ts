/**
 * SURFURIA — Enquiry Context Utility
 *
 * Reads URL search params and resolves rich context objects used by
 * ContactPage to pre-fill the enquiry form and render a context banner.
 *
 * Supported query param conventions
 * -----------------------------------
 * Kitchen configuration:
 *   /contact?type=kitchen-config&product=l-shaped
 *
 * Hardware product:
 *   /contact?type=hardware-product&product=door-handles
 *
 * Legacy (backwards compat):
 *   /contact?layout=l-shaped
 *   /contact?configuration=l-shaped
 *
 * General (no params, or unrecognised):
 *   /contact
 */

import {
  getKitchenConfigurationBySlug,
  getProductBySlug,
  getCategoryById,
  getHardwareCategoryBySlug,
} from '../data/products';
import { buildWhatsAppUrl } from '../config/whatsapp';
import {
  generateEnquiryMessage,
  type MessageContextData,
} from './enquiryMessageGenerator';

export type EnquiryType = 'kitchen-config' | 'hardware-product' | 'category' | 'general';

export interface EnquiryContext {
  type: EnquiryType;
  /** Short display title for the context banner. */
  title: string;
  /** Optional price string, e.g. "₹99,000". */
  price?: string;
  /** Optional thumbnail URL for the banner. */
  thumbnail?: string;
  /** Optional alt text for the thumbnail. */
  thumbnailAlt?: string;
  /** Optional category/badge label. */
  badge?: string;
  /** Link back to the product/config page. */
  detailUrl?: string;
  /** Pre-filled message for the contact form textarea. */
  prefillMessage: string;
  /** Underlying structured context data used for dynamic re-generation and personalisation. */
  contextData: MessageContextData;
  /** Pre-filled WhatsApp message URL. */
  whatsAppUrl: string;
  /** Form title. */
  formTitle: string;
}

export function getEnquiryContext(params: URLSearchParams): EnquiryContext {
  const type = params.get('type') as EnquiryType | null;
  const productParam = params.get('product') ?? '';

  // Legacy params from old kitchen config CTAs
  const legacySlug = params.get('layout') ?? params.get('configuration') ?? '';

  // ── Kitchen Configuration ────────────────────────────────────────────────
  if (type === 'kitchen-config' || legacySlug) {
    const slug = type === 'kitchen-config' ? productParam : legacySlug;
    const config = slug ? getKitchenConfigurationBySlug(slug) : undefined;
    if (config) {
      const contextData: MessageContextData = { type: 'kitchen-config', configuration: config };
      const prefillMessage = generateEnquiryMessage(contextData);

      return {
        type: 'kitchen-config',
        title: `${config.name} Modular Kitchen`,
        price: config.formattedPrice,
        thumbnail: config.image,
        thumbnailAlt: config.imageAlt,
        badge: 'Kitchen Configuration',
        detailUrl: `/kitchens/configurations/${config.slug}`,
        prefillMessage,
        contextData,
        whatsAppUrl: buildWhatsAppUrl(
          `Hi Surfuria! I'm interested in the ${config.name} Modular Kitchen configuration priced at ${config.formattedPrice}. Please share more details.`
        ),
        formTitle: `Enquire About ${config.name} Kitchen`,
      };
    }
  }

  // ── Hardware Product ─────────────────────────────────────────────────────
  if (type === 'hardware-product' && productParam) {
    const product = getProductBySlug(productParam);
    if (product) {
      const category = getCategoryById(product.categoryId);
      const contextData: MessageContextData = { type: 'hardware-product', product, category };
      const prefillMessage = generateEnquiryMessage(contextData);

      return {
        type: 'hardware-product',
        title: product.name,
        thumbnail: product.cardImage,
        thumbnailAlt: product.name,
        badge: category?.name ?? 'Hardware',
        detailUrl: `/hardware/${product.categoryId}/${product.slug}`,
        prefillMessage,
        contextData,
        whatsAppUrl: buildWhatsAppUrl(
          `Hi Surfuria! I'm interested in your ${product.name} collection. Please share more details.`
        ),
        formTitle: `Enquire About ${product.name}`,
      };
    }
  }

  // ── Category-Level Enquiry ───────────────────────────────────────────────
  const categoryParam = params.get('category') ?? (type === 'category' ? productParam : '');
  if (categoryParam) {
    const category = getCategoryById(categoryParam);
    if (category) {
      const contextData: MessageContextData = { type: 'category', category };
      const prefillMessage = generateEnquiryMessage(contextData);

      const isHardware = Boolean(getHardwareCategoryBySlug(category.slug));

      return {
        type: 'category',
        title: category.name,
        thumbnail: category.image,
        thumbnailAlt: category.name,
        badge: isHardware ? 'Hardware Catalogue' : 'Kitchens Catalogue',
        detailUrl: isHardware ? `/hardware/${category.slug}` : '/kitchens',
        prefillMessage,
        contextData,
        whatsAppUrl: buildWhatsAppUrl(
          `Hi Surfuria! I'm exploring your ${category.name} collection. Please share more details.`
        ),
        formTitle: `Enquire About ${category.name}`,
      };
    }
  }

  // ── General Fallback ─────────────────────────────────────────────────────
  const generalContextData: MessageContextData = { type: 'general' };
  const prefillMessage = generateEnquiryMessage(generalContextData);

  return {
    type: 'general',
    title: 'General Enquiry',
    prefillMessage,
    contextData: generalContextData,
    whatsAppUrl: buildWhatsAppUrl(
      'Hello Surfuria! I have an enquiry about your modular kitchens and architectural hardware.'
    ),
    formTitle: 'Start Your Enquiry',
  };
}
