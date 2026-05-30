import Marquee from "../components/Marquee";
import { ArrowUpRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../components/useReveal";

export default function Projects() {
  const navigate = useNavigate();

  const projectsList = [
    {
      num: "01",
      category: "E-COMMERCE",
      title: "CAROSELLING",
      desc: "High-performance digital artifacts. Engineered for technical superiority and uncompromising visual impact. We build logic-based ecommerce experiences.",
      chips: ["WEB ARCHITECTURE", "3D ASSETS", "NEXT.JS"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsuFiBeFJcZ5m7EC75qFjQlmh7FhyyCT75uGCi3mSzMNmvLt-JFkTID6pfAdZ5Ziowu07T-xP4lswMV-bmt5Nk7tzXBXscoU882UxGJkIsSSlXHFDZimHWzaL2VUMhWfhqfInWBAI2MbvjnYQjHPIqjzUwzrgoaA1WhP8JZy6Un5Uq7iPU7S1gWCL8MhIND_urcqnOpZ-sreMMw49LZC6tuJeGio0PyepyOOZ0h7N0XKkKKVL8qRiBGX6zrI52mVJx9AGbyf-nDb3I"
    },
    {
      num: "02",
      category: "FRAMEWORK",
      title: "BRUTALISM",
      desc: "Robust core framework leveraging raw semantic HTML and hard-grid layouts for unparalleled runtime speeds and architectural integrity.",
      chips: ["DEVELOPMENT", "CORE LOGIC", "CSS4"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoKh2QJs1TDumocuWElbhwz4YbWw8o1rZOfLR52GuEUEbGZIMgEnKnhkFAQA1wpJ3XDZVirtG2up_NpkhNSI09mwrxkfXR4BOpPuUUd-HSy3_m7HZiFD0Sq3BpKr34ZJHgtVRxbc1FfRRWk2xLWRDbvRkeUwgic3NRSCXO75nQBMigV2e1Ta1jsTSEezpXszR1RuRqL2yWA5qCtFRe6poiDO1PtuKoy0ZHfYccvxe9gmgSzDYa40D4mpJbGsNOnp92nU1h2jT-reF0"
    },
    {
      num: "03",
      category: "APP DESIGN",
      title: "XEROZ APP",
      desc: "A next-generation mobile interface built for engineers. Real-time data visualization wrapped in a high-contrast industrial shell. Zero latency.",
      chips: ["IOS/ANDROID", "FLUTTER", "SYSTEMS"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHSaCNcWlahMMpCdgZIilT-zjIMMVgsXILgFL01rQJEPcGokGRV2bg1HV0tg3Zk4lUsAKxD62i9P1YURk_u1vN_0DH_1t7nQvIP-Ujf_IZBBtgbLKjSM6h3FcU_uv5RNcCWUB8vUu6Cp3A146mco31ODZo1q-H7vhd2HbEBtBsGYrd5jM6KIU1DRQ1qjcXHqBxZaumvf4EDzyzBMtdJgB-ncCFXv1l6hozAnRVj8cBx083GoBQdu5x2YeYOO1j9PAm7BKC19dH64ZL"
    }
  ];

  const archivesList = [
    {
      num: "04",
      title: "NEO-GLITCH",
      desc: "Experimental typography system based on 1990s technical manuals.",
      tag: "2023 REVISION",
      bgClass: "bg-background hover:bg-surface-container-high"
    },
    {
      num: "05",
      title: "WIRE-F-01",
      desc: "Interactive 3D configurator for industrial hardware components.",
      tag: "ACTIVE PROJECT",
      bgClass: "bg-background hover:bg-surface-container-high"
    },
    {
      num: "06",
      title: "MONO-SYNC",
      desc: "Data aggregation platform for decentralized cloud networks.",
      tag: "INTERNAL TOOL",
      bgClass: "bg-surface-variant hover:bg-primary hover:text-white"
    }
  ];

  return (
    <div className="w-full">
      {/* Header Marquee Ticker */}
      <section className="bg-primary text-on-secondary py-2 select-none overflow-hidden">
        <Marquee 
          text="CAROSELLING // BRUTALISM FRAMEWORK // XEROZ APP // " 
          speed={18} 
          bgClass="bg-transparent text-white border-b-0"
          fontSizeClass="font-display text-[26px] md:text-display-sm font-black uppercase italic py-1"
        />
      </section>

      {/* Main Container */}
      <main className="w-full px-4 md:px-12 border-x-thick border-primary max-w-[1440px] mx-auto bg-background min-h-screen">
        {/* Header Hero Section */}
        <div className="border-b-thick border-primary p-6 md:p-12 bg-surface-container-lowest select-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="max-w-3xl">
              <h1 className="font-display text-[50px] md:text-display-xl font-black uppercase leading-[0.9] mb-8 text-primary">
                SELECTED
                <br />
                WORK
              </h1>
              <p className="font-mono text-body-lg text-secondary border-l-thick border-primary pl-8 leading-relaxed uppercase">
                High-performance digital artifacts. Engineered for technical superiority and uncompromising visual impact. We build the architecture of the future.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3 self-end">
              <div className="w-24 h-24 bg-primary text-white flex items-center justify-center border-thick border-primary neo-shadow">
                <Star size={36} fill="white" />
              </div>
              <span className="font-mono text-label-caps bg-primary text-white px-4 py-2 font-bold select-none">
                ARCHIVE.2024
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
                ref={useReveal({ threshold: 0.1 })}
                className="grid grid-cols-1 md:grid-cols-2 border-b-thick border-primary group reveal"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden border-b-thin md:border-b-0 ${isEven ? "md:border-r-thick" : "md:order-last md:border-l-thick"} border-primary h-[350px] md:h-[500px] select-none pointer-events-none`}>
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 img-reveal"
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add("loaded")}
                    src={project.img}
                  />
                  <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 font-mono text-label-caps font-bold">
                    {project.num} // {project.category}
                  </div>
                </div>
                
                {/* Content Block */}
                <div className="p-8 md:p-12 flex flex-col justify-between select-none bg-surface-container-lowest">
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
                        <span key={chip} className="px-2 py-1 border border-primary font-mono text-[10px] font-bold">
                          {chip}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => alert(`INITIALIZING PROTOCOL: ${project.title}`)}
                      className="bg-primary text-on-secondary font-mono text-label-caps px-8 py-4 flex items-center gap-2 hover:bg-background hover:text-primary border-thin border-primary transition-all cursor-pointer font-bold active:translate-y-[2px] self-start"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 border-b-thick border-primary bg-background">
          {archivesList.map((archive, idx) => (
            <div 
              key={archive.num}
              ref={useReveal()}
              className={`border-b-thick lg:border-b-0 lg:border-r-thick last:border-r-0 lg:last:border-b-0 border-primary p-6 flex flex-col justify-between min-h-[220px] select-none transition-colors reveal hover-lift group ${archive.bgClass}`}
              style={{ transitionDelay: `${(idx + 1) * 0.1}s` }}
            >
              <div>
                <div className="text-[10px] font-mono font-bold mb-4 group-hover:text-on-tertiary-container transition-colors">[ ARCHIVE / {archive.num} ]</div>
                <h4 className="font-display text-headline-md font-black uppercase mb-2 text-primary group-hover:text-white transition-colors">{archive.title}</h4>
                <p className="font-mono text-xs text-secondary group-hover:text-surface-variant uppercase leading-normal transition-colors">
                  {archive.desc}
                </p>
              </div>
              <div className="border-t border-primary group-hover:border-white pt-4 flex justify-between items-center select-none font-bold font-mono transition-colors">
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
