/// <reference types="vite/client" />
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import BrandIntroduction from '../src/pages/AboutPage/components/BrandIntroduction';
import { WHO_WE_ARE_DATA } from '../src/data/about/aboutPageData';

describe('About Page Brand Film', () => {
  it('has the configured YouTube video URL in WHO_WE_ARE_DATA', () => {
    expect(WHO_WE_ARE_DATA.videoUrl).toBe('https://youtu.be/0akFCX4mjo4?feature=shared');
  });

  it('renders initial brand film poster and play button without auto-rendering an iframe', () => {
    const html = renderToString(<BrandIntroduction />);

    // Renders the poster image
    expect(html).toContain('about-intro__poster-img');
    // Renders the play button
    expect(html).toContain('about-intro__play-btn');
    expect(html).toContain('Brand Film');

    // Crucial requirement: must NOT render the iframe automatically on initial load
    expect(html).not.toContain('<iframe');
    expect(html).not.toContain('about-video-overlay');
  });
});
