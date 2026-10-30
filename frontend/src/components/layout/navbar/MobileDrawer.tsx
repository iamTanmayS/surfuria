import { AnimatePresence, motion } from 'motion/react';
import {
  HARDWARE_CATEGORIES,
  KITCHEN_CONFIGURATION_NAV_ITEMS,
} from '../../../data/navigation/navigationData';

import { Link } from 'react-router-dom';
import './MobileDrawer.css';

type ActiveMenu = 'hardware' | 'kitchens' | null;

interface MobileDrawerProps {
  isOpen: boolean;
  mobileSubmenu: ActiveMenu;
  shouldReduceMotion: boolean | null;
  onToggleSubmenu: (menu: 'hardware' | 'kitchens') => void;
  onClose: () => void;
}

export default function MobileDrawer({
  isOpen,
  mobileSubmenu,
  shouldReduceMotion,
  onToggleSubmenu,
  onClose,
}: MobileDrawerProps) {
  const mobileDrawerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      scale: 0.98,
      transition: { duration: 0.18, ease: 'easeIn' as const },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.28, ease: 'easeOut' as const },
    },
  };

  const getSubmenuData = () => {
    if (mobileSubmenu === 'hardware') {
      return {
        title: 'Hardware Collections',
        viewAll: '/hardware',
        items: HARDWARE_CATEGORIES,
      };
    }
    if (mobileSubmenu === 'kitchens') {
      return {
        title: 'Modular Kitchen Configurations',
        viewAll: '/kitchens#configurations',
        viewAllText: 'View All Packages',
        items: KITCHEN_CONFIGURATION_NAV_ITEMS,
      };
    }
    return null;
  };

  const submenuData = getSubmenuData();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={mobileDrawerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="sf-mobile-drawer"
        >
          <div className="sf-mobile-drawer__viewport">
            <AnimatePresence mode="wait" initial={false}>
              {/* PRIMARY SCREEN: Main Clean 4-Item Menu */}
              {!mobileSubmenu ? (
                <motion.div
                  key="mobile-main"
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="sf-mobile-panel"
                >
                  <ul className="sf-mobile-list">
                    <li>
                      <Link to="/" className="sf-mobile-nav-link" onClick={onClose}>
                        <div className="sf-mobile-nav-link__text">
                          <span className="sf-mobile-nav-link__title">Home</span>
                          <span className="sf-mobile-nav-link__desc">Return to architectural overview</span>
                        </div>
                        <svg className="sf-mobile-nav-link__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 3l5 5-5 5" />
                        </svg>
                      </Link>
                    </li>

                    <li>
                      <button
                        type="button"
                        className="sf-mobile-nav-link"
                        onClick={() => onToggleSubmenu('hardware')}
                      >
                        <div className="sf-mobile-nav-link__text">
                          <span className="sf-mobile-nav-link__title">Hardware</span>
                          <span className="sf-mobile-nav-link__desc">9 architectural categories &amp; fittings</span>
                        </div>
                        <svg className="sf-mobile-nav-link__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 3l5 5-5 5" />
                        </svg>
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        className="sf-mobile-nav-link"
                        onClick={() => onToggleSubmenu('kitchens')}
                      >
                        <div className="sf-mobile-nav-link__text">
                          <span className="sf-mobile-nav-link__title">Kitchens</span>
                          <span className="sf-mobile-nav-link__desc">Modular configurations &amp; turnkey packages</span>
                        </div>
                        <svg className="sf-mobile-nav-link__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 3l5 5-5 5" />
                        </svg>
                      </button>
                    </li>

                    <li>
                      <Link to="/about" className="sf-mobile-nav-link" onClick={onClose}>
                        <div className="sf-mobile-nav-link__text">
                          <span className="sf-mobile-nav-link__title">About Us</span>
                          <span className="sf-mobile-nav-link__desc">Our engineering ethos & precision craftsmanship</span>
                        </div>
                        <svg className="sf-mobile-nav-link__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 3l5 5-5 5" />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              ) : (
                /* SECONDARY SCREEN: Dedicated, Clean 2-Column Visual Submenu */
                <motion.div
                  key="mobile-submenu"
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="sf-mobile-panel"
                >
                  {/* Back Navigation Bar */}
                  <div className="sf-mobile-subnav-bar">
                    <button
                      type="button"
                      className="sf-mobile-back-btn"
                      onClick={() => onToggleSubmenu(mobileSubmenu)}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M10 3L5 8l5 5" />
                      </svg>
                      <span>All Navigation</span>
                    </button>
                    <Link
                      to={submenuData?.viewAll || '/'}
                      className="sf-mobile-viewall-btn"
                      onClick={onClose}
                    >
                      <span>View All</span>
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 3l5 5-5 5" />
                      </svg>
                    </Link>
                  </div>

                  <div className="sf-mobile-subnav-title">{submenuData?.title}</div>

                  {/* Clean 2-Column Touch Grid */}
                  <div className="sf-mobile-touch-grid">
                    {submenuData?.items.map((item) => (
                      <Link
                        key={item.id}
                        to={item.href || `${submenuData.viewAll}#${item.slug}`}
                        className="sf-mobile-card"
                        onClick={onClose}
                      >
                        <div className="sf-mobile-card__media">
                          <img
                            src={item.image}
                            alt=""
                            className="sf-mobile-card__img"
                            loading="lazy"
                          />
                        </div>
                        <span className="sf-mobile-card__title">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
