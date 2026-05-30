import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThreeBackground from "./components/ThreeBackground";
import BrutalistCursor from "./components/BrutalistCursor";
import BrutalistHeader from "./components/BrutalistHeader";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { Agentation } from "agentation";

// Page imports
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

// Shared page transition wrapper for smooth route changes
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

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

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("branding-loading-change", {
      detail: { isLoading: isInitialLoading || isPageChanging }
    }));
  }, [isInitialLoading, isPageChanging]);

  // Fallback: force-unstick isPageChanging after 5s if onComplete never fires
  useEffect(() => {
    if (!isPageChanging) return;
    const timer = setTimeout(() => setIsPageChanging(false), 5000);
    return () => clearTimeout(timer);
  }, [isPageChanging]);

  return (
    <>
      {/* 1. Initial Boot Majestic Loading overlay */}
      {isInitialLoading && (
        <div className="fixed inset-0 z-[99999]">
          <LoadingScreen
            speedMultiplier={2.5} // faster speed for initial branding impact
            pathname={location.pathname}
            onComplete={() => {
              // Smoothly fade out loader overlay
              setTimeout(() => setIsInitialLoading(false), 500);
            }}
          />
        </div>
      )}

      {/* 2. Page Router Transition Loading overlay */}
      {!isInitialLoading && isPageChanging && (
        <div className="fixed inset-0 z-[99999]">
          <LoadingScreen
            speedMultiplier={4.5} // fast speed (1.8 seconds) to maintain ideal UX
            pathname={location.pathname}
            onComplete={() => {
              // Remove overlay on completion
              setTimeout(() => setIsPageChanging(false), 500);
            }}
          />
        </div>
      )}

      {children}
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  const wrap = (Component) => (
    <motion.div key={location.pathname} variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <Component />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={wrap(Home)} />
        <Route path="/services" element={wrap(Services)} />
        <Route path="/projects" element={wrap(Projects)} />
        <Route path="/about" element={wrap(About)} />
        <Route path="/team" element={wrap(Team)} />
        <Route path="/contact" element={wrap(Contact)} />
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
      {process.env.NODE_ENV === "development" && <Agentation />}
    </Router>
  );
}
