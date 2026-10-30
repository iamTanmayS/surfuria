import './KitchensHero.css';

interface KitchensHeroProps {
  category: string | null;
}

export default function KitchensHero({ category }: KitchensHeroProps) {
  return (
    <div className="section-heading kitchens-hero kitchens-page__heading">
      <span className="eyebrow">Kitchen Architecture</span>
      <h2>{category ? `Kitchens: ${category.replace(/-/g, ' ').toUpperCase()}` : 'Modular Kitchen Collections'}</h2>
      <p>
        Ergonomic culinary environments engineered with millimeter tolerance and refined material palettes.
      </p>
    </div>
  );
}

