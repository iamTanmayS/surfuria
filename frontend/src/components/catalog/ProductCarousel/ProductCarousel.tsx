import { useRef, useState, useEffect, useCallback } from 'react';
import type { Product } from '../../../data/products/types';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCarousel.css';

export interface ProductCarouselProps {
  products: Product[];
  categorySlug: string;
  variant?: 'standard' | 'editorial';
  className?: string;
}

export default function ProductCarousel({
  products,
  categorySlug,
  variant = 'standard',
  className = '',
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const totalProducts = products.length;

  // Check scroll boundary and calculate active index from scroll position
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);

    // Estimate active card index
    const cards = track.querySelectorAll<HTMLElement>('.sf-product-card');
    if (cards.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const diff = Math.abs(card.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  // Step scroll by one card width
  const scrollStep = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>('.sf-product-card');
    const stepAmount = firstCard ? firstCard.clientWidth + 20 : track.clientWidth * 0.8;

    track.scrollBy({
      left: direction === 'next' ? stepAmount : -stepAmount,
      behavior: 'smooth',
    });
  };

  // Scroll to a specific card index
  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>('.sf-product-card');
    const targetCard = cards[index];
    if (targetCard) {
      track.scrollTo({
        left: targetCard.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  // Mouse / Pointer drag-to-scroll implementation
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only engage for primary mouse button
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    scrollLeftRef.current = track.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
      if (!isDragging) setIsDragging(true);
      track.scrollLeft = scrollLeftRef.current - deltaX;
    }
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    if (isDragging) {
      setTimeout(() => setIsDragging(false), 50);
    }
  };

  // Prevent click navigation on links if user was dragging
  const handleCaptureClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false;
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      className={`sf-carousel sf-carousel--${variant} ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${categorySlug} product showcase`}
      onClickCapture={handleCaptureClick}
    >
      {/* Left/Right Edge Fade Cues on Mobile/Tablet */}
      <div
        className={`sf-carousel__fade sf-carousel__fade--left ${canScrollLeft ? 'is-visible' : ''}`}
        aria-hidden="true"
      />
      <div
        className={`sf-carousel__fade sf-carousel__fade--right ${canScrollRight ? 'is-visible' : ''}`}
        aria-hidden="true"
      />

      {/* Swipeable / Grid Track */}
      <div
        ref={trackRef}
        className={`sf-carousel__track ${isDragging ? 'is-dragging' : ''}`}
        onScroll={updateScrollState}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        tabIndex={0}
        aria-label="Scroll through products"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categorySlug={categorySlug}
            className="sf-carousel__card"
          />
        ))}
      </div>

      {/* Mobile/Tablet Swipe Controls & Counter Pill */}
      {totalProducts > 1 && (
        <div className="sf-carousel__controls" aria-label="Carousel navigation">
          {/* Arrow Buttons */}
          <div className="sf-carousel__arrows">
            <button
              type="button"
              className="sf-carousel__arrow-btn"
              onClick={() => scrollStep('prev')}
              disabled={!canScrollLeft}
              aria-label="Previous product"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 12L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="sf-carousel__arrow-btn"
              onClick={() => scrollStep('next')}
              disabled={!canScrollRight}
              aria-label="Next product"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 4L10 8L6 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Swipe Indicator Dots */}
          <div className="sf-carousel__dots" role="tablist" aria-label="Product slides">
            {products.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to slide ${idx + 1} of ${totalProducts}`}
                className={`sf-carousel__dot ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="sf-carousel__counter" aria-live="polite">
            <span>{activeIndex + 1}</span>
            <span className="sf-carousel__counter-sep">/</span>
            <span>{totalProducts}</span>
          </div>
        </div>
      )}
    </div>
  );
}

