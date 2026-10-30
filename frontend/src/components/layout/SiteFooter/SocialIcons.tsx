import type { FooterSocialProfile, SocialPlatformId } from './siteFooter.types';
import { FOOTER_SOCIAL_PROFILES } from '../../../data/site/footerData';
import { isValidHttpUrl } from '../../../config/social';
import './SocialIcons.css';

interface SocialIconsProps {
  profiles?: readonly FooterSocialProfile[];
  className?: string;
}

function SocialIconSvg({ platform }: { platform: SocialPlatformId }) {
  switch (platform) {
    case 'instagram':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'x':
      return (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Renders social media platform icons.
 *
 * Platforms with a valid URL → rendered as accessible <a> links.
 * Platforms with no URL → rendered as decorative <span> icons (visible but non-interactive).
 *
 * The component always renders if the profile list is non-empty. It never silently returns null.
 * Configure real URLs in footerData.ts → FOOTER_SOCIAL_PROFILES to activate each platform as a link.
 */
export default function SocialIcons({ profiles, className = '' }: SocialIconsProps) {
  const profileList = profiles || FOOTER_SOCIAL_PROFILES;

  // If no profiles exist or all social platforms are unconfigured/disabled, degrade gracefully without orphaned label
  const hasAnyActive = profileList.some((p) => Boolean(p.url && isValidHttpUrl(p.url)));
  if (!hasAnyActive) return null;

  return (
    <div className={`sf-footer-social ${className}`.trim()}>
      <span className="sf-footer-social__label">Follow Us</span>
      <div className="sf-footer-social__list" role="list">
        {profileList.map((profile) => {
          const isConfigured = Boolean(profile.url && isValidHttpUrl(profile.url));

          if (isConfigured) {
            // Configured: render as a real, accessible link
            return (
              <a
                key={profile.id}
                href={profile.url}
                className="sf-footer-social__icon sf-footer-social__icon--link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Surfuria on ${profile.label}`}
                role="listitem"
              >
                <SocialIconSvg platform={profile.id} />
              </a>
            );
          }

          // Unconfigured / disabled: render as non-interactive decorative icon
          return (
            <span
              key={profile.id}
              className="sf-footer-social__icon sf-footer-social__icon--inactive"
              aria-hidden="true"
              role="presentation"
              title={`${profile.label} — coming soon`}
            >
              <SocialIconSvg platform={profile.id} />
            </span>
          );
        })}
      </div>
    </div>
  );
}
