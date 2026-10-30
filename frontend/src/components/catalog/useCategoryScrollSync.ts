import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { useNavbar } from '../layout/navbar/NavbarContext';

interface UseCategoryScrollSyncOptions {
  categorySlugs: string[];
  initialActiveSlug?: string;
}

export function useCategoryScrollSync({
  categorySlugs,
  initialActiveSlug = 'all',
}: UseCategoryScrollSyncOptions) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { isNavVisible, navHeight, setProgrammaticScrolling } = useNavbar();

  // Stable references to prevent recreation of callbacks during high-frequency scroll
  const isNavVisibleRef = useRef(isNavVisible);
  const navHeightRef = useRef(navHeight);
  const shouldReduceMotionRef = useRef(shouldReduceMotion);
  const setProgrammaticScrollingRef = useRef(setProgrammaticScrolling);

  useEffect(() => {
    isNavVisibleRef.current = isNavVisible;
    navHeightRef.current = navHeight;
    shouldReduceMotionRef.current = shouldReduceMotion;
    setProgrammaticScrollingRef.current = setProgrammaticScrolling;
  }, [isNavVisible, navHeight, shouldReduceMotion, setProgrammaticScrolling]);

  const [activeSlug, setActiveSlug] = useState<string>(initialActiveSlug);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const programmaticTimeoutRef = useRef<number | null>(null);

  // Track the last target slug that was scrolled to programmatically from the URL
  // to guarantee the initial hash/query is only executed once and never hijacks manual scrolling.
  const lastHandledTargetRef = useRef<string | null>(null);

  // Smoothly scroll to a section or 'all' with exact sticky header offset
  const scrollToCategory = useCallback(
    (slug: string, updateHistory = true) => {
      isProgrammaticScrollRef.current = true;
      setProgrammaticScrollingRef.current(true, 850);

      setActiveSlug(slug);

      if (slug === 'all') {
        const heroEl =
          document.querySelector('.kitchen-hero') ||
          document.querySelector('.catalog-hero');
        const pillsBar =
          document.querySelector('.sf-cat-nav') ||
          document.querySelector('.catalog-pills-bar');
        if (pillsBar && heroEl) {
          const heroRect = heroEl.getBoundingClientRect();
          const targetY =
            window.scrollY +
            heroRect.bottom -
            (isNavVisibleRef.current ? navHeightRef.current : 0);
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: shouldReduceMotionRef.current ? 'auto' : 'smooth',
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: shouldReduceMotionRef.current ? 'auto' : 'smooth',
          });
        }
        if (updateHistory && window.location.hash) {
          window.history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          );
        }
      } else {
        const targetEl = document.getElementById(slug);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const pillsBar =
            document.querySelector('.sf-cat-nav') ||
            document.querySelector('.catalog-pills-bar');
          const pillsHeight = pillsBar
            ? pillsBar.getBoundingClientRect().height
            : 56;

          // When scrolling down to a section, the navbar hides; offset only needs pills bar + breathing room
          const targetOffset = pillsHeight + 16;
          const targetY = window.scrollY + rect.top - targetOffset;
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: shouldReduceMotionRef.current ? 'auto' : 'smooth',
          });

          if (updateHistory) {
            window.history.replaceState(
              null,
              '',
              `${window.location.pathname}${window.location.search}#${slug}`
            );
          }
        }
      }

      if (programmaticTimeoutRef.current) {
        clearTimeout(programmaticTimeoutRef.current);
      }
      programmaticTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        setProgrammaticScrollingRef.current(false);
      }, 850);
    },
    [] // Completely stable function reference across component lifetime
  );

  // Handle URL hash or ?category= param on mount or explicit URL navigation
  useEffect(() => {
    const hashSlug = location.hash ? location.hash.replace('#', '') : null;
    const searchParams = new URLSearchParams(location.search);
    const querySlug = searchParams.get('category');
    const targetSlug = hashSlug || querySlug;

    if (!targetSlug || !categorySlugs.includes(targetSlug)) {
      // If there's no hash/category target in URL, reset the ref so subsequent navigation works
      lastHandledTargetRef.current = null;
      return;
    }

    // CRITICAL FIX: Only scroll to targetSlug if it has not already been scrolled to.
    // This prevents re-triggering programmatic scrolling when user moves scroll wheel or navbar toggles.
    if (lastHandledTargetRef.current === targetSlug) {
      return;
    }

    lastHandledTargetRef.current = targetSlug;

    const timer = setTimeout(() => {
      scrollToCategory(targetSlug, false);
    }, 150);
    return () => clearTimeout(timer);
  }, [location.hash, location.search, location.pathname, categorySlugs, scrollToCategory]);

  // Support browser Back / Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash ? window.location.hash.replace('#', '') : 'all';
      if (categorySlugs.includes(hash)) {
        lastHandledTargetRef.current = hash;
        scrollToCategory(hash, false);
      } else if (!window.location.hash) {
        lastHandledTargetRef.current = 'all';
        scrollToCategory('all', false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [categorySlugs, scrollToCategory]);

  // Deterministic, layout-aware active category detection throttled via rAF
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = categorySlugs
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    let rAFId: number | null = null;

    const updateActiveCategory = () => {
      if (isProgrammaticScrollRef.current) return;

      const pillsBar =
        document.querySelector('.sf-cat-nav') ||
        document.querySelector('.catalog-pills-bar');

      // If the pills bar has not docked into its sticky position yet, user is in hero: keep 'all' active
      if (pillsBar) {
        const expectedStickyTop = isNavVisibleRef.current ? navHeightRef.current : 0;
        if (pillsBar.getBoundingClientRect().top > expectedStickyTop + 5) {
          setActiveSlug('all');
          return;
        }
      }

      const pillsBottom = pillsBar
        ? pillsBar.getBoundingClientRect().bottom
        : (isNavVisibleRef.current ? navHeightRef.current : 0) + 56;
      const activationLine = pillsBottom + 40;

      const firstSection = sections[0];
      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();
        if (firstRect.top > activationLine + 20) {
          setActiveSlug('all');
          return;
        }
      }

      // If scrolled near document bottom, unconditionally activate the last category
      const docHeight = document.documentElement.scrollHeight;
      const scrollPos = window.scrollY + window.innerHeight;
      if (scrollPos >= docHeight - 40) {
        setActiveSlug(sections[sections.length - 1].id);
        return;
      }

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= activationLine && rect.bottom > activationLine) {
          setActiveSlug(sections[i].id);
          return;
        }
      }

      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        const lastRect = lastSection.getBoundingClientRect();
        if (lastRect.bottom <= activationLine) {
          setActiveSlug(lastSection.id);
        }
      }
    };

    const onScroll = () => {
      if (rAFId !== null) return;
      rAFId = requestAnimationFrame(() => {
        rAFId = null;
        updateActiveCategory();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActiveCategory();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rAFId !== null) {
        cancelAnimationFrame(rAFId);
      }
      if (programmaticTimeoutRef.current) {
        clearTimeout(programmaticTimeoutRef.current);
      }
    };
  }, [categorySlugs]); // Clean stable dependency — no churn from navbar visibility

  return {
    activeSlug,
    scrollToCategory,
  };
}
