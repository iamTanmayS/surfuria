import type { Product } from './types.ts';

export const HARDWARE_PRODUCTS: Product[] = [
  // ==========================================================================
  // 1. CABINET HINGES & LIFT SYSTEMS
  // ==========================================================================
  {
    id: 'hydraulic-soft-close-hinge',
    slug: 'hydraulic-soft-close-hinge',
    name: 'Hydraulic Soft-Close Hinge',
    catalogue: 'hardware',
    categoryId: 'cabinet-hinges',
    shortDescription:
      'Essential for smooth, controlled, and silent cabinet-door operation, preventing slamming and enhancing durability.',
    description:
      'Essential for smooth, controlled, and silent cabinet-door operation, preventing slamming and enhancing durability. Available in 2D and 3D precision cam adjustment with 0°, 8°, and 15° crank options for full overlay, half overlay, and inset cabinet configurations.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749954/7_1_Hinge_Close_Up_kxjfmg.png',
    badge: 'Hydraulic Damping',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749954/7_1_Hinge_Close_Up_kxjfmg.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749975/7_2_Hinge_Exploded_View_Infographic_vd4epp.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749973/7_3_Surfuria_0_Crank_Soft-Close_Hinge_vtlvgp.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749958/7_4_Surfuria_8_Soft-Close_Hinge_wn2tjs.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749975/7_5_Surfuria_15_Crank_Hinge_ywzwba.png',
    ],
    features: [
      'Smooth, controlled, and silent cabinet-door operation',
      'Integrated hydraulic damping prevents slamming and prolongs cabinet life',
      'Available in 2D and 3D precision micro-adjustment for flush door reveals',
      'Crank options: 0° (Full Overlay), 8° (Half Overlay), and 15° (Inset)',
      'Engineered for high-cycle residential and commercial durability',
    ],
    specifications: [
      { label: 'Material', value: 'MS (Mild Steel) / SS (Stainless Steel)' },
      { label: 'Adjustment', value: '2D / 3D Cam Adjustment' },
      { label: 'Crank Options', value: '0° / 8° / 15°' },
      { label: 'Overlay Compatibility', value: 'Full Overlay (0°) / Half Overlay (8°) / Inset (15°)' },
      { label: 'Opening Angle', value: '100°' },
      { label: 'Cup Diameter', value: '35 mm' },
      { label: 'Door Thickness', value: '14 – 20 mm' },
      { label: 'Cup Depth / Height', value: '11.3 mm' },
      { label: 'Applications', value: 'Kitchen Cabinets, Wardrobe Shutters, Modular Furniture' },
    ],
    finishes: ['Nickel Plated (MS)', 'Stainless Steel Satin (SS)'],
    materials: ['Mild Steel (MS)', 'Stainless Steel (SS)'],
    relatedProductIds: ['gas-spring', 'tandem-drawer-system', 'telescopic-drawer-slide'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'gas-spring',
    slug: 'gas-spring',
    name: 'Gas Spring Lift Mechanism',
    catalogue: 'hardware',
    categoryId: 'cabinet-hinges',
    shortDescription:
      'Controlled hydraulic overhead cabinet lift mechanism engineered for long-lasting performance and smooth opening action.',
    description:
      'Controlled hydraulic overhead cabinet lift mechanism engineered for long-lasting performance and smooth opening action. Manufactured with German technology and high-grade materials for overhead kitchen and furniture lift-up doors.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750000/20_soctyx.png',
    badge: 'Lift Mechanism',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750000/20_soctyx.png',
    ],
    features: [
      'Long-lasting lift-up solution for overhead cabinetry shutters',
      'Engineered with German technology for consistent pneumatic action',
      'High-grade hydraulic cylinder construction with wear-resistant seals',
      'Smooth, cushioned opening motion holding door securely in place',
      'Universal mounting bracket for solid wood, MDF, and aluminium-profile shutters',
    ],
    specifications: [
      {
        label: 'Load Capacities',
        value:
          '50 N (~5 kg) / 80 N (~8 kg) / 100 N (~10 kg) / 120 N (~12 kg) / 150 N (~15 kg) / 200 N / 250 N / 300 N / Custom Ratings',
      },
      { label: 'Engineering Standard', value: 'German Technology Hydraulic Damping' },
      { label: 'Cylinder Material', value: 'High-Grade Steel with Anti-Corrosion Metallic Coating' },
      { label: 'Mounting Compatibility', value: 'Wooden Shutters & Aluminium-Frame Doors' },
      { label: 'Applications', value: 'Overhead kitchen wall cabinets, flap doors, lift-up shutters' },
    ],
    finishes: ['Metallic Silver', 'Satin Grey'],
    materials: ['High-Grade Steel', 'Hydraulic Damping Cylinder'],
    relatedProductIds: ['hydraulic-soft-close-hinge', 'roller-shutter', 'dish-rack-drip-tray'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // 2. DRAWER SYSTEMS
  // ==========================================================================
  {
    id: 'tandem-drawer-system',
    slug: 'tandem-drawer-system',
    name: 'Tandem Drawer System',
    catalogue: 'hardware',
    categoryId: 'drawer-systems',
    shortDescription:
      'Essential for smooth, stable, and effortless drawer movement, providing better storage functionality and everyday convenience.',
    description:
      'Essential for smooth, stable, and effortless drawer movement, providing better storage functionality and everyday convenience. Features synchronized silent runner technology, integrated soft-close damping, 3D front adjustment, and heavy dynamic load ratings up to 50 kg.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749976/8_1_Tandem_Drawer_cromwz.png',
    badge: '3D Adjustable',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749976/8_1_Tandem_Drawer_cromwz.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749965/8_2_Tandem_Drawer_nbhypq.png',
    ],
    features: [
      'Smooth, stable, and effortless drawer movement',
      'Integrated soft-close hydraulic damping prevents slamming',
      'Tool-free 3D front adjustment (height, side, and tilt alignment)',
      'Double-wall straight interior side profile maximizing internal volume',
      'Heavy-duty dynamic load ratings: 40 kg / 45 kg / 50 kg',
    ],
    specifications: [
      { label: 'Heights Available', value: '4 inches / 6 inches / 8 inches' },
      { label: 'Nominal Lengths', value: '300 / 350 / 400 / 450 / 500 / 550 mm' },
      { label: 'Load Capacities', value: '40 kg / 45 kg / 50 kg' },
      { label: 'Closing Action', value: 'Integrated Hydraulic Soft-Close' },
      { label: 'Adjustment', value: '3D Front Adjustment' },
      { label: 'Material', value: 'Steel Side Panels & Synchronized Concealed Runners' },
      { label: 'Finishes', value: 'Grey / Black' },
      { label: 'Application', value: 'Modular Kitchens & Architectural Furniture' },
    ],
    finishes: ['Grey', 'Black'],
    materials: ['High-Strength Steel', 'Polymer Dampers'],
    relatedProductIds: ['telescopic-drawer-slide', 'pvc-cutlery', 'plate-holder-pvc-coated'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'telescopic-drawer-slide',
    slug: 'telescopic-drawer-slide',
    name: 'Telescopic Drawer Slide (Soft-Close)',
    catalogue: 'hardware',
    categoryId: 'drawer-systems',
    shortDescription:
      'Essential for smooth, stable, and effortless drawer movement, providing better storage functionality and everyday convenience.',
    description:
      'Precision steel ball-bearing drawer slide with integrated soft-close damping. Available in full extension lengths from 10 to 24 inches with 45 mm profile width and heavy-duty dynamic load capacities up to 50 kg.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749977/9_1_Telescopic_Drawer_y92awa.png',
    badge: 'Heavy Duty',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749977/9_1_Telescopic_Drawer_y92awa.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749984/9_2_Telescopic_Drawer_kinxdi.png',
    ],
    features: [
      'Full-extension 3-fold ball-bearing slide system',
      'Hydraulic soft-close cylinder prevents bouncing and drawer slamming',
      'Standard 45 mm profile width compatible with modular cabinetry',
      'Quick disconnect trigger lever for effortless drawer installation and removal',
      'Precision steel ball bearings ensuring whisper-quiet movement under load',
    ],
    specifications: [
      { label: 'Lengths Available', value: '10", 12", 14", 16", 18", 20", 22", 24" (10–24 inches)' },
      { label: 'Slide Profile Width', value: '45 mm' },
      { label: 'Weight Ratings', value: '58 / 60 / 70 / 73 / 78 gm per inch' },
      { label: 'Load Capacities', value: '35 kg / 40 kg / 45 kg / 50 kg' },
      { label: 'Soft-Close Mechanism', value: 'Integrated Soft-Close Hydraulic Spring' },
      { label: 'Material', value: 'Cold-Rolled Steel' },
      { label: 'Finishes', value: 'Zinc Plated / Black Electrodeposition' },
      { label: 'Applications', value: 'Modular Kitchens, Furniture & Cabinet Drawers' },
    ],
    finishes: ['Zinc Plated', 'Black'],
    materials: ['Cold-Rolled Steel', 'Hardened Carbon Steel Ball Bearings'],
    relatedProductIds: ['tandem-drawer-system', 'pvc-cutlery', 'plate-holder-pvc-coated'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // 3. DOOR & CABINET HANDLES
  // ==========================================================================
  {
    id: 'door-handles',
    slug: 'door-handles',
    name: 'Architectural Door & Cabinet Handles',
    catalogue: 'hardware',
    categoryId: 'furniture-handles',
    shortDescription:
      'Precision-machined architectural door and cabinet handles available in three material combinations and comprehensive size ranges.',
    description:
      'Precision-machined architectural door and cabinet handles crafted for modern luxury interiors. Offered across three material and finish combinations (Zinc Alloy, Solid Brass, and Architectural Aluminium) in an extensive size spectrum from 4 inches to 36 inches.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749985/10_1_ibry4j.png',
    badge: 'Curated Metallurgy',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749985/10_1_ibry4j.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749979/10_2_xlwvrj.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749963/10_3_uuafjr.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749965/10_4_qnbji0.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749983/10_5_mi9nvb.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749980/10_6_n7i3e7.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749984/10_7_oqqalo.png',
    ],
    features: [
      'Three distinct material combinations: Zinc Alloy, Solid Brass, and Architectural Aluminium',
      'Comprehensive size coverage: 4 inches up to 36 inches',
      'Ergonomic hand-feel with balanced weight distribution',
      'Advanced electroplated and PVD surface finishes resisting tarnishing and corrosion',
      'Versatile architectural utility: compact drawer pulls to full-height wardrobe and entry doors',
    ],
    specifications: [
      { label: 'Material Combinations', value: 'Zinc Alloy / Solid Brass / Architectural Aluminium' },
      { label: 'Length Range', value: '4" to 36" (4", 6", 8", 10", 12", 18", 24", 36")' },
      {
        label: 'Finishes Available',
        value: 'Matte Black, Brushed Gold, Rose Gold, Antique Bronze, Satin Nickel, Polished Chrome',
      },
      {
        label: 'Applications',
        value: 'Cabinet Doors, Wardrobe Shutters, Main Entrance Doors & Modular Furniture',
      },
    ],
    finishes: [
      'Matte Black',
      'Brushed Gold',
      'Rose Gold',
      'Antique Bronze',
      'Satin Nickel',
      'Polished Chrome',
    ],
    materials: ['Zinc Alloy', 'Solid Brass', 'Architectural Aluminium'],
    relatedProductIds: ['hydraulic-soft-close-hinge', 'tandem-drawer-system'],
    published: true,
    sortOrder: 1,
  },

  // ==========================================================================
  // 4. PULLOUT STORAGE UNITS
  // ==========================================================================
  {
    id: 'bottle-pullout',
    slug: 'bottle-pullout',
    name: 'Soft-Close Bottle Pullout',
    catalogue: 'hardware',
    categoryId: 'pullout-storage',
    shortDescription:
      'Soft-close mechanism with 30 kg load capacity, universal left/right-side fitting, and adjustable shelves.',
    description:
      'Space-optimizing undercounter pullout storage unit engineered for narrow kitchen base cabinets. Features universal left/right mounting, smooth soft-close slides rated at 30 kg, and adjustable wire/sheet metal baskets.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749965/11_1_ls3d8a.png',
    badge: '30 kg Capacity',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749965/11_1_ls3d8a.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749986/11_2_uhgzbt.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749996/11_3_a3k06s.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749988/11_4_ggotp3.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749991/11_5_udm9eb.png',
    ],
    features: [
      'Soft-close mechanism with 30 kg dynamic load capacity',
      'Universal left/right-side fitting for versatile cabinet layout',
      'Adjustable shelf dividers for bottles, condiments, and tall jars',
      'Standard cabinet depth requirement: 500 mm',
      'Offered in four premium architectural finishes',
    ],
    specifications: [
      { label: 'Cabinet Sizes', value: '200 mm / 250 mm / 300 mm' },
      { label: 'Actual Unit Sizes', value: '150 mm / 200 mm / 250 mm' },
      { label: 'Cabinet Depth Required', value: '500 mm' },
      { label: 'Load Capacity', value: '30 kg' },
      { label: 'Mounting Style', value: 'Universal Left / Right Side Fitting' },
      { label: 'Finishes', value: 'Rose Gold, Grey Metallic, Black, Satin' },
    ],
    finishes: ['Rose Gold', 'Grey Metallic', 'Black', 'Satin'],
    materials: ['High-Grade Steel Wire & Base Sheet', 'Precision Soft-Close Slides'],
    relatedProductIds: ['pantry-pullout', 'magic-corner', 'dish-rack-drip-tray'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'pantry-pullout',
    slug: 'pantry-pullout',
    name: 'Pantry Pullout (4 & 6 Layers)',
    catalogue: 'hardware',
    categoryId: 'pullout-storage',
    shortDescription:
      'Soft-close mechanism compatible with left and right fitting, height-adjustable frame, and 110° opening angle.',
    description:
      'Full-height tall larder pantry storage system designed for effortless access to dry goods and kitchen provisions. Features smooth soft-close runner mechanism, reversible left/right door fitting, height-adjustable frame, and 110° wide door opening angle.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750000/12_1_qxb7fm.png',
    badge: 'Full Larder',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792750000/12_1_qxb7fm.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749991/12_2_muk59g.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749968/12_3_lamzam.png',
    ],
    features: [
      'Soft-close mechanism compatible with left and right fitting',
      'Height-adjustable central telescopic frame accommodating custom tall units',
      '110° opening angle for full ergonomic access to all pantry tiers',
      'Standard cabinet depth requirement: 500 mm',
      'Available in 4-layer and 6-layer basket configurations',
    ],
    specifications: [
      { label: 'Cabinet Sizes', value: '450 mm / 600 mm' },
      { label: 'Layer Configurations', value: '4-Layer / 6-Layer' },
      { label: 'Cabinet Depth Required', value: '500 mm' },
      { label: 'Opening Angle', value: '110°' },
      { label: 'Fitting Type', value: 'Universal Left / Right Side Fitting' },
      { label: 'Finishes', value: 'Rose Gold, Grey Metallic, Black, Satin' },
    ],
    finishes: ['Rose Gold', 'Grey Metallic', 'Black', 'Satin'],
    materials: ['Powder-Coated Steel Frame', 'Anti-Slip Base Trays'],
    relatedProductIds: ['bottle-pullout', 'magic-corner', 'swing-tray-corner'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // 5. CORNER SOLUTIONS
  // ==========================================================================
  {
    id: 'magic-corner',
    slug: 'magic-corner',
    name: 'Magic Corner Articulated Pullout',
    catalogue: 'hardware',
    categoryId: 'corner-solutions',
    shortDescription:
      'Smooth soft-close universal mechanism offering access to the entire corner with all four baskets pulling out.',
    description:
      'Intelligent articulated blind corner storage unit. As the door pulls open, the front baskets pivot outward while drawing the rear baskets forward into full view and reach. Built with a smooth soft-close universal mechanism.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749995/13_1_cgvxos.png',
    badge: '4-Basket Access',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749995/13_1_cgvxos.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749974/13_2_ygqx4o.png',
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749969/13_3_efvkpa.png',
    ],
    features: [
      'Smooth soft-close universal kinematic mechanism',
      'Full access to the entire blind corner void',
      'All 4 baskets pull out into clear ergonomic reach',
      'Universal left and right cabinet orientation',
      'Offered in four durable architectural finishes',
    ],
    specifications: [
      { label: 'Basket Configuration', value: '4 Heavy-Duty Baskets (2 Front + 2 Rear)' },
      { label: 'Mechanism', value: 'Universal Left/Right Soft-Close Articulated Kinematics' },
      { label: 'Application', value: 'Kitchen Blind Corner Base Cabinets (900–1050 mm)' },
      { label: 'Finishes', value: 'Rose Gold, Grey Metallic, Black, Satin' },
    ],
    finishes: ['Rose Gold', 'Grey Metallic', 'Black', 'Satin'],
    materials: ['High-Strength Steel Kinematic Linkage', 'Wire / Solid-Base Baskets'],
    relatedProductIds: ['swing-tray-corner', 'bottle-pullout', 'pantry-pullout'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'swing-tray-corner',
    slug: 'swing-tray-corner',
    name: 'Swing Tray Corner Mechanism',
    catalogue: 'hardware',
    categoryId: 'corner-solutions',
    shortDescription:
      'Soft-close swing mechanism suitable for blind corners with optional anti-skid mat.',
    description:
      'Independent dual-shelf articulated swing tray system engineered for blind corner kitchen cabinets. Each curved tray pivots smoothly and independently out of the cabinet with an integrated soft-close damping return and optional anti-skid mat surface.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749996/14_avpdkd.png',
    badge: 'Soft-Close Swing',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749996/14_avpdkd.png',
    ],
    features: [
      'Soft-close swing mechanism for silent and effortless operation',
      'Engineered specifically for blind corner cabinets',
      'Independently swinging upper and lower kidney trays',
      'Optional textured anti-skid mat prevents cookware shifting',
      'Ergonomic curved perimeter rail keeps items secure',
    ],
    specifications: [
      { label: 'Configuration', value: '2 Independent Swing Trays' },
      { label: 'Mechanism', value: 'Soft-Close Damped Pivot Arm' },
      { label: 'Compatibility', value: 'Blind Corner Base Cabinets' },
      { label: 'Surface Option', value: 'Optional Anti-Skid Mat' },
      { label: 'Applications', value: 'Pots, Pans & Cookware Storage in Blind Corners' },
    ],
    finishes: ['Grey Metallic', 'Satin Chrome', 'Black'],
    materials: ['Heavy-Gauge Steel Arm', 'Melamine / Polymer Base Tray with Metallic Rail'],
    relatedProductIds: ['magic-corner', 'bottle-pullout', 'pantry-pullout'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // 6. CABINET & DRAWER ACCESSORIES
  // ==========================================================================
  {
    id: 'dish-rack-drip-tray',
    slug: 'dish-rack-drip-tray',
    name: 'Dish Rack with Drip Tray',
    catalogue: 'hardware',
    categoryId: 'kitchen-accessories',
    shortDescription:
      'For storing wet glasses, bowls, and plates in overhead cabinets; stainless steel.',
    description:
      'Internal overhead cabinet storage system specifically engineered for wet tableware, glasses, bowls, and dinner plates. Fabricated from premium stainless steel with an integrated removable drip tray that shields overhead cabinetry woodwork from moisture.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749996/15_fimljl.png',
    badge: 'Stainless Steel',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749996/15_fimljl.png',
    ],
    features: [
      'Engineered for storing wet glasses, bowls, and plates in overhead cabinets',
      'Manufactured from corrosion-proof stainless steel',
      'Integrated removable drip tray protects cabinet wood from water droplets',
      'Two-tier configuration for plate vertical stacking and flat bowl/glass drying',
      'Standard cabinet sizes: 600 / 700 / 800 / 900 mm',
    ],
    specifications: [
      { label: 'Cabinet Sizes', value: '600 mm / 700 mm / 800 mm / 900 mm' },
      { label: 'Material', value: 'Stainless Steel (SS)' },
      { label: 'Components', value: 'Plate Rack, Glass/Bowl Rack, Removable Stainless Drip Tray' },
      { label: 'Installation', value: 'Overhead Wall Cabinet Internal Mount' },
      { label: 'Application', value: 'Wet Storage for Tableware above Kitchen Sink' },
    ],
    finishes: ['Stainless Steel Polished', 'Stainless Steel Satin'],
    materials: ['High-Grade Stainless Steel'],
    relatedProductIds: ['plate-holder-pvc-coated', 'pvc-cutlery', 'gas-spring'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'pvc-cutlery',
    slug: 'pvc-cutlery',
    name: 'PVC Cutlery Tray Organizer',
    catalogue: 'hardware',
    categoryId: 'kitchen-accessories',
    shortDescription:
      'Organizes cutlery; ABS material; grey satin finish; 3 mm material thickness.',
    description:
      'Precision-formed modular drawer insert designed to organize cutlery, knives, spoons, and cooking utensils. Molded from durable 3 mm ABS polymer in a refined grey satin finish across six cabinet-size specifications.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749972/16_iynvab.png',
    badge: 'ABS Material',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749972/16_iynvab.png',
    ],
    features: [
      'Organizes cutlery, flatware, and kitchen utensils',
      'Food-safe durable ABS material',
      'Grey satin finish matching modern tandem drawers',
      '3 mm rigid material thickness',
      'Six cabinet-size and exact actual-dimension combinations preserved from source',
    ],
    specifications: [
      { label: 'Material', value: 'ABS Polymer (3 mm Material Thickness)' },
      { label: 'Finish', value: 'Grey Satin' },
      { label: 'Cabinet 400 mm Dimensions', value: 'Actual: 330 mm (W) × 480 mm (D)' },
      { label: 'Cabinet 450 mm Dimensions', value: 'Actual: 380 mm (W) × 480 mm (D)' },
      { label: 'Cabinet 500 mm Dimensions', value: 'Actual: 430 mm (W) × 480 mm (D)' },
      { label: 'Cabinet 600 mm Dimensions', value: 'Actual: 530 mm (W) × 480 mm (D)' },
      { label: 'Cabinet 800 mm Dimensions', value: 'Actual: 730 mm (W) × 480 mm (D)' },
      { label: 'Cabinet 900 mm Dimensions', value: 'Actual: 830 mm (W) × 480 mm (D)' },
    ],
    finishes: ['Grey Satin'],
    materials: ['Durable ABS Polymer (3 mm)'],
    relatedProductIds: ['tandem-drawer-system', 'telescopic-drawer-slide', 'plate-holder-pvc-coated'],
    published: true,
    sortOrder: 2,
  },
  {
    id: 'wood-wicker-basket',
    slug: 'wood-wicker-basket',
    name: 'Natural Wood Wicker Basket',
    catalogue: 'hardware',
    categoryId: 'kitchen-accessories',
    shortDescription:
      'Ventilated storage with locking system, natural steam beech wood frame, and cane wood/jute basket.',
    description:
      'Artisanal pullout vegetable and pantry storage basket crafted with a natural steam beech wood outer frame and woven cane wood/jute inner basket. Features an integrated locking system and natural ventilation ideal for root vegetables, bread, and dry kitchen staples.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749974/17_lson6s.png',
    badge: 'Natural Beech',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749974/17_lson6s.png',
    ],
    features: [
      'Ventilated storage promotes natural air circulation for produce',
      'Integrated locking system prevents unintended pullout',
      'Natural steam beech wood frame with solid joinery',
      'Hand-woven cane wood / jute basket',
      'Six cabinet-size and product-dimension combinations preserved from source',
    ],
    specifications: [
      { label: 'Frame Material', value: 'Natural Steam Beech Wood' },
      { label: 'Basket Material', value: 'Cane Wood / Natural Jute' },
      { label: 'Mechanism', value: 'Locking System Pullout Runners' },
      { label: 'Cabinet 450 mm (H 100 mm)', value: 'Actual: 390 mm (W) × 500 mm (D) × 100 mm (H)' },
      { label: 'Cabinet 450 mm (H 150 mm)', value: 'Actual: 390 mm (W) × 500 mm (D) × 150 mm (H)' },
      { label: 'Cabinet 450 mm (H 200 mm)', value: 'Actual: 390 mm (W) × 500 mm (D) × 200 mm (H)' },
      { label: 'Cabinet 600 mm (H 100 mm)', value: 'Actual: 540 mm (W) × 500 mm (D) × 100 mm (H)' },
      { label: 'Cabinet 600 mm (H 150 mm)', value: 'Actual: 540 mm (W) × 500 mm (D) × 150 mm (H)' },
      { label: 'Cabinet 600 mm (H 200 mm)', value: 'Actual: 540 mm (W) × 500 mm (D) × 200 mm (H)' },
    ],
    finishes: ['Natural Beech & Cane'],
    materials: ['Steam Beech Wood', 'Natural Cane Wood & Jute'],
    relatedProductIds: ['bottle-pullout', 'pantry-pullout', 'roller-shutter'],
    published: true,
    sortOrder: 3,
  },
  {
    id: 'roller-shutter',
    slug: 'roller-shutter',
    name: 'Tambour Roller Shutter System',
    catalogue: 'hardware',
    categoryId: 'kitchen-accessories',
    shortDescription:
      'Space-saving vertical tambour door system in PVC material for 450, 600, and 900 mm cabinet sizes.',
    description:
      'Space-saving vertical tambour roller shutter system engineered for kitchen appliance garages and utility cabinets. Manufactured from durable PVC slats that glide smoothly on concealed guide rails, concealing small appliances while preserving countertop work area.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749999/18_mi2jxv.png',
    badge: 'Tambour System',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749999/18_mi2jxv.png',
    ],
    features: [
      'Space-saving vertical tambour door mechanism',
      'High-grade PVC slat construction',
      'Smooth guided track movement with counterbalanced spring',
      'Conceals countertop coffee machines, mixers, and appliances',
      'Cabinet size compatibility: 450 / 600 / 900 mm',
    ],
    specifications: [
      { label: 'Material', value: 'Durable Extruded PVC' },
      { label: 'Cabinet Sizes', value: '450 mm / 600 mm / 900 mm' },
      { label: 'Operation', value: 'Vertical Roll-Up with Guide Tracks' },
      { label: 'Application', value: 'Kitchen Appliance Garage, Utility Cabinet, Storage Unit' },
    ],
    finishes: ['Metallic Silver', 'Satin Black', 'White'],
    materials: ['Extruded PVC Slats', 'Aluminium Track Profile'],
    relatedProductIds: ['dish-rack-drip-tray', 'gas-spring', 'wood-wicker-basket'],
    published: true,
    sortOrder: 4,
  },
  {
    id: 'plate-holder-pvc-coated',
    slug: 'plate-holder-pvc-coated',
    name: 'Plate Holder with PVC-Coated Legs',
    catalogue: 'hardware',
    categoryId: 'kitchen-accessories',
    shortDescription:
      'Deep-drawer vertical plate stacker with PVC-coated anti-scratch legs in 20, 22, and 24 inch sizes.',
    description:
      'Ergonomic plate organizer designed for deep kitchen drawers. Features PVC-coated anti-scratch support legs that safely secure vertical plate stacks, preventing slipping and chipping during drawer pullout and closing. Available in 20, 22, and 24 inch sizes.',
    cardImage:
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749952/19_hbmefw.png',
    badge: 'PVC-Coated Legs',
    galleryImages: [
      'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749952/19_hbmefw.png',
    ],
    features: [
      'Vertical plate organizer for deep tandem and telescopic drawers',
      'PVC-coated legs protect porcelain and ceramic dinnerware from scratches',
      'Anti-slip grip prevents plate stacks from shifting on drawer motion',
      'Available in three drawer sizes: 20, 22, and 24 inches',
    ],
    specifications: [
      { label: 'Sizes Available', value: '20 inches / 22 inches / 24 inches' },
      { label: 'Leg Coating', value: 'PVC Anti-Scratch Protective Coating' },
      { label: 'Base Material', value: 'Steel Base with Coated Uprights' },
      { label: 'Application', value: 'Deep Drawer Dinnerware Stacking' },
    ],
    finishes: ['Chrome / Grey PVC', 'Black'],
    materials: ['Steel Wire', 'PVC Protective Dip Coating'],
    relatedProductIds: ['tandem-drawer-system', 'pvc-cutlery', 'dish-rack-drip-tray'],
    published: true,
    sortOrder: 5,
  },
];
