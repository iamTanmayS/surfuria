import { Link } from 'react-router-dom';
import logo from "../../../assets/surfuria logo.png";
import './Brand.css';
export interface BrandProps {
  onNavigateHome: () => void;
  title?: string;
  tagline?: string;
  logoSrc?: string;
}

export default function Brand({
  onNavigateHome,
  title = 'SURFURIA',
  tagline = 'Hinged on Quality',
  logoSrc = logo,
}: BrandProps) {
  return (
    <Link to="/" className="sf-brand" onClick={onNavigateHome}>
      <div className="sf-brand__mark" aria-hidden="true">
        {/* Bespoke Geometric Architectural Hinge / Pivot Emblem */}
        <img
          src={logoSrc}
          alt={title}
          className="navbar__logo"
        />
      </div>
      <div className="sf-brand__text">
        <span className="sf-brand__title">{title}</span>
        <span className="sf-brand__tagline">{tagline}</span>
      </div>
    </Link>
  );
}

