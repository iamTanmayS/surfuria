import { Link } from 'react-router-dom';
import logo from '../../../assets/surfuria logo.png';
import { FOOTER_BRAND_INFO, FOOTER_NAVIGATION_COLUMNS } from '../../../data/site/footerData';
import type { FooterSocialProfile } from './siteFooter.types';
import SocialIcons from './SocialIcons';
import './FooterColumns.css';

interface FooterColumnsProps {
  socialProfiles?: readonly FooterSocialProfile[];
}

export default function FooterColumns({ socialProfiles }: FooterColumnsProps) {
  return (
    <div className="sf-footer-cols">
      {/* 1. Brand Identity Column */}
      <div className="sf-footer-col sf-footer-col--brand">
        <Link to="/" className="sf-footer-brand" aria-label="Surfuria Home">
          <div className="sf-footer-brand__mark" aria-hidden="true">
            <img src={logo} alt="Surfuria Logo" className="sf-footer-brand__logo" />
          </div>
          <div className="sf-footer-brand__text">
            <span className="sf-footer-brand__title">{FOOTER_BRAND_INFO.name}</span>
            <span className="sf-footer-brand__tagline">{FOOTER_BRAND_INFO.tagline}</span>
          </div>
        </Link>
        <p className="sf-footer-brand__desc">{FOOTER_BRAND_INFO.description}</p>

        {/* Follow Us area with recognizable social icons */}
        <SocialIcons profiles={socialProfiles} />
      </div>

      {/* 2, 3, 4. Navigation Columns (Products, Company, Contact) */}
      {FOOTER_NAVIGATION_COLUMNS.map((column) => (
        <div key={column.id} className={`sf-footer-col sf-footer-col--${column.id}`}>
          <h3 className="sf-footer-col__title">{column.title}</h3>
          <ul className="sf-footer-nav-list" role="list">
            {column.links.map((link) => {
              const isAnchor = link.to.includes('#');

              return (
                <li key={link.id} className="sf-footer-nav-item">
                  {isAnchor ? (
                    <a href={link.to} className="sf-footer-nav-link">
                      <span className="sf-footer-nav-label">{link.label}</span>
                      {link.badge && <span className="sf-footer-nav-badge">{link.badge}</span>}
                    </a>
                  ) : (
                    <Link to={link.to} className="sf-footer-nav-link">
                      <span className="sf-footer-nav-label">{link.label}</span>
                      {link.badge && <span className="sf-footer-nav-badge">{link.badge}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
