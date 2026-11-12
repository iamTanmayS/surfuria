import './NavLinks.css';

import { NavLink } from 'react-router-dom';

type ActiveMenu = 'hardware' | 'kitchens' | null;

interface NavLinksProps {
  activeMenu: ActiveMenu;
  onMouseEnter: (menu: 'hardware' | 'kitchens') => void;
  onToggle?: (menu: 'hardware' | 'kitchens') => void;
  onClose: () => void;
}

export default function NavLinks({
  activeMenu,
  onMouseEnter,
  onClose,
}: NavLinksProps) {
  return (
    <ul className="sf-nav-center" role="menubar">
      {/* 1. Home */}
      <li className="sf-nav-item" role="none">
        <NavLink
          to="/"
          role="menuitem"
          className={({ isActive }) => `sf-nav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          Home
        </NavLink>
      </li>

      {/* 2. Hardware Mega-Menu Trigger & Direct Link */}
      <li
        className="sf-nav-item"
        role="none"
        onMouseEnter={() => onMouseEnter('hardware')}
      >
        <NavLink
          to="/hardware"
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={activeMenu === 'hardware'}
          data-active={activeMenu === 'hardware'}
          className={({ isActive }) => `sf-nav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <span>Hardware</span>
          <svg
            className="sf-nav-chevron"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </NavLink>
      </li>

      {/* 3. Kitchens Mega-Menu Trigger & Direct Link */}
      <li
        className="sf-nav-item"
        role="none"
        onMouseEnter={() => onMouseEnter('kitchens')}
      >
        <NavLink
          to="/kitchens"
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={activeMenu === 'kitchens'}
          data-active={activeMenu === 'kitchens'}
          className={({ isActive }) => `sf-nav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <span>Kitchens</span>
          <svg
            className="sf-nav-chevron"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </NavLink>
      </li>

      {/* 4. About Us */}
      <li className="sf-nav-item" role="none">
        <NavLink
          to="/about"
          role="menuitem"
          className={({ isActive }) => `sf-nav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          About Us
        </NavLink>
      </li>
    </ul>
  );
}

