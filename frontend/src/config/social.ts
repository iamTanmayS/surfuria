import type { FooterSocialProfile, SocialPlatformId } from '../components/layout/SiteFooter/siteFooter.types';

export type { SocialPlatformId, FooterSocialProfile };

/**
 * Platform metadata definition including default brand destination and Vite environment variable name.
 */
export interface SocialPlatformMeta {
  readonly id: SocialPlatformId;
  readonly label: string;
  readonly defaultUrl: string;
  readonly envKey: string;
}

export const SOCIAL_PLATFORMS_CONFIG: readonly SocialPlatformMeta[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    defaultUrl: 'https://www.instagram.com/surfuriahardware',
    envKey: 'VITE_SOCIAL_INSTAGRAM_URL',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    defaultUrl: 'https://pinterest.com/surfuria',
    envKey: 'VITE_SOCIAL_PINTEREST_URL',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    defaultUrl: 'https://www.linkedin.com/company/gatha-global-traders/',
    envKey: 'VITE_SOCIAL_LINKEDIN_URL',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    defaultUrl: 'https://www.facebook.com/people/Gatha-Global-Traders',
    envKey: 'VITE_SOCIAL_FACEBOOK_URL',
  },
  {
    id: 'x',
    label: 'X (formerly Twitter)',
    defaultUrl: 'https://www.x.com/gathaglobal',
    envKey: 'VITE_SOCIAL_X_URL',
  },
] as const;

/**
 * Validates that an input is a well-formed HTTP or HTTPS URL.
 */
export function isValidHttpUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (!/^https?:\/\//i.test(trimmed)) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Reads an environment variable value across Node (testing / SSR) and Vite browser environments.
 */
function readEnvVar(key: string): string | undefined {
  // 1. Check process.env (Node / Vitest / SSR)
  const globalEnv = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;

  if (globalEnv) {
    return key in globalEnv ? globalEnv[key] : undefined;
  }

  // 2. Check import.meta.env (Vite client)
  try {
    const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
    if (metaEnv && key in metaEnv) {
      return metaEnv[key];
    }
  } catch {
    // import.meta may be unavailable in some test runtimes
  }

  return undefined;
}

/**
 * Resolves the URL for a specific platform based on environment variables and fallbacks.
 *
 * Rules:
 * - If env var is set to empty string, "false", "none", or "disabled", the platform is disabled (returns '').
 * - If env var is set and contains a valid http/https URL, that URL is returned.
 * - If env var is set to an invalid non-empty string, it returns '' to prevent broken links.
 * - If env var is undefined, the default brand URL is returned if valid, or '' otherwise.
 */
export function resolveSocialUrl(platformId: SocialPlatformId): string {
  const meta = SOCIAL_PLATFORMS_CONFIG.find((p) => p.id === platformId);
  if (!meta) return '';

  let envValue = readEnvVar(meta.envKey);
  if (platformId === 'x' && envValue === undefined) {
    envValue = readEnvVar('VITE_SOCIAL_TWITTER_URL');
  }

  if (envValue !== undefined) {
    const trimmed = envValue.trim();
    if (!trimmed || trimmed === 'false' || trimmed === 'none' || trimmed === 'disabled') {
      return '';
    }
    return isValidHttpUrl(trimmed) ? trimmed : '';
  }

  return isValidHttpUrl(meta.defaultUrl) ? meta.defaultUrl : '';
}

/**
 * Resolves social profiles for the footer.
 *
 * @param filterUnconfigured - When true (default), returns only platforms with valid, active URLs.
 *                             When false, returns all platforms with their resolved URLs (empty if disabled).
 */
export function resolveSocialProfiles(filterUnconfigured = true): FooterSocialProfile[] {
  const profiles: FooterSocialProfile[] = SOCIAL_PLATFORMS_CONFIG.map((meta) => ({
    id: meta.id,
    label: meta.label,
    url: resolveSocialUrl(meta.id),
  }));

  if (filterUnconfigured) {
    return profiles.filter((p) => p.url.length > 0 && isValidHttpUrl(p.url));
  }

  return profiles;
}

/**
 * Checks whether at least one social media link is active and valid.
 */
export function isAnySocialConfigured(): boolean {
  return resolveSocialProfiles(true).length > 0;
}

