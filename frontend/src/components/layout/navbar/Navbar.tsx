import { useReducedMotion, motion } from 'motion/react';
import {
  HARDWARE_CATEGORIES,
  KITCHEN_CONFIGURATION_NAV_ITEMS,
  type NavCategoryItem,
} from '../../../data/navigation/navigationData';
import Brand from './Brand';
import NavLinks from './NavLinks';
import NavActions from './NavActions';
import MegaMenuDrawer from './MegaMenuDrawer';
import MobileDrawer from './MobileDrawer';
import { useNavbar } from './NavbarContext';
import './Navbar.css';

export interface NavbarBrandConfig {
  title?: string;
  tagline?: string;
  logoSrc?: string;
}

export interface NavbarProps {
  /**
   * Theme treatment for the transparent top state:
   * - 'auto': dynamically determined by route (dark on Home, Hardware, Kitchens; light on About, Contact, Details)
   * - 'dark': light text on transparent container (ideal over dark hero photography)
   * - 'light': dark text on transparent container (ideal over light paper hero surfaces)
   */
  theme?: 'auto' | 'dark' | 'light';
  /** Optional custom brand configuration */
  brand?: NavbarBrandConfig;
  /** Optional custom className applied to the pill navbar element */
  className?: string;
  /** Optional contact button label override */
  contactLabel?: string;
  /** Optional contact link URL override */
  contactUrl?: string;
}

/**
 * Navbar
 * 
 * Floating glassmorphism navigation component for Surfuria.
 * Consumes the centralized `useNavbarVisibility` hook for all visibility,
 * interaction locking, route transitions, and scroll state machines.
 */
export default function Navbar({
  theme = 'auto',
  brand,
  className = '',
  contactLabel = 'Contact Us',
  contactUrl = '/contact',
}: NavbarProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const {
    navRef,
    isNavVisible,
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
  } = useNavbar();

  const effectiveTheme = theme === 'auto' ? (isLightHero ? 'light' : 'dark') : theme;
  const isLightAtTop = !hasSolidNav && effectiveTheme === 'light';

  const activeCategories: {
    title: string;
    viewAllSlug: string;
    viewAllText?: string;
    items: NavCategoryItem[];
    footerNote?: string;
    footerLinkText?: string;
    footerLinkHref?: string;
  } =
    activeMenu === 'hardware'
      ? {
          title: 'Architectural Hardware Systems',
          viewAllSlug: '/hardware',
          viewAllText: 'View All Collections',
          items: HARDWARE_CATEGORIES,
          footerNote: 'Architectural hardware solutions • Engineered for durability',
          footerLinkText: 'Schedule an Architectural Consultation →',
          footerLinkHref: '/contact',
        }
      : {
          title: 'Modular Kitchen Configurations',
          viewAllSlug: '/kitchens#configurations',
          viewAllText: 'View All Packages',
          items: KITCHEN_CONFIGURATION_NAV_ITEMS,
          footerNote: 'Factory-engineered modular kitchen packages • Turnkey pricing',
          footerLinkText: 'Explore Package Inclusions & Pricing →',
          footerLinkHref: '/kitchens#configurations',
        };

  return (
    <header
      className={`sf-nav-wrapper ${!isNavVisible ? 'sf-nav-wrapper--hidden' : ''}`.trim()}
      aria-hidden={!isNavVisible}
    >
      <div
        className="sf-nav-container"
        ref={navRef}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        {/* Floating Pill Header Bar */}
        <motion.nav
          className={`sf-navbar ${isLightAtTop ? 'sf-navbar--light-top' : ''} ${className}`.trim()}
          data-open={activeMenu !== null}
          data-scrolled={isScrolled}
          data-theme={effectiveTheme}
          aria-label="Main Navigation"
          animate={hasSolidNav ? 'scrolled' : 'top'}
          variants={
            shouldReduceMotion
              ? {
                  top: { opacity: 1 },
                  scrolled: { opacity: 1 },
                }
              : {
                  top: {
                    background: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    boxShadow: '0 0px 0px 0px rgba(0,0,0,0)',
                  },
                  scrolled: {
                    background: 'rgba(22, 16, 13, 0.80)',
                    borderColor: 'rgba(220, 185, 145, 0.22)',
                    boxShadow:
                      '0 1px 0 0 rgba(255,235,210,0.16) inset, 0 -1px 0 0 rgba(0,0,0,0.4) inset, 0 18px 48px -10px rgba(10,7,5,0.48), 0 4px 16px -2px rgba(10,7,5,0.32)',
                  },
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
          style={{
            backdropFilter: hasSolidNav ? 'blur(26px) saturate(160%)' : 'none',
            WebkitBackdropFilter: hasSolidNav ? 'blur(26px) saturate(160%)' : 'none',
          }}
        >
          {/* Left: Brand Identity */}
          <Brand
            onNavigateHome={closeAll}
            title={brand?.title}
            tagline={brand?.tagline}
            logoSrc={brand?.logoSrc}
          />

          {/* Center: Primary Navigation (Absolute Centered) */}
          <NavLinks
            activeMenu={activeMenu}
            onMouseEnter={openMenu}
            onToggle={toggleDropdown}
            onClose={closeAll}
          />

          {/* Right: Contact CTA + Mobile Menu Toggle */}
          <NavActions
            mobileOpen={mobileOpen}
            isScrolled={isScrolled}
            onToggleMobile={toggleMobile}
            onClose={closeAll}
            contactLabel={contactLabel}
            contactUrl={contactUrl}
          />
        </motion.nav>

        {/* Desktop Translucent Reusable Mega-Menu Drawer Panel */}
        <MegaMenuDrawer
          isOpen={activeMenu !== null}
          activeMenu={activeMenu}
          title={activeCategories.title}
          viewAllSlug={activeCategories.viewAllSlug}
          viewAllText={activeCategories.viewAllText}
          items={activeCategories.items}
          footerNote={activeCategories.footerNote}
          footerLinkText={activeCategories.footerLinkText}
          footerLinkHref={activeCategories.footerLinkHref}
          shouldReduceMotion={shouldReduceMotion}
          onMouseEnter={handleDrawerMouseEnter}
          onMouseLeave={handleDrawerMouseLeave}
          onClose={closeAll}
        />

        {/* Mobile Fullscreen Glass Drawer */}
        <MobileDrawer
          isOpen={mobileOpen}
          mobileSubmenu={mobileSubmenu}
          shouldReduceMotion={shouldReduceMotion}
          onToggleSubmenu={toggleMobileSubmenu}
          onClose={closeAll}
        />
      </div>
    </header>
  );
}
