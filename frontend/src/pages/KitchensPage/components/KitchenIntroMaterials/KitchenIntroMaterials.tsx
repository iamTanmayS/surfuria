import { motion, useReducedMotion } from 'motion/react';
import './KitchenIntroMaterials.css';

const MATERIALS = [
  {
    name: 'MDF',
    subtitle: 'Medium-Density Fibreboard',
    description: 'Precision-homogenized substrate engineered for flawless paint and laminate adhesion.',
  },
  {
    name: 'HDF-HMR',
    subtitle: 'High-Density High Moisture Resistant',
    description: 'Green core moisture-tolerant composite designed for humid kitchen zones.',
  },
  {
    name: 'Plywood',
    subtitle: 'Boiling Water Resistant (BWR)',
    description: 'Cross-laminated hardwood plies delivering immense tensile durability and screw-holding capacity.',
  },
  {
    name: 'Polymer-Based Boards',
    subtitle: 'Waterproof Composite Core',
    description: 'Zero-swell polymer matrices impervious to moisture, steam, and biological pests.',
  },
];

const FINISHES = [
  {
    name: 'Gloss',
    subtitle: 'High-Reflective Lacquer',
    description: 'Mirror-like light bounce expanding spatial perception with seamless surface depth.',
  },
  {
    name: 'Acrylic',
    subtitle: 'Ultra-Sleek Glass-Like Sheen',
    description: 'Non-toxic, UV-stable sheets providing scratch-resistant glass-like clarity.',
  },
  {
    name: 'Laminate',
    subtitle: 'Textured & Anti-Fingerprint',
    description: 'High-pressure decorative surfaces engineered for tactile richness and daily abrasion resistance.',
  },
  {
    name: 'Polymer',
    subtitle: 'Seamless Thermo-Formed Wrap',
    description: 'Continuous contour wrapping eliminating joint seams for maximum edge durability.',
  },
];

export default function KitchenIntroMaterials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="kitchen-intro-section" aria-labelledby="kitchen-intro-heading">
      <div className="container--wide">
        {/* Top Header & Manifesto Grid */}
        <div className="kitchen-intro-grid">
          {/* Left Column: Editorial Statement */}
          <motion.div
            className="kitchen-intro__manifesto-col"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="kitchen-intro__eyebrow">THE SURFURIA STANDARD</span>
            <h2 id="kitchen-intro-heading" className="kitchen-intro__title">
              Architectural Rigor Meets Bespoke Craftsmanship.
            </h2>
            <div className="kitchen-intro__text-block">
              <p className="kitchen-intro__lead">
                SURFURIA Kitchens specializes in designing and manufacturing premium modular kitchens tailored to modern lifestyles and individual requirements.
              </p>
              <p className="kitchen-intro__body">
                We offer a wide range of materials, including MDF, HDF-HMR, plywood, and polymer-based boards, complemented by premium finishes such as gloss, acrylic, laminate, and polymer. From thoughtful planning and material selection to precision manufacturing and professional installation, we deliver complete modular kitchen solutions with a focus on quality, functionality, and lasting craftsmanship.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars Badge Card */}
          <motion.div
            className="kitchen-intro__pillar-col"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="kitchen-intro__pillar-card">
              <div className="kitchen-intro__pillar-header">
                <span className="kitchen-intro__pillar-tag">FACTORY-DIRECT DISCIPLINE</span>
                <h3 className="kitchen-intro__pillar-title">Engineered For Everyday Living</h3>
              </div>
              <ul className="kitchen-intro__pillar-list">
                <li className="kitchen-intro__pillar-item">
                  <span className="kitchen-intro__pillar-icon">✓</span>
                  <div>
                    <strong>Millimeter Carcass Calibration</strong>
                    <p>CNC computerized sizing ensures gap-free joint alignment across all modules.</p>
                  </div>
                </li>
                <li className="kitchen-intro__pillar-item">
                  <span className="kitchen-intro__pillar-icon">✓</span>
                  <div>
                    <strong>PUR Waterproof Edge Banding</strong>
                    <p>Reactive hot-melt adhesive creates an invisible, moisture-proof barrier against steam.</p>
                  </div>
                </li>
                <li className="kitchen-intro__pillar-item">
                  <span className="kitchen-intro__pillar-icon">✓</span>
                  <div>
                    <strong>Integrated Kinematic Hardware</strong>
                    <p>High-cycle soft-close dampers, heavy-duty tandem runners, and articulated organizers.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Materials & Finishes Specification Matrix */}
        <div className="kitchen-materials-matrix">
          {/* Substrates / Materials */}
          <div className="kitchen-materials-group">
            <div className="kitchen-materials-group__header">
              <span className="kitchen-materials-group__tag">STRUCTURAL SUBSTRATES</span>
              <h3 className="kitchen-materials-group__title">Core Board Materials</h3>
            </div>
            <div className="kitchen-materials-cards">
              {MATERIALS.map((mat) => (
                <div key={mat.name} className="kitchen-mat-card">
                  <div className="kitchen-mat-card__top">
                    <span className="kitchen-mat-card__name">{mat.name}</span>
                  </div>
                  <span className="kitchen-mat-card__sub">{mat.subtitle}</span>
                  <p className="kitchen-mat-card__desc">{mat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Finishes */}
          <div className="kitchen-materials-group">
            <div className="kitchen-materials-group__header">
              <span className="kitchen-materials-group__tag">SURFACE AESTHETICS</span>
              <h3 className="kitchen-materials-group__title">Premium Shutter Finishes</h3>
            </div>
            <div className="kitchen-materials-cards">
              {FINISHES.map((fin) => (
                <div key={fin.name} className="kitchen-mat-card kitchen-mat-card--finish">
                  <div className="kitchen-mat-card__top">
                    <span className="kitchen-mat-card__name">{fin.name}</span>
                  </div>
                  <span className="kitchen-mat-card__sub">{fin.subtitle}</span>
                  <p className="kitchen-mat-card__desc">{fin.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

