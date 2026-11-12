import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { NavCategoryItem } from '../../../data/navigation/navigationData';
import './MegaMenuDrawer.css';

interface CategoryCardProps {
  item: NavCategoryItem;
  viewAllSlug: string;
  onSelect: () => void;
}

export function CategoryCard({ item, viewAllSlug, onSelect }: CategoryCardProps) {
  const targetUrl = item.href || `${viewAllSlug}#${item.slug}`;

  return (
    <Link
      to={targetUrl}
      className="sf-cat-card"
      onClick={onSelect}
    >
      {/* Visual Thumbnail at the left */}
      <div className="sf-cat-card__media">
        <img
          src={item.image}
          alt={item.title}
          className="sf-cat-card__img"
          loading="lazy"
        />
        <div className="sf-cat-card__media-overlay" />
      </div>

      {/* Text Info */}
      <div className="sf-cat-card__info">
        <div className="sf-cat-card__top">
          <div className="sf-cat-card__title-row">
            <span className="sf-cat-card__title">{item.title}</span>
            <svg
              className="sf-cat-card__arrow"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 3l5 5-5 5" />
            </svg>
          </div>
        </div>
        <p className="sf-cat-card__subtitle">{item.subtitle}</p>
      </div>
    </Link>
  );
}

interface MegaMenuDrawerProps {
  isOpen: boolean;
  activeMenu: 'hardware' | 'kitchens' | null;
  title?: string;
  viewAllSlug: string;
  viewAllText?: string;
  items: NavCategoryItem[];
  footerNote?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  shouldReduceMotion: boolean | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export default function MegaMenuDrawer({
  isOpen,
  activeMenu,
  title = '',
  viewAllSlug,
  viewAllText,
  items,
  shouldReduceMotion,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuDrawerProps) {
  // Outer container variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      scale: shouldReduceMotion ? 1 : 0.985,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.16,
        ease: 'easeIn' as const,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.28,
        ease: 'easeOut' as const,
      },
    },
  };

  const menuDirection = activeMenu === 'kitchens' ? 1 : -1;

  // Inner crossfade glide
  const innerContentVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : direction * 14,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.24,
        ease: 'easeOut' as const,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : direction * -14,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.16,
        ease: 'easeIn' as const,
      },
    }),
  };

  return (
    <div className="sf-dropdown-anchor">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="megamenu-panel"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="sf-megamenu"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            role="region"
            aria-label={`${title || (activeMenu === 'kitchens' ? 'Modular Kitchens' : 'Architectural Hardware')} Navigation`}
          >
            <AnimatePresence mode="wait" custom={menuDirection}>
              <motion.div
                key={activeMenu}
                custom={menuDirection}
                variants={innerContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Header (View All link aligned to right) */}
                <div className="sf-megamenu__header">
                  <Link
                    to={viewAllSlug}
                    className="sf-megamenu__viewall"
                    onClick={onClose}
                  >
                    <span>{viewAllText || 'View All Collections'}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 3l5 5-5 5" />
                    </svg>
                  </Link>
                </div>

                {/* 3-Column or 2-Column Responsive Category Grid */}
                <div className="sf-megamenu__grid" data-items={items.length}>
                  {items.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      item={cat}
                      viewAllSlug={viewAllSlug}
                      onSelect={onClose}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

