import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function BrutalistHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "PROJECTS", path: "/projects" },
    { name: "ABOUT", path: "/about" },
    { name: "TEAM", path: "/team" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-thick border-primary flex justify-between items-center w-full px-grid-margin h-20 select-none">
        {/* Title Logo */}
        <Link 
          to="/"
          className="font-display text-headline-md font-black uppercase tracking-tighter text-primary glitch-hover cursor-pointer"
        >
          XEROX TECH
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

        {/* Action Button */}
        <div className="hidden md:block">
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
          
          <div className="p-grid-margin bg-primary-container flex flex-col gap-4">
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
