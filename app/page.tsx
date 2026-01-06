"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PromptShowcase from "@/components/PromptShowcase";
import Workflow from "@/components/Workflow";
import FeaturesSection from "@/components/FeaturesSection";
import PageShell from "@/components/layout/PageShell";
import ThreeBackground from "@/components/backgroud/ThreeBackground";
import HeroSection from "@/components/hero/HeroSection";

export default function Home() {
  const [showcaseStyled, setShowcaseStyled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowcaseStyled((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (

    <PageShell>
      {/* Fixed 3D Canvas Background */}
      {/* Overlay Gradient for readability - Increased opacity for better contrast */}
      <ThreeBackground />
      {/* Main Content Wrapper */}
      <HeroSection />
      <FeaturesSection />
      <Workflow />
      <PromptShowcase showcaseStyled={showcaseStyled} />
      <FinalCTA />
      <Footer />
    </PageShell>
  );
}
