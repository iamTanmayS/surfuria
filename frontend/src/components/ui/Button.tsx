import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export interface ButtonProps {
  to?: string;
  variant?: 'bronze' | 'dark' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function Button({
  to,
  variant = 'bronze',
  children,
  className = '',
  icon,
  type = 'button',
  onClick,
  disabled = false,
  style,
}: ButtonProps) {
  const content = (
    <>
      <span className="sf-button-text">{children}</span>
      {icon && <span className="sf-button-icon">{icon}</span>}
    </>
  );

  const combinedClass = `sf-button sf-button--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link
        to={to}
        className={combinedClass}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        style={style}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      style={style}
    >
      {content}
    </button>
  );
}

