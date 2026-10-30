import { Link } from 'react-router-dom';
import NewsletterPanel from './NewsletterPanel';
import FooterColumns from './FooterColumns';
import { FOOTER_COPYRIGHT_TEXT, FOOTER_LEGAL_LINKS } from '../../../data/site/footerData';
import type { SiteFooterProps } from './siteFooter.types';
import './SiteFooter.css';

export default function SiteFooter({
  id = 'site-footer',
  className = '',
  newsletterConfig,
  socialProfiles,
  onSubscribe,
}: SiteFooterProps) {
  return (
    <div id={id} className={`site-footer-wrapper ${className}`.trim()}>
      {/* ----------------------------------------------------------------
          CONTAINER 1: Floating Newsletter Container
          Separate container centered horizontally, about 60% width of the
          footer, overlapping slightly over the footer section to feel merged.
          ---------------------------------------------------------------- */}
      <div className="site-newsletter-container" aria-label="Newsletter subscription">
        <NewsletterPanel config={newsletterConfig} onSubscribe={onSubscribe} />
      </div>

      {/* ----------------------------------------------------------------
          CONTAINER 2: Main Footer Section Container
          Main footer surface on shared .container--wide grid,
          with top clearance allowing the newsletter to merge seamlessly.
          ---------------------------------------------------------------- */}
      <footer className="site-footer" aria-label="Site Footer">
        <div className="site-footer__surface container--wide">
          <FooterColumns socialProfiles={socialProfiles} />
          <div className="site-footer__divider" role="separator" aria-hidden="true" />
          <div className="site-footer__bottom">
            <p className="site-footer__copyright">{FOOTER_COPYRIGHT_TEXT}</p>
            <nav className="site-footer__legal" aria-label="Legal links">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <Link key={item.id} to={item.to} className="site-footer__legal-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Layer 3: Oversized Low-Contrast Architectural Wordmark (cropped by overflow: hidden) */}
        <div className="site-footer__wordmark-wrap" aria-hidden="true">
          <div className="site-footer__wordmark">SURFURIA</div>
        </div>
      </footer>
    </div>
  );
}
