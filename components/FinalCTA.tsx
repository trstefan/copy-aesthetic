import React from "react";
import { Zap } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>
      <div className="container mx-auto px-6 text-center relative z-10 reveal-on-scroll">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
          Start your next project with <br className="hidden md:block" />{" "}
          perfect visual clarity.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-10 py-5 bg-white text-slate-900 rounded-full text-xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3">
            Launch Previewer <Zap size={20} fill="currentColor" />
          </button>
          <button className="px-10 py-5 bg-slate-900 border border-white/20 text-white rounded-full text-xl font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
            See Docs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
