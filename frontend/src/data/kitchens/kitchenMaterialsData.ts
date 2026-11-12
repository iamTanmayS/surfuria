import type { MaterialOrFinishItem } from '../about/aboutPageData';

/* --------------------------------------------------------------------------
   SURFURIA KITCHEN MATERIALS & FINISHES DATA
   Factual, architectural specifications with verified authentic imagery
   -------------------------------------------------------------------------- */

export const KITCHEN_SUBSTRATES_DATA: MaterialOrFinishItem[] = [
  {
    id: 'mdf',
    category: 'substrate',
    name: 'MDF',
    fullName: 'Medium-Density Fibreboard',
    description:
      'Uniform engineered wood panel produced by breaking down hardwood and softwood residuals into fine wood fibres, combined with wax and resin binders under heat and pressure.',
    application:
      'Wall-hung upper cabinets, CNC-profiled shutter doors, fluted decorative paneling, and dry interior storage zones.',
    spec: 'Homogeneous Density | Fine CNC Profiling | Dry Interior Use',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466248/MDF_wgb9sg.png',
    imageAlt:
      'Authentic Medium-Density Fibreboard sample block showing homogeneous wood fibre core and smooth sanded face',
  },
  {
    id: 'hdf-hmr',
    category: 'substrate',
    name: 'HDF-HMR',
    fullName: 'High-Density High Moisture Resistance',
    description:
      'Engineered green-core substrate manufactured from high-density compressed hardwood fibres bonded with special moisture-resistant resins for dimensional stability in humid conditions.',
    application:
      'Kitchen base carcasses, sink enclosures, under-counter drawer boxes, and environments exposed to ambient cooking humidity.',
    spec: 'Moisture Resistant Green Core | High Screw Holding (>800 kg/m³)',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466167/HDHMR_qzscc1.png',
    imageAlt:
      'Authentic green-core HDF-HMR board sample showing dense moisture-resistant core along cut cross-section',
  },
  {
    id: 'plywood',
    category: 'substrate',
    name: 'Plywood',
    fullName: 'Calibrated BWR Multi-Ply Core',
    description:
      'Cross-laminated multi-layer hardwood veneers pressed under high temperature with Boiling Water Resistant (BWR) adhesives, calibrated to uniform thickness.',
    application:
      'Heavy-load base cabinets, tall pantry towers, larder units, and deep tandem drawer housings requiring high structural strength.',
    spec: 'Cross-Laminated Veneers | High Flexural Strength | BWR Grade',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466244/PLYWOOD_mehzcs.png',
    imageAlt:
      'Authentic calibrated multi-ply hardwood plywood sample showing distinct alternating cross-laminated veneer layers',
  },
  {
    id: 'polymer-boards',
    category: 'substrate',
    name: 'Polymer Boards',
    fullName: 'Solid Waterproof Polymer Composite',
    description:
      'Solid cellular composite board extruded from virgin PVC and polymer resins, offering zero moisture absorption and complete immunity to water damage.',
    application:
      'Under-sink wash cabinets, wet-area plinths and skirting, outdoor kitchens, and high-moisture floor zones.',
    spec: '100% Waterproof | Termite Proof | Zero Swelling',
    image: '/images/materials/polymer-board.jpg',
    imageAlt:
      'Authentic solid white polymer composite waterproof board sample block with cellular core',
  },
];

export const KITCHEN_FINISHES_DATA: MaterialOrFinishItem[] = [
  {
    id: 'gloss',
    category: 'finish',
    name: 'Gloss',
    fullName: 'High-Reflectivity Lacquer Finish',
    description:
      'Multi-coat polyurethane or UV-cured high-shine lacquer providing a glass-like reflective surface that amplifies ambient light and adds visual depth.',
    application:
      'Overhead lift-up shutters, contemporary handleless kitchen fronts, and compact spaces benefiting from light bounce.',
    spec: 'High Specular Reflectance | Optical Depth | Wipe-Clean Surface',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466165/GLOSS_wsfhqj.png',
    imageAlt:
      'Architectural kitchen cabinet door with mirror-reflective high-gloss lacquer finish',
  },
  {
    id: 'acrylic',
    category: 'finish',
    name: 'Acrylic',
    fullName: 'Solid Color Depth & Glass Effect',
    description:
      '1mm–2mm solid UV-stabilized acrylic sheets bonded with PUR adhesives, delivering uniform color depth and scratch-resistant optical clarity.',
    application:
      'Premium kitchen island fascia, tall appliance housings, and high-traffic modern cabinet fronts.',
    spec: 'UV-Stable Color Depth | Glass-Grade Smoothness | Non-Toxic',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466157/ACRYLIC_kywxl6.png',
    imageAlt:
      'Solid acrylic kitchen cabinet shutter with glass-like smooth surface and deep color saturation',
  },
  {
    id: 'laminate',
    category: 'finish',
    name: 'Laminate',
    fullName: 'High-Pressure Tactile Multi-Layer Surface',
    description:
      'High-Pressure Laminate (HPL) cured under heat with decorative paper layers, offering superior resistance to heat, abrasion, and daily household chemicals.',
    application:
      'Main working base cabinets, heavy-use pantry doors, utility counters, and textured architectural accent runs.',
    spec: 'Abrasion Resistant | Anti-Fingerprint | Matte & Textured Options',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466162/LAMINATE_wnq9jq.png',
    imageAlt:
      'High-pressure decorative laminate kitchen shutter showing tactile matte micro-texture',
  },
  {
    id: 'polymer-finish',
    category: 'finish',
    name: 'Polymer',
    fullName: 'Seamless Thermo-Wrapped Membrane',
    description:
      'Vacuum-bonded thermo-wrapped polymer foil that envelopes the front face and edges continuously without visible edge-band seams or adhesive joints.',
    application:
      'Shaker-style profiled doors, routed drawer faces, and moisture-prone lower base cabinetry requiring 5-sided protection.',
    spec: 'Joint-Free Wrapping | 3D Profile Conformance | Moisture-Sealed Edge',
    image: 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1794466241/POLYMER_b6pbtc.png',
    imageAlt:
      'Seamless thermo-wrapped polymer membrane kitchen shutter showcasing joint-free radius edge profile',
  },
];

