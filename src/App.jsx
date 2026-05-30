import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThreeBackground from "./components/ThreeBackground";
import BrutalistCursor from "./components/BrutalistCursor";
import BrutalistHeader from "./components/BrutalistHeader";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
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

// Global scroll progress bar — scrubs with page scroll
function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    const tween = gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      }
    );
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return <div ref={barRef} className="scroll-progress-bar w-full" />;
}

// Global page loader transitions coordinator that resides inside the <Router> context
function PageLoaderWrapper({ children, isMenuOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setIsPageChanging(true);
      setPrevPath(location.pathname);
    }
  }, [location.pathname, prevPath]);

  // Listen for theme switch loader triggers
  useEffect(() => {
    const handleThemeToggleLoading = (e) => {
      const { applyChange } = e.detail;
      setIsThemeChanging(true);

      // Apply the color scheme transition after 450ms when the loader is fully opaque
      const applyTimer = setTimeout(() => {
        if (applyChange) applyChange();
      }, 450);

      return () => clearTimeout(applyTimer);
    };

    window.addEventListener("theme-toggle-loading", handleThemeToggleLoading);
    return () => {
      window.removeEventListener("theme-toggle-loading", handleThemeToggleLoading);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("branding-loading-change", {
      detail: { isLoading: isInitialLoading || isPageChanging || isThemeChanging }
    }));
  }, [isInitialLoading, isPageChanging, isThemeChanging]);

  // Fallback: force-unstick page and theme loading indicators after 5s
  useEffect(() => {
    if (!isPageChanging && !isThemeChanging) return;
    const timer = setTimeout(() => {
      setIsPageChanging(false);
      setIsThemeChanging(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isPageChanging, isThemeChanging]);

  return (
    <>
      {/* 1. Initial Boot Majestic Loading overlay */}
      {isInitialLoading && (
        <div className="fixed inset-0 z-[99999] loading-screen">
          <LoadingScreen
            speedMultiplier={2.5} // faster speed for initial branding impact
            pathname={location.pathname}
            onComplete={() => {
              // Immediately signal that progress is complete to reveal underlying 3D element
              window.dispatchEvent(new CustomEvent("branding-loading-change", {
                detail: { isLoading: false }
              }));
              // Smoothly fade out loader overlay
              setTimeout(() => setIsInitialLoading(false), 800);
            }}
          />
        </div>
      )}

      {/* 2. Page Router Transition Loading overlay */}
      {!isInitialLoading && isPageChanging && (
        <div className="fixed inset-0 z-[99999] loading-screen">
          <LoadingScreen
            speedMultiplier={4.5} // fast speed (1.8 seconds) to maintain ideal UX
            pathname={location.pathname}
            onComplete={() => {
              // Immediately signal that progress is complete to reveal underlying 3D element
              window.dispatchEvent(new CustomEvent("branding-loading-change", {
                detail: { isLoading: false }
              }));
              // Remove overlay on completion
              setTimeout(() => setIsPageChanging(false), 800);
            }}
          />
        </div>
      )}

      {/* 3. Theme Toggle Loading overlay */}
      {!isInitialLoading && !isPageChanging && isThemeChanging && (
        <div className="fixed inset-0 z-[99999] loading-screen">
          <LoadingScreen
            speedMultiplier={5.5} // extremely snappy speed for seamless rocker feedback
            pathname={location.pathname}
            onComplete={() => {
              // Immediately signal that progress is complete to reveal underlying 3D element
              window.dispatchEvent(new CustomEvent("branding-loading-change", {
                detail: { isLoading: false }
              }));
              // Remove overlay on completion
              setTimeout(() => setIsThemeChanging(false), 800);
            }}
          />
        </div>
      )}

      {children}

      {/* Global Hire floating FAB bottom right trigger */}
      <AnimatePresence>
        {!isInitialLoading && !isMenuOpen && location.pathname !== "/contact" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            onClick={() => navigate("/contact")}
            className="fixed bottom-10 right-10 z-[100] group select-none cursor-pointer"
          >
            <div className="neo-shadow bg-background border-thick border-primary p-4 flex items-center gap-4 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 group-active:translate-x-0 group-active:translate-y-0 select-none">
              <span className="font-mono text-label-caps text-primary font-bold">HIRE US</span>
              <div className="w-10 h-10 bg-primary text-on-secondary flex items-center justify-center font-bold">
                <Plus size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Custom wrapper managing initial and routing loaders */}
      <PageLoaderWrapper isMenuOpen={isMenuOpen}>
        {/* Container wraps dynamic 3D canvas backdrop and elements */}
        <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
          {/* Scroll Progress Indicator */}
          <ScrollProgressBar />

          {/* Three.js Wallpaper Backdrop */}
          <ThreeBackground />
          
          {/* Custom Blend Cursor */}
          <BrutalistCursor />
          
          {/* Core Header Navigation */}
          <BrutalistHeader isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

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
