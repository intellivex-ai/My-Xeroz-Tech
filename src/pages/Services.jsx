import { useState } from "react";
import Marquee from "../components/Marquee";
import { ArrowRight } from "lucide-react";
import { useScrollAnimations, scrollPresets } from "../components/useScrollAnimations";

export default function Services() {
  const [formData, setFormData] = useState({ name: "", email: "", terms: false });
  const [formStatus, setFormStatus] = useState("idle"); // idle, compiling, success

  const services = [
    {
      num: "01",
      title: "WEB DEVELOPMENT",
      desc: "High-performance architectural code built for scale. We build raw, functional interfaces that prioritize technical integrity and user speed. No fluff. Just logic.",
      chips: ["NEXT.JS", "REACT", "TYPESCRIPT"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSSRe9X1OIKqG79mATE2ElV3hvdqYHB8hHvwjQADoZvOEITdi-oG5VQmrzxw-f1U5AiQyp-sVyJuydJYxV0Iy1vFyaqVTMeumP5_J13LLo6Ft8YMzMijsZKeABwLm0z3slnxE7x2cOd9lX0vKILuzUcjJ3QY-LM1hvF8o9j1opLJDbhN6uYL5Gd0qizJ9B_8AZApq3nzqQIW3_XsSxZlij5CXVsxIizJ0Oxg71UsES9RJF-DZaO5QjElDE-wBpuhdTENWyAcEfswD0"
    },
    {
      num: "02",
      title: "DIGITAL DESIGN",
      desc: "Visual systems that demand attention. Our design philosophy rejects the polished 'safe' look for raw industrial beauty. Uncompromising contrast and architectural grids.",
      chips: ["UI/UX", "MOTION", "IDENTITY"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Hb_WDYFFFADCwN6FvjhoEUXzxClqoUrh9g_vz79dqBk3p4fmHJn_SJSTDDIC3NPJ0N9sQSO9lNsj8iYwu0ZYYtJmPsRtBWBZiJI_qoCZus0GCgYzVDXXpDbIupjqHKhQnacUNdMtv4sM57ZNSS12hwawA_Zq5pLu_1dCC3oRvdpDbngrIflCRpU99THHOi-JV421QpRVZB6qIeYSDlWkwLcHgrRgs6UTS4M6MBN72UJ64sI_yKiEG9f7QakbYNK4PbebJoC9eXku"
    },
    {
      num: "03",
      title: "APPLICATION APPS",
      desc: "Robust mobile solutions built on technical excellence. We deliver high-impact applications that feel like precision tools. Zero latency, maximum performance.",
      chips: ["IOS/ANDROID", "FLUTTER", "SYSTEMS"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCUAlyz5ZFSsZa9a6gAyatPh5BH-9AD7XvP_prfcNlHT_vaTztLb04ImagRwyttT89PiIRkmoo-q0JReoeGwysVzSirxch1VINjVrQL-g1sXztpvxR-C5dVrUCheWKfON8Nz-2UHaFn4QZOVyzR-Eowb4zzutVzB7GnsXDSyTkdgcNT1q9Dh9JQ90FSF4JplfNiwDkIjdx3qQt7zdzOmLd9VcEb_adnJS0ariZdin70aGxKvpYkUGnMFGVbE2CVoxjfy2sJ2XpZac6"
    },
    {
      num: "04",
      title: "DIGITAL SECURITY",
      desc: "Comprehensive digital defense, security audits, and penetration testing. We fortify your systems to ensure bulletproof operations. Zero tolerance for vulnerabilities.",
      chips: ["AUDIT", "DEFENSE", "COMPLIANCE"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ZLxZaA-Dpd9JWs-Vlg-RC9TTraKd5N_pNUUPU7ckuvNi4wrj6z9kRi9pX4Bc1o4n6Njf53QG5oURroXjq5mwZHhXOqFIIivXaY8wYwQNZLJ16_XOSbk4_oLng29lajD73x6H1oZC_Y3ezNOFLz7ciSjiofRwm7reB0nAr_bhZcnTY2F9IR3Bm4-u5HHb3QgVHnfg1awMTBLLFmXhIS-KzT_WHqJHryiYd0KJSeeOJ9Esu3Y_iJMm-isZAFTO8ZR-cNABeMY6RWDU"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.terms) {
      alert("PLEASE COMPLY WITH ALL PROTOCOLS.");
      return;
    }
    setFormStatus("compiling");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  // GSAP ScrollTrigger animations scoped to the page
  const pageRef = useScrollAnimations((container) => {
    // 1. Service rows — each row animates independently with scrub parallax on image
    services.forEach((_, idx) => {
      const row = `.svc-row-${idx}`;
      
      // Content block slides from left
      scrollPresets.slideLeft(
        row,
        `${row} .svc-content`,
        { duration: 1.0, start: "top 85%" }
      );

      // Number column clip reveal
      scrollPresets.clipReveal(
        row,
        `${row} .svc-num`,
        { duration: 0.8, start: "top 85%" }
      );

      // Image parallax scroll
      scrollPresets.parallax(
        row,
        `${row} .svc-img`,
        { yStart: 40, yEnd: -40, scrub: 1.5 }
      );

      // GO button scale reveal
      scrollPresets.scaleReveal(
        row,
        `${row} .svc-action`,
        { duration: 0.8, start: "top 75%" }
      );

      // Chips stagger fade up
      scrollPresets.fadeUpScale(
        row,
        `${row} .svc-chip`,
        { stagger: 0.08, duration: 0.6, start: "top 80%" }
      );
    });

    // 2. Specifications section
    scrollPresets.clipReveal(
      ".svc-specs-section",
      ".svc-specs-title",
      { duration: 1.0, start: "top 85%" }
    );

    scrollPresets.staggerAlternate(
      ".svc-specs-section",
      ".svc-spec-item",
      { stagger: 0.12, duration: 0.8 }
    );

    // 3. Registration form slide from right with scale
    scrollPresets.slideRight(
      ".svc-specs-section",
      ".svc-form",
      { duration: 1.2, start: "top 80%" }
    );
  }, []);

  return (
    <div ref={pageRef} className="w-full">
      {/* Marquee Header */}
      <section className="border-b-thick border-primary bg-surface-container-high py-2 overflow-hidden">
        <Marquee 
          text="SERVICES // WEB DEV // DIGITAL DESIGN // APPS // SECURITY // " 
          speed={15} 
          bgClass="bg-transparent text-primary border-b-0"
          fontSizeClass="font-display text-[26px] md:text-display-sm font-black uppercase italic py-1"
        />
      </section>

      {/* Services spreadsheet list */}
      <section className="max-w-[1440px] mx-auto border-x-thick border-primary bg-background">
        {services.map((service, idx) => (
          <div
            key={service.num}
            className={`svc-row-${idx} grid grid-cols-1 md:grid-cols-12 border-b-thick border-primary group overflow-hidden`}
          >
            {/* Number Column */}
            <div className="md:col-span-1 border-b-thin md:border-b-0 md:border-r-thin border-primary p-6 flex items-start justify-center select-none">
              <span className="svc-num font-display text-[28px] font-black text-primary">{service.num}</span>
            </div>

            {/* Content Column */}
            <div className="svc-content md:col-span-5 border-b-thin md:border-b-0 md:border-r-thin border-primary p-8 flex flex-col justify-between min-h-[400px]">
              <div>
                <h2 className="font-display text-headline-md md:text-headline-lg font-black uppercase mb-4 leading-none text-primary group-hover:skew-x-[-6deg] transition-transform select-none">
                  {service.title}
                </h2>
                <p className="font-mono text-body-lg text-secondary leading-relaxed uppercase">
                  {service.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8 select-none">
                {service.chips.map((c) => (
                  <span key={c} className="svc-chip px-3 py-1 border border-primary font-mono text-[10px] font-bold tracking-wider">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Grayscale hover image */}
            <div className="md:col-span-4 border-b-thin md:border-b-0 md:border-r-thin border-primary relative overflow-hidden h-[300px] md:h-auto select-none pointer-events-none">
              <img
                alt={service.title}
                className="svc-img w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 img-reveal"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add("loaded")}
                src={service.img}
              />
            </div>

            {/* Circular Go Action */}
            <div className="md:col-span-2 flex items-center justify-center p-8 bg-surface group-hover:bg-primary transition-colors duration-300">
              <button 
                onClick={() => alert(`INITIALIZING PROTOCOL: ${service.title}`)}
                className="svc-action w-24 h-24 rounded-full border-thick border-primary flex items-center justify-center font-display text-headline-md font-bold text-primary group-hover:text-white group-hover:border-white transition-all hover:scale-110 active:translate-y-[2px] cursor-pointer"
              >
                GO
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Specifications & Registration Forms */}
      <section className="svc-specs-section max-w-[1440px] mx-auto border-x-thick border-b-thick border-primary p-6 md:p-12 bg-surface select-none overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Specifications List */}
          <div>
            <h3 className="svc-specs-title font-display text-[32px] sm:text-[40px] md:text-[48px] font-black uppercase leading-none mb-8 text-primary">
              SPECIFICATIONS
            </h3>
            <div className="space-y-6 font-mono text-body-md">
              {[
                { num: "01", text: "Core framework integrity" },
                { num: "02", text: "Linear motion logic" },
                { num: "03", text: "Asymmetric layout protocol" },
                { num: "04", text: "Hard-offset shadow system" },
              ].map((spec) => (
                <div key={spec.num} className="svc-spec-item flex gap-4 border-b border-primary pb-4 items-center">
                  <span className="font-bold text-[18px] text-primary">{spec.num}</span>
                  <p className="uppercase tracking-wider">{spec.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neo-brutalist Lead Capture Form */}
          <div className="svc-form border-thick border-primary p-8 bg-white neo-shadow flex flex-col justify-between">
            <h4 className="font-display text-headline-md font-black uppercase mb-6 text-primary">
              REGISTRATION
            </h4>
            
            {formStatus === "idle" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-label-caps font-bold text-primary">NAME</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-thick border-primary p-4 font-mono text-body-md focus:outline-none focus:bg-surface-container-low transition-colors rounded-none"
                    placeholder="ENTER SPECIFICATION NAME"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-label-caps font-bold text-primary">E-MAIL</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-thick border-primary p-4 font-mono text-body-md focus:outline-none focus:bg-surface-container-low transition-colors rounded-none"
                    placeholder="ENTER EMAIL ADDRESS"
                  />
                </div>
                <div className="flex items-center gap-3 py-2 cursor-pointer">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="w-6 h-6 border-thick border-primary text-primary focus:ring-0 rounded-none cursor-pointer"
                  />
                  <label htmlFor="terms" className="font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer select-none">
                    I ACCEPT ALL SYSTEM TERMS OF SERVICE
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-on-secondary py-5 font-display text-headline-md font-bold hover:bg-white hover:text-primary border-thick border-primary transition-all cursor-pointer active:translate-y-[2px]"
                >
                  GO // SUBMIT
                </button>
              </form>
            )}

            {formStatus === "compiling" && (
              <div className="py-12 flex flex-col items-center justify-center font-mono text-body-lg gap-4">
                <span className="animate-spin border-4 border-primary border-t-transparent w-10 h-10 rounded-full" />
                <span className="uppercase tracking-widest animate-pulse">&gt; COMPILING_DATA...</span>
              </div>
            )}

            {formStatus === "success" && (
              <div className="py-12 flex flex-col items-center justify-center font-mono text-center gap-6">
                <div className="w-16 h-16 bg-primary text-white flex items-center justify-center border-thick border-primary neo-shadow">
                  <span className="material-symbols-outlined text-[36px]">check</span>
                </div>
                <div>
                  <h5 className="font-display text-headline-md font-black uppercase text-primary">SUCCESS // REGISTERED</h5>
                  <p className="font-mono text-body-md text-secondary mt-2 uppercase">
                    your blueprint has been securely logged.
                  </p>
                </div>
                <button 
                  onClick={() => { setFormData({ name: "", email: "", terms: false }); setFormStatus("idle"); }}
                  className="px-6 py-3 border border-primary font-mono text-label-caps uppercase hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  LOG ANOTHER BLUEPRINT
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
