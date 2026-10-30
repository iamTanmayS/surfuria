import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { ProductCategoriesProps } from './productCategory.types';
import {
  DEFAULT_PRODUCT_CATEGORIES,
  DEFAULT_CATEGORY_CARDS,
} from '../../../../data/products/productCategories';
import ProductCategoryCard from './ProductCategoryCard';
import CategoryPillNavigation from '../../../../components/catalog/CategoryPillNavigation';
import './ProductCategories.css';

export default function ProductCategories({
  id = 'collections-section',
  eyebrow = 'PRODUCT CATEGORIES',
  title = 'Hardware, thoughtfully selected.',
  subtitle = 'Details that define the finished space.',
  description = 'Discover carefully considered hardware and kitchen fittings that bring functionality, precision, and a refined finish to contemporary interiors.',
  categories = DEFAULT_PRODUCT_CATEGORIES,
  cards = DEFAULT_CATEGORY_CARDS,
  selectedCategoryId,
  onSelectCategory,
  ctaLabel = 'Explore All Hardware',
  ctaTo = '/hardware',
  className = '',
}: ProductCategoriesProps) {
  const shouldReduceMotion = useReducedMotion();

  // 1. Category Filtering State (supports uncontrolled or controlled)
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const activeCategory = selectedCategoryId !== undefined ? selectedCategoryId : internalCategory;

  // 2. Carousel References and State
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartTimeRef = useRef<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [maxTranslate, setMaxTranslate] = useState<number>(0);

  // Filter cards based on active category
  const displayedCards = useMemo(() => {
    const matched = cards.filter((card) => card.categoryId === activeCategory);
    if (matched.length >= 3) {
      return matched;
    }
    if (matched.length > 0) {
      // If category has fewer than 3 cards, pad with flagship cards
      const fallback = cards.filter((card) => card.categoryId === 'all' && !matched.some((m) => m.id === card.id));
      return [...matched, ...fallback];
    }
    return cards.filter((card) => card.categoryId === 'all');
  }, [cards, activeCategory]);

  // Compute maximum scrollable distance and card offset from DOM measurements
  const updateMeasurements = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const viewportW = viewport.clientWidth;
    const trackW = track.scrollWidth;
    const maxScroll = Math.max(0, trackW - viewportW);
    setMaxTranslate(maxScroll);

    if (maxScroll <= 4) {
      setTranslateX(0);
      return;
    }

    // Get current card offset
    const cardNodes = track.children;
    const targetCard = cardNodes[currentIndex] as HTMLElement | undefined;
    const offset = targetCard ? targetCard.offsetLeft : 0;
    const clampedOffset = Math.min(maxScroll, Math.max(0, offset));

    setTranslateX(-clampedOffset);
  }, [currentIndex]);

  // Re-measure on resize or cards change
  useEffect(() => {
    updateMeasurements();
    const handleResize = () => updateMeasurements();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateMeasurements, displayedCards]);

  // Reset carousel position when category changes
  const handleCategoryChange = (categoryId: string) => {
    setCurrentIndex(0);
    if (selectedCategoryId === undefined) {
      setInternalCategory(categoryId);
    }
    onSelectCategory?.(categoryId);
  };

  // Drag Gesture Handling
  const handleDragStart = () => {
    isDraggingRef.current = true;
    dragStartTimeRef.current = Date.now();
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const dragDistance = info.offset.x;
    const dragVelocity = info.velocity.x;
    const track = trackRef.current;

    // Small delay before unsetting isDraggingRef to ensure link onClick is suppressed
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);

    if (!track) return;

    // Detect intentional swipe by distance or velocity
    if (dragDistance < -40 || dragVelocity < -200) {
      // Swiped left -> advance next
      setCurrentIndex((prev) => Math.min(displayedCards.length - 1, prev + 1));
    } else if (dragDistance > 40 || dragVelocity > 200) {
      // Swiped right -> advance previous
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else {
      // Re-snap to nearest card
      const cardNodes = Array.from(track.children) as HTMLElement[];
      const trackCurrentX = Math.abs(translateX - dragDistance);
      let closestIdx = 0;
      let minDiff = Infinity;

      cardNodes.forEach((node, idx) => {
        const diff = Math.abs(node.offsetLeft - trackCurrentX);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      if (closestIdx === currentIndex) {
        // Force snap back if index did not change
        updateMeasurements();
      } else {
        setCurrentIndex(closestIdx);
      }
    }
  };

  return (
    <section
      id={id}
      className={`product-categories-wrapper ${className}`.trim()}
      aria-label="Product Categories"
    >
      {/* Spacious Ivory Content Surface */}
      <div className="product-categories-surface container--wide">
        {/* Editorial Section Header */}
        <header className="product-categories-header">
          <div className="product-categories-header__primary">
            {eyebrow && (
              <div className="product-categories-eyebrow-badge">
                <span className="product-categories-eyebrow-badge__pip" aria-hidden="true" />
                <span className="product-categories-eyebrow-badge__text">{eyebrow}</span>
              </div>
            )}
            <h2 className="product-categories-title">{title}</h2>
            {subtitle && (
              <p className="product-categories-subtitle">{subtitle}</p>
            )}
          </div>

          {description && (
            <div className="product-categories-header__secondary">
              <p className="product-categories-description">{description}</p>
            </div>
          )}
        </header>

        {/* 1. Category Filter Row with Smooth Horizontal Swipe */}
        <div className="product-categories-filters-row">
          <CategoryPillNavigation
            categories={categories}
            activeId={activeCategory}
            onSelectCategory={handleCategoryChange}
            sticky={false}
          />
        </div>

        {/* 2. Product-Card Carousel: Clean, Spacious, Image-Focused (No arrow buttons) */}
        <div
          ref={viewportRef}
          className="product-categories-carousel-viewport"
          role="region"
          aria-live="polite"
          aria-label="Product categories showcase"
        >
          <motion.div
            ref={trackRef}
            className="product-categories-carousel-track"
            drag="x"
            dragConstraints={{ left: -maxTranslate, right: 0 }}
            dragElastic={0.12}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={{ x: translateX }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 280, damping: 30, mass: 0.85 }
            }
          >
            {displayedCards.map((card, index) => (
              <ProductCategoryCard
                key={`${activeCategory}-${card.id}`}
                card={card}
                staggerIndex={(index % 3) as 0 | 1 | 2}
                isDraggingRef={isDraggingRef}
              />
            ))}
          </motion.div>
        </div>

        {/* Centered Editorial Bottom CTA (Using Contact Us Animation Language) */}
        {ctaLabel && ctaTo && (
          <div className="product-categories-footer">
            <Link
              to={ctaTo}
              className="product-categories-cta"
              aria-label={`${ctaLabel} - browse complete catalog`}
            >
              <span className="product-categories-cta__label">{ctaLabel}</span>
              <span className="product-categories-cta__arrow" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
