import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * RouteScrollManager
 * 
 * Centralized scroll restoration & route lifecycle management for Surfuria:
 * 1. Normal navigation (PUSH / REPLACE): starts destination route at the top (0, 0)
 *    immediately before paint, avoiding scroll leaks.
 * 2. In-page hash navigation (e.g. /about#why-us): smoothly scrolls to the target anchor.
 * 3. Browser Back / Forward (POP): restores historical scroll position from session cache.
 * 4. GSAP ScrollTrigger coordination: refreshes pinned triggers after route changes.
 */
export default function RouteScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const scrollMap = useRef<Map<string, number>>(new Map());
  const prevKeyRef = useRef(location.key);
  const isNavigatingRef = useRef<boolean>(false);

  // Set browser scroll restoration to manual so our custom manager has full authority
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Continuously record scroll position for the current history entry
    const handleScroll = () => {
      if (isNavigatingRef.current) return;
      const currentY = window.scrollY || document.documentElement.scrollTop;
      scrollMap.current.set(location.key, currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key]);

  // Synchronous scroll positioning before browser paint
  useLayoutEffect(() => {
    const isNewRoute = prevKeyRef.current !== location.key;
    prevKeyRef.current = location.key;

    if (!isNewRoute) return;

    isNavigatingRef.current = true;

    // Temporarily disable smooth scroll behavior from CSS to ensure instant zero-latency repositioning
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    if (navType === 'POP') {
      // Browser Back / Forward navigation: restore previous scroll position
      const savedY = scrollMap.current.get(location.key) ?? 0;
      window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
        html.style.scrollBehavior = prevScrollBehavior;
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 50);
      });
    } else {
      // Normal in-app navigation: start destination at top
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          html.style.scrollBehavior = prevScrollBehavior;
          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 50);
        });
      } else {
        html.style.scrollBehavior = prevScrollBehavior;
        isNavigatingRef.current = false;
      }
    }

    // Refresh GSAP ScrollTrigger to ensure pinned animations re-measure fresh DOM
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(refreshTimer);
  }, [location.pathname, location.search, location.key, navType, location.hash]);

  const lastHandledHashRef = useRef<string | null>(null);

  // Handle in-page hash / anchor targets (e.g., #why-us, #privacy)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const fullHash = `${location.pathname}#${targetId}`;

      // Prevent duplicate scroll executions for the same target
      if (lastHandledHashRef.current === fullHash) {
        return;
      }

      const el = document.getElementById(targetId);
      // Skip if this anchor is a catalogue category section managed by useCategoryScrollSync
      if (el?.classList.contains('catalog-category-section')) {
        lastHandledHashRef.current = fullHash;
        return;
      }

      if (el) {
        lastHandledHashRef.current = fullHash;
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If element is rendering asynchronously or within an entrance transition, retry next frame
        const timer = setTimeout(() => {
          const retryEl = document.getElementById(targetId);
          if (retryEl?.classList.contains('catalog-category-section')) {
            lastHandledHashRef.current = fullHash;
            return;
          }
          if (retryEl) {
            lastHandledHashRef.current = fullHash;
            retryEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      lastHandledHashRef.current = null;
    }
  }, [location.pathname, location.hash]);

  return null;
}
