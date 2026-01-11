import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

const HeroContent = () => {
  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="flex-1 px-12 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left pt-8 sm:pt-10 lg:pt-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
        <span className="block reveal-on-scroll">Design.</span>
        <span className="block reveal-on-scroll delay-100 text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 text-gradient-animate">
          Visualize.
        </span>
        <span className="block reveal-on-scroll delay-200">Prompt.</span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed reveal-on-scroll delay-300">
        Stop imagining, start creating. Switch between curated UI aesthetics in
        real-time, inspect responsive components, and generate production-ready
        AI prompts instantly.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start reveal-on-scroll delay-300">
        <Link
          href="/theme-preview"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
        >
          Start Creating
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
