import './HardwareHero.css';

interface HardwareHeroProps {
  category: string | null;
}

export default function HardwareHero({ category }: HardwareHeroProps) {
  return (
    <div className="section-heading hardware-hero hardware-page__heading">
      <span className="eyebrow">Hardware Catalog</span>
      <h2>{category ? `Hardware: ${category.replace(/-/g, ' ').toUpperCase()}` : 'All Architectural Hardware'}</h2>
      <p>
        Concealed hinges, synchronized soft-close drawer slides, and hand-finished bronze pulls.
      </p>
    </div>
  );
}

