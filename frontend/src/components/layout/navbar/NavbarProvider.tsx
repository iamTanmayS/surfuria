import React from 'react';
import { useNavbarVisibility } from './useNavbarVisibility';
import { NavbarContext } from './NavbarContext';

/**
 * NavbarProvider
 * 
 * Provides centralized navbar visibility, dimensions, offset, and programmatic
 * scroll locks across the entire application layout.
 */
export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const navbarState = useNavbarVisibility();

  return (
    <NavbarContext.Provider value={navbarState}>
      {children}
    </NavbarContext.Provider>
  );
}

