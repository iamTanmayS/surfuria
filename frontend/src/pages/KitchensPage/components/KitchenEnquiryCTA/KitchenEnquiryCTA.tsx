import Button from '../../../../components/ui/Button';
import './KitchenEnquiryCTA.css';

export default function KitchenEnquiryCTA() {
  return (
    <section className="kitchen-cta-section" aria-labelledby="kitchen-cta-heading">
      <div className="container--wide">
        <div className="kitchen-cta-card">
          <div className="kitchen-cta-content">
            <span className="kitchen-cta-eyebrow">CUSTOM MODULAR FABRICATION</span>
            <h2 id="kitchen-cta-heading" className="kitchen-cta-title">
              Ready to Design Your Modular Kitchen?
            </h2>
            <p className="kitchen-cta-desc">
              From laser spatial measurement to 3D architectural elevations and white-glove installation, our specialized kitchen engineers guide you through every milestone. Get an itemized turnkey quotation tailored to your floor plan.
            </p>

            <div className="kitchen-cta-actions">
              <Button to="/contact" variant="bronze" className="kitchen-cta-btn-primary">
                Book Design Consultation
              </Button>
              <Button to="/hardware" variant="outline" className="kitchen-cta-btn-secondary">
                Explore Hardware
              </Button>
            </div>
          </div>

          {/* Pillars List */}
          <div className="kitchen-cta-features">
            <div className="kitchen-cta-feature-item">
              <div className="kitchen-cta-feat-icon">01</div>
              <div className="kitchen-cta-feat-text">
                <strong>Precision CNC Fabrication</strong>
                <p>Millimeter-accurate carcass sizing with zero assembly tolerance error.</p>
              </div>
            </div>
            <div className="kitchen-cta-feature-item">
              <div className="kitchen-cta-feat-icon">02</div>
              <div className="kitchen-cta-feat-text">
                <strong>Transparent Turnkey Pricing</strong>
                <p>Complete packages with transportation and professional installation included.</p>
              </div>
            </div>
            <div className="kitchen-cta-feature-item">
              <div className="kitchen-cta-feat-icon">03</div>
              <div className="kitchen-cta-feat-text">
                <strong>Factory Kinematic Hardware</strong>
                <p>Standardized soft-close dampers, heavy tandem boxes, and organizers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

