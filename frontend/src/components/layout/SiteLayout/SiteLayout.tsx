import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import RouteScrollManager from './RouteScrollManager';
import Navbar from '../navbar/Navbar';
import { NavbarProvider } from '../navbar/NavbarProvider';
import { SiteFooter } from '../SiteFooter';
import WhatsAppButton from '../../ui/WhatsAppButton';
import './SiteLayout.css';

interface SiteLayoutProps {
  children?: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <NavbarProvider>
      <RouteScrollManager />
      <Navbar />
      <main id="main-content">
        <motion.div
          key={location.pathname}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
          }
          className="sf-page-transition-wrap"
        >
          {children}
        </motion.div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </NavbarProvider>
  );
}
