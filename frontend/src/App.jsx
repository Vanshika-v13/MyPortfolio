import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import WelcomeScreen from './components/features/WelcomeScreen';
import ScrollControls from './components/common/ScrollControls';

// Create a client
const queryClient = new QueryClient();

import Hero from './components/features/Hero';
import About from './components/features/About';
import PortfolioShowcase from './components/features/PortfolioShowcase';
import Expertise from './components/features/Expertise';
import Journey from './components/features/Journey';
import Contact from './components/features/Contact';
import Footer from './components/layout/Footer';
import SEO from './components/common/SEO';

// Lazy load non-critical routes
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ProjectDetails = React.lazy(() => import('./pages/ProjectDetails'));

const SectionFallback = () => (
  <div className="w-full min-h-[300px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-[var(--color-surface-elevated)] border-t-[var(--color-accent)] rounded-full animate-spin"></div>
  </div>
);

function MainLayout() {
  const [hasEntered, setHasEntered] = useState(
    () => sessionStorage.getItem('hasSeenWelcome') === 'true'
  );

  React.useLayoutEffect(() => {
    if (hasEntered && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, [hasEntered]);

  return (
    <div className="min-h-screen w-full relative">
      <SEO />
      <WelcomeScreen onEnter={() => setHasEntered(true)} />
      <Navbar key={`navbar-${hasEntered}`} />
      <main className="w-full">
        <Hero key={`hero-${hasEntered}`} />
        <About />
        <PortfolioShowcase />
        <Expertise />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <ScrollControls />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router>
            <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[var(--color-surface-elevated)] border-t-[var(--color-accent)] rounded-full animate-spin"></div></div>}>
              <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/project/:slug" element={<ProjectDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
