import React, { useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';
import ScrollToTopButton from './components/ScrollToTopButton.tsx';
import SocialShare from './components/SocialShare.tsx';
import ConsentModal from './components/ConsentModal.tsx';
import BookingModal from './components/BookingModal.tsx';
import LocationDetector from './components/LocationDetector.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import PreLoader from './components/PreLoader.tsx';
import SEORuntime from './components/SEORuntime.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
import { ConfigProvider, useConfig } from './context/ConfigContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

// Page imports
import CityPage from './pages/CityPage.tsx';
import AdminPage from './pages/AdminPage.tsx';

const RouterContent = () => {
  const { allCityData, isLoading } = useConfig();
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  const dynamicRoutes = useMemo(() => {
    return Object.keys(allCityData).map(cityKey => {
      const path = cityKey === 'home' ? '/' : `/${cityKey}`;
      return <Route key={cityKey} path={path} element={<CityPage data={allCityData[cityKey]} />} />;
    });
  }, [allCityData]);

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <SEORuntime />
        <ScrollToTop />
        <LocationDetector />
        {!isAdmin && <Header />}
        <main className="flex-grow">
          <Routes>
            {dynamicRoutes}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
        {!isAdmin && <ScrollToTopButton />}
        {!isAdmin && <SocialShare />}
        <ConsentModal />
        <BookingModal />
      </div>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ConfigProvider>
            <ModalProvider>
              <RouterContent />
            </ModalProvider>
          </ConfigProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;