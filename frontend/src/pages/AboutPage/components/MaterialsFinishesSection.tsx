import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  SUBSTRATES_DATA,
  FINISHES_DATA,
  type MaterialOrFinishItem,
} from '../../../data/about/aboutPageData';
import './MaterialsFinishesSection.css';

type CategoryType = 'substrates' | 'finishes';

export interface MaterialsFinishesSectionProps {
  substrates?: MaterialOrFinishItem[];
  finishes?: MaterialOrFinishItem[];
  eyebrow?: string;
  headline?: string;
  supportingCopy?: string;
  className?: string;
  id?: string;
}

export default function MaterialsFinishesSection({
  substrates = SUBSTRATES_DATA,
  finishes = FINISHES_DATA,
  eyebrow = 'MATERIALS & FINISHES',
  headline = 'Considered materials. Distinctive finishes.',
  supportingCopy = 'Our manufacturing capabilities span engineered board substrates and surface finishes, supporting different furniture applications and design preferences.',
  className = '',
  id,
}: MaterialsFinishesSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('substrates');
  const [selectedId, setSelectedId] = useState<string>(substrates[0]?.id || 'mdf');

  const currentList = activeCategory === 'substrates' ? substrates : finishes;
  const activeItem = currentList.find((item) => item.id === selectedId) || currentList[0];

  const handleCategorySwitch = (cat: CategoryType) => {
    setActiveCategory(cat);
    const newList = cat === 'substrates' ? substrates : finishes;
    if (newList && newList.length > 0) {
      setSelectedId(newList[0].id);
    }
  };

  return (
    <section
      id={id}
      className={`about-materials ${className}`.trim()}
      aria-label="Materials and Finishes Selection Experience"
    >
      <div className="container--wide">
        {/* Section Header */}
        <div className="about-materials__header">
          <div className="about-materials__header-left">
            <span className="about-materials__eyebrow">{eyebrow}</span>
            <h2 className="about-materials__headline">{headline}</h2>
            <p className="about-materials__supporting">{supportingCopy}</p>
          </div>

          {/* Category Tabs */}
          <div
            className="about-materials__category-nav"
            role="tablist"
            aria-label="Material and Finish Category Switcher"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'substrates'}
              className={`about-materials__cat-btn ${
                activeCategory === 'substrates' ? 'active' : ''
              }`}
              onClick={() => handleCategorySwitch('substrates')}
            >
              <span className="about-materials__cat-text">Core Substrates ({substrates.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'finishes'}
              className={`about-materials__cat-btn ${
                activeCategory === 'finishes' ? 'active' : ''
              }`}
              onClick={() => handleCategorySwitch('finishes')}
            >
              <span className="about-materials__cat-text">Surface Finishes ({finishes.length})</span>
            </button>
          </div>
        </div>

        {/* Master Material Selection Studio (Editorial Split) */}
        <div className="about-materials__studio">
          {/* Left: Large Featured Tactile Visual Display */}
          <div className="about-materials__showcase" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                className="about-materials__stage"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Surface Texture Visual */}
                <div className="about-materials__stage-media">
                  <img
                    src={activeItem.image}
                    alt={activeItem.imageAlt}
                    className="about-materials__stage-image"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="about-materials__stage-scrim" aria-hidden="true" />
                </div>

                {/* Classification Badge */}
                <div className="about-materials__stage-badge" aria-hidden="true">
                  <span className="about-materials__badge-indicator" />
                  <span>
                    {activeItem.category === 'substrate'
                      ? 'Engineered Substrate'
                      : 'Architectural Finish'}
                  </span>
                </div>

                {/* Information Overlay */}
                <div className="about-materials__stage-info">
                  <div className="about-materials__stage-title-wrap">
                    <h3 className="about-materials__stage-name">{activeItem.name}</h3>
                    <span className="about-materials__stage-full">{activeItem.fullName}</span>
                  </div>

                  <p className="about-materials__stage-desc">{activeItem.description}</p>

                  <div className="about-materials__stage-details">
                    <div className="about-materials__detail-block">
                      <span className="about-materials__detail-label">Application</span>
                      <p className="about-materials__detail-text">{activeItem.application}</p>
                    </div>

                    <div className="about-materials__detail-block">
                      <span className="about-materials__detail-label">Specifications</span>
                      <p className="about-materials__detail-text">{activeItem.spec}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Architectural Material Selectors */}
          <div
            className="about-materials__selector-list"
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
                  className={`about-materials__option ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  {/* Active Indicator Bar */}
                  <span className="about-materials__option-bar" aria-hidden="true" />

                  {/* Micro Swatch Preview */}
                  <div className="about-materials__option-swatch" aria-hidden="true">
                    <img
                      src={item.image}
                      alt=""
                      className="about-materials__option-thumb"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  {/* Content */}
                  <div className="about-materials__option-content">
                    <div className="about-materials__option-header">
                      <span className="about-materials__option-name">{item.name}</span>
                      <div className="about-materials__option-meta">
                        {isSelected && (
                          <span className="about-materials__option-status" aria-hidden="true">
                            Active Spec
                          </span>
                        )}
                        <span className="about-materials__option-arrow" aria-hidden="true">
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
                    </div>
                    <span className="about-materials__option-sub">{item.fullName}</span>
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
