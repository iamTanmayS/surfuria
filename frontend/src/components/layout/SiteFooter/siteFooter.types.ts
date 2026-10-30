export interface FooterLink {
  id: string;
  label: string;
  to: string;
  isExternal?: boolean;
  badge?: string;
}

export interface FooterNavColumn {
  id: string;
  title: string;
  links: readonly FooterLink[];
}

export type SocialPlatformId = 'instagram' | 'pinterest' | 'linkedin' | 'facebook' | 'x' | 'youtube';

export interface FooterSocialProfile {
  id: SocialPlatformId;
  label: string;
  url: string;
}

export interface NewsletterConfig {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  issueTag?: string;
  perks?: readonly string[];
  privacyNote?: string;
  privacyLinkTo?: string;
}

export interface SiteFooterProps {
  id?: string;
  className?: string;
  newsletterConfig?: Partial<NewsletterConfig>;
  /**
   * Optional configured social media profiles.
   * If omitted, falls back to FOOTER_SOCIAL_PROFILES in footerData.ts.
   * Only profiles with valid, non-empty URLs are rendered.
   */
  socialProfiles?: readonly FooterSocialProfile[];
  /**
   * Optional custom newsletter subscriber handler.
   * If provided, will be invoked when user submits a valid email.
   * If not provided, the form reports that a backend subscription endpoint is required.
   */
  onSubscribe?: (email: string) => Promise<boolean>;
}
