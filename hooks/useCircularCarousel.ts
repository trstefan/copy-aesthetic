import { useState, useEffect } from "react";

interface CircularTransform {
  x: number;
  z: number;
  rotationY: number;
}

interface UseCircularCarouselOptions {
  totalItems: number;
  autoRotateInterval?: number;
  radius?: number;
}

export function useCircularCarousel({
  totalItems,
  autoRotateInterval = 4000,
  radius = 200,
}: UseCircularCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Handle touch start
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move (optional for additional feedback)
  const onTouchMove = (e: React.TouchEvent) => {
    // Can be extended for real-time swipe feedback
  };

  // Handle touch end with swipe detection
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = touchStart - endX;

    if (diff > 50) {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    } else if (diff < -50) {
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }

    setTouchStart(null);
  };

  // Auto-rotation effect (pauses when user is touching)
  useEffect(() => {
    const interval = setInterval(() => {
      if (touchStart === null) {
        setActiveIndex((prev) => (prev + 1) % totalItems);
      }
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [totalItems, autoRotateInterval, touchStart]);

  // Calculate circular position for an item
  const getCircularTransform = (index: number): CircularTransform => {
    const angle = (index - activeIndex) * (360 / totalItems);
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius - radius;
    const rotationY = angle;

    return { x, z, rotationY };
  };

  // Calculate dynamic z-index based on position
  const getZIndex = (rotationY: number, isActive: boolean): number => {
    if (isActive) return 10;
    return Math.round(Math.cos((rotationY * Math.PI) / 180) * 5) + 5;
  };

  return {
    activeIndex,
    setActiveIndex,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getCircularTransform,
    getZIndex,
  };
}
