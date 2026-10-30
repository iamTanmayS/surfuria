import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { HARDWARE_PRODUCTS } from '../src/data/products/hardwareProducts';
import { KITCHEN_PRODUCTS } from '../src/data/products/kitchenProducts';
import { KITCHEN_CONFIGURATIONS } from '../src/data/products/kitchenConfigurations';

describe('Surfuria Pre-rendered HTML & SEO Integrity Suite', () => {
  const distDir = path.resolve(__dirname, '../dist');

  it('generates dist/index.html with valid homepage metadata', () => {
    const filePath = path.join(distDir, 'index.html');
    expect(fs.existsSync(filePath)).toBe(true);
    const html = fs.readFileSync(filePath, 'utf-8');
    expect(html).toContain('<title>Surfuria | Premium Furniture Hardware & Modular Kitchens</title>');
  });

  it('generates dist/404.html with noindex and Page Not Found metadata', () => {
    const filePath = path.join(distDir, '404.html');
    expect(fs.existsSync(filePath)).toBe(true);
    const html = fs.readFileSync(filePath, 'utf-8');
    expect(html).toContain('<title>Page Not Found | Surfuria</title>');
    expect(html).toContain('<meta name="robots" content="noindex, follow" />');
  });

  it('generates pre-rendered HTML for all 5 core routes', () => {
    const coreRoutes = ['hardware', 'kitchens', 'about', 'contact'];
    for (const r of coreRoutes) {
      const filePath = path.join(distDir, r, 'index.html');
      expect(fs.existsSync(filePath)).toBe(true);
      const html = fs.readFileSync(filePath, 'utf-8');
      expect(html).toContain(`https://surfuria.com/${r}`);
    }
  });

  it('generates bespoke pre-rendered HTML for all 14 hardware products', () => {
    for (const prod of HARDWARE_PRODUCTS) {
      const filePath = path.join(distDir, 'hardware', prod.categoryId, prod.slug, 'index.html');
      expect(fs.existsSync(filePath)).toBe(true);
      const html = fs.readFileSync(filePath, 'utf-8');
      expect(html).toContain(prod.name);
      expect(html).toContain(prod.cardImage);
      expect(html).toContain(`https://surfuria.com/hardware/${prod.categoryId}/${prod.slug}`);
    }
  });

  it('generates bespoke pre-rendered HTML for all 10 kitchen suites', () => {
    for (const prod of KITCHEN_PRODUCTS) {
      const filePath = path.join(distDir, 'kitchens', prod.categoryId, prod.slug, 'index.html');
      expect(fs.existsSync(filePath)).toBe(true);
      const html = fs.readFileSync(filePath, 'utf-8');
      expect(html).toContain(prod.name);
      expect(html).toContain(`https://surfuria.com/kitchens/${prod.categoryId}/${prod.slug}`);
    }
  });

  it('generates bespoke pre-rendered HTML for all 4 kitchen configurations', () => {
    for (const config of KITCHEN_CONFIGURATIONS) {
      const filePath = path.join(distDir, 'kitchens', 'configurations', config.slug, 'index.html');
      expect(fs.existsSync(filePath)).toBe(true);
      const html = fs.readFileSync(filePath, 'utf-8');
      expect(html).toContain(config.name);
      expect(html).toContain(config.image);
      expect(html).toContain(`https://surfuria.com/kitchens/configurations/${config.slug}`);
    }
  });
});

