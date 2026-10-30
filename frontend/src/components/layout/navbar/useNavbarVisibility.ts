import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type ActiveMenu = 'hardware' | 'kitchens' | null;

export interface UseNavbarVisibilityReturn {
  navRef: React.RefObject<HTMLDivElement | null>;
  isNavVisible: boolean;
  navHeight: number;
  navOffset: number;
  isScrolled: boolean;
  hasSolidNav: boolean;
  isLightHero: boolean;
  activeMenu: ActiveMenu;
  mobileOpen: boolean;
  mobileSubmenu: ActiveMenu;
  openMenu: (menu: 'hardware' | 'kitchens') => void;
  toggleDropdown: (menu: 'hardware' | 'kitchens') => void;
  toggleMobile: () => void;
  toggleMobileSubmenu: (menu: 'hardware' | 'kitchens') => void;
  closeAll: () => void;
  handleNavMouseEnter: () => void;
  handleNavMouseLeave: () => void;
  handleDrawerMouseEnter: () => void;
  handleDrawerMouseLeave: () => void;
  setProgrammaticScrolling: (active: boolean, durationMs?: number) => void;
}

const TOP_THRESHOLD = 120; // Within top 120px, navbar is unconditionally visible
const SCROLL_DELTA_THRESHOLD = 10; // Meaningful 10px scroll delta prevents micro-jitter
const SCROLLED_GLASS_THRESHOLD = 40; // Past 40px, pill adopts architectural frosted glass

/**
 * useNavbarVisibility
 *
 * Centralized, route-aware visibility controller and state machine for Surfuria's navbar:
 * - Deterministic hide-on-down / reveal-on-up scroll tracking throttled via requestAnimationFrame.
 * - Single source of truth for all routes (Home, About, Hardware, Kitchens, Contact, Detail).
 * - Route transition lifecycle: resets visibility to visible, resets scroll baselines, closes open drawers,
 *   and clears DOM focus from clicked nav links so navigation interactions do not stick across pages.
 * - Integration with GSAP ScrollTrigger: guards against pin-measurement refresh cycles.
 * - Keyboard accessibility: reveals immediately on tab/focusin, keeps visible while focus-visible is active.
 * - Interaction locking: keeps navbar visible while mega-menus or mobile drawer are active.
 */
