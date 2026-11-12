import type { KitchenConfiguration } from './types.js';

/**
 * SURFURIA — Shared Kitchen Included Hardware List
 * Single authoritative reference array included across all modular kitchen packages.
 */
export const SHARED_KITCHEN_INCLUDED_HARDWARE: readonly string[] = [
  'Bar Handles',
  'Tandem Drawers',
  'SS Baskets',
  'Soft-Close Hinges',
  'Plate Rack',
  'PVC Tray',
  'Minifix Set (Minifix, Dowel & Screw)',
  'Shelf Support Pins',
] as const;

/**
 * SURFURIA — Modular Kitchen Configuration Packages
 * Authoritative dataset derived from official configuration specifications.
 */
export const KITCHEN_CONFIGURATIONS: KitchenConfiguration[] = [
  {
    id: 'single-wall',
    name: 'Single Wall',
    slug: 'single-wall',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466243/SINGLE_WALL_gjh1lh.png',
    imageAlt: 'Surfuria Single Wall modular kitchen configuration with acrylic finish door panels and prelam board box panels',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466243/SINGLE_WALL_gjh1lh.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359575/1_SINGLE_WALL_tncngy.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359569/2_SINGLE_WALL_g8lb2d.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359583/3_SINGLE_WALL_fasuoe.png',
    ],
    doorPanelArea: {
      value: 56,
      unit: 'sq. ft.',
      formatted: '56 sq. ft.',
    },
    boxPanelArea: {
      value: 95,
      unit: 'sq. ft.',
      formatted: '95 sq. ft.',
    },
    doorPanelFinish: 'Acrylic Finish Door Panels',
    boxPanelMaterial: 'Prelam Board Box Panels',
    boxPanelDescription: 'Top, Bottom, Left, Right, Back Panel and One Shelf',
    totalPackagePrice: {
      amount: 89000,
      currency: 'INR',
      symbol: '₹',
      formatted: '₹89,000',
    },
    packagePrice: 89000,
    formattedPrice: '₹89,000',
    transportationIncluded: true,
    professionalInstallationIncluded: true,
    includedHardware: SHARED_KITCHEN_INCLUDED_HARDWARE,
  },
  {
    id: 'l-shaped',
    name: 'L-Shaped',
    slug: 'l-shaped',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466196/L_SHAPED_ge1vws.png',
    imageAlt: 'Surfuria L-Shaped modular kitchen configuration with acrylic finish door panels and prelam board box panels',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466196/L_SHAPED_ge1vws.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359597/1_L_SHAPED_nzuiiy.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359578/2_L_SHAPED_dmsokk.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359590/3_L_SHAPED_mtftyo.png',
    ],
    doorPanelArea: {
      value: 71,
      unit: 'sq. ft.',
      formatted: '71 sq. ft.',
    },
    boxPanelArea: {
      value: 95,
      unit: 'sq. ft.',
      formatted: '95 sq. ft.',
    },
    doorPanelFinish: 'Acrylic Finish Door Panels',
    boxPanelMaterial: 'Prelam Board Box Panels',
    boxPanelDescription: 'Top, Bottom, Left, Right, Back Panel and One Shelf',
    totalPackagePrice: {
      amount: 99000,
      currency: 'INR',
      symbol: '₹',
      formatted: '₹99,000',
    },
    packagePrice: 99000,
    formattedPrice: '₹99,000',
    transportationIncluded: true,
    professionalInstallationIncluded: true,
    includedHardware: SHARED_KITCHEN_INCLUDED_HARDWARE,
  },
  {
    id: 'island',
    name: 'Island',
    slug: 'island',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466166/ISLAND_kn49pa.png',
    imageAlt: 'Surfuria Island modular kitchen configuration with acrylic finish door panels and prelam board box panels',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466166/ISLAND_kn49pa.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359601/1_ISLAND_vwyljd.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359565/2_ISLAND_wmqzqf.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359551/3_ISLAND_qzllrp.png',
    ],
    doorPanelArea: {
      value: 71,
      unit: 'sq. ft.',
      formatted: '71 sq. ft.',
    },
    boxPanelArea: {
      value: 95,
      unit: 'sq. ft.',
      formatted: '95 sq. ft.',
    },
    doorPanelFinish: 'Acrylic Finish Door Panels',
    boxPanelMaterial: 'Prelam Board Box Panels',
    boxPanelDescription: 'Top, Bottom, Left, Right, Back Panel and One Shelf',
    totalPackagePrice: {
      amount: 99000,
      currency: 'INR',
      symbol: '₹',
      formatted: '₹99,000',
    },
    packagePrice: 99000,
    formattedPrice: '₹99,000',
    transportationIncluded: true,
    professionalInstallationIncluded: true,
    includedHardware: SHARED_KITCHEN_INCLUDED_HARDWARE,
  },
  {
    id: 'u-shaped',
    name: 'U-Shaped',
    slug: 'u-shaped',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466245/U_SHAPED_rpuh3w.png',
    imageAlt: 'Surfuria U-Shaped modular kitchen configuration with acrylic finish door panels and prelam board box panels',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466245/U_SHAPED_rpuh3w.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359539/1_U_SHAPED_xvytpx.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359565/2_U_SHAPED_mpccae.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1793359586/3_U_SHAPED_uhshcn.png',
    ],
    doorPanelArea: {
      value: 97,
      unit: 'sq. ft.',
      formatted: '97 sq. ft.',
    },
    boxPanelArea: {
      value: 95,
      unit: 'sq. ft.',
      formatted: '95 sq. ft.',
    },
    doorPanelFinish: 'Acrylic Finish Door Panels',
    boxPanelMaterial: 'Prelam Board Box Panels',
    boxPanelDescription: 'Top, Bottom, Left, Right, Back Panel and One Shelf',
    totalPackagePrice: {
      amount: 111000,
      currency: 'INR',
      symbol: '₹',
      formatted: '₹1,11,000',
    },
    packagePrice: 111000,
    formattedPrice: '₹1,11,000',
    transportationIncluded: true,
    professionalInstallationIncluded: true,
    includedHardware: SHARED_KITCHEN_INCLUDED_HARDWARE,
  },
];

/**
 * Lookup a kitchen configuration by its slug or ID.
 * Returns undefined safely if not found.
 */
export function getKitchenConfigurationBySlug(
  slug: string
): KitchenConfiguration | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return KITCHEN_CONFIGURATIONS.find(
    (config) =>
      config.slug.toLowerCase() === normalized ||
      config.id.toLowerCase() === normalized
  );
}

/**
 * Returns all kitchen configurations.
 */
export function getAllKitchenConfigurations(): KitchenConfiguration[] {
  return KITCHEN_CONFIGURATIONS;
}

