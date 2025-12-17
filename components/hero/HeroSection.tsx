"use client";

import { useIntersectionReveal } from "@/hooks/useIntersactionReveal";
import HeroCarousel from "./HeroCarousel";
import HeroContent from "./HeroContent";

export default function HeroSection() {
  useIntersectionReveal();

  return (
    <section className="container relative z-10 mx-auto px-4 min-h-screen flex items-center">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 w-full">
        <HeroContent />
        <HeroCarousel />
      </div>
    </section>
  );
}
