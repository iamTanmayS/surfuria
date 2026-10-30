import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ABOUT_HERO_DATA } from '../../../data/about/aboutPageData';
import './AboutHero.css';

export default function AboutHero() {
  const shouldReduceMotion = useReducedMotion();
  const isReduced = !!shouldReduceMotion;
  const { headlineLines, supportingCopy } = ABOUT_HERO_DATA;

  // Track typed characters for each of the 3 headline lines
  const [displayedText, setDisplayedText] = useState<string[]>(() =>
    isReduced ? headlineLines : ['', '', '']
  );
  const [activeLine, setActiveLine] = useState<number>(isReduced ? 3 : 0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(isReduced);
  const [showCaret, setShowCaret] = useState<boolean>(!isReduced);

  useEffect(() => {
    if (isReduced) return;

    let isCancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    const currentLines = ['', '', ''];

    // Initial pause before typing starts
    const startTimeout = setTimeout(() => {
      function typeNextChar() {
        if (isCancelled) return;

        if (lineIdx >= headlineLines.length) {
          // Finished typing all 3 lines
          setIsTypingComplete(true);
          // Let magical caret and sparkle shimmer briefly, then fade out smoothly
          setTimeout(() => {
            if (!isCancelled) setShowCaret(false);
          }, 500);
          return;
        }

        const targetLine = headlineLines[lineIdx];

        if (charIdx < targetLine.length) {
          const char = targetLine[charIdx];
          currentLines[lineIdx] += char;
          charIdx++;
          setDisplayedText([...currentLines]);
          setActiveLine(lineIdx);

          // Rhythmic, energetic typographic cadence with natural punctuation pauses
          const delay =
            char === '.'
              ? 240
              : char === ','
              ? 180
              : char === ' '
              ? 95
              : 42 + Math.random() * 16;
          setTimeout(typeNextChar, delay);
        } else {
          // Finished current line -> brief pause before advancing to next line
          lineIdx++;
          charIdx = 0;
          setActiveLine(lineIdx);
          setTimeout(typeNextChar, 320);
        }
      }

      typeNextChar();
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(startTimeout);
    };
  }, [isReduced, headlineLines]);

  return (
    <section className="about-hero" aria-label="About Surfuria">
      <div className="container--wide about-hero__inner">
        <div className="about-hero__content">
          {/* Centered 3-Line Headline with Magical Cinematic Typing & Text Gradient */}
          <h1
            className="about-hero__headline"
            aria-label={headlineLines.join(' ')}
          >
            {headlineLines.map((_, idx) => {
              const currentLineText = displayedText[idx] || '';
              const isCurrentTypingLine = activeLine === idx && !isTypingComplete;

              return (
                <span key={idx} className="about-hero__line-mask">
                  <span className="about-hero__line-inner">
                    <span className="about-hero__gradient-text">
                      {currentLineText}
                    </span>

                    {/* Magical Luminous Caret & Star Sparkle on the active typing line */}
                    {showCaret && isCurrentTypingLine && (
                      <span className="about-hero__magic-caret-wrap" aria-hidden="true">
                        <span className="about-hero__magic-caret" />
                        <span className="about-hero__magic-sparkle">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                          </svg>
                        </span>
                      </span>
                    )}
                  </span>
                </span>
              );
            })}
          </h1>

          {/* Supporting Copy (Fades in gently once magical typing completes) */}
          <motion.p
            className="about-hero__supporting"
            initial={{ opacity: 0, y: isReduced ? 0 : 16 }}
            animate={
              isTypingComplete
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: isReduced ? 0 : 16 }
            }
            transition={{ duration: isReduced ? 0.01 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {supportingCopy}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
