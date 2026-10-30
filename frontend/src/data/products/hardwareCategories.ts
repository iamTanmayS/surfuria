import type { ProductCategory } from './types';

export type NavCategoryItem = ProductCategory;

export const HARDWARE_CATEGORIES: ProductCategory[] = [
  {
    id: 'cabinet-hinges',
    slug: 'cabinet-hinges',
    name: 'Cabinet Hinges & Lift Systems',
    title: 'Cabinet Hinges & Lifts',
    shortDescription: 'Hydraulic soft-close hinges and precision overhead gas lift mechanisms',
    subtitle: 'Hydraulic soft-close hinges and precision overhead gas lift mechanisms',
    description:
      'High-cycle kinematic hinge systems engineered with integrated hydraulic damping, multi-axis micro-adjustment, and controlled overhead gas lift mechanisms for silent, durable cabinet operation.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749954/7_1_Hinge_Close_Up_kxjfmg.png',
    badge: 'Flagship Kinematics',
    featured: true,
    sortOrder: 1,
  },
  {
    id: 'drawer-systems',
    slug: 'drawer-systems',
    name: 'Drawer Systems',
    title: 'Drawer Systems',
    shortDescription: 'Tandem boxes and soft-close telescopic slides engineered for smooth glide',
    subtitle: 'Tandem boxes and soft-close telescopic slides engineered for smooth glide',
    description:
      'Synchronized silent-glide drawer channel technologies featuring 3D adjustable tandem drawer boxes and heavy-duty soft-close telescopic slides with high dynamic load capacities.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749976/8_1_Tandem_Drawer_cromwz.png',
    badge: 'Precision Flow',
    featured: true,
    sortOrder: 2,
  },
  {
    id: 'furniture-handles',
    slug: 'furniture-handles',
    name: 'Door & Cabinet Handles',
    title: 'Door & Cabinet Handles',
    shortDescription: 'Architectural door and cabinet handles in solid brass, zinc alloy & aluminium',
    subtitle: 'Architectural door and cabinet handles in solid brass, zinc alloy & aluminium',
    description:
      'Precision-machined architectural hardware crafted across three material formulations with comprehensive sizing from 4 inches to 36 inches for cabinets, wardrobes, and doors.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749985/10_1_ibry4j.png',
    badge: 'Curated Metallurgy',
    featured: true,
    sortOrder: 3,
  },
  {
    id: 'pullout-storage',
    slug: 'pullout-storage',
    name: 'Pullout Storage Units',
    title: 'Pullout Storage Units',
    shortDescription: 'Multi-layer pantry larders and bottle pullout storage systems',
    subtitle: 'Multi-layer pantry larders and bottle pullout storage systems',
    description:
      'Space-optimizing vertical storage systems including multi-tier tall pantry larder units and undercounter soft-close bottle pullouts with universal cabinet fitting.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749965/11_1_ls3d8a.png',
    badge: 'Ergonomic Storage',
    featured: true,
    sortOrder: 4,
  },
  {
    id: 'corner-solutions',
    slug: 'corner-solutions',
    name: 'Corner Solutions',
    title: 'Corner Solutions',
    shortDescription: 'Universal soft-close magic corners and articulated swing tray mechanisms',
    subtitle: 'Universal soft-close magic corners and articulated swing tray mechanisms',
    description:
      'Intelligent blind-corner kinematics engineered to bring deep corner cabinet storage into effortless ergonomic reach, featuring 4-basket magic corners and smooth swing trays.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749995/13_1_cgvxos.png',
    badge: 'Articulated Corner',
    featured: true,
    sortOrder: 5,
  },
  {
    id: 'kitchen-accessories',
    slug: 'kitchen-accessories',
    name: 'Cabinet & Drawer Accessories',
    title: 'Cabinet Accessories',
    shortDescription: 'Stainless dish racks, PVC cutlery inserts, wicker baskets & tambour shutters',
    subtitle: 'Stainless dish racks, PVC cutlery inserts, wicker baskets & tambour shutters',
    description:
      'Essential internal cabinetry organizers including wet dish racks with drip trays, modular PVC cutlery inserts, natural steam beech wicker baskets, vertical roller shutters, and plate holders.',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749996/15_fimljl.png',
    badge: 'Cabinet Accessories',
    featured: true,
    sortOrder: 6,
  },
];
