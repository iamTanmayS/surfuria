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
  const rawDeveloperUrl = import.meta.env.VITE_DEVELOPER_PROFILE_URL;
  const developerProfileUrl =
    typeof rawDeveloperUrl === 'string' && rawDeveloperUrl.trim().length > 0
      ? rawDeveloperUrl.trim()
      : undefined;

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

          {/* Developer Credit */}
          <div className="site-footer__credit" aria-label="Developer attribution">
            <span className="site-footer__credit-text">Designed &amp; developed by </span>
            {developerProfileUrl ? (
              <a
                href={developerProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__credit-link"
              >
                Tanmay Shukla
              </a>
            ) : (
              <span className="site-footer__credit-name">Tanmay Shukla</span>
            )}
            <svg
              className="site-footer__credit-heart"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="13"
              height="13"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
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
