import React from 'react';
import { motion, type Variants } from 'motion/react';
import Button from '../Button';
import './HeroContent.css';

export interface HeroCtaItem {
  label: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: 'bronze' | 'outline' | 'dark' | 'ghost';
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface HeroContentProps {
  /** Main title/headline. Can be a string, ReactNode, or split lines */
  title: string | React.ReactNode;
  /** Optional secondary accent line for the headline */
  titleAccent?: string;

  /** Supporting subtitle / description text */
  subtitle?: string | React.ReactNode;

  /** Optional eyebrow text or badge */
  eyebrow?: string | React.ReactNode;

  /** Primary CTA button label */
  buttonLabel?: string;
  /** Primary CTA button action (URL string for Link navigation or function for onClick) */
  buttonAction?: string | ((e: React.MouseEvent<HTMLElement>) => void);
  /** Optional custom icon for primary button (defaults to signature arrow icon on bronze button) */
  buttonIcon?: React.ReactNode;
  /** Full primary CTA configuration (takes precedence over buttonLabel/buttonAction if provided) */
  primaryCta?: HeroCtaItem;

  /** Secondary CTA button label */
  secondaryButtonLabel?: string;
  /** Secondary CTA button action (URL string for Link navigation or function for onClick) */
  secondaryButtonAction?: string | ((e: React.MouseEvent<HTMLElement>) => void);
  /** Full secondary CTA configuration */
  secondaryCta?: HeroCtaItem;

  /** Optional custom title gradient (defaults to white-to-Surfuria-brown brand gradient) */
  titleGradient?: string;
  /** Optional solid title color (takes precedence over gradient if explicitly provided) */
  titleColor?: string;
  /** Optional subtitle text color */
  subtitleColor?: string;
  /** Optional primary CTA button text color */
  buttonTextColor?: string;
  /** Optional primary CTA button background color */
  buttonBackgroundColor?: string;
  /** Optional primary CTA button border color */
  buttonBorderColor?: string;
  /** Optional text shadow / drop shadow filter override */
  textShadow?: string;

  /** Optional children (e.g. process lines or custom badges) */
  children?: React.ReactNode;

  /** Optional container class name */
  className?: string;

  /** Optional motion item variants for coordinated stagger animations */
  itemVariants?: Variants;
}

const DEFAULT_ARROW_ICON = (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const DEFAULT_TITLE_GRADIENT =
  'linear-gradient(135deg, #ffffff 0%, #f6eee3 22%, #dfc3a2 60%, #c49658 100%)';

export default function HeroContent({
  title,
  titleAccent,
  subtitle,
  eyebrow,
  buttonLabel,
  buttonAction,
  buttonIcon,
  primaryCta,
  secondaryButtonLabel,
  secondaryButtonAction,
  secondaryCta,
  titleGradient,
  titleColor,
  subtitleColor,
  buttonTextColor,
  buttonBackgroundColor,
  buttonBorderColor,
  textShadow,
  children,
  className = '',
  itemVariants,
}: HeroContentProps) {
  // Resolve primary CTA
  const resolvedPrimary: HeroCtaItem | null = primaryCta
    ? {
        ...primaryCta,
        variant: primaryCta.variant || 'bronze',
        icon:
          primaryCta.icon !== undefined
            ? primaryCta.icon
            : primaryCta.variant === 'outline'
            ? undefined
            : DEFAULT_ARROW_ICON,
      }
    : buttonLabel
    ? {
        label: buttonLabel,
        to: typeof buttonAction === 'string' ? buttonAction : undefined,
        onClick: typeof buttonAction === 'function' ? buttonAction : undefined,
        variant: 'bronze',
        icon: buttonIcon !== undefined ? buttonIcon : DEFAULT_ARROW_ICON,
      }
    : null;

  // Resolve secondary CTA
  const resolvedSecondary: HeroCtaItem | null = secondaryCta
    ? {
        ...secondaryCta,
        variant: secondaryCta.variant || 'outline',
      }
    : secondaryButtonLabel
    ? {
        label: secondaryButtonLabel,
        to: typeof secondaryButtonAction === 'string' ? secondaryButtonAction : undefined,
        onClick: typeof secondaryButtonAction === 'function' ? secondaryButtonAction : undefined,
        variant: 'outline',
      }
    : null;

  // Render title content
  const renderTitleContent = () => {
    if (React.isValidElement(title)) {
      return title;
    }

    if (titleAccent) {
      return (
        <>
          <span className="hero-content__headline-line hero__headline-line">{title}</span>
          <span className="hero-content__headline-line hero__headline-line">
            {titleAccent}
          </span>
        </>
      );
    }

    return title;
  };

  // Styling precedence:
  // 1. Explicit titleColor => Solid text color (gradient disabled)
  // 2. Explicit titleGradient => Custom gradient
  // 3. Default => White-to-Surfuria-brown metallic gradient
  const isSolidTitleColor = Boolean(titleColor);
  const activeTitleGradient = titleGradient || DEFAULT_TITLE_GRADIENT;

  const headlineStyle: React.CSSProperties = isSolidTitleColor
    ? {
        backgroundImage: 'none',
        WebkitBackgroundClip: 'initial',
        backgroundClip: 'initial',
        WebkitTextFillColor: titleColor,
        color: titleColor,
        ...(textShadow ? { textShadow } : {}),
      }
    : {
        backgroundImage: activeTitleGradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        ...(textShadow
          ? {
              filter: textShadow.includes('drop-shadow')
                ? textShadow
                : `drop-shadow(${textShadow})`,
            }
          : {}),
      };

  const subtitleStyle: React.CSSProperties = {
    ...(subtitleColor ? { color: subtitleColor } : {}),
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...(buttonTextColor ? { color: buttonTextColor } : {}),
    ...(buttonBackgroundColor ? { backgroundColor: buttonBackgroundColor } : {}),
    ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
    ...(resolvedPrimary?.style || {}),
  };

  return (
    <div className={`hero-content hero__content ${className}`.trim()}>
      {/* Optional Eyebrow Label */}
      {eyebrow && (
        <motion.div variants={itemVariants} className="hero-content__eyebrow-container hero__eyebrow-container">
          {typeof eyebrow === 'string' ? (
            <span className="hero-content__eyebrow-badge hero__eyebrow-badge">{eyebrow}</span>
          ) : (
            eyebrow
          )}
        </motion.div>
      )}

      {/* Editorial Display Headline (Smooth White-to-Surfuria-Brown Gradient) */}
      <motion.h1
        variants={itemVariants}
        className="hero-content__headline hero__headline"
        style={headlineStyle}
      >
        {renderTitleContent()}
      </motion.h1>

      {/* Supporting Architectural Narrative */}
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="hero-content__description hero__description"
          style={subtitleStyle}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Optional Custom Slot (e.g. Badges or Process Line) */}
      {children && (
        <motion.div variants={itemVariants} className="hero-content__custom-slot">
          {children}
        </motion.div>
      )}

      {/* Calls to Action Group */}
      {(resolvedPrimary || resolvedSecondary) && (
        <motion.div variants={itemVariants} className="hero-content__cta-group hero__cta-group">
          {resolvedPrimary && (
            <Button
              to={resolvedPrimary.to}
              onClick={resolvedPrimary.onClick}
              variant={resolvedPrimary.variant || 'bronze'}
              icon={resolvedPrimary.icon}
              className={`hero-content__cta-primary hero__cta-primary ${resolvedPrimary.className || ''}`.trim()}
              style={primaryButtonStyle}
            >
              {resolvedPrimary.label}
            </Button>
          )}

          {resolvedSecondary && (
            <Button
              to={resolvedSecondary.to}
              onClick={resolvedSecondary.onClick}
              variant={resolvedSecondary.variant || 'outline'}
              icon={resolvedSecondary.icon}
              className={`hero-content__cta-secondary hero__cta-secondary ${resolvedSecondary.className || ''}`.trim()}
              style={resolvedSecondary.style}
            >
              {resolvedSecondary.label}
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
