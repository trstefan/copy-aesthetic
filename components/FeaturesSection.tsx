import { Zap, Palette, Monitor, Wand2, ArrowRight } from "lucide-react";
import Link from "next/link";
const FeaturesSection = () => {
  return (
    <section className="py-24 px-12 relative bg-slate-900/40 backdrop-blur-sm border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Built for Modern Designers
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Bridge the gap between abstract ideas and concrete implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Palette,
              title: "Start with production-ready design systems",
              desc: "Don't start from zero. Explore curated languages from Neo-Brutalism to high-end Glassmorphism.",
              outcome: "Save 4+ hours of concepting",
              color: "text-pink-400",
            },
            {
              icon: Monitor,
              title: "Preview real UI states before writing code",
              desc: "See how your chosen aesthetic looks on dashboard components and mobile interfaces immediately.",
              outcome: "Instant visual confirmation",
              color: "text-blue-400",
            },
            {
              icon: Wand2,
              title: "Generate production-ready prompts",
              desc: "One click to generate rich, descriptive prompts for Midjourney or LLM coding assistants.",
              outcome: "Pixel-perfect AI generation",
              color: "text-purple-400",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 reveal-on-scroll"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${feature.color}`}
              >
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                {feature.desc}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <Zap size={14} fill="currentColor" />
                {feature.outcome}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center reveal-on-scroll delay-200">
          <Link
            href="/theme-preview"
            className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors group"
          >
            Browse All Aesthetics{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
