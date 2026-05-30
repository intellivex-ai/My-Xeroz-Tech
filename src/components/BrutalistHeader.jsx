import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function BrutalistHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollRef = useRef(0);
  const navigate = useNavigate();

  // State to track if Color mode (checked) or Grayscale/B&W mode (unchecked) is active
  const [isColorMode, setIsColorMode] = useState(() => {
    const saved = localStorage.getItem("grayscale-mode");
    return saved !== "true";
  });

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
    setIsColorMode(prev => !prev);
  };

  const renderThemeToggle = () => (
    <div className="switch-container">
      <label className="switch-control">
        <input 
          className="cb" 
          type="checkbox" 
          checked={isColorMode}
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
      if (current > 100) {
        setIsHidden(current > lastScrollRef.current);
      } else {
        setIsHidden(false);
      }
      lastScrollRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "PROJECTS", path: "/projects" },
    { name: "ABOUT", path: "/about" },
    { name: "TEAM", path: "/team" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-grid-margin h-20 select-none transition-all duration-500 ease-out ${
        isScrolled ? "bg-background/95 backdrop-blur-md" : "bg-background"
      } ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } border-b-thick border-primary`}>
        {/* Title Logo */}
        <Link 
          to="/"
          className="flex items-center gap-3 font-display text-headline-md font-black uppercase tracking-tighter text-primary glitch-hover cursor-pointer"
        >
          <Logo className="w-8 h-8" />
          <span>MY XEROZ TECH</span>
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
        <div className="hidden md:flex items-center gap-6">
          {renderThemeToggle()}
          <button 
            onClick={() => navigate("/contact")}
            className="bg-primary text-on-secondary font-mono text-label-caps px-6 py-3 border-2 border-primary hover:bg-background hover:text-primary transition-all duration-75 hover:scale-105 active:translate-y-[2px] cursor-pointer"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden border-thick border-primary bg-background p-2 hover:bg-primary hover:text-on-secondary transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20 flex flex-col border-t-thick border-primary md:hidden animate-fade-in">
          <div className="flex-grow flex flex-col justify-center px-grid-margin py-8 gap-6 border-b-thick border-primary">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `font-display text-[40px] font-black uppercase tracking-tighter ${
                    isActive 
                      ? "text-primary underline decoration-thick underline-offset-4" 
                      : "text-secondary hover:text-primary"
                  }`
                }
                style={{
                  animation: `slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s both`
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="p-grid-margin bg-primary-container flex flex-col gap-5 items-center">
            <div className="flex justify-center w-full py-1">
              {renderThemeToggle()}
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/contact");
              }}
              className="w-full bg-primary text-on-secondary py-5 font-display text-headline-md font-bold uppercase border-thick border-primary hover:bg-background hover:text-primary transition-all text-center cursor-pointer"
            >
              CONTACT // GO
            </button>
          </div>
        </div>
      )}

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
