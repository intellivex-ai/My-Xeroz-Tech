import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Terminal, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", specs: "" });
  const [compilingLog, setCompilingLog] = useState([]);
  const [step, setStep] = useState("form"); // form, compiling, success

  const logsSequence = [
    "> INITIALIZING CONNECTION PROTOCOL...",
    "> RESOLVING EMAIL INGEST HOSTNAME... OK",
    "> AUTHENTICATING ENCRYPTED CHANNEL...",
    "> CHANNEL ESTABLISHED // SECURE (AES-256)",
    "> COMPILING BLUEPRINT SPECIFICATION PAYLOAD...",
    "> ENCAPSULATING METADATA LOGS...",
    "> DISPATCHING PAYLOAD TO ENGINE COORDINATES...",
    "> DEPLOYMENT COMPLETED SUCCESS // hello@xerox.tech (STATUS: 200 OK)"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.specs) {
      alert("ERROR: COMPLY WITH ALL PROTOCOLS FIRST.");
      return;
    }

    setStep("compiling");
    setCompilingLog([]);
  };

  useEffect(() => {
    if (step !== "compiling") return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < logsSequence.length) {
        setCompilingLog((prev) => [...prev, logsSequence[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStep("success");
        }, 1000);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-background select-none min-h-[85vh] flex flex-col justify-center"
    >
      <section className="max-w-[1440px] mx-auto border-x-thick border-b-thick border-primary p-6 md:p-12 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Informational Column */}
          <div className="md:col-span-5 select-none">
            <span className="font-mono text-label-caps text-secondary font-bold block mb-4">
              [ INTIATION PROTOCOL ]
            </span>
            <h1 className="font-display text-[48px] md:text-[80px] font-black uppercase leading-[0.9] mb-8 text-primary">
              INITIATE
              <br />
              CONTACT
            </h1>
            <p className="font-mono text-body-lg text-secondary uppercase leading-relaxed mb-8">
              Send us your technical blueprints, MVP outlines, or platform specifications. Our compiler parses requests instantly.
            </p>
            <div className="space-y-4 font-mono text-[11px] uppercase text-secondary">
              <div className="border-t border-primary/20 pt-2 flex justify-between">
                <span>SYSTEM COORDINATES</span>
                <span className="font-bold text-primary">52.5200° N, 13.4050° E</span>
              </div>
              <div className="border-t border-primary/20 pt-2 flex justify-between">
                <span>COMPILER AGENT</span>
                <span className="font-bold text-primary">AGENT_XEROX_CORE_V4</span>
              </div>
            </div>
          </div>

          {/* Form / Terminal Interface */}
          <div className="md:col-span-7 bg-white border-thick border-primary p-8 neo-shadow relative overflow-hidden min-h-[500px] flex flex-col justify-between">
            
            {step === "form" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between items-center mb-4 border-b border-primary/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} />
                    <span className="font-mono text-[11px] font-bold text-primary uppercase">SPECS COMPILER V4</span>
                  </div>
                  <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">INPUT READY</span>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-label-caps font-bold text-primary">CLIENT NAME</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-thick border-primary p-4 font-mono text-body-md focus:outline-none focus:bg-surface-container-low transition-colors rounded-none"
                    placeholder="ENTER SPECIFICATION REGISTER NAME"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-label-caps font-bold text-primary">EMAIL NODE</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border-thick border-primary p-4 font-mono text-body-md focus:outline-none focus:bg-surface-container-low transition-colors rounded-none"
                    placeholder="ENTER REGISTERED EMAIL NODE"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-label-caps font-bold text-primary">BLUEPRINT SPECIFICATIONS / MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    value={form.specs}
                    onChange={(e) => setForm({ ...form, specs: e.target.value })}
                    className="w-full border-thick border-primary p-4 font-mono text-body-md focus:outline-none focus:bg-surface-container-low transition-colors rounded-none"
                    placeholder="COMPOSE BLUEPRINT SPECS..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-secondary py-5 font-display text-headline-md font-bold uppercase hover:bg-white hover:text-primary border-thick border-primary transition-all flex items-center justify-center gap-3 cursor-pointer active:translate-y-[2px]"
                >
                  <Send size={18} />
                  COMPILE & SEND PROTOCOL
                </button>
              </form>
            )}

            {step === "compiling" && (
              <div className="flex-grow flex flex-col justify-between font-mono bg-primary text-on-secondary p-6 h-[400px] select-none border border-primary overflow-y-auto custom-scrollbar-none">
                <div>
                  <div className="text-on-tertiary-container mb-4 font-bold border-b border-on-secondary/15 pb-2 flex justify-between uppercase text-[10px]">
                    <span>&gt; RUNNING BLUEPRINT COMPILER SECTOR_9</span>
                    <span className="animate-pulse text-error">COMPILING</span>
                  </div>
                  <div className="space-y-2 text-[11px] uppercase tracking-wider leading-relaxed">
                    {compilingLog.map((log, idx) => (
                      <div key={idx} className="opacity-95">{log}</div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 text-on-tertiary-container text-[9px] uppercase tracking-widest text-right font-bold">
                  AGENT CODE COMPILING STATUS: {(compilingLog.length / logsSequence.length * 100).toFixed(0)}%
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="flex-grow flex flex-col items-center justify-center font-mono py-12 text-center select-none gap-6 animate-fade-in">
                <div className="w-20 h-20 bg-primary text-white flex items-center justify-center border-thick border-primary neo-shadow">
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h5 className="font-display text-headline-md font-black uppercase text-primary">
                    PAYLOAD DELIVERED // OK
                  </h5>
                  <p className="font-mono text-body-lg text-secondary mt-2 uppercase max-w-sm mx-auto leading-relaxed">
                    our servers have received your blueprint package. Agent Vandals will inspect it shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setForm({ name: "", email: "", specs: "" });
                    setStep("form");
                  }}
                  className="px-6 py-3 border border-primary font-mono text-label-caps uppercase hover:bg-primary hover:text-white transition-colors cursor-pointer font-bold mt-4"
                >
                  COMPILE NEW TRANSMISSION
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Fade-in keyframe directly inside to prevent any setup gaps */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
}
