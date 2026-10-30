import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { HARDWARE_PRODUCTS } from '../src/data/products/hardwareProducts';
import { KITCHEN_PRODUCTS } from '../src/data/products/kitchenProducts';
import { KITCHEN_CONFIGURATIONS } from '../src/data/products/kitchenConfigurations';

describe('Surfuria Sitemap Integrity & Inventory Suite', () => {
  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  const xmlContent = fs.readFileSync(sitemapPath, 'utf-8');

  // Extract all <loc> contents
  const locMatches = Array.from(xmlContent.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1]);

  it('contains exactly 35 URLs in sitemap.xml', () => {
    // 5 core pages + 4 configurations + 14 hardware + 10 kitchen suites + 2 legal = 35
    expect(locMatches).toHaveLength(35);
  });

  it('includes all 5 core navigation pages', () => {
    const corePages = [
      'https://surfuria.com/',
      'https://surfuria.com/hardware',
      'https://surfuria.com/kitchens',
      'https://surfuria.com/about',
      'https://surfuria.com/contact',
    ];
    for (const url of corePages) {
      expect(locMatches).toContain(url);
    }
  });

  it('includes all 4 modular kitchen configurations from data', () => {
    expect(KITCHEN_CONFIGURATIONS).toHaveLength(4);
    for (const config of KITCHEN_CONFIGURATIONS) {
      const expectedUrl = `https://surfuria.com/kitchens/configurations/${config.slug}`;
      expect(locMatches).toContain(expectedUrl);
    }
  });

  it('includes all 14 hardware products from data', () => {
    expect(HARDWARE_PRODUCTS).toHaveLength(14);
    for (const product of HARDWARE_PRODUCTS) {
      const expectedUrl = `https://surfuria.com/hardware/${product.categoryId}/${product.slug}`;
      expect(locMatches).toContain(expectedUrl);
    }
  });

  it('includes all 10 kitchen suites from data', () => {
    expect(KITCHEN_PRODUCTS).toHaveLength(10);
    for (const product of KITCHEN_PRODUCTS) {
      const expectedUrl = `https://surfuria.com/kitchens/${product.categoryId}/${product.slug}`;
      expect(locMatches).toContain(expectedUrl);
    }
  });

  it('includes both legal compliance pages (privacy and terms)', () => {
    expect(locMatches).toContain('https://surfuria.com/privacy');
    expect(locMatches).toContain('https://surfuria.com/terms');
  });

  it('has zero duplicate URLs', () => {
    const unique = new Set(locMatches);
    expect(unique.size).toBe(locMatches.length);
  });
});
