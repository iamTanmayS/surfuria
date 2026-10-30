import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/seo';
import Button from '../../components/ui/Button';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="sf-not-found-page container--wide">
      <SEOHead
        title="Page Not Found | Surfuria"
        description="The page you requested could not be located in the Surfuria catalogue."
        canonicalUrl="https://surfuria.com/404"
        robots="noindex, follow"
      />

      <div className="sf-not-found-card">
        <span className="sf-not-found-eyebrow">ERROR 404 · SPECIFICATION NOT FOUND</span>
        <h1 className="sf-not-found-title">Page Not Found</h1>
        <p className="sf-not-found-desc">
          The requested page or catalogue item may have been relocated, updated, or does not exist.
          Please explore our verified architectural collections below.
        </p>

        <div className="sf-not-found-actions">
          <Button to="/" variant="bronze">
            Return Home
          </Button>
          <Button to="/hardware" variant="outline">
            Hardware Catalogue
          </Button>
          <Button to="/kitchens" variant="outline">
            Modular Kitchens
          </Button>
        </div>

        <div className="sf-not-found-footer">
          <span>Need custom architectural assistance?</span>
          <Link to="/contact" className="sf-not-found-contact-link">
            Speak with our Specification Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}

