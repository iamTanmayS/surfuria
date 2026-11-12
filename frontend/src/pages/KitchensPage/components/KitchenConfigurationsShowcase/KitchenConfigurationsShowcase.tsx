import { useState, useMemo } from 'react';
import { KITCHEN_CONFIGURATIONS, SHARED_KITCHEN_INCLUDED_HARDWARE } from '../../../../data/products';
import { CategoryPillNavigation, type CategoryPillItem } from '../../../../components/catalog';
import ProductCard from '../../../../components/catalog/ProductCard';
import './KitchenConfigurationsShowcase.css';

export default function KitchenConfigurationsShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>('all');

  const configCategories: CategoryPillItem[] = useMemo(
    () => [
      { id: 'all', slug: 'all', label: `All Layouts (${KITCHEN_CONFIGURATIONS.length})` },
      ...KITCHEN_CONFIGURATIONS.map((cfg) => ({
        id: cfg.slug,
        slug: cfg.slug,
        label: cfg.name,
      })),
    ],
    []
  );

  const filteredConfigs =
    activeSlug === 'all'
      ? KITCHEN_CONFIGURATIONS
      : KITCHEN_CONFIGURATIONS.filter((cfg) => cfg.slug === activeSlug);

  return (
    <section
      id="configurations"
      className="kitchen-configs-section"
      aria-labelledby="kitchen-configs-heading"
    >
      <div className="container--wide">
        {/* Section Header */}
        <div className="kitchen-configs-header">
          <div className="kitchen-configs-header__main">
            <span className="kitchen-configs-eyebrow">FACTORY-ENGINEERED PACKAGES</span>
            <h2 id="kitchen-configs-heading" className="kitchen-configs-title">
              Modular Kitchen Configurations
            </h2>
            <p className="kitchen-configs-desc">
              Four standardized architectural kitchen layouts engineered for modern residential floor plans. Complete packages including door panels, prelam board box panels, premium hardware, transportation, and professional installation.
            </p>
          </div>

          {/* Layout Filter Pills */}
          <div className="kitchen-configs-pills-row">
            <CategoryPillNavigation
              categories={configCategories}
              activeId={activeSlug}
              onSelectCategory={setActiveSlug}
              sticky={false}
              autoCenter={false}
              ariaLabel="Filter kitchen layouts"
            />
          </div>
        </div>

        {/* Configurations Compact Grid */}
        <div
          className={`kitchen-configs-grid ${
            filteredConfigs.length === 1 ? 'kitchen-configs-grid--single' : ''
          }`}
          role="region"
          aria-label="Kitchen configuration packages"
        >
          {filteredConfigs.map((config) => (
            <ProductCard
              key={config.id}
              title={config.id === 'island' ? 'Sample Island Modular Layout' : `${config.name} Layout`}
              subtitle="Factory-Engineered Modular Package"
              image={config.image}
              imageAlt={config.imageAlt}
              destination={`/kitchens/configurations/${config.slug}`}
              actionText="Explore Layout"
              className="kitchen-configs-card"
            />
          ))}
        </div>

        {/* Global Hardware Inclusion Assurance Callout */}
        <div className="kitchen-hardware-assurance">
          <div className="kitchen-hw-assurance__content">
            <span className="kitchen-hw-assurance__eyebrow">STANDARDIZED KINEMATIC INTEGRITY</span>
            <h4 className="kitchen-hw-assurance__title">
              Every Configuration Ships with 8 Architectural Hardware Essentials
            </h4>
            <p className="kitchen-hw-assurance__desc">
              All four modular kitchen packages include factory-fitted kinematic drawer runners, soft-close hinges, stainless steel organizing baskets, plate stackers, PVC cutlery organizers, and precision structural Minifix fasteners.
            </p>
          </div>
          <div className="kitchen-hw-assurance__tags">
            {SHARED_KITCHEN_INCLUDED_HARDWARE.map((hw) => (
              <span key={hw} className="kitchen-hw-assurance__tag">
                {hw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

