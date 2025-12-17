import React from "react";
import { Layout, Monitor, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { useIntersectionReveal } from "@/hooks/useIntersactionReveal";

const Workflow = () => {
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(0);

  useIntersectionReveal();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkflowStep((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-white">
              Streamlined <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                Creative Workflow
              </span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  id: 0,
                  title: "Select a Theme",
                  desc: "Browse our gallery of distinct design languages.",
                  icon: Layout,
                },
                {
                  id: 1,
                  title: "Preview Logic",
                  desc: "Check contrast, spacing, and vibe on real UI components.",
                  icon: Monitor,
                },
                {
                  id: 2,
                  title: "Enhance & Export",
                  desc: "Use Gemini AI to expand the prompt, then copy to your tools.",
                  icon: Terminal,
                },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full text-left flex items-center gap-6 p-6 rounded-2xl transition-all duration-500 border relative group overflow-hidden ${
                    currentWorkflowStep === i
                      ? "bg-white/10 border-white/20 shadow-[0_0_40px_rgba(34,211,238,0.15)] scale-105"
                      : "bg-transparent border-transparent opacity-40 hover:opacity-80"
                  }`}
                  onClick={() => setCurrentWorkflowStep(i)}
                >
                  <div
                    className={`text-4xl font-black font-mono transition-colors duration-300 ${
                      currentWorkflowStep === i
                        ? "text-cyan-400/20"
                        : "text-slate-800"
                    }`}
                  >
                    0{i + 1}
                  </div>
                  <div
                    className={`p-3 rounded-xl transition-colors duration-300 ${
                      currentWorkflowStep === i
                        ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                        currentWorkflowStep === i
                          ? "text-white"
                          : "text-slate-300"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                  {currentWorkflowStep === i && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 h-[350px] md:h-[450px] relative rounded-4xl border border-white/10 bg-slate-950 overflow-hidden shadow-2xl reveal-on-scroll delay-200">
            {/* Synchronized Scenes */}
            <div
              className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-700 ${
                currentWorkflowStep === 0
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-2 gap-4 w-48 relative">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${
                      i === 1
                        ? "bg-indigo-500/20 border-indigo-500 scale-110 shadow-2xl shadow-indigo-500/30"
                        : "bg-white/5 border-white/5 opacity-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${
                        i === 1 ? "bg-indigo-500" : "bg-slate-700"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-indigo-400 font-mono text-sm tracking-widest uppercase animate-pulse">
                Scanning Styles...
              </p>
            </div>

            <div
              className={`absolute inset-0 p-8 flex items-center justify-center transition-all duration-700 ${
                currentWorkflowStep === 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 pointer-events-none"
              }`}
            >
              <div className="w-64 bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-2xl transform rotate-3 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-purple-500"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-slate-600 rounded"></div>
                    <div className="h-2 w-16 bg-slate-700 rounded"></div>
                  </div>
                </div>
                <div className="h-24 bg-slate-900/50 rounded-xl mb-4"></div>
                <div className="h-10 bg-pink-500 rounded-lg"></div>
                <div className="absolute -top-4 -right-8 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">
                  PREVIEW OK
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 p-8 flex items-center justify-center transition-all duration-700 ${
                currentWorkflowStep === 2
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 pointer-events-none"
              }`}
            >
              <div className="w-full max-w-sm bg-[#0d1117] rounded-xl border border-slate-800 p-6 font-mono text-xs shadow-2xl">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="space-y-3">
                  <p className="text-slate-500 italic">
                    // Generating optimized prompt...
                  </p>
                  <p className="text-blue-400">
                    style:{" "}
                    <span className="text-yellow-300">"Glassmorphism"</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    High-fidelity UI, frosted textures, soft blue mesh
                    gradients, white semi-transparent cards...
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-emerald-400">
                    ➜{" "}
                    <span className="text-white bg-emerald-500/20 px-2 py-1 rounded">
                      Copied to clipboard
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
