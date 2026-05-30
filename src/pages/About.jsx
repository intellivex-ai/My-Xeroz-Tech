import { useState } from "react";
import Marquee from "../components/Marquee";
import { Settings, GitBranch, Terminal, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimations, scrollPresets } from "../components/useScrollAnimations";
import logosImg from "../assets/logos.png";

export default function About() {
  const navigate = useNavigate();
  
  // Interactive Schematic whiteboard grid: 10x10 squares
  const gridSize = 8;
  const [activeBlocks, setActiveBlocks] = useState(
    Array(gridSize * gridSize).fill(false)
  );

  const toggleBlock = (index) => {
    const nextBlocks = [...activeBlocks];
    nextBlocks[index] = !nextBlocks[index];
    setActiveBlocks(nextBlocks);
  };

  const clearSchematic = () => {
    setActiveBlocks(Array(gridSize * gridSize).fill(false));
  };

  const loadRandomPreset = () => {
    const randomBlocks = Array(gridSize * gridSize)
      .fill(false)
      .map(() => Math.random() > 0.65);
    setActiveBlocks(randomBlocks);
  };

  // GSAP ScrollTrigger animations scoped to the page
  const pageRef = useScrollAnimations((container) => {
    // 1. Hero text clip reveal
    scrollPresets.clipReveal(
      ".about-hero-text",
      ".about-hero-text h1, .about-hero-text p",
      { stagger: 0.15, start: "top 90%" }
    );

    // 2. Hero label slide from left
    scrollPresets.slideLeft(
      ".about-hero-text",
      ".about-hero-label",
      { duration: 0.8, start: "top 90%" }
    );

    // 3. Parallax on the hero image
    scrollPresets.parallax(
      ".about-hero-graphic",
      ".about-hero-graphic img",
      { yStart: 30, yEnd: -30, scrub: 1.5 }
    );

    // 4. Status panel pulse scale
    scrollPresets.scaleReveal(
      ".about-hero-graphic",
      ".about-status-panel",
      { duration: 1.0, start: "top 75%" }
    );

    // 5. Principles section header line grow
    scrollPresets.lineGrow(
      ".about-principles",
      ".about-principles-line",
      { duration: 1.4 }
    );

    // 6. Principles section title clip reveal
    scrollPresets.clipReveal(
      ".about-principles",
      ".about-principles-title",
      { duration: 1.0 }
    );

    // 7. Principle cards staggered alternate directions
    scrollPresets.staggerAlternate(
      ".about-principles",
      ".about-principle-card",
      { stagger: 0.15, duration: 1.0 }
    );

    // 8. Architecture overview section — left side slide
    scrollPresets.slideLeft(
      ".about-architecture",
      ".about-arch-left",
      { duration: 1.0, start: "top 80%" }
    );

    // 9. Architecture spec rows stagger
    scrollPresets.fadeUpScale(
      ".about-arch-left",
      ".about-spec-row",
      { stagger: 0.1, duration: 0.7, start: "top 80%" }
    );

    // 10. Blueprint board from right with blur
    scrollPresets.slideRight(
      ".about-architecture",
      ".about-blueprint",
      { duration: 1.2, start: "top 80%" }
    );

    // 11. CTA section parallax text
    scrollPresets.parallax(
      ".about-cta",
      ".about-cta-text",
      { yStart: 40, yEnd: -20, scrub: 1 }
    );

    // 12. CTA buttons scale reveal
    scrollPresets.scaleReveal(
      ".about-cta",
      ".about-cta-actions",
      { duration: 1.0, start: "top 85%" }
    );
  }, []);

  return (
    <div ref={pageRef} className="w-full">
      {/* Identity Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 w-full border-b-thick border-primary bg-background select-none">
        {/* Left Column Text */}
        <div className="about-hero-text md:col-span-8 p-6 md:p-12 flex flex-col justify-center border-b-thin md:border-b-0 md:border-r-thin border-primary select-none">
          <span className="about-hero-label font-mono text-label-caps mb-4 font-bold text-primary">[ 01 // IDENTITY ]</span>
          <h1 className="font-display text-[55px] md:text-display-xl uppercase break-words leading-none font-black text-primary">
            RAW
            <br />
            UTILITY
          </h1>
          <p className="mt-8 font-mono text-body-lg text-secondary leading-relaxed uppercase">
            We strip away the decorative noise of modern web design. Our code is structural. Our design is industrial. We build high-performance digital environments for those who value speed and clarity over aesthetic trends.
          </p>
        </div>

        {/* Right Column Tech Graphic */}
        <div className="about-hero-graphic md:col-span-4 bg-primary flex flex-col justify-between relative overflow-hidden p-8 min-h-[400px] md:min-h-auto border-t-thin md:border-t-0 border-primary">
          <img
            alt="Technical Grid backdrop"
            className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
            src={logosImg}
          />
          <div className="about-status-panel z-10 text-center text-on-secondary py-12 flex flex-col items-center justify-center h-full">
            <span className="font-mono text-label-caps block mb-2 text-on-tertiary-container font-bold">SYSTEM STATUS</span>
            <div className="font-display text-headline-lg font-black italic tracking-widest animate-pulse">ACTIVE</div>
            <div className="mt-6 border-t border-on-secondary/30 pt-6 font-mono text-[11px] leading-relaxed uppercase text-left w-full max-w-[200px]">
              CORE_VERSION: 4.2.0
              <br />
              LATENCY: 12ms
              <br />
              LOAD: OPTIMAL
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Text Banner */}
      <section className="bg-primary text-on-secondary py-2 select-none overflow-hidden">
        <Marquee 
          text="NO FLUFF // RAW CODE // PURE UTILITY // " 
          speed={15} 
          bgClass="bg-transparent text-white border-b-0"
          fontSizeClass="font-display text-[26px] md:text-display-sm font-black uppercase italic py-1"
        />
      </section>

      {/* Principles Section */}
      <section className="about-principles p-6 md:p-12 py-stack-lg select-none bg-background overflow-hidden">
        <div className="mb-12 border-b-thick border-primary pb-4 flex justify-between items-end">
          <h2 className="about-principles-title font-display text-headline-lg font-black uppercase">PRINCIPLES</h2>
          <span className="font-mono text-label-caps text-secondary font-bold">[ DATA // BLUEPRINT ]</span>
        </div>
        {/* Animated line separator */}
        <div className="about-principles-line h-[3px] bg-primary mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-thick border-primary bg-background">
          {/* Principle 01 */}
          <div 
            onClick={() => alert("PROTOCOL INITIATED: FIDELITY")}
            className="about-principle-card p-10 border-b-thin md:border-b-0 md:border-r-thin border-primary hover:bg-primary hover:text-on-secondary transition-colors duration-150 group cursor-pointer flex flex-col justify-between min-h-[380px]"
          >
            <div className="flex justify-between items-start mb-16">
              <span className="font-display text-headline-md font-black">01</span>
              <Settings size={36} className="text-primary group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-display text-headline-md font-black uppercase mb-4">FIDELITY</h3>
              <p className="font-mono text-body-md text-secondary group-hover:text-on-secondary leading-relaxed uppercase">
                Absolute technical accuracy. We deliver code that is documented, tested, and optimized for maximum throughput. No approximations. No technical debt.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-2 group-hover:translate-x-2 transition-transform select-none font-mono text-label-caps font-bold underline underline-offset-4">
              READ PROTOCOL <ArrowRight size={14} />
            </div>
          </div>

          {/* Principle 02 */}
          <div 
            onClick={() => alert("PROTOCOL INITIATED: CONTINUITY")}
            className="about-principle-card p-10 border-b-thin md:border-b-0 md:border-r-thin border-primary bg-surface-container-highest hover:bg-primary hover:text-on-secondary transition-colors duration-150 group cursor-pointer flex flex-col justify-between min-h-[380px]"
          >
            <div className="flex justify-between items-start mb-16">
              <span className="font-display text-headline-md font-black">02</span>
              <GitBranch size={36} className="text-primary group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-display text-headline-md font-black uppercase mb-4">CONTINUITY</h3>
              <p className="font-mono text-body-md text-secondary group-hover:text-on-secondary leading-relaxed uppercase">
                Design that scales. Our systems are built to endure shifts in technology, ensuring your digital infrastructure remains operational and relevant through the long term.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-2 group-hover:translate-x-2 transition-transform select-none font-mono text-label-caps font-bold underline underline-offset-4">
              VIEW PIPELINE <ArrowRight size={14} />
            </div>
          </div>

          {/* Principle 03 */}
          <div 
            onClick={() => alert("PROTOCOL INITIATED: CRAFT")}
            className="about-principle-card p-10 border-primary hover:bg-primary hover:text-on-secondary transition-colors duration-150 group cursor-pointer flex flex-col justify-between min-h-[380px]"
          >
            <div className="flex justify-between items-start mb-16">
              <span className="font-display text-headline-md font-black">03</span>
              <Terminal size={36} className="text-primary group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-display text-headline-md font-black uppercase mb-4">CRAFT</h3>
              <p className="font-mono text-body-md text-secondary group-hover:text-on-secondary leading-relaxed uppercase">
                Manual precision. Every line of CSS and every byte of JavaScript is handcrafted for specific utility. We reject the bloat of generic frameworks.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-2 group-hover:translate-x-2 transition-transform select-none font-mono text-label-caps font-bold underline underline-offset-4">
              INSPECT TOOLKIT <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Overview + Clickable Blueprint Canvas */}
      <section className="about-architecture grid grid-cols-1 md:grid-cols-2 w-full border-t-thick border-primary select-none bg-background overflow-hidden">
        <div className="about-arch-left p-6 md:p-12 border-b-thin md:border-b-0 md:border-r-thin border-primary select-none">
          <div className="border-thick border-primary p-1 bg-primary mb-8 select-none"></div>
          <h4 className="font-mono text-label-caps mb-8 text-secondary font-bold">[ ARCHITECTURAL_OVERVIEW ]</h4>
          <p className="font-mono text-body-lg text-primary mb-8 leading-relaxed uppercase">
            Our workspace is a laboratory for digital industrialization. We leverage the raw aesthetics of neo-brutalism to emphasize the underlying structure of our applications. By exposing the grid, we demonstrate our commitment to honesty in design.
          </p>
          <div className="space-y-4 font-mono text-label-caps font-bold select-none text-secondary">
            <div className="about-spec-row flex items-center justify-between border-b border-primary py-2">
              <span>OPTIMIZATION_LEVEL</span>
              <span className="text-primary">ULTRA // 99%</span>
            </div>
            <div className="about-spec-row flex items-center justify-between border-b border-primary py-2">
              <span>COMPRESSION_RATIO</span>
              <span className="text-primary">4:1 // LOSSLESS</span>
            </div>
            <div className="about-spec-row flex items-center justify-between border-b border-primary py-2">
              <span>RENDER_ENGINE</span>
              <span className="text-primary">DIRECT_DOM_4</span>
            </div>
          </div>
        </div>

        {/* Blueprint Board component */}
        <div className="about-blueprint p-6 md:p-12 flex flex-col justify-center items-center bg-surface-container-highest">
          <div className="w-full max-w-md bg-background border-thick border-primary p-6 neo-shadow select-none">
            <div className="flex justify-between items-center mb-4 select-none">
              <div>
                <span className="font-mono text-label-caps text-secondary block font-bold">SCHEMATIC // V1</span>
                <span className="font-mono text-[9px] text-on-tertiary-container uppercase block mt-1">CLICK SQUARES TO DRAW</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={loadRandomPreset}
                  className="px-2 py-1 border border-primary font-mono text-[8px] uppercase hover:bg-primary hover:text-white transition-colors cursor-pointer font-bold"
                >
                  PRESET
                </button>
                <button
                  onClick={clearSchematic}
                  className="px-2 py-1 border border-primary font-mono text-[8px] uppercase hover:bg-primary hover:text-white transition-colors cursor-pointer font-bold"
                >
                  RESET
                </button>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-1 bg-primary p-1 border border-primary">
              {activeBlocks.map((isActive, index) => (
                <div
                  key={index}
                  onClick={() => toggleBlock(index)}
                  className={`aspect-square border border-primary/10 transition-colors duration-75 cursor-crosshair ${
                    isActive ? "bg-primary" : "bg-white"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => navigate("/contact")}
                className="bg-primary text-on-secondary font-display text-headline-md font-bold px-6 py-3 flex items-center gap-2 hover:bg-white hover:text-primary border-2 border-primary transition-all cursor-pointer active:translate-y-[2px]"
              >
                GO <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Manifesto */}
      <section className="about-cta bg-primary text-on-secondary p-6 md:p-12 text-center py-stack-lg border-t border-primary select-none overflow-hidden">
        <h2 className="about-cta-text font-display text-[45px] md:text-display-xl font-black uppercase mb-12 text-white">
          READY TO
          <br />
          BUILD RAW?
        </h2>
        <div className="about-cta-actions flex flex-col md:flex-row gap-6 justify-center items-center select-none font-bold">
          <button
            onClick={() => navigate("/contact")}
            className="border-2 border-on-secondary bg-transparent text-white px-12 py-6 font-display text-headline-md uppercase hover:bg-white hover:text-primary transition-colors cursor-pointer active:translate-y-[2px]"
          >
            START_PROJECT
          </button>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("DOWNLOADING MANIFESTO PROTOCOL COMPLETED."); }}
            className="font-mono text-label-caps underline decoration-2 underline-offset-8 text-on-tertiary-container hover:text-white transition-colors cursor-pointer"
          >
            DOWNLOAD_MANIFESTO.PDF
          </a>
        </div>
      </section>
    </div>
  );
}
