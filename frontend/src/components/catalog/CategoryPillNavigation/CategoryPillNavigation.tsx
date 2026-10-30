import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useReducedMotion, animate } from 'motion/react';
import './CategoryPillNavigation.css';

export interface CategoryPillItem {
  id: string;
  label?: string;
  slug?: string;
  name?: string;
  title?: string;
  count?: number;
  stepNumber?: string;
}

export interface CategoryPillNavigationProps {
  categories: readonly CategoryPillItem[];
  activeId?: string;
  activeSlug?: string;
  activeCategoryId?: string;
  onSelectCategory: (idOrSlug: string) => void;
  allLabel?: string;
  sticky?: boolean;
  autoCenter?: boolean;
  ariaLabel?: string;
  className?: string;
}

export default function CategoryPillNavigation({
  categories,
  activeId,
  activeSlug,
  activeCategoryId,
  onSelectCategory,
  allLabel,
  sticky = true,
  autoCenter = false,
  ariaLabel = 'Filter by category',
  className = '',
}: CategoryPillNavigationProps) {
  const shouldReduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragDistanceRef = useRef<number>(0);

  const currentActive = activeId ?? activeSlug ?? activeCategoryId ?? 'all';

  // Normalize category items to guarantee stable id, slug, and label
  const normalizedCategories = useMemo(() => {
    const items: Array<{ id: string; slug: string; label: string; count?: number; stepNumber?: string }> = [];

    const hasAll = categories.some(
      (c) => c.id === 'all' || c.slug === 'all'
    );

    if (allLabel && !hasAll) {
      items.push({
        id: 'all',
        slug: 'all',
        label: allLabel,
      });
    }

    for (const c of categories) {
      const id = c.id || c.slug || '';
      const slug = c.slug || c.id || '';
      const label = c.label || c.title || c.name || slug || id;
      items.push({
        id,
        slug,
        label,
        count: c.count,
        stepNumber: c.stepNumber,
      });
    }

    return items;
  }, [categories, allLabel]);

  const x = useMotionValue(0);
  const [maxTranslate, setMaxTranslate] = useState<number>(0);
  const [showLeftFade, setShowLeftFade] = useState<boolean>(false);
  const [showRightFade, setShowRightFade] = useState<boolean>(false);

  // Compute maximum scrollable distance based on DOM measurements
  const updateMeasurements = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const viewportW = viewport.clientWidth;
    const trackW = track.scrollWidth;
    const maxScroll = Math.max(0, trackW - viewportW);
    setMaxTranslate(maxScroll);

    const currentX = x.get();
    if (currentX < -maxScroll) {
      x.set(-maxScroll);
    } else if (currentX > 0) {
      x.set(0);
    }

    const updatedX = x.get();
    setShowLeftFade(maxScroll > 10 && updatedX < -8);
    setShowRightFade(maxScroll > 10 && updatedX > -maxScroll + 8);
  }, [x]);

  // Sync edge fades whenever the x motion value changes
  useEffect(() => {
    const unsubscribe = x.on('change', (latestX) => {
      setShowLeftFade(maxTranslate > 10 && latestX < -8);
      setShowRightFade(maxTranslate > 10 && latestX > -maxTranslate + 8);
    });
    return () => unsubscribe();
  }, [x, maxTranslate]);

  // Re-measure on mount, resize, and when categories change
  useEffect(() => {
    updateMeasurements();
    const handleResize = () => updateMeasurements();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateMeasurements, normalizedCategories]);

  // Trackpad horizontal swipe & horizontal wheel support
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && maxTranslate > 0) {
        e.preventDefault();
        const currentX = x.get();
        const newX = Math.max(-maxTranslate, Math.min(0, currentX - e.deltaX));
        x.set(newX);
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [x, maxTranslate]);

  // Drag Gesture Handlers
  const handleDragStart = () => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
  };

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    dragDistanceRef.current = Math.abs(info.offset.x);
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
      dragDistanceRef.current = 0;
    }, 120);
  };

  // Center active pill within viewport without causing vertical page jumps
  const centerPill = useCallback(
    (index: number, immediate = false) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const pillNode = track.children[index] as HTMLElement | undefined;
      if (!pillNode) return;

      const viewportW = viewport.clientWidth;
      const pillOffset = pillNode.offsetLeft;
      const pillW = pillNode.offsetWidth;

      // Center the pill within the viewport
      const targetCenter = -(pillOffset - viewportW / 2 + pillW / 2);
      const clampedTarget = Math.max(-maxTranslate, Math.min(0, targetCenter));

      if (shouldReduceMotion || immediate) {
        x.set(clampedTarget);
      } else {
        animate(x, clampedTarget, {
          type: 'spring',
          stiffness: 320,
          damping: 32,
          mass: 0.8,
        });
      }
    },
    [maxTranslate, shouldReduceMotion, x]
  );

  // Auto-center active pill whenever currentActive changes externally (e.g. vertical page scroll)
  useEffect(() => {
    if (!autoCenter || isDraggingRef.current) return;
    const activeIndex = normalizedCategories.findIndex(
      (c) => c.id === currentActive || c.slug === currentActive
    );
    if (activeIndex !== -1) {
      centerPill(activeIndex);
    }
  }, [currentActive, normalizedCategories, centerPill, autoCenter]);

  // Click on a category pill
  const handlePillClick = (cat: { id: string; slug: string }, index: number) => {
    if (isDraggingRef.current || dragDistanceRef.current > 6) return;

    // Use slug if provided (for catalogue routing/hash), otherwise id
    onSelectCategory(cat.slug || cat.id);
    if (autoCenter) {
      centerPill(index);
    }
  };

  const pillRowContent = (
    <div
      ref={viewportRef}
      className="product-category-filters-viewport"
      role="region"
      aria-label={ariaLabel}
    >
      {/* Edge fade overlays */}
      <div
        className={`product-category-filters__fade product-category-filters__fade--left ${
          showLeftFade ? 'is-visible' : ''
        }`}
        aria-hidden="true"
      />
      <div
        className={`product-category-filters__fade product-category-filters__fade--right ${
          showRightFade ? 'is-visible' : ''
        }`}
        aria-hidden="true"
      />

      {/* Swipeable & Draggable Pill Track */}
      <motion.div
        ref={trackRef}
        className="product-category-filters__track"
        role="tablist"
        aria-label={ariaLabel}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -maxTranslate, right: 0 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 350, bounceDamping: 28, power: 0.2 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        {normalizedCategories.map((cat, index) => {
          const isActive = cat.id === currentActive || cat.slug === currentActive;
          return (
            <motion.button
              key={cat.id || cat.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-slug={cat.slug}
              data-id={cat.id}
              className={`product-category-pill sf-cat-nav__pill ${isActive ? 'is-active' : ''}`}
              onClick={() => handlePillClick(cat, index)}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {cat.stepNumber && (
                <span className="product-category-pill__step-num">{cat.stepNumber}</span>
              )}
              <span className="product-category-pill__label">{cat.label}</span>
              {typeof cat.count === 'number' && (
                <span className="product-category-pill__count">{cat.count}</span>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );

  if (sticky) {
    return (
      <nav
        className={`sf-cat-nav ${className}`.trim()}
        aria-label={ariaLabel}
      >
        <div className="container--wide sf-cat-nav__wrapper">
          {pillRowContent}
        </div>
      </nav>
    );
  }

  return (
    <div className={`product-category-filters-container ${className}`.trim()}>
      {pillRowContent}
    </div>
  );
}
