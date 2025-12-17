"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ArrowRight,
  Palette,
  Layers,
  Zap,
  ChevronDown,
  Code,
  Wand2,
  Share2,
  Sparkles,
  Monitor,
  Terminal,
  Layout,
  Github,
  Twitter,
  MessageSquare,
  ExternalLink,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import MockUI from "../components/MockUI";
import { THEMES } from "../constants";

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(0);

  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Select a few diverse themes for the carousel
  const showcaseThemes = [THEMES[1], THEMES[2], THEMES[3]];
  const [showcaseStyled, setShowcaseStyled] = useState(false); // Cyberpunk, Neo-Brutalism, Glassmorphism

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-rotate if user isn't interacting
      if (touchStart === null) {
        setActivePreviewIndex((prev) => (prev + 1) % showcaseThemes.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [showcaseThemes.length, touchStart]);

  // Workflow auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkflowStep((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Showcase Transformation Toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setShowcaseStyled((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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

  // Three.js Background Animation with Scroll Reactivity
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Dark background matching tailwind slate-950
    scene.background = new THREE.Color("#020617");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry Group
    const group = new THREE.Group();
    scene.add(group);

    // Create abstract shapes
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.2, 16, 100),
      new THREE.SphereGeometry(0.5, 32, 32),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        roughness: 0.3,
        metalness: 0.8,
      }), // Indigo
      new THREE.MeshStandardMaterial({
        color: 0xec4899,
        roughness: 0.2,
        metalness: 0.5,
      }), // Pink
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: true }), // Blue Wireframe
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 100,
        opacity: 0.9,
        transparent: true,
      }), // Glass-ish
    ];

    // Add random floating objects
    const objects: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const geoIndex = Math.floor(Math.random() * geometries.length);
      const matIndex = Math.floor(Math.random() * materials.length);
      const mesh = new THREE.Mesh(geometries[geoIndex], materials[matIndex]);

      // Spread them out more for scrolling
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );

      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      const scale = Math.random() * 0.5 + 0.2;
      mesh.scale.set(scale, scale, scale);

      group.add(mesh);
      objects.push(mesh);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xec4899, 2, 50); // Pink light
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const scrollY = window.scrollY;
      const scrollProgress =
        scrollY / (document.body.scrollHeight - window.innerHeight);

      // Rotate entire group slowly + scroll influence
      group.rotation.y += 0.002 + scrollY * 0.0002;
      group.rotation.x += 0.001 + scrollY * 0.0001;

      // Move camera slightly based on scroll to create depth
      camera.position.y = -scrollY * 0.005;

      // Parallax effect based on mouse
      group.rotation.y += mouseX * 0.01;
      group.rotation.x += mouseY * 0.01;

      // Individual object animation
      objects.forEach((obj, i) => {
        obj.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1);
        obj.rotation.y += 0.01 * (i % 3 === 0 ? 1 : -1);
        obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005; // Floating
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    };
  }, []);

  // Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      setActivePreviewIndex((prev) => (prev + 1) % showcaseThemes.length);
    }

    if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      setActivePreviewIndex(
        (prev) => (prev - 1 + showcaseThemes.length) % showcaseThemes.length
      );
    }
  };

  return (
    <div className="relative w-full bg-slate-950 text-white selection:bg-pink-500/30">
      {/* Fixed 3D Canvas Background */}
      <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Overlay Gradient for readability - Increased opacity for better contrast */}
      <div className="fixed inset-0 bg-linear-to-b from-slate-950/40 via-slate-950/80 to-slate-950 z-0 pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <div className="relative z-10">
        {/* HERO SECTION */}

        <section className="container mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-center relative py-16 sm:py-20 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Left Column: Content */}
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left pt-8 sm:pt-10 lg:pt-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="block reveal-on-scroll">Design.</span>
                <span className="block reveal-on-scroll delay-100 text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 text-gradient-animate">
                  Visualize.
                </span>
                <span className="block reveal-on-scroll delay-200">
                  Prompt.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed reveal-on-scroll delay-300">
                Stop imagining, start creating. Switch between curated UI
                aesthetics in real-time, inspect responsive components, and
                generate production-ready AI prompts instantly.
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

            {/* Right Column: Animated Carousel Showcase */}
            {/* Adjusted to use min-height for better responsiveness */}
            <div
              className="flex-1 w-full max-w-full lg:max-w-[500px] perspective:-[1000px] relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center reveal-on-scroll delay-200 touch-pan-y mt-8 lg:mt-0"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full animate-pulse pointer-events-none"></div>

              {showcaseThemes.map((theme, index) => {
                const isActive = index === activePreviewIndex;
                let translateZ = 0;
                let rotateY = 0;
                let opacity = 0;
                let translateX = "0%"; // Use string for % logic

                if (isActive) {
                  opacity = 1;
                  translateZ = 0;
                  rotateY = 0;
                  translateX = "0%";
                } else if (
                  index ===
                  (activePreviewIndex + 1) % showcaseThemes.length
                ) {
                  opacity = 0.4;
                  translateZ = -100;
                  rotateY = -15;
                  translateX = "20%"; // Responsive offset
                } else {
                  opacity = 0.4;
                  translateZ = -100;
                  rotateY = 15;
                  translateX = "-20%"; // Responsive offset
                }

                return (
                  <div
                    key={theme.id}
                    className="absolute top-1/2 left-1/2 w-[260px] sm:w-[300px] lg:w-[340px] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${translateX}) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                      opacity: opacity,
                      zIndex: isActive ? 10 : 0,
                    }}
                  >
                    <div className="transform scale-[0.65] sm:scale-[0.75] md:scale-[0.9] lg:scale-100 origin-center shadow-2xl rounded-[3rem] ring-1 ring-white/10">
                      <MockUI theme={theme} isMobile={true} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 relative bg-slate-900/40 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 reveal-on-scroll">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Built for Modern Designers
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Bridge the gap between abstract ideas and concrete
                implementation.
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
              <button className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors group">
                Browse All Aesthetics{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section className="py-24 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
              <div className="w-full md:w-1/2 reveal-on-scroll">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
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

        {/* PROMPT SHOWCASE (Value Tangibility) - UPDATED with before/after animation */}
        <section className="py-24 bg-slate-950/80 backdrop-blur-xl relative overflow-hidden">
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
                  Don't just say "minimalist." Our engine helps you define the
                  exact lighting, texture, and spacing logic needed for
                  high-fidelity outputs.
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
                      <Sparkles
                        className="text-cyan-400 animate-pulse"
                        size={24}
                      />
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
                          <span className="text-[10px] animate-pulse">
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
                  <div className="relative p-2 bg-white/10 rounded-[3.5rem] backdrop-blur-3xl border border-white/20 shadow-2xl transition-all duration-1000 overflow-hidden min-h-[600px] w-[320px]">
                    {/* BASIC/WIREFRAME STATE */}
                    <div
                      className={`absolute inset-0 p-8 transition-opacity duration-1000 bg-slate-200 z-10 ${
                        showcaseStyled ? "opacity-0" : "opacity-100"
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
                    className={`absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 transition-all duration-700 ${
                      showcaseStyled
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-10"
                    }`}
                  >
                    <div className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-cyan-500/50 text-[10px] text-cyan-400 font-mono">
                      primary: #06b6d4
                    </div>
                    <div className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-cyan-500/50 text-[10px] text-cyan-400 font-mono">
                      shadow: neon-cyan
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

        {/* FINAL CTA SECTION */}
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

        {/* FOOTER */}
        <footer className="py-16 border-t border-white/5 bg-slate-950 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-2">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 mb-6">
                  ChromaPrompt
                </div>
                <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                  The professional playground for exploring user interface
                  aesthetics and generating AI-powered design prompts.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <MessageSquare size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
                  Platform
                </h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li>
                    <button className="hover:text-white transition-colors">
                      Browse Themes
                    </button>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Prompt Engine
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      API Docs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
                  Resources
                </h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      Design Guide <ExternalLink size={12} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Roadmap
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <p>© 2025 ChromaPrompt. Built with Gemini AI.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
