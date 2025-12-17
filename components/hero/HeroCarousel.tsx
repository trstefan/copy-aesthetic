"use client";

import MockUI from "../MockUI";
import { THEMES } from "@/constants";
import { useCircularCarousel } from "@/hooks/useCircularCarousel";

const showcaseThemes = [THEMES[1], THEMES[2], THEMES[3]];

const HeroCarousel = () => {
  const {
    activeIndex,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getCircularTransform,
    getZIndex,
  } = useCircularCarousel({
    totalItems: showcaseThemes.length,
    autoRotateInterval: 4000,
    radius: 200,
  });

  return (
    <div
      className="flex-1 w-full max-w-[500px] perspective-distant relative h-[450px] sm:h-[600px] flex items-center justify-center reveal-on-scroll delay-200"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full animate-pulse"></div>
      <div style={{ perspective: "1200px", width: "100%", height: "100%" }}>
        {showcaseThemes.map((theme, index) => {
          const isActive = index === activeIndex;
          const offset =
            (index - activeIndex + showcaseThemes.length) %
            showcaseThemes.length;
          const offsetY = offset * 12;
          const offsetX = offset * 10;
          const rotation = offset * 6;

          return (
            <div
              key={theme.id}
              className="absolute top-1/2 left-1/2 w-[260px] sm:w-[300px] transition-all duration-700"
              style={{
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotateZ(${rotation}deg) rotateY(${
                  isActive ? "0deg" : "5deg"
                })`,
                opacity: 1,
                zIndex: showcaseThemes.length - offset,
              }}
            >
              <div className="transform scale-90 sm:scale-100 origin-center shadow-2xl rounded-[3rem] ring-1 ring-white/20">
                <MockUI theme={theme} isMobile={true} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroCarousel;
