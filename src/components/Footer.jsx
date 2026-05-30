import { Link } from "react-router-dom";
import { Mail, Globe, Share2 } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-primary text-on-secondary grid grid-cols-1 md:grid-cols-12 gap-0 w-full p-grid-margin border-t-thick border-primary">
      {/* Brand Metadata */}
      <div className="md:col-span-4 mb-12 md:mb-0">
        <Link 
          to="/"
          className="flex items-center gap-3 font-display text-headline-md font-black text-on-secondary uppercase mb-4 tracking-tighter"
        >
          <Logo className="w-8 h-8" inverted={true} />
          <span>MY XEROZ TECH</span>
        </Link>
        <p className="font-mono text-body-md text-on-tertiary-container max-w-xs leading-relaxed uppercase">
          AN UNAPOLOGETIC DIGITAL FACTORY FOR HIGH-PERFORMANCE BRANDS.
        </p>
      </div>

      {/* Directory Menu */}
      <div className="md:col-span-2 mb-12 md:mb-0">
        <div className="font-mono text-label-caps text-on-tertiary-container mb-6 font-bold">MENU</div>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="font-mono text-label-caps text-on-secondary hover:text-surface-variant transition-colors">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/services" className="font-mono text-label-caps text-on-secondary hover:text-surface-variant transition-colors">
              SERVICES
            </Link>
          </li>
          <li>
            <Link to="/projects" className="font-mono text-label-caps text-on-secondary hover:text-surface-variant transition-colors">
              PROJECTS
            </Link>
          </li>
          <li>
            <Link to="/about" className="font-mono text-label-caps text-on-secondary hover:text-surface-variant transition-colors">
              ABOUT
            </Link>
          </li>
        </ul>
      </div>

      {/* Legal Guidelines */}
      <div className="md:col-span-2 mb-12 md:mb-0">
        <div className="font-mono text-label-caps text-on-tertiary-container mb-6 font-bold">LEGAL</div>
        <ul className="space-y-4">
          <li>
            <a href="#" className="font-mono text-label-caps text-on-secondary hover:text-surface-variant transition-colors">
              TERMS OF USE
            </a>
          </li>
          <li>
            <a href="#" className="font-mono text-label-caps text-on-secondary hover:text-surface-variant transition-colors">
              PRIVACY POLICY
            </a>
          </li>
          <li>
            <a href="#" className="font-mono text-label-caps text-on-secondary hover:text-surface-variant transition-colors">
              COOKIES LOG
            </a>
          </li>
        </ul>
      </div>

      {/* Social & Copyrights */}
      <div className="md:col-span-4 flex flex-col md:items-end justify-between select-none">
        <div className="flex gap-6 mb-8 md:mb-0">
          <a
            href="mailto:hello@myxeroz.tech"
            className="w-10 h-10 border border-on-secondary flex items-center justify-center hover:bg-background hover:text-primary transition-colors cursor-pointer"
            aria-label="Email Us"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://myxeroz.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-on-secondary flex items-center justify-center hover:bg-background hover:text-primary transition-colors cursor-pointer"
            aria-label="Website"
          >
            <Globe size={18} />
          </a>
          <button
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: "My Xeroz Tech",
                    url: window.location.origin
                  });
                } catch (err) {
                  // Ignore abort errors from user canceling share dialog
                  if (err.name !== "AbortError") {
                    console.error("Share failed:", err);
                  }
                }
              } else {
                try {
                  await navigator.clipboard.writeText(window.location.origin);
                  alert("Copied site link to clipboard.");
                } catch {
                  alert("Could not copy link. Copy the URL manually.");
                }
              }
            }}
            className="w-10 h-10 border border-on-secondary flex items-center justify-center hover:bg-background hover:text-primary transition-colors cursor-pointer"
            aria-label="Share"
          >
            <Share2 size={18} />
          </button>
        </div>
        <div className="font-mono text-[10px] text-on-tertiary-container opacity-60 font-bold uppercase tracking-widest text-left md:text-right mt-6 md:mr-48">
          ©{new Date().getFullYear()} MY XEROZ TECH // ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