export function useNavbarVisibility(): UseNavbarVisibilityReturn {
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<ActiveMenu>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Initialize scrolled state from window scroll position
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return (window.scrollY || document.documentElement.scrollTop) > SCROLLED_GLASS_THRESHOLD;
    }
    return false;
  });

  // Reset menu state during render on actual page route changes (not in-page hash changes)
  const routeIdentifier = `${location.key}:${location.pathname}`;
  const [prevRouteIdentifier, setPrevRouteIdentifier] = useState(routeIdentifier);
  if (prevRouteIdentifier !== routeIdentifier) {
    setPrevRouteIdentifier(routeIdentifier);
    setIsNavVisible(true);
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSubmenu(null);
  }

  // Dynamic navbar bottom/height measurement for sticky offset coordination
  const [navHeight, setNavHeight] = useState<number>(84);
  const navOffset = isNavVisible ? navHeight : 0;

  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInsideDrawerRef = useRef<boolean>(false);

  // Directional scroll tracker refs (single source of truth for high-frequency scroll loop)
  const isNavVisibleRef = useRef<boolean>(true);
  const lastScrollYRef = useRef<number>(0);
  const pivotYRef = useRef<number>(0);
  const lastDirectionRef = useRef<'up' | 'down'>('up');
  const isNavigatingRef = useRef<boolean>(false);
  const isProgrammaticScrollingRef = useRef<boolean>(false);
  const programmaticScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rAFIdRef = useRef<number | null>(null);

  // Programmatic scrolling coordinator: prevents interim scroll deltas from altering navbar visibility
  const setProgrammaticScrolling = useCallback((active: boolean, durationMs = 850) => {
    isProgrammaticScrollingRef.current = active;
    if (programmaticScrollTimerRef.current) {
      clearTimeout(programmaticScrollTimerRef.current);
      programmaticScrollTimerRef.current = null;
    }
    if (active && durationMs > 0) {
      programmaticScrollTimerRef.current = setTimeout(() => {
        isProgrammaticScrollingRef.current = false;
        programmaticScrollTimerRef.current = null;
        // Re-sync baseline to settled position
        const curY = Math.max(0, window.scrollY || document.documentElement.scrollTop);
        lastScrollYRef.current = curY;
        pivotYRef.current = curY;
      }, durationMs);
    }
  }, []);

  // Update navbar height measurement and CSS custom properties on mount and resize
  useLayoutEffect(() => {
    const updateNavGeometry = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        // The navbar wrapper starts at y=0, bottom represents the clear vertical boundary
        const measured = Math.round(rect.bottom > 0 ? rect.bottom : rect.height + 20);
        if (measured > 0) {
          setNavHeight(measured);
          document.documentElement.style.setProperty('--sf-nav-height', `${measured}px`);
        }
      }
    };

    updateNavGeometry();
    window.addEventListener('resize', updateNavGeometry, { passive: true });
    return () => window.removeEventListener('resize', updateNavGeometry);
  }, []);

  // Synchronize dynamic sticky offset CSS custom property
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--sf-nav-offset', `${navOffset}px`);
  }, [navOffset]);

  // Keep interaction state ref updated for the rAF loop without recreating listeners
  const isMenuOpenRef = useRef<boolean>(false);
  useEffect(() => {
    isMenuOpenRef.current = activeMenu !== null || mobileOpen;
  }, [activeMenu, mobileOpen]);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const closeAll = useCallback(() => {
    clearCloseTimeout();
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSubmenu(null);
    isInsideDrawerRef.current = false;

    // Clear active focus if held inside navRef
    if (navRef.current && document.activeElement && navRef.current.contains(document.activeElement)) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [clearCloseTimeout]);

  // --------------------------------------------------------------------------
  // Route Transition Lifecycle & Scroll Baseline Synchronization
  // --------------------------------------------------------------------------
  useLayoutEffect(() => {
    clearCloseTimeout();
    if (navigationTimerRef.current) {
      clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }

    // Lock navigation tracking to prevent interim scroll events from hiding the navbar
    isNavigatingRef.current = true;
    isNavVisibleRef.current = true;
    isInsideDrawerRef.current = false;

    // Clear any activeElement focus within the navbar on route change
    if (navRef.current && document.activeElement && navRef.current.contains(document.activeElement)) {
      (document.activeElement as HTMLElement)?.blur();
    }

    // Synchronize baseline with current viewport position
    const syncBaseline = () => {
      const curY = Math.max(0, window.scrollY || document.documentElement.scrollTop);
      lastScrollYRef.current = curY;
      pivotYRef.current = curY;
      lastDirectionRef.current = 'up';
      setIsScrolled(curY > SCROLLED_GLASS_THRESHOLD);
    };

    syncBaseline();

    // Re-check after RouteScrollManager sets position before paint
    const rAF = requestAnimationFrame(() => {
      syncBaseline();
    });

    // Release navigation lock after page transition settles
    navigationTimerRef.current = setTimeout(() => {
      syncBaseline();
      isNavigatingRef.current = false;
      navigationTimerRef.current = null;
    }, 100);

    return () => {
      cancelAnimationFrame(rAF);
      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
        navigationTimerRef.current = null;
      }
    };
  }, [location.key, location.pathname, clearCloseTimeout]);

  // --------------------------------------------------------------------------
  // Directional Scroll Detection (Passive + rAF Throttled)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const initialY = Math.max(0, window.scrollY || document.documentElement.scrollTop);
    lastScrollYRef.current = initialY;
    pivotYRef.current = initialY;

    const onScroll = () => {
      if (rAFIdRef.current !== null) return;

      rAFIdRef.current = requestAnimationFrame(() => {
        rAFIdRef.current = null;

        // 1. Guard against GSAP measurement & pin-refresh cycles
        if (
          typeof ScrollTrigger !== 'undefined' &&
          Boolean((ScrollTrigger as unknown as { isRefreshing?: boolean }).isRefreshing)
        ) {
          return;
        }

        const currentY = Math.max(0, window.scrollY || document.documentElement.scrollTop);

        // 2. Scrolled glass treatment past 40px
        const nextScrolled = currentY > SCROLLED_GLASS_THRESHOLD;
        setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

        // 3. During route transitions or programmatic restoration, maintain visibility & update baseline
        if (isNavigatingRef.current) {
          lastScrollYRef.current = currentY;
          pivotYRef.current = currentY;
          lastDirectionRef.current = 'up';
          if (!isNavVisibleRef.current) {
            isNavVisibleRef.current = true;
            setIsNavVisible(true);
          }
          return;
        }

        // 3b. Programmatic smooth scroll (e.g. clicking category pills):
        // Prevent interim scroll deltas from altering navbar visibility during programmatic scrolls
        if (isProgrammaticScrollingRef.current) {
          lastScrollYRef.current = currentY;
          pivotYRef.current = currentY;
          if (currentY <= TOP_THRESHOLD && !isNavVisibleRef.current) {
            isNavVisibleRef.current = true;
            setIsNavVisible(true);
          }
          return;
        }

        // 4. Active interaction locking:
        // Navbar remains visible while mega-menu or mobile drawer is open,
        // or user is navigating via keyboard with focus-visible inside navbar.
        const activeEl = document.activeElement;
        const hasKeyboardFocus = Boolean(
          navRef.current &&
          activeEl &&
          navRef.current.contains(activeEl) &&
          (activeEl.matches(':focus-visible') || activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT')
        );

        if (isMenuOpenRef.current || hasKeyboardFocus) {
          lastScrollYRef.current = currentY;
          pivotYRef.current = currentY;
          if (!isNavVisibleRef.current) {
            isNavVisibleRef.current = true;
            setIsNavVisible(true);
          }
          return;
        }

        // 5. Top boundary restoration (within top 120px): navbar is unconditionally visible
        if (currentY <= TOP_THRESHOLD) {
          if (!isNavVisibleRef.current) {
            isNavVisibleRef.current = true;
            setIsNavVisible(true);
          }
          lastScrollYRef.current = currentY;
          pivotYRef.current = currentY;
          lastDirectionRef.current = 'up';
          return;
        }

        // 6. Direction & Accumulator calculation (past 120px threshold)
        const lastY = lastScrollYRef.current;
        const delta = currentY - lastY;

        const currentDirection: 'up' | 'down' = delta > 0 ? 'down' : delta < 0 ? 'up' : lastDirectionRef.current;
        if (currentDirection !== lastDirectionRef.current && delta !== 0) {
          // Direction reversed: anchor new pivot to the turning point
          pivotYRef.current = lastY;
          lastDirectionRef.current = currentDirection;
        }

        const distance = currentY - pivotYRef.current;

        if (currentDirection === 'down' && distance > SCROLL_DELTA_THRESHOLD) {
          // Meaningful downward scroll -> slide navbar upward out of viewport
          if (isNavVisibleRef.current) {
            isNavVisibleRef.current = false;
            setIsNavVisible(false);
          }
        } else if (currentDirection === 'up' && distance < -SCROLL_DELTA_THRESHOLD) {
          // Meaningful upward scroll -> promptly reveal navbar
          if (!isNavVisibleRef.current) {
            isNavVisibleRef.current = true;
            setIsNavVisible(true);
          }
        }

        lastScrollYRef.current = currentY;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rAFIdRef.current !== null) {
        cancelAnimationFrame(rAFIdRef.current);
        rAFIdRef.current = null;
      }
    };
  }, []);

  // --------------------------------------------------------------------------
  // Keyboard Accessibility: reveal navbar immediately when receiving focus
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (navRef.current && navRef.current.contains(e.target as Node)) {
        if (!isNavVisibleRef.current) {
          isNavVisibleRef.current = true;
          setIsNavVisible(true);
        }
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  // --------------------------------------------------------------------------
  // Outside Click & Escape Key Handlers
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // --------------------------------------------------------------------------
  // Mouse Hover Handlers (Desktop MegaMenu open/close intent)
  // --------------------------------------------------------------------------
  const openMenu = useCallback(
    (menu: 'hardware' | 'kitchens') => {
      clearCloseTimeout();
      setActiveMenu(menu);
    },
    [clearCloseTimeout]
  );

  const handleNavMouseEnter = useCallback(() => {
    // Intentionally empty: hover intent is scoped to specific menu items
  }, []);

  const handleNavMouseLeave = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      if (!isInsideDrawerRef.current) {
        setActiveMenu(null);
      }
    }, 120);
  }, [clearCloseTimeout]);

  const handleDrawerMouseEnter = useCallback(() => {
    isInsideDrawerRef.current = true;
    clearCloseTimeout();
  }, [clearCloseTimeout]);

  const handleDrawerMouseLeave = useCallback(() => {
    isInsideDrawerRef.current = false;
    clearCloseTimeout();
    setActiveMenu(null);
  }, [clearCloseTimeout]);

  const toggleDropdown = useCallback((menu: 'hardware' | 'kitchens') => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  }, []);

  const toggleMobileSubmenu = useCallback((menu: 'hardware' | 'kitchens') => {
    setMobileSubmenu((prev) => (prev === menu ? null : menu));
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
    setActiveMenu(null);
  }, []);

  // Hero Surface Context:
  // - Dark hero photography routes: Home ('/'), Hardware ('/hardware'), Kitchens ('/kitchens')
  // - Light paper hero routes: About ('/about'), Contact ('/contact'), Product Detail pages
  const isDarkHeroRoute =
    location.pathname === '/' ||
    location.pathname === '/hardware' ||
    location.pathname === '/kitchens';
  const isLightHero = !isDarkHeroRoute;

  // Presentation State:
  // Consistent across all routes (Home, Hardware, Kitchens, About, Contact):
  // - Container is transparent at scroll position zero (unless mega-menu or mobile drawer is open)
  // - Container transitions to architectural espresso frosted glass when scrolled (>40px)
  // - Opening mega-menu or mobile drawer keeps the navbar container solid/frosted for legibility
  const isMenuOpen = activeMenu !== null || mobileOpen;
  const hasSolidNav = isScrolled || isMenuOpen;

  return {
    navRef,
    isNavVisible,
    navHeight,
    navOffset,
    isScrolled,
    hasSolidNav,
    isLightHero,
    activeMenu,
    mobileOpen,
    mobileSubmenu,
    openMenu,
    toggleDropdown,
    toggleMobile,
    toggleMobileSubmenu,
    closeAll,
    handleNavMouseEnter,
    handleNavMouseLeave,
    handleDrawerMouseEnter,
    handleDrawerMouseLeave,
    setProgrammaticScrolling,
  };
}
