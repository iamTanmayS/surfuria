import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const HardwarePage = lazy(() => import('../pages/HardwarePage'));
const KitchensPage = lazy(() => import('../pages/KitchensPage'));
const KitchenConfigurationDetailPage = lazy(
  () => import('../pages/KitchenConfigurationDetailPage')
);
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div
          className="sf-route-suspense-fallback"
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-primary, #0a0a0a)',
          }}
          aria-busy="true"
        />
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route
          path="/hardware/:categorySlug/:productSlug"
          element={<ProductDetailPage catalogue="hardware" />}
        />
        <Route path="/kitchens" element={<KitchensPage />} />
        <Route
          path="/kitchens/configurations/:configSlug"
          element={<KitchenConfigurationDetailPage />}
        />
        <Route
          path="/kitchens/:categorySlug/:productSlug"
          element={<ProductDetailPage catalogue="kitchens" />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Legal & Compliance Routes */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/terms-of-use" element={<TermsPage />} />

        {/* 404 Not Found Catch-All Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
