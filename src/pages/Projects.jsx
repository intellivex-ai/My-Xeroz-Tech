import Marquee from "../components/Marquee";
import { ArrowUpRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimations, scrollPresets } from "../components/useScrollAnimations";
import { projectsList } from "../data/projects";

export default function Projects() {
  const navigate = useNavigate();

  const archivesList = [
    {
      num: "04",
      title: "MY XOR TECH",
      desc: "A MODULAR DESIGN FRAMEWORK ENGINEERED FOR MAXIMUM VISUAL IMPACT. STRIPPED OF BLOAT AND OPTIMIZED FOR RAW, UNCOMPROMISING DIGITAL EXPERIENCES.",
      tag: "ACTIVE PROJECT",
      bgClass: "bg-background hover:bg-surface-container-high"
    },
    {
      num: "05",
      title: "HOMIZGO APP",
      desc: "THREE.JS WEBGL REACT-THREE-FIBER CORE LOGIC TAILWIND-CSS.",
      tag: "ACTIVE PROJECT",
      bgClass: "bg-background hover:bg-surface-container-high"
    },
    {
      num: "06",
      title: "INTELLIVEX AI",
      desc: "A PROPRIETARY MACHINE LEARNING ARCHITECTURE DEPLOYED FOR INTERNAL AUTOMATION. ENGINEERED TO PROCESS COMPLEX DATA PIPELINES WITH ALGORITHMIC PRECISION, ELIMINATING REDUNDANCY AND OPTIMIZING RAW SYSTEM OUTPUT.",
      tag: "AI & AUTOMATION",
      bgClass: "bg-surface-variant hover:bg-primary hover:text-white",
      numClass: "text-secondary group-hover:text-on-tertiary-container",
      textClass: "text-primary group-hover:text-white",
      descClass: "text-secondary group-hover:text-surface-variant",
      borderClass: "border-primary group-hover:border-white",
      tagClass: "text-secondary group-hover:text-white"
    }
  ];

  // GSAP ScrollTrigger animations scoped to the page
  const pageRef = useScrollAnimations((container) => {
    // 1. Hero title clip reveal
    scrollPresets.clipReveal(
      ".proj-hero",
      ".proj-hero-title",
      { duration: 1.2, start: "top 90%" }
    );

    // 2. Hero description slide from left
    scrollPresets.slideLeft(
      ".proj-hero",
      ".proj-hero-desc",
      { duration: 1.0, start: "top 85%" }
    );

    // 3. Hero badge scale reveal
    scrollPresets.scaleReveal(
      ".proj-hero",
      ".proj-hero-badge",
      { duration: 0.8, start: "top 85%" }
    );

    // 4. Project cards — each animates independently
    projectsList.forEach((_, idx) => {
      const row = `.proj-card-${idx}`;
      const isEven = idx % 2 === 0;

      // Image parallax
      scrollPresets.parallax(
        row,
        `${row} .proj-card-img`,
        { yStart: 50, yEnd: -50, scrub: 1.8 }
      );

      // Content block — slide from alternating sides
      if (isEven) {
        scrollPresets.slideLeft(
          row,
          `${row} .proj-card-content`,
          { duration: 1.0, start: "top 80%" }
        );
      } else {
        scrollPresets.slideRight(
          row,
          `${row} .proj-card-content`,
          { duration: 1.0, start: "top 80%" }
        );
      }

      // Chips stagger
      scrollPresets.fadeUpScale(
        row,
        `${row} .proj-chip`,
        { stagger: 0.08, duration: 0.5, start: "top 75%" }
      );

      // CTA button rotate in
      scrollPresets.rotateIn(
        row,
        `${row} .proj-cta-btn`,
        { duration: 0.8, start: "top 75%", rotStart: -3 }
      );
    });

    // 5. Archive cards — stagger with alternating directions
    scrollPresets.staggerAlternate(
      ".proj-archives",
      ".proj-archive-card",
      { stagger: 0.15, duration: 1.0, start: "top 80%" }
    );
  }, []);

  return (
    <div ref={pageRef} className="w-full">
      {/* Header Marquee Ticker */}
      <section className="bg-primary text-on-secondary py-2 select-none overflow-hidden">
        <Marquee 
          text="CAROSELLING // BRUTALISM FRAMEWORK // XOR APP // " 
          speed={18} 
          bgClass="bg-transparent text-white border-b-0"
          fontSizeClass="font-display text-[26px] md:text-display-sm font-black uppercase italic py-1"
        />
      </section>

      {/* Main Container */}
      <main className="w-full px-4 md:px-12 border-x-thick border-primary max-w-[1440px] mx-auto bg-background min-h-screen">
        {/* Header Hero Section */}
        <div className="proj-hero border-b-thick border-primary p-6 md:p-12 bg-surface-container-lowest select-none overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="max-w-3xl">
              <h1 className="proj-hero-title font-display text-[50px] md:text-display-xl font-black uppercase leading-[0.9] mb-8 text-primary">
                SELECTED
                <br />
                WORK
              </h1>
              <p className="proj-hero-desc font-mono text-body-lg text-secondary border-l-thick border-primary pl-8 leading-relaxed uppercase">
                High-performance digital artifacts. Engineered for technical superiority and uncompromising visual impact. We build the architecture of the future.
              </p>
            </div>
            <div className="proj-hero-badge flex flex-col items-start md:items-end gap-3 self-end">
              <div className="w-24 h-24 bg-primary text-white flex items-center justify-center border-thick border-primary neo-shadow">
                <Star size={36} fill="white" />
              </div>
              <span className="font-mono text-label-caps bg-primary text-white px-4 py-2 font-bold select-none">
                ARCHIVE.2025
              </span>
            </div>
          </div>
        </div>

        {/* Projects Stack (One below the other) */}
        <div className="flex flex-col bg-background">
          {projectsList.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={project.num}
                className={`proj-card-${idx} grid grid-cols-1 md:grid-cols-2 border-b-thick border-primary group overflow-hidden`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden border-b-thin md:border-b-0 ${isEven ? "md:border-r-thick" : "md:order-last md:border-l-thick"} border-primary h-[350px] md:h-[500px] select-none pointer-events-none p-6 md:p-12 bg-surface-container flex items-center justify-center`}>
                  <img
                    alt={project.title}
                    className="proj-card-img max-w-full max-h-full object-contain filter grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 img-reveal"
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add("loaded")}
                    src={project.img}
                  />
                  <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 font-mono text-label-caps font-bold">
                    {project.num} // {project.category}
                  </div>
                </div>
                
                {/* Content Block */}
                <div className="proj-card-content p-8 md:p-12 flex flex-col justify-between select-none bg-surface-container-lowest">
                  <div>
                    <h2 className="font-display text-headline-md md:text-headline-lg font-black uppercase mb-4 text-primary group-hover:underline underline-offset-8">
                      {project.title}
                    </h2>
                    <p className="font-mono text-body-lg text-secondary mb-6 uppercase leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.chips.map((chip) => (
                        <span key={chip} className="proj-chip px-2 py-1 border border-primary font-mono text-[10px] font-bold">
                          {chip}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => alert(`INITIALIZING PROTOCOL: ${project.title}`)}
                      className="proj-cta-btn bg-primary text-on-secondary font-mono text-label-caps px-8 py-4 flex items-center gap-2 hover:bg-background hover:text-primary border-thin border-primary transition-all cursor-pointer font-bold active:translate-y-[2px] self-start"
                    >
                      GO // CASE STUDY
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Archives Grid */}
        <div className="proj-archives grid grid-cols-1 lg:grid-cols-3 border-b-thick border-primary bg-background overflow-hidden">
          {archivesList.map((archive, idx) => (
            <div 
              key={archive.num}
              className={`proj-archive-card border-b-thick lg:border-b-0 lg:border-r-thick last:border-r-0 lg:last:border-b-0 border-primary p-6 flex flex-col justify-between min-h-[220px] select-none transition-colors hover-lift group ${archive.bgClass}`}
            >
              <div>
                <div className={`text-[10px] font-mono font-bold mb-4 transition-colors ${archive.numClass || "text-secondary"}`}>[ ARCHIVE / {archive.num} ]</div>
                <h4 className={`font-display text-headline-md font-black uppercase mb-2 transition-colors ${archive.textClass || "text-primary"}`}>{archive.title}</h4>
                <p className={`font-mono text-xs uppercase leading-normal transition-colors ${archive.descClass || "text-secondary"}`}>
                  {archive.desc}
                </p>
              </div>
              <div className={`border-t pt-4 flex justify-between items-center select-none font-bold font-mono transition-colors ${archive.borderClass || "border-primary"} ${archive.tagClass || "text-secondary"}`}>
                <span className="text-[9px]">{archive.tag}</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
