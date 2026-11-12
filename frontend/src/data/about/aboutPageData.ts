export interface CapabilityItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  description: string;
  linkTo: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
}

export interface MaterialOrFinishItem {
  id: string;
  category: 'substrate' | 'finish';
  name: string;
  fullName: string;
  description: string;
  application: string;
  spec: string;
  character?: string;
  image: string;
  imageAlt: string;
}

export interface PhilosophyPanel {
  id: string;
  number: string;
  title: string;
  statement: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface GlobalMarket {
  id: string;
  name: string;
  role: string;
  lat: number;
  lng: number;
  description: string;
}

/* --------------------------------------------------------------------------
   SECTION 1: ABOUT HERO (TYPOGRAPHY FIRST & OPTICALLY CENTERED)
   -------------------------------------------------------------------------- */
export const ABOUT_HERO_DATA = {
  headlineLines: [
    'Quality hardware.',
    'Thoughtful design.',
    'Spaces built to last.',
  ],
  supportingCopy:
    'From precision furniture hardware to complete modular kitchens and furniture, we help bring functional, considered spaces to life.',
};

/* --------------------------------------------------------------------------
   SECTION 2: WHO WE ARE (EDITORIAL SPLIT & YOUTUBE VIDEO)
   -------------------------------------------------------------------------- */
export const WHO_WE_ARE_DATA = {
  eyebrow: 'WHO WE ARE',
  headline: 'More than hardware. A complete furniture solution.',
  bodyParagraph:
    'Surfuria is an Indian merchant exporter specializing in furniture hardware, modular kitchens, cabinets, and modular furniture. We bring together product sourcing and furniture manufacturing to serve customers in India and international markets.',
  callouts: [
    {
      id: 'hardware',
      number: '01',
      title: 'Furniture hardware',
      detail: 'Hinges, runners, drawer systems & precision architectural fittings',
    },
    {
      id: 'modular',
      number: '02',
      title: 'Complete modular solutions',
      detail: 'Modular kitchens, cabinets & contemporary modular furniture',
    },
    {
      id: 'international',
      number: '03',
      title: 'International supply',
      detail: 'Merchant export operations serving India, USA, Canada & Europe',
    },
  ],
  // Configurable YouTube video URL: if set, opens the high-definition brand film overlay on play
  videoUrl: 'https://youtu.be/0akFCX4mjo4?feature=shared',
  posterImage: '/images/kitchen-editorial.jpg',
  posterAlt: 'Surfuria modular kitchen joinery and architectural hardware craftsmanship',
};

/* --------------------------------------------------------------------------
   SECTION 3: OUR CAPABILITIES (MATCHING HOMEPAGE PRODUCT CATEGORY CARDS)
   -------------------------------------------------------------------------- */
export const CAPABILITIES_DATA: {
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  items: CapabilityItem[];
} = {
  eyebrow: 'OUR CAPABILITIES',
  headline: 'One brand. A complete furniture solution.',
  supportingCopy:
    'From individual mechanical fittings to complete modular environments, Surfuria bridges precision engineering and bespoke manufacturing.',
  items: [
    {
      id: 'hardware',
      number: '01',
      badge: '01 // ARCHITECTURAL HARDWARE',
      title: 'Furniture Hardware',
      description:
        'Hinges, telescopic channels, drawer systems, handles, and gas springs.',
      linkTo: '/hardware',
      linkLabel: 'Explore Hardware',
      image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466153/FURNITURE_HARDWARE_ac1zbg.png',
      imageAlt: 'Architectural concealed hinges and precision bronze joinery hardware',
    },
    {
      id: 'kitchens',
      number: '02',
      badge: '02 // CULINARY ARCHITECTURE',
      title: 'Modular Kitchens',
      description:
        'Complete kitchen solutions combining storage, usability, and contemporary finishes.',
      linkTo: '/kitchens',
      linkLabel: 'Explore Modular Kitchens',
      image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466155/2_uuuxnr.png',
      imageAlt: 'Custom contemporary modular kitchen with seamless cabinetry and island',
    },
    {
      id: 'cabinets',
      number: '03',
      badge: '03 // STORAGE & SYSTEMS',
      title: 'Modular Cabinets',
      description:
        'Storage solutions designed around practical organization and space.',
      linkTo: '/hardware?category=drawer-systems',
      linkLabel: 'Explore Cabinet Systems',
      image:
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Modular wardrobe and architectural storage cabinetry detail',
    },
    {
      id: 'furniture',
      number: '04',
      badge: '04 // BESPOKE FURNITURE',
      title: 'Modular Furniture',
      description:
        'Furniture solutions built around functional design and material choices.',
      linkTo: '/contact',
      linkLabel: 'Inquire About Furniture',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Considered modular furniture installation in architectural interior space',
    },
  ],
};

/* --------------------------------------------------------------------------
   SECTION 4: MATERIALS & FINISHES (TACTILE SELECTION EXPERIENCE)
   -------------------------------------------------------------------------- */
export const SUBSTRATES_DATA: MaterialOrFinishItem[] = [
  {
    id: 'mdf',
    category: 'substrate',
    name: 'MDF',
    fullName: 'Medium-Density Fibreboard',
    description:
      'Uniform composite board with homogeneous core density and flawless edge-profiling capabilities.',
    application:
      'Ideal for routed cabinet doors, lacquered millwork, and dry interior paneling.',
    spec: 'Homogeneous Density | Fine CNC Profiling',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466248/MDF_wgb9sg.png',
    imageAlt: 'MDF engineered fibreboard core texture and edge grain',
  },
  {
    id: 'hdhmr',
    category: 'substrate',
    name: 'HDHMR',
    fullName: 'High-Density High-Moisture Resistance',
    description:
      'Dense hardwood fiber matrix bonded with specialized moisture-resistant resins for rigorous daily environments.',
    application:
      'Specified for kitchen carcass structures, vanity cabinets, and moisture-exposed zones.',
    spec: 'Moisture Resistant | Hardwood Fibre Matrix',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466167/HDHMR_qzscc1.png',
    imageAlt: 'High-density moisture-resistant board substrate sample',
  },
  {
    id: 'plywood',
    category: 'substrate',
    name: 'Plywood',
    fullName: 'Calibrated Multi-Ply Core',
    description:
      'Cross-laminated timber veneers providing exceptional screw-holding force, flexural strength, and longevity.',
    application:
      'Engineered for heavy-load drawer bases, structural carcass frames, and heavy partitions.',
    spec: 'Cross-Laminated Veneers | High Screw-Holding Force',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466244/PLYWOOD_mehzcs.png',
    imageAlt: 'Calibrated architectural plywood cross-grain layer detail',
  },
  {
    id: 'bolio',
    category: 'substrate',
    name: 'Bolio Board',
    fullName: 'Specialty Engineered Composite',
    description:
      'Specially formulated board structure developed for dimensional stability, lightweight rigidity, and smooth planar precision.',
    application:
      'Applied in modern modular cabinetry assembly and commercial millwork carcasses.',
    spec: 'Dimensional Stability | Lightweight Rigidity',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466162/BOLIO_vlvfzn.png',
    imageAlt: 'Engineered composite board substrate detail',
  },
];

export const FINISHES_DATA: MaterialOrFinishItem[] = [
  {
    id: 'gloss',
    category: 'finish',
    name: 'Gloss',
    fullName: 'Polished High-Reflectivity Finish',
    description:
      'Refined reflective finish creating spatial depth, luminous light bouncing, and clean contemporary planes.',
    character: 'Mirror reflection & modern clarity',
    application:
      'Contemporary kitchen frontages, feature walls, and sleek modular cabinets.',
    spec: 'High Reflectance | Optical Depth',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466165/GLOSS_wsfhqj.png',
    imageAlt: 'Polished high-gloss architectural cabinetry reflection',
  },
  {
    id: 'acrylic',
    category: 'finish',
    name: 'Acrylic',
    fullName: 'Solid Color Depth & Glass Effect',
    description:
      'UV-stable non-toxic acrylic surface delivering scratch-resistant, mirror-smooth glass-like aesthetics.',
    character: 'Deep color saturation & flawless luster',
    application:
      'Premium kitchen cabinetry, seamless drawer fronts, and minimalist furniture.',
    spec: 'UV-Stable | Glass-Grade Smoothness',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466157/ACRYLIC_kywxl6.png',
    imageAlt: 'Deep saturated acrylic cabinetry surface detail',
  },
  {
    id: 'laminate',
    category: 'finish',
    name: 'Laminate',
    fullName: 'Engineered Multi-Layer Surface',
    description:
      'Versatile high-pressure surfacing featuring tactile stone, woodgrain, and matte architectural textures.',
    character: 'Durable wear-layer & tactile variety',
    application:
      'High-touch wardrobe exteriors, modular work surfaces, and living room credenzas.',
    spec: 'Wear-Resistant | Tactile Texture Options',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466162/LAMINATE_wnq9jq.png',
    imageAlt: 'High-pressure tactile laminate architectural surface',
  },
  {
    id: 'polymer',
    category: 'finish',
    name: 'Polymer',
    fullName: 'Seamless Thermo-Wrapped Layer',
    description:
      'Seamless wrap technology eliminating edge tape joints for comprehensive moisture seal and soft contours.',
    character: 'Joint-free wrapping & soft-touch feel',
    application:
      'Profiled cabinet shutters, rounded kitchen edges, and integrated finger-pull fronts.',
    spec: 'Zero-Joint Seamless Wrap | Moisture Barrier',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466241/POLYMER_b6pbtc.png',
    imageAlt: 'Seamless polymer-wrapped cabinet door edge and soft contour',
  },
];

/* --------------------------------------------------------------------------
   SECTION 5: OUR PHILOSOPHY (SCROLL-DRIVEN STORYTELLING)
   -------------------------------------------------------------------------- */
export const PHILOSOPHY_PANELS: PhilosophyPanel[] = [
  {
    id: 'quality',
    number: '01',
    title: 'Quality',
    statement: 'Quality begins with the details you use every day.',
    description:
      'From the millimeter tolerances of our concealed hinges to the balanced motion of drawer runners, durability is proven through daily touch.',
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Architectural hardware detail showing precision engineering and solid finish',
  },
  {
    id: 'functionality',
    number: '02',
    title: 'Functionality',
    statement: 'Every component should make a space work better.',
    description:
      'Hardware and modular millwork must disappear into intuitive daily living—silent soft-closing, effortless glide, and ergonomic access.',
    image:
      'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Precision cabinetry alignment and integrated ergonomic hardware',
  },
  {
    id: 'design',
    number: '03',
    title: 'Thoughtful Design',
    statement: 'Good design brings materials, movement, and everyday living together.',
    description:
      'Harmonizing substrate stability, refined tactile surface finishes, and kinematic motion into cohesive architectural environments.',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Contemporary architectural modular interior uniting materials and movement',
  },
];

/* --------------------------------------------------------------------------
   SECTION 6: OUR REACH (3D INTERACTIVE GLOBE & MARKETS)
   -------------------------------------------------------------------------- */
export const GLOBAL_REACH_DATA: {
  eyebrow: string;
  headline: string;
  bodyCopy: string;
  origin: GlobalMarket;
  destinations: GlobalMarket[];
} = {
  eyebrow: 'OUR REACH',
  headline: 'Rooted in India. Serving international markets.',
  bodyCopy:
    'As an Indian merchant exporter with experience in modular furniture manufacturing and sourcing, Surfuria serves customers across India and international markets including the USA, Canada, and Europe.',
  origin: {
    id: 'india',
    name: 'India',
    role: 'Home Market & Sourcing Hub',
    lat: 20.5937,
    lng: 78.9629,
    description:
      'Manufacturing partnerships, sourcing oversight, and nationwide supply serving prominent architectural practices and residential projects.',
  },
  destinations: [
    {
      id: 'usa',
      name: 'USA',
      role: 'International Market',
      lat: 37.0902,
      lng: -95.7129,
      description:
        'Merchant export supply of modular cabinetry packages, custom millwork, and premium architectural hardware specifications.',
    },
    {
      id: 'canada',
      name: 'Canada',
      role: 'International Market',
      lat: 56.1304,
      lng: -106.3468,
      description:
        'Providing robust modular kitchen cabinetry and architectural hardware fittings tailored for contemporary residential developments.',
    },
    {
      id: 'europe',
      name: 'Europe',
      role: 'International Market Region',
      lat: 48.8566,
      lng: 2.3522,
      description:
        'Exporting specialized hardware fittings, precision drawer runners, and bespoke modular components meeting discerning design standards.',
    },
  ],
};

/* --------------------------------------------------------------------------
   SECTION 7: CLOSING SECTION
   -------------------------------------------------------------------------- */
export const ABOUT_CLOSING_DATA = {
  mainStatement:
    'From hardware to complete kitchens — Surfuria delivers the complete solution.',
  brandSignature: 'SURFURIA — Hinged on Quality',
  cta: {
    label: 'Contact Us',
    to: '/contact',
  },
};