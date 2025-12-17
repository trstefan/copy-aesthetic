"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MockUI from "../components/MockUI";
import { THEMES } from "../constants";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PromptShowcase from "@/components/PromptShowcase";
import Workflow from "@/components/Workflow";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

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
        {/* HERO SECTION */}
        <FeaturesSection />
        <Workflow />
        <PromptShowcase showcaseStyled={showcaseStyled} />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
