import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

export default function BrutalistHeader({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
  const setIsOpen = propSetIsOpen !== undefined ? propSetIsOpen : setLocalIsOpen;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollRef = useRef(0);
  const navigate = useNavigate();

  // State to track if Color mode (checked) or Grayscale/B&W mode (unchecked) is active
  // Always load the site in B&W (grayscale mode) by default on initial page load / refresh
  const [isColorMode, setIsColorMode] = useState(false);

  // State to track the immediate visual state of the rocker switch to keep the UI snappy
  const [visualChecked, setVisualChecked] = useState(isColorMode);

  useEffect(() => {
    setVisualChecked(isColorMode);
  }, [isColorMode]);

  useEffect(() => {
    if (isColorMode) {
      document.documentElement.classList.remove("grayscale-mode");
      localStorage.setItem("grayscale-mode", "false");
    } else {
      document.documentElement.classList.add("grayscale-mode");
      localStorage.setItem("grayscale-mode", "true");
    }
  }, [isColorMode]);

  const handleToggleMode = () => {
    const targetMode = !visualChecked;
    setVisualChecked(targetMode); // Visual rocker transitions instantly

    // Dispatch the custom theme-toggle-loading event to show the loading screen
    window.dispatchEvent(new CustomEvent("theme-toggle-loading", {
      detail: {
        targetMode,
        applyChange: () => {
          setIsColorMode(targetMode); // Seamlessly switch color scheme under the loader overlay
        }
      }
    }));
  };

  const renderThemeToggle = () => (
    <div className="switch-container">
      <label className="switch-control">
        <input 
          className="cb" 
          type="checkbox" 
          checked={visualChecked}
          onChange={handleToggleMode}
          aria-label="Toggle B&W Grayscale Mode"
        />
        <span className="toggle-bezel">
          <span className="left-panel">B&W</span>
          <span className="right-panel">Color</span>
        </span>
      </label>
    </div>
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 20);
      
      const diff = current - lastScrollRef.current;
      if (current > 100) {
        if (diff > 5) {
          setIsHidden(true);
          lastScrollRef.current = current;
        } else if (diff < -5) {
          setIsHidden(false);
          lastScrollRef.current = current;
        }
      } else {
        setIsHidden(false);
        lastScrollRef.current = current;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 280, 
        damping: 30
      }
    },
    exit: { 
      x: "100%",
      transition: { 
        type: "spring", 
        stiffness: 280, 
        damping: 30 
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: (idx) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 250, 
        damping: 25,
        delay: 0.12 + idx * 0.07
      }
    }),
    exit: { 
      opacity: 0, 
      x: 40,
      transition: { 
        duration: 0.18 
      }
    }
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "PROJECTS", path: "/projects" },
    { name: "ABOUT", path: "/about" },
    { name: "TEAM", path: "/team" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ 
          duration: 0.45, 
          ease: [0.16, 1, 0.3, 1],
          delay: isHidden ? 0 : 0.2
        }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-grid-margin h-20 select-none border-b-thick border-primary ${
          isScrolled ? "bg-background/95 backdrop-blur-md" : "bg-background"
        }`}
      >
        {/* Title Logo */}
        <Link 
          to="/"
          className="flex items-center gap-2 sm:gap-3 font-display text-[19px] sm:text-headline-md font-black uppercase tracking-tighter text-primary glitch-hover cursor-pointer"
        >
          <Logo className="w-8 h-8 flex-shrink-0" />
          <span className="leading-none">
            MY <br className="sm:hidden" />
            <span className="whitespace-nowrap">XEROZ TECH</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `font-mono text-label-caps tracking-wider transition-all duration-75 relative py-2 ${
                  isActive 
                    ? "text-primary font-bold underline decoration-[3px] underline-offset-8" 
                    : "text-secondary hover:text-primary hover:scale-105"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Button & Grayscale Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          {renderThemeToggle()}
          <button 
            onClick={() => navigate("/contact")}
            className="hidden md:block bg-primary text-on-secondary font-mono text-label-caps px-6 py-3 border-2 border-primary hover:bg-background hover:text-primary transition-all duration-75 hover:scale-105 active:translate-y-[2px] cursor-pointer"
          >
            CONTACT
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden border-thick border-primary bg-background p-2 hover:bg-primary hover:text-on-secondary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-background pt-20 flex flex-col border-l-thick border-primary md:hidden"
          >
            <div className="flex-grow flex flex-col justify-center px-grid-margin py-8 gap-6 border-b-thick border-primary mobile-drawer-links">
              {navLinks.map((link, idx) => (
                <motion.div key={link.name} custom={idx} variants={linkVariants}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `font-display text-[40px] font-black uppercase tracking-tighter block ${
                        isActive 
                          ? "text-primary underline decoration-thick underline-offset-4" 
                          : "text-secondary hover:text-primary"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              custom={navLinks.length}
              variants={linkVariants}
              className="p-grid-margin bg-primary-container flex flex-col gap-5 items-center"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/contact");
                }}
                className="w-full bg-primary text-on-secondary py-5 font-display text-headline-md font-bold uppercase border-thick border-primary hover:bg-background hover:text-primary transition-all text-center cursor-pointer mobile-drawer-btn"
              >
                CONTACT // GO
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local keyframe classes for slides */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
