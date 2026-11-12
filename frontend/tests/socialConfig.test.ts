import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  isValidHttpUrl,
  resolveSocialUrl,
  resolveSocialProfiles,
  isAnySocialConfigured,
  SOCIAL_PLATFORMS_CONFIG,
} from '../src/config/social';

describe('Surfuria Social Configuration Suite', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Reset process.env for clean isolation
    process.env = { ...originalEnv };
    const keys = [
      'VITE_SOCIAL_INSTAGRAM_URL',
      'VITE_SOCIAL_PINTEREST_URL',
      'VITE_SOCIAL_LINKEDIN_URL',
      'VITE_SOCIAL_FACEBOOK_URL',
      'VITE_SOCIAL_X_URL',
      'VITE_SOCIAL_TWITTER_URL',
      'VITE_SOCIAL_YOUTUBE_URL',
    ];
    for (const k of keys) {
      delete process.env[k];
    }
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('isValidHttpUrl helper', () => {
    it('accepts valid https and http URLs', () => {
      expect(isValidHttpUrl('https://instagram.com/surfuria')).toBe(true);
      expect(isValidHttpUrl('http://example.com/page')).toBe(true);
      expect(isValidHttpUrl('https://linkedin.com/company/surfuria')).toBe(true);
    });

    it('rejects invalid or unsafe strings and protocols', () => {
      expect(isValidHttpUrl('')).toBe(false);
      expect(isValidHttpUrl('   ')).toBe(false);
      expect(isValidHttpUrl('javascript:alert(1)')).toBe(false);
      expect(isValidHttpUrl('ftp://example.com')).toBe(false);
      expect(isValidHttpUrl('not-a-url')).toBe(false);
      expect(isValidHttpUrl(null)).toBe(false);
      expect(isValidHttpUrl(undefined)).toBe(false);
    });
  });

  describe('resolveSocialUrl helper', () => {
    it('returns default URL when no environment variable is set', () => {
      const igUrl = resolveSocialUrl('instagram');
      expect(igUrl).toBe('https://www.instagram.com/surfuriahardware');
      const xUrl = resolveSocialUrl('x');
      expect(xUrl).toBe('https://www.x.com/gathaglobal');
    });

    it('returns custom URL when valid environment variable is set', () => {
      process.env.VITE_SOCIAL_INSTAGRAM_URL = 'https://instagram.com/custom_surfuria';
      expect(resolveSocialUrl('instagram')).toBe('https://instagram.com/custom_surfuria');

      process.env.VITE_SOCIAL_X_URL = 'https://x.com/surfuriabrand';
      expect(resolveSocialUrl('x')).toBe('https://x.com/surfuriabrand');
    });

    it('supports VITE_SOCIAL_TWITTER_URL as fallback for x platform', () => {
      process.env.VITE_SOCIAL_TWITTER_URL = 'https://twitter.com/surfuriabrand';
      expect(resolveSocialUrl('x')).toBe('https://twitter.com/surfuriabrand');
    });

    it('disables platform when environment variable is empty or explicitly disabled', () => {
      process.env.VITE_SOCIAL_FACEBOOK_URL = '';
      expect(resolveSocialUrl('facebook')).toBe('');

      process.env.VITE_SOCIAL_LINKEDIN_URL = 'none';
      expect(resolveSocialUrl('linkedin')).toBe('');

      process.env.VITE_SOCIAL_PINTEREST_URL = 'false';
      expect(resolveSocialUrl('pinterest')).toBe('');
    });

    it('rejects malformed URLs in environment variable and returns empty string', () => {
      process.env.VITE_SOCIAL_INSTAGRAM_URL = 'bad-link-without-protocol';
      expect(resolveSocialUrl('instagram')).toBe('');
    });
  });

  describe('resolveSocialProfiles & isAnySocialConfigured', () => {
    it('returns all 5 profiles by default when filterUnconfigured is false', () => {
      const all = resolveSocialProfiles(false);
      expect(all).toHaveLength(5);
      expect(all.map((p) => p.id)).toEqual([
        'instagram',
        'pinterest',
        'linkedin',
        'facebook',
        'x',
      ]);
    });

    it('filters out disabled platforms when filterUnconfigured is true', () => {
      process.env.VITE_SOCIAL_FACEBOOK_URL = '';
      process.env.VITE_SOCIAL_X_URL = 'none';

      const active = resolveSocialProfiles(true);
      expect(active).toHaveLength(3);
      expect(active.map((p) => p.id)).toEqual(['instagram', 'pinterest', 'linkedin']);
    });

    it('degrades cleanly when all platforms are disabled', () => {
      for (const platform of SOCIAL_PLATFORMS_CONFIG) {
        process.env[platform.envKey] = '';
      }

      expect(resolveSocialProfiles(true)).toEqual([]);
      expect(isAnySocialConfigured()).toBe(false);
    });

    it('reports isAnySocialConfigured true when at least one platform is active', () => {
      for (const platform of SOCIAL_PLATFORMS_CONFIG) {
        process.env[platform.envKey] = '';
      }
      process.env.VITE_SOCIAL_INSTAGRAM_URL = 'https://instagram.com/surfuria';

      expect(isAnySocialConfigured()).toBe(true);
      expect(resolveSocialProfiles(true)).toHaveLength(1);
    });
  });

  describe('FOOTER_SOCIAL_PROFILES filtering', () => {
    it('deactivates facebook, pinterest, and x in the active footer profiles', async () => {
      const { FOOTER_SOCIAL_PROFILES } = await import('../src/data/site/footerData');
      const activeIds = FOOTER_SOCIAL_PROFILES.map((p) => p.id);
      expect(activeIds).toContain('instagram');
      expect(activeIds).toContain('linkedin');
      expect(activeIds).not.toContain('facebook');
      expect(activeIds).not.toContain('pinterest');
      expect(activeIds).not.toContain('x');
    });
  });
});

