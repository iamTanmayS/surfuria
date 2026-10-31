import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { MaterialOrFinishItem, MaterialsFinishesProps } from './types';
import './MaterialsFinishes.css';

type CategoryType = 'substrates' | 'finishes';

export default function MaterialsFinishes({
  title = 'MATERIALS & FINISHES',
  eyebrow,
  substrates,
  finishes,
  items,
  className = '',
  id,
}: MaterialsFinishesProps) {
  const shouldReduceMotion = useReducedMotion();

  // Partition items into substrates and finishes if passed via unified `items` prop
  const resolvedSubstrates = useMemo<MaterialOrFinishItem[]>(() => {
    if (substrates && substrates.length > 0) return substrates;
    if (items && items.length > 0) {
      return items.filter((item) => item.category !== 'finish');
    }
    return [];
  }, [substrates, items]);

  const resolvedFinishes = useMemo<MaterialOrFinishItem[]>(() => {
    if (finishes && finishes.length > 0) return finishes;
    if (items && items.length > 0) {
      return items.filter((item) => item.category === 'finish');
    }
    return [];
  }, [finishes, items]);

  const hasSubstrates = resolvedSubstrates.length > 0;
  const hasFinishes = resolvedFinishes.length > 0;
  const hasBothCategories = hasSubstrates && hasFinishes;

  // Active Category tab state
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    hasSubstrates ? 'substrates' : 'finishes'
  );

  const currentList = activeCategory === 'substrates' ? resolvedSubstrates : resolvedFinishes;

  // Selected item ID state
  const [selectedId, setSelectedId] = useState<string>(
    currentList[0]?.id || ''
  );

  // Sync selectedId when category switches or data changes
  const handleCategorySwitch = (cat: CategoryType) => {
    setActiveCategory(cat);
    const newList = cat === 'substrates' ? resolvedSubstrates : resolvedFinishes;
    if (newList && newList.length > 0) {
      setSelectedId(newList[0].id);
    }
  };

  // Ensure selectedId is valid for the currently active list
  if (currentList.length > 0 && !currentList.some((item) => item.id === selectedId)) {
    setSelectedId(currentList[0].id);
  }

  const activeItem = currentList.find((item) => item.id === selectedId) || currentList[0];

  if (!activeItem) {
    return null;
  }

  return (
    <section
      id={id}
      className={`materials-finishes ${className}`.trim()}
      aria-label={title}
    >
      <div className="container--wide">
        {/* Section Header: Section Title & Category Nav Switcher */}
        <div className="materials-finishes__header">
          <div className="materials-finishes__header-left">
            {eyebrow && <span className="materials-finishes__eyebrow">{eyebrow}</span>}
            <h2 className="materials-finishes__title">{title}</h2>
          </div>

          {/* Category Tabs */}
          {hasBothCategories && (
            <div
              className="materials-finishes__category-nav"
              role="tablist"
              aria-label="Material and Finish Category Switcher"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'substrates'}
                className={`materials-finishes__cat-btn ${
                  activeCategory === 'substrates' ? 'active' : ''
                }`}
                onClick={() => handleCategorySwitch('substrates')}
              >
                <span className="materials-finishes__cat-text">
                  Core Substrates ({resolvedSubstrates.length})
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'finishes'}
                className={`materials-finishes__cat-btn ${
                  activeCategory === 'finishes' ? 'active' : ''
                }`}
                onClick={() => handleCategorySwitch('finishes')}
              >
                <span className="materials-finishes__cat-text">
                  Surface Finishes ({resolvedFinishes.length})
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Master Material Selection Studio (Editorial Split) */}
        <div className="materials-finishes__studio">
          {/* Left: Large Featured Visual Showcase */}
          <div className="materials-finishes__showcase" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                className="materials-finishes__stage"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Surface Texture Visual */}
                <div className="materials-finishes__stage-media">
                  <img
                    src={activeItem.image}
                    alt={activeItem.imageAlt || `${activeItem.name} material texture`}
                    className="materials-finishes__stage-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="materials-finishes__stage-scrim" aria-hidden="true" />
                </div>

                {/* Clean Information Overlay (No Pill Badges, Focused Typography) */}
                <div className="materials-finishes__stage-info">
                  <div className="materials-finishes__stage-title-wrap">
                    <h3 className="materials-finishes__stage-name">{activeItem.name}</h3>
                    {activeItem.fullName && (
                      <span className="materials-finishes__stage-full">{activeItem.fullName}</span>
                    )}
                  </div>

                  {/* Important Practical Details: Application & Specifications */}
                  {(activeItem.application || activeItem.spec) && (
                    <div className="materials-finishes__stage-details">
                      {activeItem.application && (
                        <div className="materials-finishes__detail-block">
                          <span className="materials-finishes__detail-label">Application</span>
                          <p className="materials-finishes__detail-text">{activeItem.application}</p>
                        </div>
                      )}

                      {activeItem.spec && (
                        <div className="materials-finishes__detail-block">
                          <span className="materials-finishes__detail-label">Specifications</span>
                          <p className="materials-finishes__detail-text">{activeItem.spec}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Architectural Material Selectors */}
          <div
            className="materials-finishes__selector-list"
            role="radiogroup"
            aria-label={`Select from ${activeCategory}`}
          >
            {currentList.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`materials-finishes__option ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  {/* Active Indicator Accent Bar */}
                  <span className="materials-finishes__option-bar" aria-hidden="true" />

                  {/* Micro Swatch Preview */}
                  <div className="materials-finishes__option-swatch" aria-hidden="true">
                    <img
                      src={item.image}
                      alt=""
                      className="materials-finishes__option-thumb"
                      loading="lazy"
                      decoding="async"
                      width={52}
                      height={52}
                    />
                  </div>

                  {/* Content: Name and Full Architectural Name */}
                  <div className="materials-finishes__option-content">
                    <div className="materials-finishes__option-header">
                      <span className="materials-finishes__option-name">{item.name}</span>
                      <span className="materials-finishes__option-arrow" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    {item.fullName && (
                      <span className="materials-finishes__option-sub">{item.fullName}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

