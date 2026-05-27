import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, HardDrive, Shield } from "lucide-react";

export default function Team() {
  const [activeConsole, setActiveConsole] = useState(null);

  const team = [
    {
      id: "vandal",
      name: "VANDAL",
      role: "SYSTEM ARCHITECT",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoKh2QJs1TDumocuWElbhwz4YbWw8o1rZOfLR52GuEUEbGZIMgEnKnhkFAQA1wpJ3XDZVirtG2up_NpkhNSI09mwrxkfXR4BOpPuUUd-HSy3_m7HZiFD0Sq3BpKr34ZJHgtVRxbc1FfRRWk2xLWRDbvRkeUwgic3NRSCXO75nQBMigV2e1Ta1jsTSEezpXszR1RuRqL2yWA5qCtFRe6poiDO1PtuKoy0ZHfYccvxe9gmgSzDYa40D4mpJbGsNOnp92nU1h2jT-reF0",
      specs: {
        optimization: "99.8%",
        latency: "10ms",
        primary_tool: "NEOVIM // NEXTJS",
        threat_level: "OPTIMAL"
      },
      logs: [
        "> INITIALIZING ARCHITECTURE...",
        "> HEAP ALLOCATION STABLE",
        "> COMPILING PRODUCTION ASSETS...",
        "> CORE STATUS: ACTIVE"
      ]
    },
    {
      id: "syntax",
      name: "SYNTAX",
      role: "COMPILER CORE",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsMKJ1WuvJsDOaTvu2achGIzR_xrdhMfGQQoiAa4NeU2cpHR7SxaQhfNkvfCp0GNchXk1wUtwVEg2jLOLfE787NLIS5jBluuJ60IADi12j8eZLt6X1xylQdC0MocTlXMJtF7a9Exy6G8up0cAmFV_og-kEgvxwLyDr4eZwVJnaqbjWRi1_w2AQDqiIXvWcWNZgR8_BCM5hT8kQM14fXcLT7kdNWqK2ZZ4fltlINzU-B7pjL5sP17FLjpUGXnDg1-NcSVPAnrLjVgDZ",
      specs: {
        optimization: "99.9%",
        latency: "8ms",
        primary_tool: "RUST // WEBGL",
        threat_level: "SECURE"
      },
      logs: [
        "> INITIALIZING COMPILER...",
        "> CONNECTING TO CLOUD WORKSPACE...",
        "> RUNNING UNIT TESTS... 100% OK",
        "> SYNTAX READY // COMPILER COMPILED"
      ]
    },
    {
      id: "matrix",
      name: "MATRIX",
      role: "SHADER ARTIST",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTEunwGiIHK5zSy6DsplUyUSaqh_3NtqJb252HDyLXxXIg9dakQr6P8FgE0XBg9ZmyA5akPMhmRYDij0Lbr_3bts3gwpblEunFGNclBB2OpU25v0S8UlecWqVi71BqXfCG83Cy2EqcZNQbG_urvBSgPkY0a3fSg36BqAo1hF62rTDbuhkF1KvzKrlW6Zh2nd-ETsbnFMFGNTvfJ9FfxfnqMXOVKHq7AkIiAWfmmct5N0kLUOsrysi5fT9YnFf4k0elHbNse0LDkPjG",
      specs: {
        optimization: "99.5%",
        latency: "12ms",
        primary_tool: "THREE.JS // GLSL",
        threat_level: "ELEVATED"
      },
      logs: [
        "> BOOTING WEBGL CANVAS...",
        "> DRAWING BLUEPRINT SCHEMATICS...",
        "> COMPILING SHADERS...",
        "> MATRIX ACTIVE // 60 FPS STABLE"
      ]
    }
  ];

  const handleToggleConsole = (id) => {
    setActiveConsole(activeConsole === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full select-none bg-background"
    >
      {/* Title Header */}
      <section className="p-6 md:p-12 border-b-thick border-primary bg-surface-container-lowest select-none">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h1 className="font-display text-[50px] md:text-display-xl font-black uppercase leading-none text-primary">
              TEAM PROTOCOL
            </h1>
            <p className="font-mono text-body-lg text-secondary border-l-thick border-primary pl-8 uppercase leading-relaxed mt-8">
              A highly specialized squad of digital industrializers. Handcrafting clean high-performance assets. No compromises.
            </p>
          </div>
          <span className="font-mono text-label-caps bg-primary text-white px-4 py-2 font-bold select-none">
            REVISION.4.2.0
          </span>
        </div>
      </section>

      {/* Grid of Team Cards */}
      <section className="max-w-[1440px] mx-auto border-x-thick border-b-thick border-primary p-6 md:p-12 select-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member) => {
            const isConsoleOpen = activeConsole === member.id;
            
            return (
              <div 
                key={member.id}
                className="border-thick border-primary bg-white neo-shadow flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Header */}
                <div className="relative overflow-hidden h-[300px] border-b-thick border-primary pointer-events-none select-none">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover grayscale brightness-90 transition-all duration-300"
                    src={member.avatar}
                  />
                  <span className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 font-mono text-[10px] font-bold">
                    {member.role}
                  </span>
                </div>

                {/* Info and interaction panel */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6 select-none">
                    <h2 className="font-display text-headline-md font-black uppercase text-primary">
                      {member.name}
                    </h2>
                    <button
                      onClick={() => handleToggleConsole(member.id)}
                      className={`w-10 h-10 border border-primary flex items-center justify-center cursor-pointer transition-colors ${
                        isConsoleOpen ? "bg-primary text-white" : "bg-background hover:bg-primary hover:text-white"
                      }`}
                    >
                      <Terminal size={18} />
                    </button>
                  </div>

                  {/* Specification Table */}
                  <div className="space-y-2 font-mono text-[11px] text-secondary select-none uppercase">
                    <div className="flex justify-between border-b border-primary/20 pb-1">
                      <span className="flex items-center gap-1"><Cpu size={12} /> ENGINE_OPT</span>
                      <span className="text-primary font-bold">{member.specs.optimization}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/20 pb-1">
                      <span className="flex items-center gap-1"><HardDrive size={12} /> NET_LATENCY</span>
                      <span className="text-primary font-bold">{member.specs.latency}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/20 pb-1">
                      <span className="flex items-center gap-1"><Shield size={12} /> TOOLKIT</span>
                      <span className="text-primary font-bold">{member.specs.primary_tool}</span>
                    </div>
                  </div>
                </div>

                {/* Embedded Terminal Console */}
                <AnimatePresence>
                  {isConsoleOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="bg-primary text-on-secondary font-mono text-[10px] p-6 border-t-thick border-primary overflow-hidden"
                    >
                      <div className="text-on-tertiary-container mb-2 uppercase select-none font-bold">
                        &gt; DEBUGGER CONSOLE: ACTIVE
                      </div>
                      <div className="space-y-1 uppercase leading-normal">
                        {member.logs.map((log, idx) => (
                          <div key={idx} className="opacity-95">{log}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
