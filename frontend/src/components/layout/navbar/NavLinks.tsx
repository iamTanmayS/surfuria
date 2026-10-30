import { NavLink } from 'react-router-dom';
import './NavLinks.css';

type ActiveMenu = 'hardware' | 'kitchens' | null;

interface NavLinksProps {
  activeMenu: ActiveMenu;
  onMouseEnter: (menu: 'hardware' | 'kitchens') => void;
  onToggle: (menu: 'hardware' | 'kitchens') => void;
  onClose: () => void;
}

export default function NavLinks({
  activeMenu,
  onMouseEnter,
  onToggle,
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

      {/* 2. Hardware Mega-Menu Trigger */}
      <li
        className="sf-nav-item"
        role="none"
        onMouseEnter={() => onMouseEnter('hardware')}
      >
        <button
          type="button"
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={activeMenu === 'hardware'}
          data-active={activeMenu === 'hardware'}
          className="sf-nav-link"
          onClick={() => onToggle('hardware')}
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
        </button>
      </li>

      {/* 3. Kitchens Mega-Menu Trigger */}
      <li
        className="sf-nav-item"
        role="none"
        onMouseEnter={() => onMouseEnter('kitchens')}
      >
        <button
          type="button"
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={activeMenu === 'kitchens'}
          data-active={activeMenu === 'kitchens'}
          className="sf-nav-link"
          onClick={() => onToggle('kitchens')}
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
        </button>
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

