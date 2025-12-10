import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Palette, Layers, Zap } from 'lucide-react';
import MockUI from './MockUI';
import { THEMES } from '../constants';
import Link from 'next/link';


interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  // Select a few diverse themes for the carousel
  const showcaseThemes = [THEMES[1], THEMES[2], THEMES[3]]; // Cyberpunk, Neo-Brutalism, Glassmorphism

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePreviewIndex((prev) => (prev + 1) % showcaseThemes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showcaseThemes.length]);

  // Three.js Background Animation
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
    for (let i = 0; i < 15; i++) {
        const geoIndex = Math.floor(Math.random() * geometries.length);
        const matIndex = Math.floor(Math.random() * materials.length);
        const mesh = new THREE.Mesh(geometries[geoIndex], materials[matIndex]);
        
        mesh.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
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

      // Rotate entire group slowly
      group.rotation.y += 0.002;
      group.rotation.x += 0.001;

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

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* 3D Canvas Background */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-0 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Column: Content */}
            <div className="flex-1 space-y-8 text-center lg:text-left pt-10 lg:pt-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium animate-fade-in-up">
                    <Palette className="w-4 h-4 text-blue-400" />
                    <span>Visual Design Playground</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                    Design. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        Visualize.
                    </span> <br />
                    Prompt.
                </h1>
                
                <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Explore curated UI aesthetics, preview them in real-time on responsive components, and generate production-ready AI prompts instantly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                    href="/theme-preview"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full text-lg font-bold hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                >
                    Start Creating
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                    
                </div>

                {/* Features Grid Mini */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 opacity-80">
                    <div className="flex flex-col items-center lg:items-start gap-2">
                        <div className="p-2 bg-white/5 rounded-lg"><Layers size={20} className="text-blue-400"/></div>
                        <span className="text-sm font-bold">5+ Unique Themes</span>
                    </div>
                    <div className="flex flex-col items-center lg:items-start gap-2">
                        <div className="p-2 bg-white/5 rounded-lg"><Zap size={20} className="text-yellow-400"/></div>
                        <span className="text-sm font-bold">Real-time Preview</span>
                    </div>
                    <div className="flex flex-col items-center lg:items-start gap-2">
                         <div className="p-2 bg-white/5 rounded-lg"><Palette size={20} className="text-pink-400"/></div>
                        <span className="text-sm font-bold">AI Prompt Gen</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Animated Carousel Showcase */}
            <div className="flex-1 w-full max-w-[380px] lg:max-w-[420px] perspective-1000 relative h-[720px] lg:h-[760px] flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>
                
                {showcaseThemes.map((theme, index) => {
                    const isActive = index === activePreviewIndex;
                    // Calculate position for stacking effect
                    let translateZ = 0;
                    let rotateY = 0;
                    let opacity = 0;
                    let translateX = 0;

                    if (isActive) {
                        opacity = 1;
                        translateZ = 0;
                        rotateY = 0;
                    } else if (index === (activePreviewIndex + 1) % showcaseThemes.length) {
                        // Next item
                        opacity = 0.4;
                        translateZ = -100;
                        rotateY = -15;
                        translateX = 50;
                    } else {
                        // Previous item (or others)
                        opacity = 0.4;
                        translateZ = -100;
                        rotateY = 15;
                        translateX = -50;
                    }

                    return (
                        <div 
                            key={theme.id}
                            className="absolute top-1/2 left-1/2 w-[320px] lg:w-[360px] h-[650px] lg:h-[700px] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                            style={{
                                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                                opacity: opacity,
                                zIndex: isActive ? 10 : 0,
                                pointerEvents: 'none' // Disable interaction on preview
                            }}
                        >
                            {/* Theme Label Badge */}
                            <div className={`absolute -top-12 left-0 right-0 text-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold text-white shadow-lg">
                                    {theme.name}
                                </span>
                            </div>

                            {/* Phone Mockup */}
                            <MockUI theme={theme} isMobile={true} />
                        </div>
                    );
                })} 
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
