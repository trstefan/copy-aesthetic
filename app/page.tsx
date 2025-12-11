'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  ArrowRight, Palette, Layers, Zap, ChevronDown, 
  Code, Wand2, Share2, Sparkles, Monitor, Terminal, Layout 
} from 'lucide-react';
import Link from 'next/link';
import MockUI from '../components/MockUI';
import { THEMES } from '../constants';

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(0);

  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Select a few diverse themes for the carousel
  const showcaseThemes = [THEMES[1], THEMES[2], THEMES[3]]; // Cyberpunk, Neo-Brutalism, Glassmorphism

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

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Three.js Background Animation with Scroll Reactivity
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Dark background matching tailwind slate-950
    scene.background = new THREE.Color('#020617'); 
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
      new THREE.SphereGeometry(0.5, 32, 32)
    ];

    const materials = [
        new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.3, metalness: 0.8 }), // Indigo
        new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.2, metalness: 0.5 }), // Pink
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: true }), // Blue Wireframe
        new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100, opacity: 0.9, transparent: true }) // Glass-ish
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
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const scrollY = window.scrollY;
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);

      // Rotate entire group slowly + scroll influence
      group.rotation.y += 0.002 + (scrollY * 0.0002);
      group.rotation.x += 0.001 + (scrollY * 0.0001);

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
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
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
      setActivePreviewIndex((prev) => (prev - 1 + showcaseThemes.length) % showcaseThemes.length);
    }
  };

  return (
    <div className="relative w-full bg-slate-950 text-white selection:bg-pink-500/30">
      {/* Fixed 3D Canvas Background */}
      <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* Overlay Gradient for readability - Increased opacity for better contrast */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950 z-0 pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-center relative py-16 sm:py-20 lg:py-0">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                
                {/* Left Column: Content */}
                <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left pt-8 sm:pt-10 lg:pt-0">
                                     
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                        <span className="block reveal-on-scroll">Design.</span>
                        <span className="block reveal-on-scroll delay-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-gradient-animate">
                            Visualize.
                        </span>
                        <span className="block reveal-on-scroll delay-200">Prompt.</span>
                    </h1>
                    
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed reveal-on-scroll delay-300">
                        Stop imagining, start creating. Switch between curated UI aesthetics in real-time, inspect responsive components, and generate production-ready AI prompts instantly.
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
                    className="flex-1 w-full max-w-[100%] lg:max-w-[500px] [perspective:1000px] relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center reveal-on-scroll delay-200 touch-pan-y mt-8 lg:mt-0"
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
                        let translateX = '0%'; // Use string for % logic

                        if (isActive) {
                            opacity = 1;
                            translateZ = 0;
                            rotateY = 0;
                            translateX = '0%';
                        } else if (index === (activePreviewIndex + 1) % showcaseThemes.length) {
                            opacity = 0.4;
                            translateZ = -100;
                            rotateY = -15;
                            translateX = '20%'; // Responsive offset
                        } else {
                            opacity = 0.4;
                            translateZ = -100;
                            rotateY = 15;
                            translateX = '-20%'; // Responsive offset
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
        <section className="py-16 sm:py-20 md:py-32 relative bg-slate-950/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16 md:mb-20 reveal-on-scroll">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">Why ChromaPrompt?</h2>
                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Bridge the gap between abstract ideas and concrete visual implementation with our specialized tools.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        {
                            icon: Palette,
                            title: "Curated Aesthetics",
                            desc: "Don't start from zero. Explore professionally designed themes from Neo-Brutalism to Glassmorphism.",
                            color: "text-pink-400"
                        },
                        {
                            icon: Monitor,
                            title: "Instant Visualization",
                            desc: "See how your chosen aesthetic looks on dashboard components and mobile interfaces immediately.",
                            color: "text-blue-400"
                        },
                        {
                            icon: Wand2,
                            title: "AI-Powered Prompts",
                            desc: "One click to generate rich, descriptive prompts for Midjourney or coding assistants.",
                            color: "text-purple-400"
                        }
                    ].map((feature, i) => (
                        <div key={i} className={`p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 reveal-on-scroll delay-${(i+1)*100}`}>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 sm:mb-6 ${feature.color}`}>
                                <feature.icon size={20} className="sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section className="py-16 sm:py-20 md:py-32 border-t border-white/5 bg-slate-900/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
                     <div className="w-full md:w-1/2 reveal-on-scroll">
                         <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                             Streamlined <br />
                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Creative Workflow</span>
                         </h2>
                         <div className="space-y-4">
                             {[
                                 { id: 0, title: "Select a Theme", desc: "Browse our gallery of distinct design languages.", icon: Layout },
                                 { id: 1, title: "Preview Logic", desc: "Check contrast, spacing, and vibe on real UI components.", icon: Monitor },
                                 { id: 2, title: "Enhance & Export", desc: "Use Gemini AI to expand the prompt, then copy to your tools.", icon: Terminal }
                             ].map((item, i) => (
                                 <button
                                    key={i} 
                                    className={`w-full text-left flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 border focus:outline-none ${
                                        currentWorkflowStep === i 
                                        ? 'bg-white/10 border-white/20 shadow-lg' 
                                        : 'bg-transparent border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                    onClick={() => setCurrentWorkflowStep(i)}
                                 >
                                     <div className={`mt-0.5 sm:mt-1 p-2 rounded-lg flex-shrink-0 transition-colors duration-300 ${currentWorkflowStep === i ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                                        <item.icon size={18} className="sm:w-5 sm:h-5" />
                                     </div>
                                     <div className="min-w-0 flex-1">
                                         <h4 className={`text-base sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-300 ${currentWorkflowStep === i ? 'text-white' : 'text-slate-300'}`}>{item.title}</h4>
                                         <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                                     </div>
                                 </button>
                             ))}
                         </div>
                     </div>
                     
                     {/* Dynamic Visual Scene - More flexible responsive sizing */}
                     <div className="w-full md:w-1/2 min-h-[280px] sm:min-h-[320px] md:min-h-[400px] relative rounded-2xl border border-white/10 bg-slate-950 overflow-hidden shadow-2xl reveal-on-scroll delay-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>

                        {/* Visual 1: Theme Grid */}
                        <div className={`absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center transition-opacity duration-700 ${currentWorkflowStep === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full max-w-[180px] sm:max-w-[200px] md:max-w-xs relative">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className={`aspect-square rounded-lg sm:rounded-xl border flex items-center justify-center transition-all duration-500 ${i === 1 ? 'bg-indigo-500/20 border-indigo-500 scale-105 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'bg-white/5 border-white/5 opacity-50'}`}>
                                        <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full transition-colors duration-500 ${i === 1 ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
                                    </div>
                                ))}
                                {/* Cursor Hand Animation */}
                                <div className="absolute top-1/2 left-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 -ml-2 mt-2 md:mt-4 bg-white rounded-full opacity-0 animate-[fadeIn_0.5s_1s_forwards] shadow-[0_0_20px_white]"></div>
                            </div>
                            <p className="mt-3 sm:mt-4 md:mt-8 text-indigo-300 font-mono text-[10px] sm:text-xs md:text-sm tracking-widest uppercase opacity-80 animate-pulse">Selecting Aesthetic...</p>
                        </div>

                        {/* Visual 2: UI Preview */}
                        <div className={`absolute inset-0 p-4 sm:p-6 md:p-8 flex items-center justify-center transition-opacity duration-700 ${currentWorkflowStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="w-48 sm:w-56 md:w-64 bg-slate-800 rounded-xl border border-slate-700 p-3 sm:p-4 shadow-2xl transform transition-all duration-500 hover:scale-105 relative z-10">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                                        <Sparkles size={14} className="sm:w-4 sm:h-4" />
                                    </div>
                                    <div>
                                        <div className="h-1.5 sm:h-2 md:h-2.5 w-16 sm:w-20 md:w-24 bg-slate-600 rounded mb-1.5 sm:mb-2"></div>
                                        <div className="h-1 sm:h-1.5 md:h-2 w-10 sm:w-12 md:w-16 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="h-16 sm:h-20 md:h-24 bg-slate-900/50 rounded-lg border border-slate-700/50 p-2 flex items-center justify-center">
                                        <div className="w-full h-1 bg-slate-800 rounded overflow-hidden">
                                            <div className="h-full w-2/3 bg-purple-500"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1 h-5 sm:h-6 md:h-8 bg-pink-500 rounded-md shadow-lg shadow-pink-500/20"></div>
                                        <div className="flex-1 h-5 sm:h-6 md:h-8 bg-slate-700 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Labels */}
                            <div className="absolute top-12 sm:top-16 md:top-20 right-4 sm:right-8 md:right-12 bg-black/80 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] text-green-400 font-mono border border-green-500/30 animate-[float_4s_infinite]">
                                padding: 24px
                            </div>
                            <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-4 sm:left-8 md:left-12 bg-black/80 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] text-blue-400 font-mono border border-blue-500/30 animate-[float_5s_infinite]">
                                rounded-xl
                            </div>
                        </div>

                        {/* Visual 3: Code/Prompt */}
                        <div className={`absolute inset-0 p-4 sm:p-6 md:p-8 flex items-center justify-center transition-opacity duration-700 ${currentWorkflowStep === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="w-full max-w-sm bg-[#0d1117] rounded-lg border border-slate-800 p-3 sm:p-4 md:p-5 font-mono text-[9px] sm:text-[10px] md:text-xs shadow-2xl relative overflow-hidden">
                                <div className="flex gap-1 sm:gap-1.5 mb-2 sm:mb-3 md:mb-4 border-b border-slate-800 pb-2 sm:pb-3">
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 relative z-10 leading-relaxed">
                                    <p className="text-slate-500 truncate">$ generating prompt...</p>
                                    <p className="text-purple-400 text-[8px] sm:text-[9px] md:text-[10px]">
                                        <span className="text-blue-400">const</span> style = <span className="text-yellow-300">"Neo-Brutalism"</span>;
                                    </p>
                                    <p className="text-slate-300 pl-2 sm:pl-4 border-l-2 border-slate-800 py-1 text-[8px] sm:text-[9px] md:text-[10px]">
                                        A bold, high-contrast UI with <span className="text-pink-400">#FF5C00</span> borders...
                                    </p>
                                    <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 text-green-400 font-bold text-[8px] sm:text-[9px] md:text-[10px]">
                                        <span>➜</span>
                                        <span className="text-white truncate">Copy to Midjourney</span>
                                        <span className="animate-pulse bg-green-500 w-1 sm:w-1.5 h-2.5 sm:h-3 md:h-4 block ml-1"></span>
                                    </div>
                                </div>
                                {/* Matrix rain effect background hint */}
                                <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent opacity-20"></div>
                            </div>
                        </div>
                     </div>
                 </div>
            </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 reveal-on-scroll">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Ready to define your next project?</h2>
                    <Link
                        href="/theme-preview"
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                    >
                        Start Creating
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
            </div>
        </section>

      </div>
    </div>
  );
}
