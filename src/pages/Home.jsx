import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Marquee from "../components/Marquee";
import { useNavigate } from "react-router-dom";
import Scene3D from "../components/Scene3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsList } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// Dedicated 3D Logo Assembly section that maps scroll percentage to 3D construction progress
function HeroScene3D({ containerRef }) {
  // Start with 89.9 (fully assembled) at the top of the fold
  const [progress, setProgress] = useState(89.9);
  const [isGlobalLoading, setIsGlobalLoading] = useState(
    typeof window !== "undefined" ? !!window.isBrandingLoading : true
  );

  useEffect(() => {
    const handleLoadingChange = (e) => {
      setIsGlobalLoading(e.detail.isLoading);
    };

    window.addEventListener("branding-loading-change", handleLoadingChange);
    return () => {
      window.removeEventListener("branding-loading-change", handleLoadingChange);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Timeline that links the scroll duration of the Hero section to the assembly progress
    // Inverted scroll assembly: start fully assembled (89.9) and disassemble on scroll down (0)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 1.5,
        onUpdate: (self) => {
          setProgress((1 - self.progress) * 89.9);
        }
      }
    });

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [containerRef]);

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-500 ease-out"
      style={{ opacity: isGlobalLoading ? 0 : 1 }}
    >
      <Scene3D autoRun={false} progress={progress} />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  // Framer Motion entry animations for the immediate view elements (top of fold)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  useEffect(() => {
    // GSAP Context scopes selectors to the page container for clean cleanup on unmount
    const ctx = gsap.context(() => {
      
      // 0. Focus Section Header — clip reveal + line grow
      gsap.fromTo(
        ".focus-section .section-header-title",
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".focus-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        ".focus-section .section-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".focus-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 1. Focus Section Bento Cards Staggered Slide In with rotation
      gsap.fromTo(
        ".focus-card",
        { y: 80, opacity: 0, rotation: -2 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.0,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".focus-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 2. Stats Section Cards Reveal with scale
      gsap.fromTo(
        ".stat-card",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 3. Stats Live Count-Up Tickers
      gsap.utils.toArray(".stat-number").forEach((statNode) => {
        const startVal = parseFloat(statNode.getAttribute("data-start"));
        const targetVal = parseFloat(statNode.getAttribute("data-target"));
        const isDecimal = statNode.getAttribute("data-decimal") === "true";
        const suffix = statNode.getAttribute("data-suffix") || "";

        const obj = { value: startVal };
        gsap.to(obj, {
          value: targetVal,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          onUpdate: () => {
            statNode.textContent = isDecimal
              ? obj.value.toFixed(1) + suffix
              : Math.floor(obj.value) + suffix;
          }
        });
      });

      // 4. Operate Section Sticky Title — clip reveal from right
      gsap.fromTo(
        ".operate-sticky",
        { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".operate-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 5. Operate Section Process Steps — alternating slide directions
      gsap.utils.toArray(".process-item").forEach((el, i) => {
        const fromX = i % 2 === 0 ? 80 : -80;
        gsap.fromTo(
          el,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".operate-section",
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 6. Selected Reworks Section Header — clip reveal from bottom
      gsap.fromTo(
        ".reworks-header",
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".reworks-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 7. Selected Reworks Project Cards Staggered Focus-in
      gsap.fromTo(
        ".project-card",
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reworks-section",
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 7b. Project card images — parallax scrub
      gsap.utils.toArray(".project-card .img-reveal").forEach((img) => {
        gsap.fromTo(
          img,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".project-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          }
        );
      });

      // 8. CTA Content — clip reveal from right
      gsap.fromTo(
        ".cta-content",
        { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // CTA text parallax on scroll
      gsap.fromTo(
        ".cta-content h2",
        { y: 30 },
        {
          y: -15,
          ease: "none",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // CTA button scale reveal
      gsap.fromTo(
        ".cta-button",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const focusGrid = [
    {
      num: "#001",
      title: "WEBSITES",
      desc: "Raw structural integrity meets high-conversion user experience. We don't just build sites; we build digital landmarks.",
      tags: ["WEB", "3D", "UX"],
      icon: "web",
      cols: "md:col-span-7 border-r-0 md:border-r-thin border-b-thin border-primary",
      path: "/services"
    },
    {
      num: "#002",
      title: "APPS",
      desc: "Performance-driven mobile and desktop applications built with industrial-grade code.",
      tags: ["IOS", "ANDROID"],
      icon: "smartphone",
      cols: "md:col-span-5 border-b-thin border-primary",
      path: "/services"
    },
    {
      num: "#003",
      title: "DESIGN",
      desc: "Visual systems that reject the polished, safe aesthetics of generic SaaS for something visceral.",
      tags: ["UI", "IDENTITY"],
      icon: "design_services",
      cols: "md:col-span-5 border-r-0 md:border-r-thin border-b-thin md:border-b-0 border-primary",
      path: "/services"
    },
    {
      num: "#004",
      title: "SECURITY",
      desc: "Comprehensive digital defense, security audits, and penetration testing. We fortify your systems to ensure bulletproof operations.",
      tags: ["AUDIT", "DEFENSE", "COMPLIANCE"],
      icon: "shield",
      cols: "md:col-span-7 border-b-0 border-primary",
      path: "/services"
    }
  ];

  const stats = [
    { target: 20, suffix: "+", label: "PROJECTS DONE", decimal: false, start: 0 },
    { target: 12, suffix: "ms", label: "AVG LATENCY", decimal: false, start: 100 },
    { target: 99, suffix: "%", label: "UPTIME RATE", decimal: false, start: 0 },
    { target: 0.0, suffix: "", label: "COMPROMISES", decimal: true, start: 9.9 }
  ];

  return (
    <motion.div
      ref={pageRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-[90vh] flex flex-col border-b-thick border-primary relative bg-transparent">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-12">
          {/* Main Copy */}
          <div className="md:col-span-8 p-6 md:p-12 border-r-0 md:border-r-thick border-primary flex flex-col justify-center select-none z-10">
            <motion.div variants={itemVariants} className="font-mono text-label-caps mb-6 flex items-center gap-2 font-bold text-primary">
              <span className="w-12 h-[2px] bg-primary"></span> 01. DIGITAL AGENCY
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="font-display text-[50px] md:text-[100px] leading-[0.9] font-black uppercase tracking-tighter mb-8 break-words text-primary"
            >
              MY<br />XEROZ TECH
            </motion.h1>

            <motion.p variants={itemVariants} className="font-display text-headline-md font-bold mb-12 uppercase leading-snug text-primary">
              WE BUILD DIGITAL PRODUCTS THAT{" "}
              <span className="bg-primary text-white px-3 inline-block">
                COMMAND ATTENTION.
              </span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 select-none">
              <button 
                onClick={() => navigate("/contact")}
                className="bg-primary text-on-secondary font-display text-headline-md font-bold px-12 py-6 border-thick border-primary hover:bg-background hover:text-primary transition-all duration-75 neo-shadow cursor-pointer active:translate-y-[2px]"
              >
                GO
              </button>
              <div className="p-6 border-thin border-primary flex items-center justify-center hover:bg-primary hover:text-on-secondary transition-colors duration-75 cursor-pointer text-primary">
                <ArrowUpRight size={36} />
              </div>
            </motion.div>
          </div>

          {/* Interactive 3D Canvas Column */}
          <div className="md:col-span-4 bg-background border-t-thick md:border-t-0 border-primary min-h-[450px] md:min-h-0 flex flex-col">
            {/* 3D Scene Container */}
            <div id="hero-3d-container" className="flex-grow relative overflow-hidden">
              {/* Technical Industrial Dot Grid */}
              <div 
                className="absolute inset-0 w-full h-full bg-surface-container" 
                style={{ 
                  backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }} 
              />

              {/* Embedded 3D Scene */}
              <HeroScene3D containerRef={heroRef} />
            </div>
            
            {/* Status Panel */}
            <div className="z-10 p-8 text-on-secondary bg-primary w-full border-t-thick border-primary flex flex-col select-none relative">
              <span className="font-mono text-label-caps text-on-tertiary-container mb-2 font-bold">[ SYSTEM STATE ]</span>
              <span className="font-display text-headline-md font-bold tracking-wider italic">XEROZ_ENGINE // INTEGRITY_OK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Repeating Marquee */}
      <Marquee text="MY XEROZ TECH // WEB DEV // DESIGN // STRATEGY // BRUTALIST // HIGH PERFORMANCE // " />

      {/* Focus Bento Grid Section */}
      <section className="focus-section p-6 md:p-12 bg-background select-none overflow-hidden">
        <div className="flex justify-between items-end mb-12 border-b-thick border-primary pb-4 section-header-line">
          <h2 className="section-header-title font-display text-headline-lg font-black uppercase text-primary">OUR FOCUS</h2>
          <span className="font-mono text-label-caps text-secondary font-bold">[ SECTION // 02 ]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-thick border-primary bg-background">
          {focusGrid.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className={`${item.cols} focus-card p-8 md:p-12 flex flex-col justify-between group hover:bg-primary hover:text-on-secondary transition-colors duration-150 cursor-pointer min-h-[360px] opacity-0`}
            >
              <div>
                <div className="font-mono text-label-caps mb-8 text-secondary group-hover:text-on-tertiary-container font-bold">
                  {item.num}
                </div>
                <h3 className="font-display text-[40px] md:text-headline-lg font-black uppercase mb-6 leading-none text-primary group-hover:text-on-secondary">
                  {item.title}
                </h3>
                <p className="font-mono text-body-md text-secondary group-hover:text-on-secondary leading-relaxed uppercase">
                  {item.desc}
                </p>
              </div>

              <div className="mt-12 flex justify-between items-end">
                <button className="bg-primary text-on-secondary font-mono text-label-caps px-8 py-4 border-thin border-primary group-hover:bg-background group-hover:text-primary group-hover:border-background transition-all duration-75 font-bold cursor-pointer">
                  GO
                </button>
                <span className="material-symbols-outlined text-[64px] opacity-20 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers Stats Ticker */}
      <section className="stats-section border-y-thick border-primary select-none bg-background">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y-thin md:divide-y-0 md:divide-x-thin divide-primary">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card p-10 text-center flex flex-col justify-center items-center opacity-0">
              <span 
                className="stat-number font-display text-[48px] md:text-[64px] font-black leading-none mb-2 text-primary"
                data-start={stat.start}
                data-target={stat.target}
                data-decimal={stat.decimal}
                data-suffix={stat.suffix}
              >
                {stat.start}{stat.suffix}
              </span>
              <span className="font-mono text-label-caps text-secondary font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Operate Process Grid */}
      <section className="operate-section p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start bg-background overflow-hidden">
        {/* Sticky side */}
        <div className="operate-sticky md:col-span-4 md:sticky md:top-32 select-none opacity-0">
          <h2 className="font-display text-headline-lg font-black uppercase mb-6 leading-none text-primary">
            HOW WE
            <br />
            OPERATE
          </h2>
          <p className="font-mono text-body-lg text-secondary mb-8 uppercase leading-relaxed">
            Our process is transparent, rigid, and focused on absolute structural integrity.
          </p>
          
          {/* Logs */}
          <div className="bg-primary text-on-secondary p-8 neo-shadow border-thick border-primary font-mono text-body-md select-none">
            <div className="font-bold text-on-tertiary-container mb-4">[ SYSTEMS LOG: ]</div>
            <ul className="space-y-2 opacity-80 uppercase">
              <li>&gt; INITIALIZE_RESEARCH</li>
              <li>&gt; BUILD_BLUEPRINT</li>
              <li>&gt; EXECUTE_CODE</li>
              <li>&gt; QUALITY_ASSURANCE</li>
              <li>&gt; DEPLOY_ASSET</li>
            </ul>
          </div>
        </div>

        {/* Process Items list */}
        <div className="md:col-span-8 flex flex-col gap-0 border-thick border-primary divide-y-thin divide-primary bg-background">
          {[
            { step: "01", title: "DISCOVERY", desc: "We dissect your requirements with surgical precision to find the core functional objective." },
            { step: "02", title: "STRUCTURAL DESIGN", desc: "Wireframes and visual directions that prioritize clarity and visual impact over trends." },
            { step: "03", title: "RAW DEVELOPMENT", desc: "Hand-crafted code that ensures maximum performance, accessibility, and durability." },
          ].map((proc) => (
            <div 
              key={proc.step} 
              className="process-item p-8 md:p-12 group hover:bg-surface-container-high transition-colors duration-150 flex items-start gap-6 select-none opacity-0"
            >
              <span className="font-display text-[48px] md:text-display-xl font-black leading-none opacity-20 group-hover:opacity-100 transition-opacity text-primary">
                {proc.step}
              </span>
              <div>
                <h4 className="font-display text-headline-md font-bold uppercase text-primary">{proc.title}</h4>
                <p className="font-mono text-body-md text-secondary mt-2 leading-relaxed uppercase">
                  {proc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Reworks Portfolio */}
      <section className="reworks-section border-t-thick border-primary bg-background overflow-hidden">
        <div className="reworks-header py-12 md:py-20 px-6 md:px-12 border-b-thin border-primary flex justify-between items-center select-none opacity-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div>
              <span className="font-mono text-label-caps text-secondary font-bold mb-2 block">[ SECTION // 05 ]</span>
              <h2 className="font-display text-[40px] md:text-[64px] lg:text-[80px] font-black uppercase leading-[0.85] text-primary">
                SELECTED<br />WORKS
              </h2>
            </div>
            <div className="flex gap-4 self-end">
              <button className="w-12 h-12 border border-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-on-secondary transition-all active:translate-y-[2px] text-primary">
                <ArrowLeft size={20} />
              </button>
              <button className="w-12 h-12 border border-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-on-secondary transition-all active:translate-y-[2px] text-primary">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y-thin md:divide-y-0 md:divide-x-thin divide-primary bg-background">
          {projectsList.map((project) => (
            <div 
              key={project.title} 
              onClick={() => navigate("/projects")}
              className="project-card relative cursor-pointer opacity-0 bg-background"
            >
              {/* Inner wrapper for CSS hover effects to prevent conflicts with GSAP inline transform styles */}
              <div className="w-full h-full flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:neo-shadow-lg bg-surface-container-lowest">
                {/* Image Container (Top) */}
                <div className="relative h-[240px] md:h-[320px] p-6 md:p-8 bg-surface-container border-b-thick border-primary flex items-center justify-center overflow-hidden">
                  <img 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain filter grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 pointer-events-none img-reveal"
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add("loaded")}
                    src={project.img}
                  />
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Content Container (Bottom) */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow select-none bg-surface-container-lowest">
                  <div>
                    <span className="font-mono text-[10px] md:text-label-caps mb-2 font-bold text-secondary block">
                      {project.category} // {project.year}
                    </span>
                    <h4 className="font-display text-headline-sm md:text-headline-md font-black uppercase text-primary mb-3 group-hover:underline underline-offset-4">
                      {project.title}
                    </h4>
                    <p className="font-mono text-xs md:text-body-sm text-secondary uppercase leading-relaxed mb-6">
                      {project.desc}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.chips.slice(0, 3).map((chip) => (
                      <span key={chip} className="px-2 py-0.5 border border-primary font-mono text-[9px] font-bold">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section p-6 md:p-12 bg-primary text-on-secondary select-none overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="cta-content md:col-span-8 opacity-0">
            <h2 className="font-display text-[48px] md:text-headline-lg font-black uppercase mb-4 leading-none">
              READY TO
              <br />
              INITIATE?
            </h2>
            <p className="font-mono text-body-lg text-on-tertiary-container opacity-80 max-w-xl uppercase">
              We are currently accepting new high-impact projects. No fluff. No filler. Just results.
            </p>
          </div>
          <div className="cta-button md:col-span-4 flex md:justify-end opacity-0">
            <button 
              onClick={() => navigate("/contact")}
              className="bg-white text-primary font-display text-headline-md font-bold px-16 py-8 border-thick border-white hover:bg-primary hover:text-white transition-all duration-75 neo-shadow cursor-pointer active:translate-y-[2px]"
            >
              GO // INITIATE
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
