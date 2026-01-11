import React from "react";
import { Cpu, Sparkles, Zap } from "lucide-react";
import MockUI from "./MockUI";
import { THEMES } from "@/constants";

interface PromptShowcaseProps {
  showcaseStyled: boolean;
}

const PromptShowcase = ({ showcaseStyled }: PromptShowcaseProps) => {
  return (
    <section className="py-24 px-12 bg-slate-950/80 backdrop-blur-xl relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
              <Cpu size={14} /> Tangible Results
            </div>
            <h2 className="text-4xl font-bold mb-6">
              From abstract idea to{" "}
              <span className="text-indigo-400">detailed precision</span>.
            </h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed">
              Don't just say "minimalist." Our engine helps you define the exact
              lighting, texture, and spacing logic needed for high-fidelity
              outputs.
            </p>

            <div className="space-y-4">
              <div
                className={`p-6 rounded-2xl bg-white/5 border transition-all duration-700 ${
                  !showcaseStyled
                    ? "border-white/40 shadow-lg scale-[1.02]"
                    : "border-white/10 opacity-60"
                }`}
              >
                <div className="text-xs text-slate-500 font-bold uppercase mb-2">
                  Basic Input
                </div>
                <p className="text-slate-300 italic">
                  "A clean cyberpunk dashboard."
                </p>
              </div>

              {/* Transition Arrow / Sparkle */}
              <div className="flex justify-center py-2 relative">
                <div
                  className={`transition-all duration-500 ${
                    showcaseStyled ? "opacity-100 scale-110" : "opacity-30"
                  }`}
                >
                  <Sparkles className="text-cyan-400 animate-pulse" size={24} />
                </div>
                <div
                  className={`absolute inset-0 bg-cyan-400/20 blur-xl transition-opacity duration-1000 ${
                    showcaseStyled ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>

              <div
                className={`p-1 rounded-2xl bg-linear-to-r from-blue-600 to-pink-600 transition-all duration-700 ${
                  showcaseStyled
                    ? "shadow-[0_0_50px_rgba(34,211,238,0.3)] scale-[1.02]"
                    : "opacity-40"
                }`}
              >
                <div className="p-6 rounded-[calc(1rem-1px)] bg-slate-900">
                  <div className="text-xs text-pink-400 font-bold uppercase mb-2 flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Zap size={14} fill="currentColor" />
                      Gemini Enhanced Prompt
                    </span>
                    {showcaseStyled && (
                      <span
                        className="text-[10px] animate-pulse"
                        role="status"
                        aria-live="polite"
                      >
                        APPLYING STYLE...
                      </span>
                    )}
                  </div>
                  <p className="text-white text-sm leading-relaxed font-mono">
                    "High-fidelity cyberpunk UI dashboard, deep charcoal
                    (#09090b) background with neon cyan (#06b6d4) glows,
                    monospaced typography, 4px border radius, glassmorphic
                    containers with 15px box shadows, technical data
                    visualizations."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center reveal-on-scroll delay-200">
            <div className="relative group perspective-[1500px]">
              {/* Scanning Beam Effect */}
              {showcaseStyled && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent z-50 animate-[scan_3s_infinite] shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
              )}

              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-pink-500/20 transition-colors duration-1000"></div>

              {/* The UI Transformation Container */}
              <div className="relative p-2 bg-white/10 rounded-[3.5rem] backdrop-blur-3xl border border-white/20 shadow-2xl transition-all duration-1000 overflow-hidden min-h-[600px] w-full max-w-[320px]">
                {/* BASIC/WIREFRAME STATE */}
                <div
                  className={`absolute inset-0 p-8 transition-opacity duration-1000 bg-slate-200 z-10 ${
                    showcaseStyled
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col h-full space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-300"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-slate-300 rounded"></div>
                        <div className="h-3 w-20 bg-slate-300 rounded"></div>
                      </div>
                    </div>
                    <div className="h-32 w-full bg-slate-300 rounded-lg"></div>
                    <div className="space-y-4">
                      <div className="h-4 w-full bg-slate-300 rounded"></div>
                      <div className="h-4 w-full bg-slate-300 rounded"></div>
                      <div className="h-4 w-2/3 bg-slate-300 rounded"></div>
                    </div>
                    <div className="mt-auto h-12 w-full bg-slate-400 rounded-lg"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/80 px-4 py-2 rounded-full text-slate-800 text-xs font-bold shadow-sm uppercase tracking-tighter">
                      Basic Wireframe
                    </span>
                  </div>
                </div>

                {/* THEMED/ENHANCED STATE */}
                <div
                  className={`transition-all duration-1000 transform ${
                    showcaseStyled
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <MockUI theme={THEMES[1]} isMobile={true} />
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute -right-4 lg:-right-10 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-4 transition-all duration-700 ${
                  showcaseStyled
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-cyan-500/50 text-[10px] text-cyan-400 font-mono">
                  primary: {THEMES[1].colors.accent}
                </div>
                <div className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-cyan-500/50 text-[10px] text-cyan-400 font-mono uppercase">
                  style: {THEMES[1].id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
    </section>
  );
};

export default PromptShowcase;
