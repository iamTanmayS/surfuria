import { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  ogImageAlt?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dwhajzdg2/image/upload/v1792749955/6_1_SURFURIA_HARDWARE_xuab5u.png';

function setOrCreateMeta(nameAttr: 'name' | 'property', attrValue: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${nameAttr}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(nameAttr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  robots = 'index, follow',
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // 2. Primary Meta Tags
    setOrCreateMeta('name', 'description', description);
    setOrCreateMeta('name', 'robots', robots);

    // 3. Canonical & Favicon Links
    setOrCreateLink('canonical', canonicalUrl);
    setOrCreateLink('icon', '/favicon.png');
    setOrCreateLink('apple-touch-icon', '/apple-touch-icon.png');

    // 4. Open Graph Meta Tags
    setOrCreateMeta('property', 'og:title', title);
    setOrCreateMeta('property', 'og:description', description);
    setOrCreateMeta('property', 'og:url', canonicalUrl);
    setOrCreateMeta('property', 'og:type', ogType);
    setOrCreateMeta('property', 'og:image', ogImage);
    setOrCreateMeta('property', 'og:site_name', 'Surfuria');
    setOrCreateMeta('property', 'og:locale', 'en_US');
    if (ogImageAlt) {
      setOrCreateMeta('property', 'og:image:alt', ogImageAlt);
    }

    // 5. Twitter Card Meta Tags
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', description);
    setOrCreateMeta('name', 'twitter:image', ogImage);
    if (ogImageAlt) {
      setOrCreateMeta('name', 'twitter:image:alt', ogImageAlt);
    }

    // 6. JSON-LD Structured Data
    const scriptId = 'sf-seo-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // Clean up dynamic script when unmounting or changing routes
    return () => {
      const activeScript = document.getElementById(scriptId);
      if (activeScript) {
        activeScript.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, ogImage, ogImageAlt, robots, jsonLd]);

  return null;
}

