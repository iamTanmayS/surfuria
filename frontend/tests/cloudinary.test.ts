import { describe, it, expect } from 'vitest';
import {
  isCloudinaryUrl,
  buildCloudinaryUrl,
  buildCloudinarySrcSet,
  buildCloudinaryThumb,
} from '../src/lib/cloudinary';

describe('Cloudinary Image Optimizer Utility', () => {
  const sampleUrl = 'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749953/1_1_Landing_Page_Image_dtpgdt.png';
  const nonCloudinaryUrl = 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80';
  const localUrl = '/images/materials/acrylic.jpg';

  it('correctly identifies Cloudinary URLs', () => {
    expect(isCloudinaryUrl(sampleUrl)).toBe(true);
    expect(isCloudinaryUrl(nonCloudinaryUrl)).toBe(false);
    expect(isCloudinaryUrl(localUrl)).toBe(false);
    expect(isCloudinaryUrl('')).toBe(false);
    expect(isCloudinaryUrl(null)).toBe(false);
    expect(isCloudinaryUrl(undefined)).toBe(false);
  });

  it('builds standard auto format and auto quality transformations', () => {
    const result = buildCloudinaryUrl(sampleUrl);
    expect(result).toBe(
      'https://res.cloudinary.com/dwhajzdg2/image/upload/f_auto,q_auto/v1792749953/1_1_Landing_Page_Image_dtpgdt.png'
    );
  });

  it('applies width and c_limit crop mode when only width is specified', () => {
    const result = buildCloudinaryUrl(sampleUrl, { width: 1200 });
    expect(result).toBe(
      'https://res.cloudinary.com/dwhajzdg2/image/upload/f_auto,q_auto,w_1200,c_limit/v1792749953/1_1_Landing_Page_Image_dtpgdt.png'
    );
  });

  it('applies width, height and c_fill by default when both are provided', () => {
    const result = buildCloudinaryUrl(sampleUrl, { width: 400, height: 300 });
    expect(result).toBe(
      'https://res.cloudinary.com/dwhajzdg2/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1792749953/1_1_Landing_Page_Image_dtpgdt.png'
    );
  });

  it('does not duplicate transformations if called multiple times', () => {
    const once = buildCloudinaryUrl(sampleUrl, { width: 800 });
    const twice = buildCloudinaryUrl(once, { width: 1200 });
    expect(twice).toBe(
      'https://res.cloudinary.com/dwhajzdg2/image/upload/f_auto,q_auto,w_1200,c_limit/v1792749953/1_1_Landing_Page_Image_dtpgdt.png'
    );
  });

  it('generates responsive srcset attribute string', () => {
    const srcSet = buildCloudinarySrcSet(sampleUrl, [400, 800, 1200]);
    expect(srcSet).toContain('w_400,c_limit');
    expect(srcSet).toContain('400w');
    expect(srcSet).toContain('w_800,c_limit');
    expect(srcSet).toContain('800w');
    expect(srcSet).toContain('w_1200,c_limit');
    expect(srcSet).toContain('1200w');
  });

  it('generates dedicated thumbnail with c_fill', () => {
    const thumb = buildCloudinaryThumb(sampleUrl, 160);
    expect(thumb).toBe(
      'https://res.cloudinary.com/dwhajzdg2/image/upload/f_auto,q_auto,w_160,h_160,c_fill/v1792749953/1_1_Landing_Page_Image_dtpgdt.png'
    );
  });

  it('leaves non-Cloudinary and local URLs completely unchanged', () => {
    expect(buildCloudinaryUrl(nonCloudinaryUrl, { width: 600 })).toBe(nonCloudinaryUrl);
    expect(buildCloudinaryUrl(localUrl, { width: 600 })).toBe(localUrl);
    expect(buildCloudinarySrcSet(nonCloudinaryUrl)).toBe('');
    expect(buildCloudinaryThumb(localUrl)).toBe(localUrl);
  });

  it('safely handles empty or null values', () => {
    expect(buildCloudinaryUrl('')).toBe('');
    expect(buildCloudinaryUrl(null as unknown as string)).toBe('');
    expect(buildCloudinarySrcSet('')).toBe('');
    expect(buildCloudinaryThumb('')).toBe('');
  });
});

