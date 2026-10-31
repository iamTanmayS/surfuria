import { useState, useRef, useEffect, useCallback } from 'react';
import {
  buildCloudinaryUrl,
  buildCloudinarySrcSet,
  buildCloudinaryThumb,
} from '../../../lib/cloudinary';
import './ProductGallery.css';

export interface ProductGalleryProps {
  /** Array of gallery image URLs */
  images: readonly string[];
  /** Product name for alt text & aria labels */
  productName: string;
  /** Optional speciality / highlight attribute (e.g. "Hydraulic Damping", "Monolithic Stone") */
  speciality?: string;
  /** Optional priority image loading (e.g. for LCP, defaults to true) */
  priority?: boolean;
  /** Optional custom CSS class name */
  className?: string;
  /** Optional aspect ratio for main viewport (defaults to '16/11') */
  aspectRatio?: '16/11' | '4/3';
}

export default function ProductGallery({
  images,
  productName,
  speciality,
  priority = true,
  className = '',
  aspectRatio = '16/11',
}: ProductGalleryProps) {
  // Normalize images list (fallback to placeholder if empty)
  const validImages = images && images.length > 0 ? images : [''];
  const hasMultipleImages = validImages.length > 1;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [prevFirstImage, setPrevFirstImage] = useState<string>(validImages[0]);

  // Reset active image index during render when the image set changes (e.g. route navigation)
  if (prevFirstImage !== validImages[0]) {
    setPrevFirstImage(validImages[0]);
    setActiveImageIndex(0);
  }

  // Navigation handlers
  const handleNextImage = useCallback(() => {
    if (!hasMultipleImages) return;
    setActiveImageIndex((prev) => (prev + 1) % validImages.length);
  }, [hasMultipleImages, validImages.length]);

  const handlePrevImage = useCallback(() => {
    if (!hasMultipleImages) return;
    setActiveImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [hasMultipleImages, validImages.length]);

  // Touch and swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Isolated horizontal swipe
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextImage();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevImage();
    }
  };

  // Keep active thumbnail centered in view
  useEffect(() => {
    if (thumbsRef.current && thumbsRef.current.children[activeImageIndex]) {
      const activeEl = thumbsRef.current.children[activeImageIndex] as HTMLElement;
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeImageIndex]);

  const currentImageSrc = validImages[activeImageIndex] || validImages[0];

  return (
    <div className={`product-gallery ${className}`.trim()}>
      {/* Main Image Stage */}
      <div
        className={`product-gallery__main ${aspectRatio === '4/3' ? 'is-4-3' : ''}`.trim()}
        tabIndex={0}
        role="region"
        aria-label={`${productName} image gallery`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
      >
        <img
          src={buildCloudinaryUrl(currentImageSrc, { width: 1200, quality: 'auto', format: 'auto' })}
          srcSet={buildCloudinarySrcSet(currentImageSrc, [600, 900, 1200]) || undefined}
          sizes="(max-width: 768px) 100vw, 55vw"
          alt={`${productName} view ${activeImageIndex + 1} of ${validImages.length}`}
          className="product-gallery__main-img"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />

        {/* Clean, Non-Pill Architectural Speciality Attribute */}
        {speciality && (
          <div className="product-gallery__speciality">
            <span className="product-gallery__speciality-accent" aria-hidden="true" />
            <span className="product-gallery__speciality-label">{speciality}</span>
          </div>
        )}

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              className="product-gallery__nav-btn product-gallery__nav-btn--prev"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="product-gallery__nav-btn product-gallery__nav-btn--next"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Clean Minimal Pagination Indicator: No Pill Container, Sleek Dashes */}
            <div
              className="product-gallery__pagination"
              role="tablist"
              aria-label="Gallery slides"
            >
              {validImages.map((_, idx) => {
                const isCurrent = idx === activeImageIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Go to image ${idx + 1} of ${validImages.length}`}
                    className={`product-gallery__pagination-indicator ${
                      isCurrent ? 'is-active' : ''
                    }`}
                    onClick={() => setActiveImageIndex(idx)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip (Render only if multiple images exist) */}
      {hasMultipleImages && (
        <div
          ref={thumbsRef}
          className="product-gallery__thumbs"
          role="tablist"
          aria-label="Product thumbnails"
        >
          {validImages.map((imgSrc, idx) => {
            const isSelected = idx === activeImageIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`View image ${idx + 1} of ${validImages.length}`}
                className={`product-gallery__thumb ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <img
                  src={buildCloudinaryThumb(imgSrc, 160)}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="product-gallery__thumb-img"
                  loading="lazy"
                  decoding="async"
                  width={80}
                  height={55}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
