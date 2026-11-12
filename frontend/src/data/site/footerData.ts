import type { FooterNavColumn, FooterSocialProfile, NewsletterConfig } from '../../components/layout/SiteFooter/siteFooter.types';
import { resolveSocialProfiles } from '../../config/social';

export const DEFAULT_NEWSLETTER_CONFIG: NewsletterConfig = {
  eyebrow: 'Architectural Dispatch',
  title: 'Subscribe to our latest collections & specification guides.',
  description:
    "",
  image: '/images/newsletter-joinery.jpg',
  imageAlt: 'Architectural custom joinery detail featuring precision bronze hardware and flush finish',
  privacyNote: 'No marketing noise. You can unsubscribe at any time.',
  privacyLinkTo: '/privacy',
};

export const FOOTER_BRAND_INFO = {
  name: 'SURFURIA',
  tagline: 'Hinged on Quality',
  description: 'Thoughtfully selected hardware and kitchen fittings for considered contemporary spaces.',
};

/**
 * Centralized social media profiles for Surfuria.
 * Pinterest and X are temporarily deactivated per brand direction.
 */
export const FOOTER_SOCIAL_PROFILES: readonly FooterSocialProfile[] = resolveSocialProfiles(false).filter(
  (p) => p.id !== 'pinterest' && p.id !== 'x'
);

export const FOOTER_NAVIGATION_COLUMNS: readonly FooterNavColumn[] = [
  {
    id: 'products',
    title: 'Products',
    links: [
      { id: 'p-all', label: 'All Hardware', to: '/hardware' },
      { id: 'p-handles', label: 'Cabinet Handles', to: '/hardware?category=furniture-handles' },
      { id: 'p-hinges', label: 'Hinges', to: '/hardware?category=cabinet-hinges' },
      { id: 'p-drawers', label: 'Drawer Systems', to: '/hardware?category=drawer-systems' },
      { id: 'p-accessories', label: 'Kitchen Accessories', to: '/hardware?category=kitchen-accessories' },
      { id: 'p-kitchens', label: 'Modular Kitchens', to: '/kitchens' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'c-about', label: 'About Surfuria', to: '/about' },
      { id: 'c-why', label: 'Why Choose Us', to: '/about#why-us' },
      { id: 'c-approach', label: 'Our Approach', to: '/about#approach' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    links: [
      { id: 'cnt-main', label: 'Contact Us', to: '/contact' },
    ],
  },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { id: 'leg-privacy', label: 'Privacy Policy', to: '/privacy' },
  { id: 'leg-terms', label: 'Terms & Conditions', to: '/terms' },
] as const;

export const FOOTER_COPYRIGHT_TEXT = `© 2026 Surfuria. All rights reserved.`;
