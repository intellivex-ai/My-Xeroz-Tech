import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ThreeBackground from "./components/ThreeBackground";
import BrutalistCursor from "./components/BrutalistCursor";
import BrutalistHeader from "./components/BrutalistHeader";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

// Page imports
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

// Scroll Restoration helper component to force page transitions to start from coordinate (0, 0)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Global page loader transitions coordinator that resides inside the <Router> context
function PageLoaderWrapper({ children }) {
  const location = useLocation();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setIsPageChanging(true);
      setPrevPath(location.pathname);
    }
  }, [location.pathname, prevPath]);

  return (
    <>
      {/* 1. Initial Boot Majestic Loading overlay */}
      {isInitialLoading && (
        <div className="fixed inset-0 z-[99999]">
          <LoadingScreen
            speedMultiplier={1.0} // normal speed for initial branding impact
            onComplete={() => {
              // Smoothly fade out loader overlay
              setTimeout(() => setIsInitialLoading(false), 300);
            }}
          />
        </div>
      )}

      {/* 2. Page Router Transition Loading overlay */}
      {!isInitialLoading && isPageChanging && (
        <div className="fixed inset-0 z-[99999]">
          <LoadingScreen
            speedMultiplier={4.5} // fast speed (1.8 seconds) to maintain ideal UX
            onComplete={() => {
              // Remove overlay on completion
              setTimeout(() => setIsPageChanging(false), 200);
            }}
          />
        </div>
      )}

      {children}
    </>
  );
}

// Router switcher wrapper to isolate location hooks and AnimatePresence context
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Custom wrapper managing initial and routing loaders */}
      <PageLoaderWrapper>
        {/* Container wraps dynamic 3D canvas backdrop and elements */}
        <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
          {/* Three.js Wallpaper Backdrop */}
          <ThreeBackground />
          
          {/* Custom Blend Cursor */}
          <BrutalistCursor />
          
          {/* Core Header Navigation */}
          <BrutalistHeader />

          {/* Content Viewport */}
          <main className="flex-grow pt-20 w-full z-10">
            <AnimatedRoutes />
          </main>

          {/* Core Footer */}
          <Footer />
        </div>
      </PageLoaderWrapper>
    </Router>
  );
}
