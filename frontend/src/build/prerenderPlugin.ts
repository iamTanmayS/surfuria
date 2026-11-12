import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { HARDWARE_PRODUCTS } from '../data/products/hardwareProducts.ts';
import { KITCHEN_PRODUCTS } from '../data/products/kitchenProducts.ts';
import { KITCHEN_CONFIGURATIONS } from '../data/products/kitchenConfigurations.ts';

interface StaticRouteConfig {
  path: string; // e.g. '/about', '/hardware/cabinet-hinges/hydraulic-soft-close-hinge'
  title: string;
  description: string;
  canonicalUrl: string;
  image?: string;
  robots?: string;
}

const DEFAULT_IMAGE =
  'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749955/6_1_SURFURIA_HARDWARE_xuab5u.png';

export function prerenderPagesPlugin(): Plugin {
  return {
    name: 'surfuria-prerender-pages',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const templatePath = path.join(distDir, 'index.html');

      if (!fs.existsSync(templatePath)) {
        return;
      }

      const template = fs.readFileSync(templatePath, 'utf-8');

      // 1. Compile list of all canonical routes
      const routes: StaticRouteConfig[] = [
        // Core Public Pages
        {
          path: '/',
          title: 'Surfuria | Premium Furniture Hardware & Modular Kitchens',
          description:
            'Surfuria designs and manufactures architectural furniture hardware, precision hinges, tandem drawer systems, and factory-engineered modular kitchens.',
          canonicalUrl: 'https://surfuria.com/',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/hardware',
          title: 'Architectural Hardware Catalogue | Surfuria Precision Systems',
          description:
            'Explore Surfuria architectural furniture hardware: hydraulic hinges, precision tandem drawer systems, telescopic slides, handles, and modular storage.',
          canonicalUrl: 'https://surfuria.com/hardware',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/kitchens',
          title: 'Modular Kitchen Suites & Layouts | Surfuria Architectural Cabinetry',
          description:
            'Discover factory-engineered modular kitchen suites, architectural configurations, and intelligent kitchen storage crafted for durability and ergonomics.',
          canonicalUrl: 'https://surfuria.com/kitchens',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/about',
          title: 'About Surfuria | Architectural Hardware & Modular Kitchen Craft',
          description:
            "Explore Surfuria's commitment to precision kinematic hardware, factory-engineered modular cabinetry, durable substrates, and architectural excellence.",
          canonicalUrl: 'https://surfuria.com/about',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/contact',
          title: 'Contact Surfuria | Architectural Specification & Project Enquiries',
          description:
            'Get in touch with the Surfuria architectural hardware and modular kitchen specification studio for trade quotes, exports, and project consultations.',
          canonicalUrl: 'https://surfuria.com/contact',
          image: DEFAULT_IMAGE,
        },

        // Legal & Compliance Pages and Aliases
        {
          path: '/privacy',
          title: 'Privacy Policy | Surfuria',
          description:
            'Learn how Surfuria collects, uses, protects, and handles personal information across our website and specification services.',
          canonicalUrl: 'https://surfuria.com/privacy',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/privacy-policy',
          title: 'Privacy Policy | Surfuria',
          description:
            'Learn how Surfuria collects, uses, protects, and handles personal information across our website and specification services.',
          canonicalUrl: 'https://surfuria.com/privacy',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/terms',
          title: 'Terms & Conditions | Surfuria',
          description:
            'Read the official terms of use, architectural product specifications, intellectual property, and warranty guidelines governing Surfuria services.',
          canonicalUrl: 'https://surfuria.com/terms',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/terms-and-conditions',
          title: 'Terms & Conditions | Surfuria',
          description:
            'Read the official terms of use, architectural product specifications, intellectual property, and warranty guidelines governing Surfuria services.',
          canonicalUrl: 'https://surfuria.com/terms',
          image: DEFAULT_IMAGE,
        },
        {
          path: '/terms-of-use',
          title: 'Terms & Conditions | Surfuria',
          description:
            'Read the official terms of use, architectural product specifications, intellectual property, and warranty guidelines governing Surfuria services.',
          canonicalUrl: 'https://surfuria.com/terms',
          image: DEFAULT_IMAGE,
        },
      ];

      // Modular Kitchen Configurations (4)
      for (const config of KITCHEN_CONFIGURATIONS) {
        routes.push({
          path: `/kitchens/configurations/${config.slug}`,
          title: `${config.name} Modular Kitchen Configuration | Surfuria`,
          description: `Explore the Surfuria ${config.name} kitchen package: ${config.doorPanelArea.formatted} acrylic finish door panels, ${config.boxPanelArea.formatted} prelam carcasses, including 8 essential hardware fittings. ₹${config.totalPackagePrice.amount.toLocaleString('en-IN')}.`,
          canonicalUrl: `https://surfuria.com/kitchens/configurations/${config.slug}`,
          image: config.image,
        });
      }

      // Hardware Products (14)
      for (const prod of HARDWARE_PRODUCTS) {
        routes.push({
          path: `/hardware/${prod.categoryId}/${prod.slug}`,
          title: `${prod.name} | Architectural Hardware | Surfuria`,
          description: prod.shortDescription || prod.description,
          canonicalUrl: `https://surfuria.com/hardware/${prod.categoryId}/${prod.slug}`,
          image: prod.cardImage,
        });
      }

      // Kitchen Suites (10)
      for (const prod of KITCHEN_PRODUCTS) {
        routes.push({
          path: `/kitchens/${prod.categoryId}/${prod.slug}`,
          title: `${prod.name} | Modular Kitchens | Surfuria`,
          description: prod.shortDescription || prod.description,
          canonicalUrl: `https://surfuria.com/kitchens/${prod.categoryId}/${prod.slug}`,
          image: prod.cardImage,
        });
      }

      // 2. Generate pre-rendered static HTML for each route
      for (const route of routes) {
        let html = template;

        // Replace Title
        html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

        // Replace Description
        html = html.replace(
          /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
          `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
        );

        // Replace Canonical
        html = html.replace(
          /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
          `<link rel="canonical" href="${route.canonicalUrl}" />`
        );

        // Replace OG Title & Twitter Title
        html = html.replace(
          /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
          `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`
        );
        html = html.replace(
          /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
          `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`
        );

        // Replace OG Description & Twitter Description
        html = html.replace(
          /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
          `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
        );
        html = html.replace(
          /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
          `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`
        );

        // Replace OG URL & Twitter URL
        html = html.replace(
          /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
          `<meta property="og:url" content="${route.canonicalUrl}" />`
        );
        html = html.replace(
          /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/,
          `<meta name="twitter:url" content="${route.canonicalUrl}" />`
        );

        // Replace OG Image & Twitter Image if route-specific image provided
        const img = route.image || DEFAULT_IMAGE;
        html = html.replace(
          /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/,
          `<meta property="og:image" content="${img}" />`
        );
        html = html.replace(
          /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/,
          `<meta name="twitter:image" content="${img}" />`
        );

        if (route.path === '/') {
          // Already index.html
          fs.writeFileSync(templatePath, html, 'utf-8');
          continue;
        }

        // Target path: dist/<path>/index.html
        const routeRelative = route.path.replace(/^\/+/, '');
        const targetDir = path.join(distDir, routeRelative);
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
      }

      // 3. Generate dist/404.html (for real HTTP 404 responses from Vercel)
      let notFoundHtml = template;
      notFoundHtml = notFoundHtml.replace(
        /<title>.*?<\/title>/,
        `<title>Page Not Found | Surfuria</title>`
      );
      notFoundHtml = notFoundHtml.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
        `<meta name="description" content="The page you requested could not be located in the Surfuria catalogue." />`
      );
      notFoundHtml = notFoundHtml.replace(
        /<meta\s+name="robots"\s+content=".*?"\s*\/?>/,
        `<meta name="robots" content="noindex, follow" />`
      );
      notFoundHtml = notFoundHtml.replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
        `<link rel="canonical" href="https://surfuria.com/404" />`
      );

      fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
      console.log(`[Surfuria Pre-render] Pre-rendered ${routes.length} canonical routes + 404.html.`);
    },
  };
}

