interface HeroScrollCueProps {
  targetId: string;
}

export default function HeroScrollCue({ targetId }: HeroScrollCueProps) {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className="hero__scroll-cue"
      aria-label="Scroll down to explore collections"
    >
      <span className="hero__scroll-cue-text">Scroll to explore</span>
      <div className="hero__scroll-cue-indicator" aria-hidden="true">
        <span className="hero__scroll-cue-pip" />
      </div>
    </button>
  );
}

