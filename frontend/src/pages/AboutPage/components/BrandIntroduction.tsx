import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { WHO_WE_ARE_DATA } from '../../../data/about/aboutPageData';
import './BrandIntroduction.css';

export default function BrandIntroduction() {
  const shouldReduceMotion = useReducedMotion();
  const { eyebrow, headline, bodyParagraph, callouts, videoUrl, posterImage, posterAlt } =
    WHO_WE_ARE_DATA;

  const [isPlaying, setIsPlaying] = useState(false);
  const [modalNotice, setModalNotice] = useState<string | null>(null);

  // Parse YouTube video ID safely if a valid URL is provided
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      let id: string | null = null;
      if (parsed.hostname.includes('youtube.com')) {
        id = parsed.searchParams.get('v');
      } else if (parsed.hostname.includes('youtu.be')) {
        id = parsed.pathname.slice(1);
      }
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
    } catch {
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  const handlePlayClick = () => {
    if (embedUrl) {
      setIsPlaying(true);
    } else {
      setModalNotice(
        'The official brand showcase film is currently being finalized. Please explore our capabilities and modular solutions below.'
      );
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="about-intro" aria-label="Who We Are">
      <div className="container--wide about-intro__grid">
        {/* Left Column: Editorial Story & Typographic Callouts */}
        <motion.div
          className="about-intro__text-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
          }}
        >
          <motion.div variants={fadeUp} className="about-intro__eyebrow-wrap">
            <span className="about-intro__eyebrow-line" aria-hidden="true" />
            <span className="about-intro__eyebrow">{eyebrow}</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="about-intro__headline">
            {headline}
          </motion.h2>

          <motion.p variants={fadeUp} className="about-intro__paragraph">
            {bodyParagraph}
          </motion.p>

          {/* 3 Compact Typographic Capability Markers */}
          <motion.div variants={fadeUp} className="about-intro__callouts">
            {callouts.map((item) => (
              <div key={item.id} className="about-intro__callout-item">
                <span className="about-intro__callout-num" aria-hidden="true">
                  {item.number}
                </span>
                <div className="about-intro__callout-content">
                  <h3 className="about-intro__callout-title">{item.title}</h3>
                  <p className="about-intro__callout-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: 16:9 YouTube Video Frame / Architectural Poster */}
        <motion.div
          className="about-intro__media-col"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="about-intro__video-frame">
            {isPlaying && embedUrl ? (
              <iframe
                src={embedUrl}
                title="Surfuria Architectural Craftsmanship and Manufacturing"
                className="about-intro__iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="about-intro__poster-wrap">
                <img
                  src={posterImage}
                  alt={posterAlt}
                  className="about-intro__poster-img"
                  loading="eager"
                  decoding="async"
                />
                <div className="about-intro__poster-scrim" aria-hidden="true" />

                {/* Floating Play Control */}
                <button
                  type="button"
                  className="about-intro__play-btn"
                  onClick={handlePlayClick}
                  aria-label="Play brand overview video"
                >
                  <span className="about-intro__play-circle" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="about-intro__play-label">Brand Film</span>
                </button>

                {/* Specification Tag */}
                <div className="about-intro__badge" aria-hidden="true">
                  <span className="about-intro__badge-dot" />
                  <span>Modular Joinery & Manufacturing</span>
                </div>
              </div>
            )}
          </div>

          {/* Modal / Inline Notice if video is pending */}
          {modalNotice && (
            <div className="about-intro__notice" role="status">
              <p className="about-intro__notice-text">{modalNotice}</p>
              <button
                type="button"
                className="about-intro__notice-close"
                onClick={() => setModalNotice(null)}
                aria-label="Dismiss notice"
              >
                ✕
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
