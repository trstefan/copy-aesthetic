import React from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>
      <div className="container mx-auto px-6 text-center relative z-10 reveal-on-scroll">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
          Start your next project with <br className="hidden md:block" />{" "}
          perfect visual clarity.
        </h2>
        <div className="flex items-center justify-center">
          <Link
            href="/theme-preview"
            className="px-10 py-5 bg-white text-slate-900 rounded-full text-xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 hover:cursor-pointer"
          >
            Launch Previewer <Zap size={20} fill="currentColor" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
