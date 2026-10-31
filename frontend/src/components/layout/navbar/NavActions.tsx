import Button from '../../ui/Button';
import './NavActions.css';

export interface NavActionsProps {
  mobileOpen: boolean;
  isScrolled: boolean;
  onToggleMobile: () => void;
  onClose?: () => void;
  contactLabel?: string;
  contactUrl?: string;
}

export default function NavActions({
  mobileOpen,
  isScrolled,
  onToggleMobile,
  onClose,
  contactLabel = 'Contact Us',
  contactUrl = '/contact',
}: NavActionsProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  const effectiveContactUrl =
    contactUrl === '/contact' && isMobile ? '/contact#enquiry-form' : contactUrl;

  const handleContactClick = (e: React.MouseEvent) => {
    onClose?.();
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      if (window.location.pathname === '/contact') {
        const formEl =
          document.getElementById('enquiry-form') ||
          document.getElementById('contact-form');
        if (formEl) {
          e.preventDefault();
          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <div className="sf-nav-right">
      <Button
        to={effectiveContactUrl}
        variant={isScrolled ? 'bronze' : 'ghost'}
        onClick={handleContactClick}
        icon={
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
        }
      >
        {contactLabel}
      </Button>

      {/* Mobile Hamburger / Close toggle */}
      <button
        type="button"
        className="sf-mobile-toggle"
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        onClick={onToggleMobile}
      >
        {mobileOpen ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>
    </div>
  );
}
