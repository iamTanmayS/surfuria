import { describe, it, expect } from 'vitest';
import { FOOTER_LEGAL_LINKS, DEFAULT_NEWSLETTER_CONFIG } from '../src/data/site/footerData';

describe('Surfuria Legal Pages & Footer Links Integration', () => {
  it('connects the footer Privacy Policy button to /privacy', () => {
    const privacyLink = FOOTER_LEGAL_LINKS.find((link) => link.id === 'leg-privacy');
    expect(privacyLink).toBeDefined();
    expect(privacyLink?.label).toBe('Privacy Policy');
    expect(privacyLink?.to).toBe('/privacy');
  });

  it('connects the footer Terms button to /terms', () => {
    const termsLink = FOOTER_LEGAL_LINKS.find((link) => link.id === 'leg-terms');
    expect(termsLink).toBeDefined();
    expect(termsLink?.label).toMatch(/Terms/);
    expect(termsLink?.to).toBe('/terms');
  });

  it('connects the floating newsletter privacy disclosure link to /privacy', () => {
    expect(DEFAULT_NEWSLETTER_CONFIG.privacyLinkTo).toBe('/privacy');
  });

  it('ensures legal links are valid non-empty paths starting with slash', () => {
    FOOTER_LEGAL_LINKS.forEach((link) => {
      expect(link.to.startsWith('/')).toBe(true);
      expect(link.label.trim().length).toBeGreaterThan(0);
    });
  });
});

