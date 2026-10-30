/**
 * SURFURIA — Cloudinary Image Transformation & Responsive Utility
 *
 * Provides non-destructive, safe URL transformation helpers for Cloudinary-hosted assets.
 * Gracefully handles non-Cloudinary URLs by returning them untouched.
 */

export interface CloudinaryOptions {
  /** Target image width in pixels */
  width?: number;
  /** Target image height in pixels */
  height?: number;
  /** Cloudinary crop mode: 'limit' (never upscale), 'fill' (crop to exact aspect ratio), etc. */
  crop?: 'limit' | 'fill' | 'scale' | 'fit' | 'thumb' | 'crop';
  /** Quality mode. Defaults to 'auto' for perceptual compression */
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  /** Format selection. Defaults to 'auto' to serve modern WebP/AVIF where supported */
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  /** Focus gravity for crops (e.g. 'auto', 'center') */
  gravity?: 'auto' | 'center' | 'face' | string;
  /** Device pixel ratio (e.g. 'auto', 1, 2) */
  dpr?: number | string;
}

const CLOUDINARY_UPLOAD_REGEX = /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*?)(v\d+\/.+)$/;
const CLOUDINARY_UPLOAD_NO_VERSION_REGEX = /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/;

/**
 * Checks whether a URL is a Cloudinary image delivery URL.
 */
export function isCloudinaryUrl(url: unknown): url is string {
  return typeof url === 'string' && url.includes('res.cloudinary.com') && url.includes('/image/upload/');
}

/**
 * Builds a transformed Cloudinary image URL with automatic format and quality negotiation.
 * If the URL is not a Cloudinary URL, returns the original URL unchanged.
 */
export function buildCloudinaryUrl(url: string | undefined | null, options: CloudinaryOptions = {}): string {
  if (!url || typeof url !== 'string' || !isCloudinaryUrl(url)) {
    return url || '';
  }

  const {
    width,
    height,
    crop,
    quality = 'auto',
    format = 'auto',
    gravity,
    dpr,
  } = options;

  const transformParts: string[] = [];

  if (format) transformParts.push(`f_${format}`);
  if (quality) transformParts.push(`q_${quality}`);
  if (dpr) transformParts.push(`dpr_${dpr}`);
  if (width) transformParts.push(`w_${Math.round(width)}`);
  if (height) transformParts.push(`h_${Math.round(height)}`);

  if (crop) {
    transformParts.push(`c_${crop}`);
  } else if (width && height) {
    transformParts.push('c_fill');
  } else if (width || height) {
    transformParts.push('c_limit');
  }

  if (gravity) transformParts.push(`g_${gravity}`);

  const transformString = transformParts.join(',');

  // Parse existing Cloudinary structure:
  // e.g. https://res.cloudinary.com/cloud/image/upload/v12345/name.png
  // e.g. https://res.cloudinary.com/cloud/image/upload/f_auto,q_auto/v12345/name.png
  const versionMatch = url.match(CLOUDINARY_UPLOAD_REGEX);
  if (versionMatch) {
    const prefix = versionMatch[1]; // https://res.cloudinary.com/cloud/image/upload/
    const assetPath = versionMatch[3]; // v12345/name.png
    return `${prefix}${transformString}/${assetPath}`;
  }

  const fallbackMatch = url.match(CLOUDINARY_UPLOAD_NO_VERSION_REGEX);
  if (fallbackMatch) {
    const prefix = fallbackMatch[1];
    let remaining = fallbackMatch[2];
    // Strip any leading transformation segments if already present
    if (remaining.includes('/') && !remaining.startsWith('v')) {
      const parts = remaining.split('/');
      remaining = parts.slice(1).join('/');
    }
    return `${prefix}${transformString}/${remaining}`;
  }

  return url;
}

/**
 * Generates an HTML `srcset` attribute string for responsive Cloudinary image delivery.
 * Returns an empty string for non-Cloudinary images.
 */
export function buildCloudinarySrcSet(
  url: string | undefined | null,
  widths: readonly number[] = [400, 600, 800, 1200, 1600],
  options: Omit<CloudinaryOptions, 'width'> = {}
): string {
  if (!url || !isCloudinaryUrl(url)) {
    return '';
  }

  return widths
    .map((w) => `${buildCloudinaryUrl(url, { ...options, width: w })} ${w}w`)
    .join(', ');
}

/**
 * Builds a dedicated small, square or custom aspect-ratio thumbnail URL using Cloudinary smart crop.
 */
export function buildCloudinaryThumb(
  url: string | undefined | null,
  size = 160,
  options: Partial<CloudinaryOptions> = {}
): string {
  if (!url || !isCloudinaryUrl(url)) {
    return url || '';
  }

  return buildCloudinaryUrl(url, {
    width: size,
    height: size,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    ...options,
  });
}

