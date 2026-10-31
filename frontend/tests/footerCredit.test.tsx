/// <reference types="vite/client" />
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import SiteFooter from '../src/components/layout/SiteFooter/SiteFooter';

describe('Surfuria Footer Developer Credit', () => {
  it('renders "Designed & developed by" and "Tanmay Shukla" with a heart icon', () => {
    const html = renderToString(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );

    expect(html).toContain('Designed &amp; developed by');
    expect(html).toContain('Tanmay Shukla');
    expect(html).toContain('site-footer__credit-heart');
  });

  it('renders Tanmay Shukla as non-clickable plain text when VITE_DEVELOPER_PROFILE_URL is empty', () => {
    const originalEnv = import.meta.env.VITE_DEVELOPER_PROFILE_URL;
    try {
      (import.meta.env as Record<string, unknown>).VITE_DEVELOPER_PROFILE_URL = '';
      const html = renderToString(
        <MemoryRouter>
          <SiteFooter />
        </MemoryRouter>
      );

      expect(html).toContain('<span class="site-footer__credit-name">Tanmay Shukla</span>');
      expect(html).not.toContain('site-footer__credit-link');
    } finally {
      (import.meta.env as Record<string, unknown>).VITE_DEVELOPER_PROFILE_URL = originalEnv;
    }
  });

  it('renders Tanmay Shukla as a safe external link when VITE_DEVELOPER_PROFILE_URL is provided', () => {
    const originalEnv = import.meta.env.VITE_DEVELOPER_PROFILE_URL;
    try {
      (import.meta.env as Record<string, unknown>).VITE_DEVELOPER_PROFILE_URL =
        'https://linkedin.com/in/tanmayshukla';
      const html = renderToString(
        <MemoryRouter>
          <SiteFooter />
        </MemoryRouter>
      );

      expect(html).toContain('href="https://linkedin.com/in/tanmayshukla"');
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).toContain('class="site-footer__credit-link"');
      expect(html).toContain('Tanmay Shukla');
    } finally {
      (import.meta.env as Record<string, unknown>).VITE_DEVELOPER_PROFILE_URL = originalEnv;
    }
  });
});
