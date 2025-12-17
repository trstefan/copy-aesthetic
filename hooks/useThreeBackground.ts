import { useEffect } from "react";
import * as THREE from "three";

export function useThreeBackground(
  mountRef: React.RefObject<HTMLDivElement | null>
) {
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
  }, [mountRef]);
}
