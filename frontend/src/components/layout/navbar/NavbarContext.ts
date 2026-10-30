import { createContext, useContext } from 'react';
import type { UseNavbarVisibilityReturn } from './useNavbarVisibility';

export const NavbarContext = createContext<UseNavbarVisibilityReturn | null>(null);

/**
 * useNavbar
 * 
 * Hook to consume the centralized navbar state, including dynamic sticky offset,
 * height measurement, visibility, and programmatic scrolling locks.
 */
export function useNavbar(): UseNavbarVisibilityReturn {
  const context = useContext(NavbarContext);
  if (!context) {
    // Defensive fallback if used outside of NavbarProvider (e.g. isolated test environments)
    return {
      navRef: { current: null },
      isNavVisible: true,
      navHeight: 84,
      navOffset: 84,
      isScrolled: false,
      hasSolidNav: false,
      isLightHero: false,
      activeMenu: null,
      mobileOpen: false,
      mobileSubmenu: null,
      openMenu: () => {},
      toggleDropdown: () => {},
      toggleMobile: () => {},
      toggleMobileSubmenu: () => {},
      closeAll: () => {},
      handleNavMouseEnter: () => {},
      handleNavMouseLeave: () => {},
      handleDrawerMouseEnter: () => {},
      handleDrawerMouseLeave: () => {},
      setProgrammaticScrolling: () => {},
    };
  }
  return context;
}

