import type { Product } from './types.ts';

export const KITCHEN_PRODUCTS: Product[] = [
  // ==========================================================================
  // MODULAR KITCHENS
  // ==========================================================================
  {
    id: 'modular-l-shaped',
    slug: 'l-shaped-modular-suite',
    name: 'L-Shaped Modular Suite',
    catalogue: 'kitchens',
    categoryId: 'modular-kitchens',
    shortDescription: 'Ergonomic corner working triangles tailored for open-concept modern residences.',
    description:
      'Engineered around optimal culinary workflows. The L-shaped configuration pairs two adjacent perimeter runs to establish a fluid working triangle between refrigeration, sink, and cooking appliances. Carcasses are factory-machined with high-density HDHMR composite cores and German soft-close kinematic fittings.',
    cardImage: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=900&q=80',
    badge: 'Ergonomic Flow',
    galleryImages: [
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Precision CNC factory carcass manufacturing with 1mm PUR waterproof edge banding',
      'Integrated blind corner articulated carousels eliminating dead space',
      'Soft-close slim-wall steel drawer boxes rated for 70kg capacity',
      'Concealed under-cabinet architectural LED task channels',
    ],
    specifications: [
      { label: 'Carcass Substrate', value: '18mm Boiling Water Resistant (BWR) / HDHMR Grade' },
      { label: 'Countertop Recommendation', value: '20mm Solid Quartz or Natural Granite' },
      { label: 'Hardware Suite', value: 'Concealed 110° Soft-Close Hinges & Undermount Runners' },
      { label: 'Layout Adaptability', value: 'Customized modular widths (300mm to 1200mm)' },
    ],
    finishes: ['Warm Cashmere Matte', 'Natural White Oak Veneer', 'Smoked Grey Lacquer'],
    materials: ['HDHMR Core', 'Natural Stone Worktop', 'German Hardware Mechanics'],
    relatedProductIds: ['modular-parallel', 'modern-handleless-suite', 'island-monolithic-quartzite'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'modular-parallel',
    slug: 'parallel-galley-suite',
    name: 'Parallel Galley Suite',
    catalogue: 'kitchens',
    categoryId: 'modular-kitchens',
    shortDescription: 'Galley efficiency engineered for culinary enthusiasts and high-volume hosting.',
    description:
      'The classic double-bank parallel kitchen offers the highest functional density of any culinary layout. Separating wet prep zones from dry hot zones across opposing banks creates an uninterrupted working aisle where multiple chefs work collaboratively without interference.',
    cardImage: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=80',
    badge: 'Galley Efficiency',
    galleryImages: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Dual parallel counters with minimum recommended 1200mm aisle clearance',
      'Floor-to-ceiling tall bank integrating ovens, microwaves, and larder storage',
      'Flush-mount induction cooking bank with downdraft ventilation',
      'Heavy pan drawers with internal organizing dividers',
    ],
    specifications: [
      { label: 'Carcass Material', value: 'Marine-grade calibrated plywood with moisture seal' },
      { label: 'Aisle Clearance', value: 'Engineered for 1100mm to 1350mm passages' },
      { label: 'Drawer Depth', value: '550mm deep heavy storage runners' },
      { label: 'Plinth System', value: 'Waterproof PVC/Aluminum adjustable plinth (100mm)' },
    ],
    finishes: ['Matte Taupe Lacquer', 'Deep Walnut Grain', 'Brushed Bronze Accents'],
    materials: ['Marine Ply Core', 'Quartzite Countertops', 'Anti-Fingerprint Laminate'],
    relatedProductIds: ['modular-l-shaped', 'kitchen-storage-suite'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // MODERN KITCHENS
  // ==========================================================================
  {
    id: 'modern-handleless-suite',
    slug: 'handleless-lacquer-kitchen',
    name: 'Handleless Lacquer Kitchen',
    catalogue: 'kitchens',
    categoryId: 'modern-kitchens',
    shortDescription: 'Flush architectural cabinetry with recessed continuous gola channels and stone surfaces.',
    description:
      'Purist architectural minimalism where hardware becomes part of the cabinetry architecture itself. Aluminum J-profile and C-profile gola channels allow effortless door and drawer access while maintaining uninterrupted horizontal lines across the entire kitchen facade.',
    cardImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
    badge: 'Handleless Gola',
    galleryImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Continuous horizontal and vertical anodized aluminum gola profiles',
      'Multi-coat polyurethane matte lacquer with velvet soft-touch feel',
      'Mitred 45-degree waterfall stone end panels',
      'Concealed touch-release push mechanisms on top wall cabinets',
    ],
    specifications: [
      { label: 'Front Thickness', value: '22mm high-density lacquered MDF' },
      { label: 'Gola Profile Options', value: 'Recessed J-Shape & Intermediate C-Shape' },
      { label: 'Surface Sheen', value: 'Super-Matte 5% Gloss Level with anti-fingerprint coating' },
      { label: 'Edge Finish', value: 'Seamless zero-joint seamless laser edge' },
    ],
    finishes: ['Nordic White Matte', 'Basalt Charcoal Lacquer', 'Warm Muted Sand'],
    materials: ['Lacquered MDF', 'Extruded Aluminum Profiles', 'Engineered Quartz'],
    relatedProductIds: ['modern-matte-anthracite', 'island-monolithic-quartzite'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'modern-matte-anthracite',
    slug: 'matte-stone-minimalist-suite',
    name: 'Matte Stone Minimalist Suite',
    catalogue: 'kitchens',
    categoryId: 'modern-kitchens',
    shortDescription: 'Monolithic charcoal surfaces harmonized with smoked mirror glass vitrines.',
    description:
      'A dramatic exploration of dark materials and ambient lighting. Deep charcoal matte front panels are juxtaposed against slim aluminum-framed smoked glass display vitrines, creating an environment that transforms seamlessly from daytime culinary workstation to evening cocktail salon.',
    cardImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&q=80',
    badge: 'Dark Metallurgy',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Thermal healing matte nanotech laminate resistant to micro-scratches',
      'Smoked glass vitrines with concealed integrated 2700K warm LED vertical strip lighting',
      'Concealed Blum/Surfuria hydraulic soft-close pivot hinge mechanics',
      'Undermount composite granite sink with flush seamless worktop transition',
    ],
    specifications: [
      { label: 'Front Material', value: 'Thermal-healed matte nanotech laminate on 19mm core' },
      { label: 'Countertop', value: '12mm ultra-compact porcelain slab' },
      { label: 'Lighting', value: '24V dimmable concealed channel LED (CRI > 90)' },
      { label: 'Glass Specs', value: '6mm toughened smoked glass in matte black aluminum frame' },
    ],
    finishes: ['Matte Anthracite Nano', 'Deep Nero Marquina', 'Smoked Bronze Glass'],
    materials: ['Nanotech Laminate', 'Porcelain Slab', 'Smoked Toughened Glass'],
    relatedProductIds: ['modern-handleless-suite', 'island-cantilever-social'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // ISLAND KITCHENS
  // ==========================================================================
  {
    id: 'island-monolithic-quartzite',
    slug: 'monolithic-quartzite-island',
    name: 'Monolithic Quartzite Island',
    catalogue: 'kitchens',
    categoryId: 'island-kitchens',
    shortDescription: 'Architectural centerpiece island featuring seamless bookmatched natural quartzite.',
    description:
      'Designed as the undisputed gravity center of the open-plan residence. A massive 3.6-meter island wrapped in bookmatched natural quartzite with 45-degree mitered waterfall drops, incorporating deep chef pan drawers, an integrated sink prep trough, and flush induction cooking.',
    cardImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
    badge: 'Monolithic Stone',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Full bookmatched quartzite wrap with seamless continuous veining',
      'Concealed internal steel sub-chassis supporting cantilevered weight',
      'Internal dual-side storage: chef prep side drawers + living side wine vitrine',
      'Integrated pop-up motorized architectural power and charging column',
    ],
    specifications: [
      { label: 'Dimensions', value: '3600mm Length x 1200mm Depth x 910mm Height' },
      { label: 'Stone Thickness', value: '20mm solid quartzite with 60mm mitered fascia' },
      { label: 'Sub-Structure', value: 'Heavy-gauge welded structural box steel frame' },
      { label: 'Drawer Systems', value: '70kg rated slim-wall drawers with solid oak inserts' },
    ],
    finishes: ['Taj Mahal Quartzite', 'Calacatta Michelangelo', 'Nero Zimbabwe Leathered'],
    materials: ['Natural Quartzite', 'Solid Timber Core', 'Welded Steel Sub-Structure'],
    relatedProductIds: ['island-cantilever-social', 'modern-handleless-suite'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'island-cantilever-social',
    slug: 'cantilevered-social-island',
    name: 'Cantilevered Social Island',
    catalogue: 'kitchens',
    categoryId: 'island-kitchens',
    shortDescription: 'Sculptural island with floating solid timber breakfast bar and integrated seating.',
    description:
      'Harmonizing culinary prep with everyday hospitality. Features an engineered 1200mm cantilevered solid hardwood breakfast counter that hovers weightlessly without visible leg supports, seating up to four guests while keeping culinary prep zones separate.',
    cardImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
    badge: 'Floating Timber',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Internal structural steel blade support permits 1.2m floating counter overhang',
      'Solid 45mm quarter-sawn walnut breakfast bar with live or chamfered edge',
      'Under-counter warm halo illumination grazing the stone cabinetry',
      'Flush integrated wireless phone charging pads embedded beneath timber surface',
    ],
    specifications: [
      { label: 'Total Island Length', value: '3200mm' },
      { label: 'Cantilever Overhang', value: '1200mm span supporting 200kg tip load' },
      { label: 'Timber Bar Thickness', value: '45mm solid hardwood' },
      { label: 'Worktop Surface', value: 'Matte porcelain sintered stone' },
    ],
    finishes: ['Natural American Walnut Bar + Matte Concrete Stone', 'Smoked European Oak + Warm Ivory Quartzite'],
    materials: ['Solid American Walnut', 'Structural Steel Core', 'Porcelain Countertop'],
    relatedProductIds: ['island-monolithic-quartzite', 'custom-walnut-fluted'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // KITCHEN STORAGE
  // ==========================================================================
  {
    id: 'storage-pantry-suite',
    slug: 'integrated-floor-to-ceiling-pantry',
    name: 'Integrated Floor-to-Ceiling Pantry',
    catalogue: 'kitchens',
    categoryId: 'kitchen-storage',
    shortDescription: 'Floor-to-ceiling modular larders tailored for high-capacity organized living.',
    description:
      'A complete architectural dry-store solution. Twin tall cabinets featuring heavy-duty soft-close tandem larders that glide forward upon opening, paired with internal door racks and pull-out timber produce baskets for comprehensive kitchen management.',
    cardImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
    badge: 'Full-Height Suite',
    galleryImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Floor-to-ceiling continuous height up to 2700mm with zero sag',
      'Heavy-duty internal slide mechanics rated for 120kg total capacity',
      'Solid timber vegetable storage drawers with slotted ventilation bases',
      'Automatic sensor LED illumination activates upon door swing',
    ],
    specifications: [
      { label: 'Width Options', value: '600mm single door / 1200mm double door suite' },
      { label: 'Height Range', value: '2150mm to 2700mm' },
      { label: 'Shelf Trays', value: '6 to 8 adjustable solid-base trays' },
      { label: 'Internal Depth', value: '560mm standard' },
    ],
    finishes: ['Smoked Ash Interior + Warm Matte Lacquer Exterior', 'Natural Oak Interior + Matte Charcoal'],
    materials: ['HDHMR Water-Resistant Substrate', 'Heavy Cold-Rolled Steel Slides'],
    relatedProductIds: ['storage-pocket-appliance', 'modular-parallel'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'storage-pocket-appliance',
    slug: 'pocket-door-appliance-garage',
    name: 'Pocket-Door Appliance Garage',
    catalogue: 'kitchens',
    categoryId: 'kitchen-storage',
    shortDescription: 'Bi-fold pocket doors that disappear flush into side cavities to reveal hidden counters.',
    description:
      'The modern secret to clutter-free kitchens. Full-height bi-fold doors open and pivot 90 degrees to slide completely into narrow side pockets within the cabinet carcass. Inside, a complete breakfast or barista station with stone counters, electrical outlets, and task lighting is revealed.',
    cardImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
    badge: 'Disappearing Doors',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Patented coplanar scissor-action pocket hardware slides doors flush into side cavities',
      'Zero intrusion into kitchen walking aisles while doors remain open during prep',
      'Internal electrical shutoff sensor cuts power to small appliances when doors close',
      'Integrated quartz worktop slab with splashback and upper shelving',
    ],
    specifications: [
      { label: 'Opening Span', value: '1200mm to 1600mm double-door pocket bay' },
      { label: 'Door Height', value: 'Up to 2600mm door panels' },
      { label: 'Cavity Depth Loss', value: 'Only 70mm pocket cavity required per side' },
      { label: 'Door Weight Rating', value: '40kg per door leaf' },
    ],
    finishes: ['Grain-Matched Smoked Oak', 'Matte Lacquer in Custom RAL Colors'],
    materials: ['Engineered Pocket Track Gear', 'Solid Substrates', 'Composite Countertop'],
    relatedProductIds: ['storage-pantry-suite', 'custom-architectural-commission'],
    published: true,
    sortOrder: 2,
  },

  // ==========================================================================
  // CUSTOM KITCHENS
  // ==========================================================================
  {
    id: 'custom-architectural-commission',
    slug: 'turnkey-architectural-commission',
    name: 'Turnkey Architectural Commission',
    catalogue: 'kitchens',
    categoryId: 'custom-kitchens',
    shortDescription: 'Bespoke architectural commissions made to exact millimeter specifications and finishes.',
    description:
      'For bespoke residential masterworks requiring tailor-made solutions. Every drawer dimension, carcass joinery rebate, stone corner detail, and hardware finish is customized to architectural drawings, bridging Indian export craftsmanship with international specification standards.',
    cardImage: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=900&q=80',
    badge: 'Bespoke Commission',
    galleryImages: [
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Millimeter-precision shop drawing review and architectural coordination',
      'Custom veneer sequencing and hand-selected raw stone slab integration',
      'Direct merchant export packaging with marine-grade moisture vapor barrier wrapping',
      'Full assembly hardware, kinematic runners, and installation templates supplied',
    ],
    specifications: [
      { label: 'Scope', value: 'Full residential kitchen suites & secondary prep sculleries' },
      { label: 'Lead Time', value: '6 to 10 weeks from finalized shop drawings' },
      { label: 'Export Destinations', value: 'India, USA, Canada, UK & European Union' },
      { label: 'Warranty', value: '10-Year Structural Carcass & Lifetime Hardware Warranty' },
    ],
    finishes: ['Custom Architect Finishes', 'Natural Quartzite', 'Hand-Rubbed Patina Bronze'],
    materials: ['High-Grade Calibrated Marine Plywood', 'Architectural Metals', 'Natural Stone'],
    relatedProductIds: ['custom-walnut-fluted', 'island-monolithic-quartzite'],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'custom-walnut-fluted',
    slug: 'fluted-walnut-patina-bronze',
    name: 'Fluted Walnut & Patina Bronze',
    catalogue: 'kitchens',
    categoryId: 'custom-kitchens',
    shortDescription: 'Sculptural fluted solid walnut timber panelling paired with custom living bronze accents.',
    description:
      'A rich textural statement celebrating tactile materiality. Solid American black walnut vertical fluting wraps the kitchen island and perimeter base units, anchored by cast bronze recessed pulls and a honed Belgian bluestone worktop surface.',
    cardImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=900&q=80',
    badge: 'Fluted Craft',
    galleryImages: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Solid quarter-sawn American walnut vertical fluting machined to 16mm pitch',
      'Custom cast living bronze hardware integrated flush into joinery rebates',
      'Concealed plinth air circulation for integrated sub-counter cooling units',
      'Bookmatched upper storage cabinetry with soft touch-to-open latches',
    ],
    specifications: [
      { label: 'Fluting Profile', value: '16mm half-round solid walnut flutes' },
      { label: 'Finish', value: 'Ultra-low sheen matte polyurethane protective barrier' },
      { label: 'Worktop', value: 'Honed Belgian Bluestone / Soapstone (30mm)' },
      { label: 'Internal Hardware', value: 'Anthracite slim-wall drawers with matching walnut dividers' },
    ],
    finishes: ['Natural American Black Walnut', 'Aged Living Bronze Hardware'],
    materials: ['Solid American Walnut', 'Sand-Cast Bronze', 'Honed Natural Stone'],
    relatedProductIds: ['custom-architectural-commission', 'island-cantilever-social'],
    published: true,
    sortOrder: 2,
  },
];

