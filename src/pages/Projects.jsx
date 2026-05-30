import Marquee from "../components/Marquee";
import { ArrowUpRight, ArrowRight, Star, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../components/useReveal";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Header Marquee Ticker */}
      <section className="bg-primary text-on-secondary py-2 select-none overflow-hidden">
        <Marquee 
          text="CAROSELLING // BRUTALISM FRAMEWORK // XEROX APP // " 
          speed={18} 
          bgClass="bg-transparent text-white border-b-0"
          fontSizeClass="font-display text-headline-md font-bold uppercase italic py-2"
        />
      </section>

      {/* Main Multi-grid Bento Container */}
      <main className="w-full px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-0 border-x-thick border-primary max-w-[1440px] mx-auto bg-background min-h-screen">
        {/* Rotated Sidebar status */}
        <div className="md:col-span-1 border-r-thin border-primary flex flex-col justify-between items-center py-10 select-none min-h-[500px] md:min-h-auto">
          <div className="rotate-[-90deg] whitespace-nowrap font-mono text-label-caps text-primary origin-center w-0 flex items-center gap-4 py-8 font-bold">
            <ArrowUpRight size={18} />
            SCROLL_TO_EXPLORE
          </div>
          <div className="font-mono text-label-caps border-primary border-2 p-3 flex flex-col gap-4 text-center font-bold bg-white neo-shadow-sm select-none">
            <span>01</span>
            <span>/</span>
            <span>03</span>
          </div>
        </div>

        {/* Bento Content Panels */}
        <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-10 border-l-thin border-primary bg-background">
          
          {/* Header Hero Section */}
          <div className="md:col-span-10 border-b-thick border-primary p-6 md:p-12 bg-surface-container-lowest select-none">
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

          {/* Project 01 Column (Caroselling) */}
          <div ref={useReveal()} className="md:col-span-6 border-b-thick border-r-0 md:border-r-thick border-primary group cursor-crosshair reveal">
            <div className="relative overflow-hidden border-b-thin border-primary h-[400px] md:h-[600px] select-none pointer-events-none">
              <img
                alt="Caroselling Project"
                className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 img-reveal"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add("loaded")}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsuFiBeFJcZ5m7EC75qFjQlmh7FhyyCT75uGCi3mSzMNmvLt-JFkTID6pfAdZ5Ziowu07T-xP4lswMV-bmt5Nk7tzXBXscoU882UxGJkIsSSlXHFDZimHWzaL2VUMhWfhqfInWBAI2MbvjnYQjHPIqjzUwzrgoaA1WhP8JZy6Un5Uq7iPU7S1gWCL8MhIND_urcqnOpZ-sreMMw49LZC6tuJeGio0PyepyOOZ0h7N0XKkKKVL8qRiBGX6zrI52mVJx9AGbyf-nDb3I"
              />
              <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 font-mono text-label-caps font-bold">
                01 // E-COMMERCE
              </div>
            </div>
            <div className="p-8 flex justify-between items-start select-none">
              <div>
                <h2 className="font-display text-headline-md md:text-headline-lg font-black uppercase mb-4 text-primary group-hover:underline underline-offset-8">
                  CAROSELLING
                </h2>
                <div className="flex gap-2">
                  <span className="px-2 py-1 border border-primary font-mono text-[9px] font-bold">
                    WEB ARCHITECTURE
                  </span>
                  <span className="px-2 py-1 border border-primary font-mono text-[9px] font-bold">
                    3D ASSETS
                  </span>
                </div>
              </div>
              <button 
                onClick={() => alert("INITIALIZING PROTOCOL: CAROSELLING")}
                className="w-20 h-20 rounded-full border-thick border-primary flex flex-col items-center justify-center font-mono text-label-caps hover:bg-primary hover:text-white transition-colors cursor-pointer font-bold select-none active:translate-y-[2px]"
              >
                GO
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Project 02 Detail Column */}
          <div className="md:col-span-4 border-b-thick border-primary flex flex-col justify-between">
            {/* Spec Checks */}
            <div className="p-8 border-b-thin border-primary h-full flex flex-col justify-center select-none bg-surface">
              <div className="font-mono text-label-caps mb-6 font-bold text-primary">[ SPECIFICATION ]</div>
              <ul className="space-y-4 font-mono text-body-md text-secondary">
                <li className="flex gap-4 items-start">
                  <span className="font-bold text-primary">01.</span>
                  <span className="uppercase leading-normal">Raw unstyled HTML semantics leveraged for performance.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="font-bold text-primary">02.</span>
                  <span className="uppercase leading-normal">Hard-grid systems with zero-pixel gutters.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="font-bold text-primary">03.</span>
                  <span className="uppercase leading-normal">High-contrast monochromatic visual language.</span>
                </li>
              </ul>
            </div>
            
            {/* Framework Link Block */}
            <div 
              onClick={() => alert("INITIALIZING PROTOCOL: BRUTALISM FRAMEWORK")}
              className="p-8 bg-primary text-on-secondary h-auto group cursor-pointer relative overflow-hidden select-none border-t border-primary"
            >
              <span className="font-mono text-label-caps mb-2 text-on-tertiary-container font-bold block">
                02 // FRAMEWORK
              </span>
              <h3 className="font-display text-headline-md font-black uppercase mb-8 leading-none">
                BRUTALISM
                <br />
                FRAMEWORK
              </h3>
              <div className="flex justify-between items-center select-none">
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 border-2 border-primary bg-surface-container flex items-center justify-center overflow-hidden pointer-events-none">
                    <img
                      className="grayscale pointer-events-none img-reveal"
                      alt="Processor"
                      loading="lazy"
                      onLoad={(e) => e.currentTarget.classList.add("loaded")}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoKh2QJs1TDumocuWElbhwz4YbWw8o1rZOfLR52GuEUEbGZIMgEnKnhkFAQA1wpJ3XDZVirtG2up_NpkhNSI09mwrxkfXR4BOpPuUUd-HSy3_m7HZiFD0Sq3BpKr34ZJHgtVRxbc1FfRRWk2xLWRDbvRkeUwgic3NRSCXO75nQBMigV2e1Ta1jsTSEezpXszR1RuRqL2yWA5qCtFRe6poiDO1PtuKoy0ZHfYccvxe9gmgSzDYa40D4mpJbGsNOnp92nU1h2jT-reF0"
                    />
                  </div>
                  <div className="w-12 h-12 border-2 border-primary bg-surface-container-high flex items-center justify-center overflow-hidden pointer-events-none">
                    <img
                      className="grayscale pointer-events-none img-reveal"
                      alt="Motherboard"
                      loading="lazy"
                      onLoad={(e) => e.currentTarget.classList.add("loaded")}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX1g8YpvflbXZHC3u7QiiQfJeQkbJ4v2Yf5OSFnU_WJsS0fQt33JuvDh-UP-2PiUxK_V1T4JsGVw-SilkzCDVQQ_NhlARc1PXc5UpwMai8GLFWgcU74OKUO2gwTHeL4hdZU-aenzKFLkYP3sznV5TLyCiEDXYplCv2C12WYe_ix3pikuBG9sCfO9QKQKrvqcP2GGUEnGavx7HQPsvgiMbJfeA91fX-CvcnIxkFozAyp5lNqG8x6RkCmGOSJkJKsieNPkTEdeTKhrvi"
                    />
                  </div>
                </div>
                <ArrowRight size={36} className="group-hover:translate-x-4 transition-transform text-white" />
              </div>
            </div>
          </div>

          {/* Project 03 (Exorz App) */}
          <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 border-b-thick border-primary">
            <div className="border-r-0 md:border-r-thin border-b border-primary p-0 relative overflow-hidden h-[400px] md:h-auto select-none pointer-events-none">
              <img
                alt="Xerox App"
                className="w-full h-full object-cover grayscale img-reveal"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add("loaded")}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHSaCNcWlahMMpCdgZIilT-zjIMMVgsXILgFL01rQJEPcGokGRV2bg1HV0tg3Zk4lUsAKxD62i9P1YURk_u1vN_0DH_1t7nQvIP-Ujf_IZBBtgbLKjSM6h3FcU_uv5RNcCWUB8vUu6Cp3A146mco31ODZo1q-H7vhd2HbEBtBsGYrd5jM6KIU1DRQ1qjcXHqBxZaumvf4EDzyzBMtdJgB-ncCFXv1l6hozAnRVj8cBx083GoBQdu5x2YeYOO1j9PAm7BKC19dH64ZL"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-between bg-surface-container-lowest select-none">
              <div>
                <span className="font-mono text-label-caps text-primary mb-6 font-bold block">
                  03 // APP DESIGN
                </span>
                <h2 className="font-display text-[40px] md:text-headline-lg font-black uppercase mb-6 leading-none text-primary">
                  XEROX APP
                </h2>
                <p className="font-mono text-body-lg text-secondary mb-8 max-w-md uppercase leading-relaxed">
                  A next-generation mobile interface built for engineers. Real-time data visualization wrapped in a high-contrast industrial shell. No fluff. Just raw utility.
                </p>
              </div>
              <button 
                onClick={() => alert("INITIALIZING PROTOCOL: XEROX APP")}
                className="bg-primary text-on-secondary font-mono text-label-caps px-10 py-5 flex items-center gap-4 hover:bg-background hover:text-primary border-thin border-primary transition-all self-start cursor-pointer active:translate-y-[2px] font-bold"
              >
                VIEW CASE STUDY
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          {/* Additional Mini Archives */}
          <div ref={useReveal()} className="md:col-span-3 border-b-thick border-r-0 md:border-r-thin border-primary p-6 flex flex-col justify-between min-h-[220px] select-none bg-background hover:bg-surface-container-high transition-colors reveal hover-lift" style={{ transitionDelay: "0.1s" }}>
            <div>
              <div className="text-[10px] font-mono font-bold mb-4">[ ARCHIVE / 04 ]</div>
              <h4 className="font-display text-headline-md font-black uppercase mb-2 text-primary">NEO-GLITCH</h4>
              <p className="font-mono text-xs text-secondary uppercase leading-normal">
                Experimental typography system based on 1990s technical manuals.
              </p>
            </div>
            <div className="border-t border-primary pt-4 flex justify-between items-center select-none font-bold font-mono">
              <span className="text-[9px]">2023 REVISION</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div ref={useReveal()} className="md:col-span-4 border-b-thick border-r-0 md:border-r-thin border-primary p-6 flex flex-col justify-between min-h-[220px] select-none bg-background hover:bg-surface-container-high transition-colors reveal hover-lift" style={{ transitionDelay: "0.2s" }}>
            <div>
              <div className="text-[10px] font-mono font-bold mb-4">[ ARCHIVE / 05 ]</div>
              <h4 className="font-display text-headline-md font-black uppercase mb-2 text-primary">WIRE-F-01</h4>
              <p className="font-mono text-xs text-secondary uppercase leading-normal">
                Interactive 3D configurator for industrial hardware components.
              </p>
            </div>
            <div className="border-t border-primary pt-4 flex justify-between items-center select-none font-bold font-mono">
              <span className="text-[9px]">ACTIVE PROJECT</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div ref={useReveal()} className="md:col-span-3 border-b-thick border-primary p-6 flex flex-col justify-between min-h-[220px] select-none bg-surface-variant hover:bg-primary hover:text-white transition-colors group reveal hover-lift" style={{ transitionDelay: "0.3s" }}>
            <div>
              <div className="text-[10px] font-mono font-bold mb-4 group-hover:text-on-tertiary-container">[ ARCHIVE / 06 ]</div>
              <h4 className="font-display text-headline-md font-black uppercase mb-2 text-primary group-hover:text-white">MONO-SYNC</h4>
              <p className="font-mono text-xs text-secondary group-hover:text-surface-variant uppercase leading-normal">
                Data aggregation platform for decentralized cloud networks.
              </p>
            </div>
            <div className="border-t border-primary group-hover:border-white pt-4 flex justify-between items-center select-none font-bold font-mono">
              <span className="text-[9px]">INTERNAL TOOL</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
